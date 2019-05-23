# upload-to-ali

[![Build Status](https://travis-ci.com/FEMessage/upload-to-ali.svg?branch=master)](https://travis-ci.com/FEMessage/upload-to-ali)
[![NPM Download](https://img.shields.io/npm/dm/@femessage/upload-to-ali.svg)](https://www.npmjs.com/package/@femessage/upload-to-ali)
[![NPM Version](https://img.shields.io/npm/v/@femessage/upload-to-ali.svg)](https://www.npmjs.com/package/@femessage/upload-to-ali)
[![NPM License](https://img.shields.io/npm/l/@femessage/upload-to-ali.svg)](https://github.com/FEMessage/upload-to-ali/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/upload-to-ali/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

对接阿里云-OSS，可通过环境变量配置 OSS 信息，可自定义域名，支持多选、限制文件大小、删除、粘贴上传功能，拖拽上传功能，让上传功能更加简单

![upload](https://ws1.sinaimg.cn/large/85ed9210gy1fyc3jk0g9qg20dc0ctkjl.jpg)

## Table of Contents

1.  **[feature](#feature)**
2.  **[documentation](#documentation)**
3.  **[install](#install)**
4.  **[config](#config)**
5.  **[dotenv](#dotenv)**
6.  **[example](#example)**
    * **[基本上传操作](#基本上传操作)**
    * **[上传多张操作](#上传多张操作)**
    * **[限制文件大小](#限制文件大小)**
    * **[限制文件数量](#限制文件数量)**
    * **[自定义上传占位符和 loading 图标](#自定义上传占位符和-loading-图标)**
    * **[结合 img-preview 组件进行图片预览](#结合img-preview组件进行图片预览)**
    * **[自定义事件](#自定义事件)**
    * **[自定义上传内容](#自定义上传内容)**
    * **[自定义上传提示内容](#自定义上传提示内容)**
    * **[自定义上传文件类型](#自定义上传文件类型)**
7.  **[api](#api)**
8.  **[slots](#slots)**
9.  **[event](#event)**
10. **[Contributors](#contributors)**

## feature

* 纯前端实现，不需要后台配合
* 只需配置 OSS 的基本信息，即可实现上传功能
* 上传前自动压缩图片，上传过程中有 loading 提示，支持图片显示及删除
* 可拓展自定义 loading 和默认上传样式
* 可限制上传文件大小和上传文件数量
* 可截图粘贴上传
* 可拖拽上传

**[⬆ Back to Top](#table-of-contents)**

## documentation

* [doc and online demo](https://femessage.github.io/upload-to-ali/)

**[⬆ Back to Top](#table-of-contents)**

## install

```sh
yarn add @femessage/upload-to-ali
```

**[⬆ Back to Top](#table-of-contents)**

## config

使用时组件以下四个参数必传：

`accessKeyId` - `阿里云控制台创建的access key`

`accessKeySecret` - `阿里云控制台创建的access secret`

`bucket` - `存储空间的名字`

`region` - `根据 存储空间 所在的存储区域, 相应的上传域名`

[使用前请务必设置跨域 及 ACL](https://help.aliyun.com/document_detail/32069.html?spm=a2c4g.11186623.6.920.9ddd5557vJ6QU7)

**[⬆ Back to Top](#table-of-contents)**

## dotenv

推荐使用环境变量配置 OSS 参数

使用 dotenv，我们只需要将环境变量配置写在`.env`文件中，配合 CI 工具，可满足同一套代码在不同环境对接不同 OSS 的需求

以下是所有可传入的环境变量

```sh
# .env文件
# OSS上传设置

# 对应组件必要参数 accessKeyId
OSS_KEY=xxx
# 对应组件必要参数 accessKeySecret
OSS_SECRET=xxx
# 对应组件必要参数 bucket
OSS_BUCKET=your-bucket
# 对应组件必要参数 region
OSS_REGION=oss-cn-beijing
# 对应组件可选参数 dir
OSS_DIR=oss-dir
# 对应组件可选参数 customDomain
OSS_CUSTOM_DOMAIN=cdn.xxx.com
```

`dotenv` 文档参考 https://www.npmjs.com/package/dotenv

**[⬆ Back to Top](#table-of-contents)**

## example

### 基本上传操作

上传后的文件 url 在`@loaded`事件会返回

```html
<template>
  <upload-to-ali @loaded="loaded" v-model="url"></upload-to-ali>
</template>
<script>
export default {
  name: 'upload',
  data() {
    return {
      url: ''
    }
  },
  methods: {
    loaded(file) {
      console.log(file) // url地址
    }
  }
}
</script>
```

### 上传多张操作

```html
<template>
  <upload-to-ali v-model="url" multiple></upload-to-ali>
</template>

<script>
export default {
  name: 'multiple',
  data() {
    return {
      url: []
    }
  }
}
</script>
```

### 限制文件大小

```html
<template>
  <div>
    <h2>限制上传大小256KB</h2>
    <!--size单位为kb-->
    <upload-to-ali v-model="url" :size="256"></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'size',
  data() {
    return {
      url: ''
    }
  }
}
</script>
```

### 限制文件数量

```html
<template>
  <div>
    <h2>限制上传数量3张</h2>
    <upload-to-ali v-model="url" :max="3" multiple></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'max',
  data() {
    return {
      url: []
    }
  }
}
</script>
```

### 自定义上传占位符和 loading 图标

```html
<template>
  <div>
    <h2>自定义slot展示</h2>
    <upload-to-ali v-model="url">
      <!--@slot 自定义上传占位符 -->
      <p slot="placeholder">点击上传</p>
      <!--@slot 自定义loading图标 -->
      <p slot="spinner">上传中</p>
    </upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'slot-example',
  data() {
    return {
      url: ''
    }
  }
}
</script>
```

### 结合`img-preview`组件进行图片预览

```html
<template>
  <div class="img-preview">
    <h2>图片预览</h2>
    <upload-to-ali preview v-model="url" multiple></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'img-preview',
  data() {
    return {
      url: [
        '//deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefinedWechatIMG7-1544429373120.jpeg',
        '//deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefined头像-1544260671963.jpg'
      ]
    }
  }
}
</script>
```

### 自定义事件

```html
<template>
  <div class="on-click">
    <h2>自定义点击事件</h2>
    <upload-to-ali :onClick="onClick" v-model="url"></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'on-click',
  components: {},
  data() {
    return {
      url:
        '//deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefined头像-1544260671963.jpg'
    }
  },
  methods: {
    onClick(url) {
      alert(url)
    }
  }
}
</script>
```

### 自定义上传内容

下面是一个真实遇到过的例子：上传组件被包在 form 元素里，上传组件自定义上传内容为 button, 此时需要设置 button 的 type="button"，否则点击按钮后会触发表单的提交。

```html
<template>
  <div class="slot-default">
    <h2>自定义上传</h2>
    <form>
      <upload-to-ali v-model="fileUrl" accept="application/pdf">
        <button type="button">选择文件</button>
      </upload-to-ali>
    </form>
  </div>
</template>

<script>
export default {
  name: 'slot-default',
  data() {
    return {
      fileUrl: ''
    }
  }
}
</script>
```

### 自定义上传提示内容

```html
<template>
  <div class="tip">
    <h2>自定义上传提示内容</h2>
    <upload-to-ali v-model="fileUrl" tip="单个文件大小不超过1024KB"></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'tip',
  data() {
    return {
      fileUrl: ''
    }
  }
}
</script>
```

### 自定义上传文件类型

```html
<template>
  <div class="accept">
    <h2>自定义上传文件类型</h2>
    <upload-to-ali v-model="fileUrl" accept="application/pdf"></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'accept',
  data() {
    return {
      fileUrl: ''
    }
  }
}
</script>
```

**[⬆ Back to Top](#table-of-contents)**

## api

| 参数            | 说明                                                                                                                                                                                             | 类型            | 默认值                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- | ----------------------- |
| value           | 绑定值(支持 v-model)                                                                                                                                                                             | String / Number | -                       |
| multiple        | 是否多选                                                                                                                                                                                         | Boolean         | false                   |
| max             | 上传最大数量                                                                                                                                                                                     | Number          | 9                       |
| size            | 上传大小限制(单位:KB)                                                                                                                                                                            | Number          | 1024                    |
| disabled        | 是否禁用                                                                                                                                                                                         | Boolean         | fals                    |
| compressOptions | 压缩参数                                                                                                                                                                                         | Object          | {maxWidth: 750}         |
| uploadOptions   | 上传参数                                                                                                                                                                                         | Object          | {partSize: 100 \* 1024} |
| preview         | 是否开启预览功能                                                                                                                                                                                 | Boolean         | true                    |
| onClick         | 点击事件, 返回参数为当前点击的 url                                                                                                                                                               | Function        | -                       |
| accept          | 接受上传的文件类型, 多个值逗号分隔, 默认只接受图片，其他文件类型可以参考[MIME 类型列表](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types) | String          | image/\*                |
| tip             | 自定义上传提示内容                                                                                                                                                                               | String          | -                       |

### 压缩参数 compressOptions

具体请参考：https://www.npmjs.com/package/image-compressor.js#options

### 上传参数 uploadOptions

具体请参考：https://help.aliyun.com/document_detail/64047.html?spm=a2c4g.11186623.2.25.40d279f8OV4hwk#h2-url-2

### 实例方法

* selectFiles 手动触发选择文件事件

**[⬆ Back to Top](#table-of-contents)**

## slots

| name          | 说明                                                 | 默认值                       |
| ------------- | ---------------------------------------------------- | ---------------------------- |
| -(非具名插槽) | 自定义上传区域,会覆盖 slot=spinner、slot=placeholder |
| spinner       | 自定义 loading 图标                                  | 类似 element-ui 的 v-loading |
| placeholder   | 自定义 placeholder                                   | +                            |

**[⬆ Back to Top](#table-of-contents)**

## event

`@loaded` - 上传完成后触发的事件

```sh
multiple模式返回（全部的文件列表[Array]，上传文件列表[Array]）
单张模式返回（上传的url[String]）
```

`@delete` - 删除图片事件

```sh
返回参数(被删除的文件, 下标)
```

`@loading` - loading 上传中事件

`@fail` - 上传失败事件

`@cancel` - 上传操作被取消事件

**[⬆ Back to Top](#table-of-contents)**

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://levy.work"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=levy9527" title="Code">💻</a> <a href="#review-levy9527" title="Reviewed Pull Requests">👀</a> <a href="#infra-levy9527" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#blog-levy9527" title="Blogposts">📝</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://github.com/Alvin-Liu"><img src="https://avatars0.githubusercontent.com/u/11909145?v=4" width="100px;" alt="Alvin"/><br /><sub><b>Alvin</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=Alvin-Liu" title="Code">💻</a> <a href="#review-Alvin-Liu" title="Reviewed Pull Requests">👀</a></td><td align="center"><a href="https://github.com/listars"><img src="https://avatars2.githubusercontent.com/u/20613509?v=4" width="100px;" alt="listars"/><br /><sub><b>listars</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=listars" title="Code">💻</a> <a href="#review-listars" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/FEMessage/upload-to-ali/commits?author=listars" title="Documentation">📖</a></td><td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/upload-to-ali/commits?author=evillt" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
