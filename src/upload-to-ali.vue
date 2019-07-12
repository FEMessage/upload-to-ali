<template>
  <div class="upload-to-oss" title="粘贴或拖拽即可上传图片;支持拖拽排序" :class="{'upload-to-oss--highlight': isHighlight}">
    <!--图片的展示区域-->
    <draggable-list v-if="!$slots.default" v-model="uploadList">
      <div v-for="(url, index) in uploadList" :key="url" :class="['upload-item-wrapper', {'is-preview': preview}]">
        <i
          title="删除"
          v-if="!disabled"
          class="upload-del-icon"
          @click.stop.prevent="onDelete(url, index)"
        ></i>
        <upload-item :url="url" @click="onClick(url, $event)" />
      </div>
    </draggable-list>

    <!--上传区域-->
    <div
      :class="['upload-area', {disabled}]"
      v-if="canUpload"
      @click="selectFiles"
      @paste="paste"
      @dragover="onDragover"
      @dragleave="removeHighlight"
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
                  <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
                </svg>
              </div>
            </slot>
          </template>
          <template v-else>
            <!--@slot 自定义placeholder内容 -->
            <slot name="placeholder">
              <div class="upload-placeholder"></div>
            </slot>
          </template>
        </div>
      </slot>
    </div>

    <!-- 自定义提示文字 -->
    <div v-if="tip" class="upload-tip">{{ tip }}</div>

    <input
      class="upload-input"
      type="file"
      ref="uploadInput"
      hidden
      :disabled="uploading"
      :accept="accept"
      :multiple="multiple"
      @change="upload"
    >
    <img-preview v-if="preview" v-model="previewUrl"></img-preview>
  </div>
</template>

<script>
import AliOSS from 'ali-oss'
import ImgPreview from '@femessage/img-preview'
import ImageCompressor from 'image-compressor.js'
import DraggableList from './components/draggable-list.vue'
import UploadItem from './components/upload-item.vue'

const imageCompressor = new ImageCompressor()

let doubleSlash = '//'
let oneKB = 1024
const image = 'image'
const clipboardData = 'clipboardData'
const dataTransfer = 'dataTransfer'
const target = 'target'

const mimeTypeFullRegex = /[\w]*\/[\*\w]/
const mimeTypeHalfRegex = /[\w]*/

export default {
  name: 'UploadToAli',
  components: {
    ImgPreview,
    DraggableList,
    UploadItem
  },
  props: {
    /**
     * 阿里云控制台创建的access key
     * 使用前请务必设置跨域 及 ACL
     * @link https://help.aliyun.com/document_detail/32069.html?spm=a2c4g.11186623.6.920.9ddd5557vJ6QU7
     */
    accessKeyId: {
      type: String,
      default: process.env.OSS_KEY
    },
    /**
     * 阿里云控制台创建的access secret
     */
    accessKeySecret: {
      type: String,
      default: process.env.OSS_SECRET
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
    value: [String, Array],
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
      default: oneKB
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
      validator: val => {
        return val > 0
      }
    },
    /**
     * 图片压缩参数，请参考：https://www.npmjs.com/package/image-compressor.js#options
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
     * 是否开启预览功能，需要全局注册img-preview组件
     */
    preview: {
      type: Boolean,
      default: true
    },
    /**
     * 自定义上传提示内容
     */
    tip: {
      type: String
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
    }
  },
  data() {
    return {
      client: {},
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
        this.$emit('input', list)
      }
    },
    canUpload() {
      const maxLen = this.multiple ? this.max : 1
      return this.uploadList.length < maxLen
    }
  },
  mounted() {
    if (
      !this.region ||
      !this.bucket ||
      !this.accessKeyId ||
      !this.accessKeySecret
    ) {
      console.error(
        '必要参数不能为空: region bucket accessKeyId accessKeySecret'
      )
      return
    }

    if (this.accept && !mimeTypeFullRegex.test(this.accept)) {
      console.warn(
        '请设置正确的`accept`属性, 可参考:',
        'https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types'
      )
    }

    this.newClient()
  },
  methods: {
    newClient() {
      // https://help.aliyun.com/document_detail/32069.html?spm=a2c4g.11186623.6.801.LllSVA
      this.client = new AliOSS({
        region: this.region,
        bucket: this.bucket,
        accessKeyId: this.accessKeyId,
        accessKeySecret: this.accessKeySecret
      })
    },
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
    async upload(e, type = target) {
      // 防止loading过程重复上传
      if (this.loading) return

      let files = Array.from(e[type].files)
      let currentUploads = []

      if (!files.length) return

      const reset = () => (e.target.value = '')

      try {
        await this.beforeUpload(files)
      } catch (e) {
        reset()
        return
      }

      if (files.some(i => i.size > this.size * oneKB)) {
        alert(`请选择${this.size}KB内的文件！`)
        reset()
        return
      }

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

      this.uploading = true

      const max = this.multiple ? this.max : 1
      for (let i = 0; i < files.length; i++) {
        if (this.uploadList.length === max) break
        let file = files[i]

        let name = file.name
        let key = ''

        /**
         * 上传过程中
         * @property {string} name - 当前上传的图片名称
         */
        this.$emit('loading', name)

        if (file.type.indexOf(image) > -1)
          file = await imageCompressor.compress(file, this.compressOptions)

        //文件名-时间戳 作为上传文件key
        let pos = name.lastIndexOf('.')
        let suffix = ''
        if (pos != -1) {
          suffix = name.substring(pos)
        }

        key = `${name.substring(0, pos)}-${new Date().getTime()}${suffix}`

        await this.client
          .multipartUpload(this.dir + key, file, this.uploadOptions)
          .then(res => {
            // 协议无关
            let filename = doubleSlash

            // Fix: 处理文件名中的非法字符, eg: +, %, &, #...
            const validName = res.name
              .split('/')
              .map(i => encodeURIComponent(i))
              .join('/')

            if (this.customDomain) {
              if (this.customDomain.indexOf(doubleSlash) > -1)
                filename = `${this.customDomain}/${validName}`
              else filename += `${this.customDomain}/${validName}`
            } else
              filename += `${this.bucket}.${
                this.region
              }.aliyuncs.com/${validName}`
            this.$emit(
              'input',
              this.multiple ? this.uploadList.concat(filename) : filename
            )
            currentUploads.push(filename)
          })
          .catch(err => {
            // TODO 似乎可以干掉？🤔
            reset()
            this.uploading = false

            // 捕获超时异常
            if (e.code === 'ConnectionTimeoutError') {
              /**
               * 上传超时事件
               */
              this.$emit('timeout')
            }
            if (this.client.isCancel()) {
              /**
               * 上传操作被取消事件
               */
              this.$emit('cancel')
            } else {
              /**
               * 上传失败事件
               */
              this.$emit('fail')
            }
          })

        this.newClient()
      }

      reset()
      this.uploading = false

      // 没有一张上传成功的，不触发load事件
      if (currentUploads.length < 1) return

      if (this.multiple) {
        this.$emit('loaded', currentUploads)
      } else {
        /**
         * 上传完成后触发的事件。
         * @property {string[]|string} urls - multiple模式返回此次成功上传的文件url数组； 单张模式返回上传的url
         */
        this.$emit('loaded', currentUploads[0])
      }
    },
    paste(e) {
      let files = e.clipboardData && e.clipboardData.files
      if (files && files.length) this.upload(e, clipboardData)
    },

    /**
     * 拖拽事件
     */
    onDragover(e) {
      e.preventDefault()
      this.addHighlight()
    },
    onDrop(e) {
      e.preventDefault()
      this.removeHighlight()

      const files = e.dataTransfer && e.dataTransfer.files
      if (files && files.length) this.upload(e, dataTransfer)
    },
    addHighlight() {
      this.isHighlight = true
    },
    removeHighlight() {
      this.isHighlight = false
    }
  }
}
</script>
<style lang="stylus">
$border-color = #cad1e8
$active-color = #5d81f9
.upload-to-oss {
  display: inline-flex;
  .disabled {
    pointer-events: none;
  }
  .upload-item-wrapper,
  .upload-box {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 3px;
    border: 1px solid $border-color;
    &:hover {
      border-color: $active-color;
      background-color: #5d81f914;
    }
  }
  .upload-item-wrapper:hover {
    // FYI: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor#Values
    cursor: move;
    &.is-preview {
      cursor: zoom-in;
    }
  }
  .upload-item-wrapper {
    position: relative;
    margin: 0 8px 8px 0;
  }
  .upload-placeholder,
  .upload-loading {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .upload-placeholder {
    &:before {
      width: 2px;
      height: 20px;
      background-color: $border-color;
    }
    &:after {
      width: 20px;
      height: 2px;
      background-color: $border-color;
    }
  }
  .upload-placeholder:before,
  .upload-placeholder:after,
  .upload-del-icon:before,
  .upload-del-icon:after,
  .upload-loading:before {
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
    background-color: $border-color;
    border-radius: 50%;
    line-height: 16px;
    transform: rotate(45deg);
    z-index: 1;
    cursor: pointer;
    &:before {
      width: 1px;
      height: 8px;
      background: #fff;
    }
    &:after {
      width: 8px;
      height: 1px;
      background: #fff;
    }
  }
  .upload-input {
    display: none;
  }
  .upload-area {
    cursor: pointer;
    display: inline-flex;
    margin-bottom: 4px;
  }
  .upload-tip {
    margin-top: 8px;
    color: #606266;
    font-size: 12px;
  }
}
.upload-to-oss--highlight {
  .upload-box {
    border-color: $active-color;
    background-color: #5d81f914;
  }
}
</style>
