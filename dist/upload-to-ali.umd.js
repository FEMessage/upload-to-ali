(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('ali-oss'), require('@femessage/img-preview'), require('image-compressor.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'ali-oss', '@femessage/img-preview', 'image-compressor.js'], factory) :
  (factory((global.UploadToAli = {}),global._regeneratorRuntime,global._asyncToGenerator,global.AliOSS,global.ImgPreview,global.ImageCompressor));
}(this, (function (exports,_regeneratorRuntime,_asyncToGenerator,AliOSS,ImgPreview,ImageCompressor) { 'use strict';

  _regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
  _asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;
  AliOSS = AliOSS && AliOSS.hasOwnProperty('default') ? AliOSS['default'] : AliOSS;
  ImgPreview = ImgPreview && ImgPreview.hasOwnProperty('default') ? ImgPreview['default'] : ImgPreview;
  ImageCompressor = ImageCompressor && ImageCompressor.hasOwnProperty('default') ? ImageCompressor['default'] : ImageCompressor;

  (function () {
    if (typeof document !== 'undefined') {
      var head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style'),
          css = ".upload-to-oss { display: inline-block; } .upload-to-oss .disabled { pointer-events: none; } .upload-to-oss .upload-item, .upload-to-oss .upload-box { display: inline-flex; justify-content: center; align-items: center; width: 80px; height: 80px; border-radius: 3px; border: 1px solid #cad1e8; } .upload-to-oss .upload-item:hover, .upload-to-oss .upload-box:hover { border-color: #5d81f9; } .upload-to-oss .is-preview:hover { cursor: zoom-in; } .upload-to-oss .upload-item { position: relative; margin: 0 8px 8px 0; } .upload-to-oss .upload-placeholder, .upload-to-oss .upload-loading { position: relative; width: 100%; height: 100%; text-align: center; } .upload-to-oss .upload-placeholder:before { width: 2px; height: 20px; background-color: #cad1e8; } .upload-to-oss .upload-placeholder:after { width: 20px; height: 2px; background-color: #cad1e8; } .upload-to-oss .upload-placeholder:before, .upload-to-oss .upload-placeholder:after, .upload-to-oss .upload-del-icon:before, .upload-to-oss .upload-del-icon:after, .upload-to-oss .upload-loading:before { content: ''; display: block; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); } .upload-to-oss .upload-loading { background-color: rgba(255,255,255,0.9); border-radius: 3px; transition: opacity 0.3s; } .upload-to-oss .upload-loading .circular { position: absolute; left: 28%; top: 28%; height: 35px; width: 35px; -webkit-animation: is-loading 2s linear infinite; animation: is-loading 2s linear infinite; } .upload-to-oss .upload-loading .path { -webkit-animation: loading-dash 1.5s ease-in-out infinite; animation: loading-dash 1.5s ease-in-out infinite; stroke-dasharray: 90, 150; stroke-dashoffset: 0; stroke-width: 2; stroke: #5d81f9; stroke-linecap: round; } @-moz-keyframes is-loading { 100% { transform: rotate(360deg); } } @-webkit-keyframes is-loading { 100% { transform: rotate(360deg); } } @-o-keyframes is-loading { 100% { transform: rotate(360deg); } } @keyframes is-loading { 100% { transform: rotate(360deg); } } @-moz-keyframes loading-dash { 0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 90, 150; stroke-dashoffset: -40px; } 100% { stroke-dasharray: 90, 150; stroke-dashoffset: -120px; } } @-webkit-keyframes loading-dash { 0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 90, 150; stroke-dashoffset: -40px; } 100% { stroke-dasharray: 90, 150; stroke-dashoffset: -120px; } } @-o-keyframes loading-dash { 0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 90, 150; stroke-dashoffset: -40px; } 100% { stroke-dasharray: 90, 150; stroke-dashoffset: -120px; } } @keyframes loading-dash { 0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; } 50% { stroke-dasharray: 90, 150; stroke-dashoffset: -40px; } 100% { stroke-dasharray: 90, 150; stroke-dashoffset: -120px; } } .upload-to-oss .upload-del-icon { position: absolute; right: -8px; top: -8px; width: 16px; height: 16px; background-color: #cad1e8; border-radius: 50%; line-height: 16px; transform: rotate(45deg); z-index: 1; cursor: pointer; } .upload-to-oss .upload-del-icon:before { width: 1px; height: 8px; background: #fff; } .upload-to-oss .upload-del-icon:after { width: 8px; height: 1px; background: #fff; } .upload-to-oss .upload-img { position: absolute; width: 100%; max-height: 100%; display: block; top: 50%; transform: translate(0, -50%); } .upload-to-oss .upload-input { display: none; } .upload-to-oss .upload-area { cursor: pointer; display: inline-block; } .upload-to-oss--active .upload-box { box-shadow: 0 0 0 1px #5d81f9; } ";style.type = 'text/css';if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }head.appendChild(style);
    }
  })();

  var imageCompressor = new ImageCompressor();

  var doubleSlash = '//';
  var oneKB = 1024;
  var image = 'image';
  var clipboardData = 'clipboardData';
  var dataTransfer = 'dataTransfer';
  var target = 'target';

  var Component = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "upload-to-oss", class: { 'upload-to-oss--active': _vm.isActive }, attrs: { "title": "粘贴或拖拽即可上传图片" } }, [!_vm.$slots.default ? _vm._l(_vm.uploadList, function (imgUrl, index) {
        return _c('div', { key: index, staticClass: "upload-item", class: { 'is-preview': _vm.preview } }, [!_vm.disabled ? _c('i', { staticClass: "upload-del-icon", attrs: { "title": "删除图片" }, on: { "click": function click($event) {
              $event.stopPropagation();$event.preventDefault();_vm.onDelete(imgUrl, index);
            } } }) : _vm._e(), _vm._v(" "), _c('img', { staticClass: "upload-img", attrs: { "src": imgUrl }, on: { "click": function click($event) {
              _vm.onClick(imgUrl);
            } } })]);
      }) : _vm._e(), _vm._v(" "), _vm.canUpload ? _c('div', { staticClass: "upload-area", class: { disabled: _vm.disabled }, on: { "click": _vm.selectFiles, "paste": _vm.paste, "dragover": _vm.onDragover, "dragleave": _vm.removeActive, "drop": _vm.onDrop } }, [_vm._t("default", [_c('div', { staticClass: "upload-box" }, [_vm.uploading ? _vm._t("spinner", [_c('div', { staticClass: "upload-loading" }, [_c('svg', { staticClass: "circular", attrs: { "viewBox": "25 25 50 50" } }, [_c('circle', { staticClass: "path", attrs: { "cx": "50", "cy": "50", "r": "20", "fill": "none" } })])])]) : _vm._t("placeholder", [_c('div', { staticClass: "upload-placeholder" })])], 2)])], 2) : _vm._e(), _vm._v(" "), _c('input', { ref: "uploadInput", staticClass: "upload-input", attrs: { "type": "file", "hidden": "", "disabled": _vm.uploading, "accept": _vm.accept, "multiple": _vm.multiple }, on: { "change": _vm.upload } }), _vm._v(" "), _vm.preview ? _c('img-preview', { model: { value: _vm.previewUrl, callback: function callback($$v) {
            _vm.previewUrl = $$v;
          }, expression: "previewUrl" } }) : _vm._e()], 2);
    }, staticRenderFns: [],
    name: 'UploadToAli',
    components: {
      ImgPreview: ImgPreview
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
       * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept
       */
      accept: {
        type: String,
        default: 'image/png, image/jpeg, image/gif, image/jpg'
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
        validator: function validator(val) {
          return val > 0;
        }
      },
      /**
       * 图片压缩参数，请参考：https://www.npmjs.com/package/image-compressor.js#options
       */
      compressOptions: {
        type: Object,
        default: function _default() {
          return {
            maxWidth: 750
          };
        }
      },
      /**
       * 上传参数，请参考：https://help.aliyun.com/document_detail/64047.html?spm=a2c4g.11186623.2.25.40d279f8OV4hwk#h2-url-2
       */
      uploadOptions: {
        type: Object,
        default: function _default() {
          return {
            partSize: 100 * oneKB
          };
        }
      },
      /**
       * 是否开启预览功能，需要全局注册img-preview组件
       */
      preview: {
        type: Boolean,
        default: true
      },
      /**
       * 点击事件, 返回参数为当前点击的url
       */
      onClick: {
        type: Function,
        default: function _default(url) {
          this.previewUrl = url;
        }
      }
    },
    data: function data() {
      return {
        client: {},
        previewUrl: '',
        uploading: false,
        isActive: false
      };
    },

    computed: {
      uploadList: function uploadList() {
        return [].concat(this.value).filter(function (v) {
          return !!v;
        });
      },
      canUpload: function canUpload() {
        var maxLen = this.multiple ? this.max : 1;
        return this.uploadList.length < maxLen;
      }
    },
    mounted: function mounted() {
      if (!this.region || !this.bucket || !this.accessKeyId || !this.accessKeySecret) {
        console.error('必要参数不能为空: region bucket accessKeyId accessKeySecret');
        return;
      }

      this.newClient();
    },

    methods: {
      newClient: function newClient() {
        // https://help.aliyun.com/document_detail/32069.html?spm=a2c4g.11186623.6.801.LllSVA
        this.client = new AliOSS({
          region: this.region,
          bucket: this.bucket,
          accessKeyId: this.accessKeyId,
          accessKeySecret: this.accessKeySecret
        });
      },
      onDelete: function onDelete(url, index) {
        var result = this.multiple ? this.uploadList.filter(function (v) {
          return v !== url;
        }) : '';
        this.$emit('input', result);
        /**
         * 删除图片事件
         * 返回参数(被删除的文件, 下标)
         * @event delete
         */
        this.$emit('delete', url, index);
      },
      selectFiles: function selectFiles() {
        if (!this.canUpload) {
          alert('已达到上传的最大数量');
          return;
        }
        this.$refs.uploadInput.click();
      },
      upload: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(e) {
          var _this = this;

          var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : target;
          var files, currentUploads, reset, i, file, name, key, pos, suffix;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!this.loading) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt('return');

                case 2:
                  files = Array.from(e[type].files);
                  currentUploads = [];

                  if (files.length) {
                    _context.next = 6;
                    break;
                  }

                  return _context.abrupt('return');

                case 6:
                  if (!files.some(function (i) {
                    return i.size > _this.size * oneKB;
                  })) {
                    _context.next = 9;
                    break;
                  }

                  alert('\u8BF7\u9009\u62E9' + this.size + 'KB\u5185\u7684\u6587\u4EF6\uFF01');
                  return _context.abrupt('return');

                case 9:
                  if (!files.some(function (i) {
                    return _this.accept.indexOf(i.type) === -1;
                  })) {
                    _context.next = 12;
                    break;
                  }

                  alert('文件格式有误！');
                  return _context.abrupt('return');

                case 12:
                  reset = function reset() {
                    return e.target.value = '';
                  };

                  this.uploading = true;

                  i = 0;

                case 15:
                  if (!(i < files.length)) {
                    _context.next = 38;
                    break;
                  }

                  if (!(this.uploadList.length === this.max)) {
                    _context.next = 18;
                    break;
                  }

                  return _context.abrupt('break', 38);

                case 18:
                  file = files[i];
                  name = file.name;
                  key = '';

                  /**
                   * loading过程事件
                   * @event loading
                   */

                  this.$emit('loading', name);

                  if (!(file.type.indexOf(image) > -1)) {
                    _context.next = 26;
                    break;
                  }

                  _context.next = 25;
                  return imageCompressor.compress(file, this.compressOptions);

                case 25:
                  file = _context.sent;

                case 26:

                  //文件名-时间戳 作为上传文件key
                  pos = name.lastIndexOf('.');
                  suffix = '';

                  if (pos != -1) {
                    suffix = name.substring(pos);
                  }

                  key = name.substring(0, pos) + '-' + new Date().getTime() + suffix;

                  _context.next = 32;
                  return this.client.multipartUpload(this.dir + key, file, this.uploadOptions).then(function (res) {
                    // 协议无关
                    var filename = doubleSlash;

                    if (_this.customDomain) {
                      if (_this.customDomain.indexOf(doubleSlash) > -1) filename = _this.customDomain + '/' + res.name;else filename += _this.customDomain + '/' + res.name;
                    } else filename += _this.bucket + '.' + _this.region + '.aliyuncs.com/' + res.name;
                    _this.$emit('input', _this.multiple ? _this.uploadList.concat(filename) : filename);
                    currentUploads.push(filename);
                  }).catch(function (err) {
                    // TODO 似乎可以干掉？🤔
                    reset();
                    _this.uploading = false;

                    // 捕获超时异常
                    if (e.code === 'ConnectionTimeoutError') {
                      /**
                       * 上传超时事件
                       * @event timeout
                       */
                      _this.$emit('timeout');
                    }
                    if (_this.client.isCancel()) {
                      /**
                       * 上传操作被取消事件
                       * @event cancel
                       */
                      _this.$emit('cancel');
                    } else {
                      /**
                       * 上传失败事件
                       * @event fail
                       */
                      _this.$emit('fail');
                    }
                  });

                case 32:

                  this.newClient();

                  if (this.multiple) {
                    _context.next = 35;
                    break;
                  }

                  return _context.abrupt('break', 38);

                case 35:
                  i++;
                  _context.next = 15;
                  break;

                case 38:

                  reset();
                  this.uploading = false;

                  // 没有一张上传成功的，不触发load事件

                  if (!(currentUploads.length < 1)) {
                    _context.next = 42;
                    break;
                  }

                  return _context.abrupt('return');

                case 42:

                  /**
                   * 上传完成后触发的事件,返回url
                   * 上传单张 返回 String,
                   * 上传多张 返回 此次成功上传的文件url数组
                   * @event loaded
                   */
                  if (this.multiple) {
                    this.$emit('loaded', currentUploads);
                  } else {
                    this.$emit('loaded', currentUploads[0]);
                  }

                case 43:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function upload(_x2) {
          return _ref.apply(this, arguments);
        }

        return upload;
      }(),
      paste: function paste(e) {
        var files = e.clipboardData && e.clipboardData.files;
        if (files && files.length) this.upload(e, clipboardData);
      },


      /**
       * 拖拽事件
       */
      onDragover: function onDragover(e) {
        e.preventDefault();
        this.addActive();
      },
      onDrop: function onDrop(e) {
        e.preventDefault();
        this.removeActive();

        var files = e.dataTransfer && e.dataTransfer.files;
        if (files && files.length) this.upload(e, dataTransfer);
      },
      addActive: function addActive() {
        this.isActive = true;
      },
      removeActive: function removeActive() {
        this.isActive = false;
      }
    }
  };

  // Import vue component

  // install function executed by Vue.use()
  function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('UploadToAli', Component);
  }

  // Create module definition for Vue.use()
  var plugin = {
    install: install

    // To auto-install when vue is found
  };var GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  // It's possible to expose named exports when writing components that can
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
  // export const RollupDemoDirective = component;

  exports.install = install;
  exports.default = Component;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
