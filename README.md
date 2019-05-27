# upload-to-ali

[![Build Status](https://travis-ci.com/FEMessage/upload-to-ali.svg?branch=master)](https://travis-ci.com/FEMessage/upload-to-ali)
[![NPM Download](https://img.shields.io/npm/dm/@femessage/upload-to-ali.svg)](https://www.npmjs.com/package/@femessage/upload-to-ali)
[![NPM Version](https://img.shields.io/npm/v/@femessage/upload-to-ali.svg)](https://www.npmjs.com/package/@femessage/upload-to-ali)
[![NPM License](https://img.shields.io/npm/l/@femessage/upload-to-ali.svg)](https://github.com/FEMessage/upload-to-ali/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/upload-to-ali/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

对接阿里云-OSS，可通过环境变量配置 OSS 信息，可自定义域名，支持多选、限制文件大小、删除、粘贴上传功能，拖拽上传功能，让上传功能更加简单

![upload](https://ws1.sinaimg.cn/large/85ed9210gy1fyc3jk0g9qg20dc0ctkjl.jpg)

## Table of Contents <!-- omit in toc -->

* [feature](#feature)
* [documentation](#documentation)
* [install](#install)
* [config](#config)
* [dotenv](#dotenv)
* [Contributors](#contributors)

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://levy.work"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=levy9527" title="Code">💻</a> <a href="#review-levy9527" title="Reviewed Pull Requests">👀</a> <a href="#infra-levy9527" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#blog-levy9527" title="Blogposts">📝</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://github.com/Alvin-Liu"><img src="https://avatars0.githubusercontent.com/u/11909145?v=4" width="100px;" alt="Alvin"/><br /><sub><b>Alvin</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=Alvin-Liu" title="Code">💻</a> <a href="#review-Alvin-Liu" title="Reviewed Pull Requests">👀</a></td><td align="center"><a href="https://github.com/listars"><img src="https://avatars2.githubusercontent.com/u/20613509?v=4" width="100px;" alt="listars"/><br /><sub><b>listars</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=listars" title="Code">💻</a> <a href="#review-listars" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/FEMessage/upload-to-ali/commits?author=listars" title="Documentation">📖</a></td><td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/upload-to-ali/commits?author=evillt" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
