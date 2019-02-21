import Vue from 'vue'
import CompressorjsOptions from './compressorjs'

declare class Component extends Vue {
  static install(vue: typeof Vue): void
}

interface UploadOptions {
  partSize: number
}

/** UploadToAli Component */
export default class UploadToAli extends Component {
  /**
   * 使用前请务必设置跨域 及 ACL
   * https://help.aliyun.com/document_detail/32069.html?spm=a2c4g.11186623.6.920.9ddd5557vJ6QU7
   */

  /** Access Key */
  accessKeyId: string
  /** Access Secret */
  accessKeySecret: string
  /** 存储空间的名字 */
  bucket: string
  /** 根据 存储空间 所在的存储区域, 相应的上传域名 */
  region: string
  /** 目录名, 一定要/结尾 */
  dir: string
  /**
   * 自定义域名, 该字段有值时, 返回的文件url拼接规则为: customDomain + / + dir + filename
   * 域名无协议时, url默认以 // 开头
   * 域名不需要/结尾
   */
  customDomain: string
  /** 图片地址, 支持v-model */
  value: string | string[]
  /** 是否多选 */
  multiple: boolean
  /**
   * 上传文件大小限制, 单位为KB, 默认值为1024, 参考GitHub上传头像设置
   * https://github.com/settings/profile
   */
  size: number
  /**
   * 接受上传的文件类型, 多个值逗号分隔, 默认只接受图片
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept
   */
  accept: string
  /**  */
  timeout: number
  /** 是否禁用。若为true，则不能上传 */
  disabled: boolean
  /** 允许上传的最大数量 */
  max: number
  /** 图片压缩参数 */
  compressOptions: CompressorjsOptions
  /**
   * 上传参数
   * https://help.aliyun.com/document_detail/64047.html?spm=a2c4g.11186623.2.25.40d279f8OV4hwk#h2-url-2
   */
  uploadOptions: UploadOptions
  /** 预览功能 需要组件:img-preview */
  preview: boolean
  /** 点击事件 */
  onClick: (url: any) => void
}
