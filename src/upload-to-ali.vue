<template>
  <section>
    <div
      class="upload-to-oss"
      title="粘贴或拖拽即可上传；支持拖拽排序"
      :class="{'upload-to-oss--highlight': isHighlight}"
    >
      <!--图片的展示区域-->
      <draggable-list v-model="uploadList">
        <template v-if="!$slots.default">
          <div
            v-for="(url, index) in uploadList"
            :key="url"
            :class="['upload-item-wrapper', {'is-preview': preview}]"
          >
            <i
              v-if="!disabled"
              title="删除"
              class="upload-del-icon"
              @click.stop.prevent="onDelete(url, index)"
            ></i>
            <upload-item :url="url" @click="onClick(url, $event)" />
          </div>
        </template>
        <template #footer>
          <!--上传区域-->
          <div
            v-if="canUpload"
            key="upload-area"
            :class="['upload-area', {disabled}]"
            @click="selectFiles"
            @paste="paste"
            @dragenter="isHighlight = hasFile($event)"
            @dragleave="isHighlight = false"
            @dragover="$event.preventDefault()"
            @drop="onDrop"
          >
            <!--@slot 自定义上传区域，会覆盖 slot=spinner、slot=placeholder-->
            <slot>
              <div class="upload-box">
                <template v-if="uploading">
                  <!--@slot 自定义loading内容，默认类似 element-ui 的 v-loading -->
                  <slot name="spinner">
                    <div class="upload-loading">
                      <svg class="circular" viewBox="25 25 50 50">
                        <circle
                          class="path"
                          cx="50"
                          cy="50"
                          r="20"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </slot>
                </template>
                <template v-else>
                  <!--@slot 自定义placeholder内容 -->
                  <slot name="placeholder">
                    <div class="upload-placeholder" />
                  </slot>
                </template>
              </div>
            </slot>
          </div>
        </template>
      </draggable-list>
      <input
        ref="uploadInput"
        style="display: none;"
        type="file"
        hidden
        :disabled="uploading"
        :accept="accept"
        :multiple="multiple"
        @change="upload"
      />
      <img-preview v-if="preview" v-model="previewUrl" />
    </div>

    <!-- 自定义提示文字 -->
    <div v-if="tip" class="upload-tip">{{ tip }}</div>
  </section>
</template>

<script>
import ImgPreview from '@femessage/img-preview'
import Compressor from 'compressorjs'
import DraggableList from './components/draggable-list.vue'
import UploadItem from './components/upload-item.vue'
import {defaultRequest} from './utils'

const oneKB = 1024

const mimeTypeFullRegex = /[\w]*\/[*\w]/
const mimeTypeHalfRegex = /[\w]*/

const enableCompressRegex = /^image\/((?!gif).)+$/

export default {
  name: 'UploadToAli',
  components: {
    ImgPreview,
    DraggableList,
    UploadItem
  },
  props: {
    /**
     * 上传地址
     */
    action: {
      type: String,
      default: process.env.UPLOAD_ACTION
    },
    /**
     * 存储空间的名字
     */
    bucket: {
      type: String,
      default: process.env.OSS_BUCKET
    },
    /**
     * 根据 存储空间 所在的存储区域, 相应的上传域名
     */
    region: {
      type: String,
      default: process.env.OSS_REGION
    },
    /**
     * 目录名, 一定要/结尾
     */
    dir: {
      type: String,
      default: process.env.OSS_DIR || ''
    },
    /**
     * 自定义域名, 该字段有值时, 返回的文件url拼接规则为: customDomain + / + dir + filename
     * 域名无协议时, url默认以 // 开头
     * 域名不需要/结尾
     */
    customDomain: {
      type: String,
      default: process.env.OSS_CUSTOM_DOMAIN
    },
    /**
     * 图片地址, 支持v-model
     * @model
     */
    value: {
      type: [String, Array],
      required: true
    },
    /**
     * 是否多选
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * 上传文件大小限制, 单位为KB, 默认值为1024, 参考GitHub上传头像设置
     * @link https://github.com/settings/profile
     */
    size: {
      type: Number,
      default: 1024
    },
    /**
     * 接受上传的文件类型, 多个值逗号分隔, 默认只接受图片
     * 其他文件类型可以参考[MIME 类型列表](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)
     */
    accept: {
      type: String,
      default: 'image/*'
    },
    /**
     * 暂不支持此props。超时时间, 单位毫秒, 大于0才生效
     */
    timeout: {
      type: Number,
      default: 0
    },
    /**
     * 是否禁用。若为true，则不能上传
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 允许上传的最大数量
     */
    max: {
      type: Number,
      default: 9,
      validator: val => val > 0
    },
    /**
     * 图片压缩参数，请参考：https://www.npmjs.com/package/compressorjs#options
     */
    compressOptions: {
      type: Object,
      default: () => ({
        maxWidth: 750
      })
    },
    /**
     * 上传参数，请参考：https://help.aliyun.com/document_detail/64047.html?spm=a2c4g.11186623.2.25.40d279f8OV4hwk#h2-url-2
     */
    uploadOptions: {
      type: Object,
      default: () => ({
        partSize: 100 * oneKB
      })
    },
    /**
     * 是否开启预览功能，需要全局注册 img-preview 组件
     */
    preview: {
      type: Boolean,
      default: true
    },
    /**
     * 自定义上传提示内容
     */
    tip: {
      type: String,
      default: ''
    },
    /**
     * 点击事件, 返回参数为当前点击的url
     */
    onClick: {
      type: Function,
      default(url, isFile) {
        if (isFile) {
          window.open(url)
        } else {
          this.previewUrl = url
        }
      }
    },
    /**
     * upload前的钩子函数，传入选择的文件，FileList类型。
     * 要求返回一个promise，resolved则继续upload，rejected则停止上传。
     * 调用时机在size和accept检验之前。
     */
    beforeUpload: {
      type: Function,
      default() {
        return Promise.resolve()
      }
    },
    /**
     * 所选文件超出size限制时的处理函数；
     * 接收超出大小的文件作为参数
     */
    onOversize: {
      type: Function,
      default() {
        alert(`请选择${this.size}KB内的文件！`)
      }
    },

    /**
     * 自定义上传, 使用此函数则会覆盖默认的上传行为和全局上传行为
     * 返回 Promise, 接收 resolve 参数为 url
     */
    request: {
      type: Function
    }
  },
  data() {
    return {
      previewUrl: '',
      uploading: false,
      isHighlight: false
    }
  },
  computed: {
    uploadList: {
      get() {
        return [].concat(this.value).filter(v => !!v)
      },
      set(list) {
        /**
         * 仅能在 Windows OS 存在
         * 当组件本身已经存在图片的时候,
         * 再把一张图片拖进来会将当前的数据格式变更为 `Array`, 即使是没有开启 `multiple` 的情况下,
         * 因此在单张图片的情况禁止 `v-model` 同步行为, 防止触发上面的 `get` 变更为数组
         *
         * 单张图片不依靠此值来更新值, 在 `async upload()` 那里会触发更新.
         */
        if (!this.multiple) return
        this.$emit('input', list)
      }
    },
    canUpload() {
      const maxLen = this.multiple ? this.max : 1
      return this.uploadList.length < maxLen
    },
    // 上传方法优先级
    // 自定义 > 全局注册 > 默认
    uploadRequest() {
      return this.request || this.$uploadRequest || defaultRequest
    }
  },
  mounted() {
    if (this.accept && !mimeTypeFullRegex.test(this.accept)) {
      console.warn(
        '请设置正确的`accept`属性, 可参考:',
        'https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types'
      )
    }
  },
  methods: {
    onDelete(url, index) {
      const result = this.multiple ? this.uploadList.filter(v => v !== url) : ''
      this.$emit('input', result)
      /**
       * 删除图片事件
       * @property {string} url - 被删除图片的url；
       * @property {number} index - 被删除图片的下标
       */
      this.$emit('delete', url, index)
    },
    /**
     * 手动触发选择文件事件
     * @public
     */
    selectFiles() {
      if (!this.canUpload) {
        alert('已达到上传的最大数量')
        return
      }
      this.$refs.uploadInput.click()
    },
    /**
     * 上传步骤
     * 1. 调用 beforeUpload
     * 2. 校验文件大小和类型
     * 3. 逐个上传文件，拿到返回的url
     * 4. 清空 loading 和 input 的状态，emit loaded 事件
     */
    async upload(e, type = 'target') {
      // 防止loading过程重复上传
      if (this.loading) return

      const files = Array.from(e[type].files)

      if (!files.length) return

      const reset = () => (e.target.value = '')

      try {
        await this.beforeUpload(files)
      } catch (e) {
        reset()
        return
      }
      // 检查有无oversize的文件
      const fileOvesize = files.find(i => i.size > this.size * oneKB)
      if (fileOvesize) {
        this.onOversize(fileOvesize)
        reset()
        return
      }

      /**
       * 检查有无错误类型的文件
       * 问: input已经有accept属性，为什么还要用正则再检验一次呢？
       * 答：因为mac和windows用户在文件选择框是可以手动选择“格式：所有文件”的
       * 所以光用input无法保证传入的文件类型
       */
      if (
        this.accept &&
        (this.accept.indexOf('/*') > -1
          ? files.some(
              i => i.type.indexOf(this.accept.match(mimeTypeHalfRegex)) === -1
            )
          : files.some(i => this.accept.indexOf(i.type) === -1))
      ) {
        alert('文件格式有误！')
        reset()
        return
      }

      const currentUploads = []
      this.uploading = true

      const max = this.multiple ? (this.max - this.uploadList.length) : 1
      for (let i = 0; i < files.length && i < max; i++) {
        // 尝试压缩图片
        try {
          let file = files[i]
          if (enableCompressRegex.test(file.type)) {
            try {
              file = await this.compressImg(file)
            } catch (error) {
              throw new Error('compress-fail')
            }
          }
          /**
           * 上传过程中
           * @property {string} name - 当前上传的图片名称
           */
          this.$emit('loading', file.name)

          const url = await this.uploadRequest(file)
          if (typeof url !== 'string' || !/^(https?:)?\/\//.test(url)) {
            throw new Error(
              `\`Promise.resolve\` 接收的参数应该是超链接(url), 当前为 ${typeof url}.`
            )
          }
          this.$emit('input', this.multiple ? this.uploadList.concat(url) : url)
          currentUploads.push(url)
        } catch (error) {
          console.error('上传失败', error.message)
          /**
           * 上传失败
           * @property {Error} error - 上传失败或压缩失败抛出的 error 对象。当压缩失败时，error.message === 'compress-fail'
           */
          this.$emit('fail', error)
        }
      }

      reset()
      this.uploading = false

      // 没有一张上传成功的，不触发load事件
      if (currentUploads.length < 1) return

      if (this.multiple) {
        this.$emit('loaded', currentUploads)
        return currentUploads
      } else {
        /**
         * 上传完成后触发的事件。
         * @property {string[]|string} urls - multiple模式返回此次成功上传的文件url数组； 单张模式返回上传的url
         */
        this.$emit('loaded', currentUploads[0])
        return currentUploads[0]
      }
    },
    paste(e) {
      if (!e.clipboardData) return
      const {files} = e.clipboardData
      if (!files || !files.length) return
      this.upload(e, 'clipboardData')
    },

    compressImg(img) {
      return new Promise((resolve, reject) => {
        new Compressor(img, {
          ...this.compressOptions,
          success: blob => resolve(new File([blob], img.name)),
          error: reject
        })
      })
    },

    /**
     * 用以判断被拖拽的东西是本地文件还是其他dom元素
     * FYI: 为什么不使用files属性？
     * 因为在dragenter事件中，files.length === 0 && types.length === 1;
     * 而在drop事件中，files.length === types.length === 1;（在chrome的console测试）
     * 所以用types属性，就可以在dragenter阶段就判断被拖拽的东西是不是本地文件了
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer#files.28.29
     */
    hasFile(e) {
      return (
        e.dataTransfer &&
        e.dataTransfer.types &&
        e.dataTransfer.types.indexOf('Files') > -1
      )
    },
    onDrop(e) {
      e.preventDefault()
      if (this.hasFile(e)) this.upload(e, 'dataTransfer')
    }
  }
}
</script>
<style lang="less">
@border-color: #cad1e8;
@active-color: #5d81f9;
@error-color: #ff4d4f;

.upload-to-oss--highlight {
  .upload-box {
    border-color: @active-color;
    background-color: #5d81f914;
  }
}

.upload-to-oss {
  .disabled {
    pointer-events: none;
  }

  .upload-box {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 3px;
    border: 1px solid @border-color;

    &:hover {
      border-color: @active-color;
      background-color: #5d81f914;
    }
  }

  .upload-item-wrapper {
    .upload-box();

    position: relative;
    margin: 0 8px 8px 0;

    &:hover {
      // FYI: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor#Values
      cursor: move;

      &.is-preview {
        cursor: zoom-in;
      }
    }
  }

  .upload-placeholder,
  .upload-loading {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .upload-placeholder {
    &::before {
      width: 2px;
      height: 20px;
      background-color: @border-color;
    }

    &::after {
      width: 20px;
      height: 2px;
      background-color: @border-color;
    }
  }

  .upload-placeholder::before,
  .upload-placeholder::after,
  .upload-del-icon::before,
  .upload-del-icon::after,
  .upload-loading::before {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .upload-loading {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    transition: opacity 0.3s;

    @keyframes is-loading {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes loading-dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }

      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40px;
      }

      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120px;
      }
    }

    .circular {
      position: absolute;
      left: 28%;
      top: 28%;
      height: 35px;
      width: 35px;
      -webkit-animation: is-loading 2s linear infinite;
      animation: is-loading 2s linear infinite;
    }

    .path {
      -webkit-animation: loading-dash 1.5s ease-in-out infinite;
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #5d81f9;
      stroke-linecap: round;
    }
  }

  .upload-del-icon {
    position: absolute;
    right: -8px;
    top: -8px;
    width: 16px;
    height: 16px;
    background-color: @border-color;
    border-radius: 50%;
    line-height: 16px;
    transform: rotate(45deg);
    z-index: 1;
    cursor: pointer;

    &::before {
      width: 1px;
      height: 8px;
      background: #fff;
    }

    &::after {
      width: 8px;
      height: 1px;
      background: #fff;
    }
  }

  .upload-area {
    cursor: pointer;
    display: inline-flex;
    margin: 0 8px 8px 0;
  }
}

.el-form-item.is-error .upload-box {
  border-color: @error-color;
}

.upload-tip {
  color: #606266;
  font-size: 12px;
}
</style>
