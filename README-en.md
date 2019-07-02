# upload-to-ali

![](https://cdn.nlark.com/yuque/0/2019/svg/224563/1561711810492-144f830f-091b-4881-beb7-98caed3c66f7.svg#align=left&display=inline&height=20&originHeight=20&originWidth=90&size=0&status=done&width=90) [![](https://img.shields.io/npm/dm/@femessage/upload-to-ali.svg#align=left&display=inline&height=20&originHeight=20&originWidth=140&status=done&width=140)](https://www.npmjs.com/package/@femessage/upload-to-ali) ![](https://img.shields.io/npm/v/@femessage/upload-to-ali.svg#align=left&display=inline&height=20&originHeight=20&originWidth=80&status=done&width=80) [![](https://img.shields.io/npm/l/@femessage/upload-to-ali.svg#align=left&display=inline&height=20&originHeight=20&originWidth=78&status=done&width=78)](https://github.com/FEMessage/upload-to-ali/blob/master/LICENSE) ![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg#align=left&display=inline&height=20&originHeight=20&originWidth=90&status=done&width=90) [![](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg#align=left&display=inline&height=20&originHeight=20&originWidth=104&status=done&width=104)](https://github-tools.github.io/github-release-notes/)

This component can upload file to Aliyun-OSS easily.

You can configure OSS information through environmental variables, customize domain, support multi-selection, limit file size, delete, paste to upload, drag and drop to upload, make files upload simpler.

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561711675156-a7375e06-509a-4722-b2d7-2a2d1ca80008.gif#align=left&display=inline&height=461&originHeight=461&originWidth=480&size=0&status=done&width=480)

## Table of Contents

* [Feature](#feature)
* [Documentation](#documentation)
* [Install](#install)
* [Config](#config)
* [Dotenv](#dotenv)
* [Contributors](#contributors)

## Feature

* Pure front-end implementation, no need for backend cooperation
* The upload function can be done with little oss configuration 
* Automatically compress pictures before uploading, and loading prompts during uploading, support picture display and deletion
* With default styles and support customize 
* Can limit the size or the number of files to upload
* Support paste screenshot to upload
* Can drag and drop to upload 

**[⬆Back to Top](#table-of-contents)**


## Documentation

* [Doc And Online Demo](https://femessage.github.io/upload-to-ali/)<br />**[⬆Back to Top](#table-of-contents)**


## Install

```bash
yarn add @femessage/upload-to-ali
```

**[⬆Back to Top](#table-of-contents)**


## Config

The following props are required:`accessKeyId` - Created by Alibaba Cloud Console `accessKeyId`<br />`accessKeySecret` - Created by Alibaba Cloud Console `accessKeySecret`<br />`bucket` - Storage space name<br />`region` - Alibaba Cloud area name<br />[Be sure to set cross-domain and ACLs before use](https://help.aliyun.com/document_detail/32069.html?spm=a2c4g.11186623.6.920.9ddd5557vJ6QU7)

**[⬆Back to Top](#table-of-contents)**

## Dotenv

Recommend using environment variables to configure OSS parameters<br />With dotenv, we just need to write the environment variable in `.env`. With CI tools, this can meet the needs of using different OSS in different environments without change the source code.<br />Here are all  can passed-in environment variables

```sh
# .env文件
# OSS上传设置
# required
OSS_KEY=xxx
# required
OSS_SECRET=xxx
# required
OSS_BUCKET=your-bucket
# required 
OSS_REGION=oss-cn-beijing
# optional 
OSS_DIR=oss-dir
# optional 
OSS_CUSTOM_DOMAIN=cdn.xxx.com
```

`dotenv` document reference [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)<br />**[⬆Back to Top](#table-of-contents)**

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

| [![](https://avatars3.githubusercontent.com/u/9384365?v=4#alt=levy&width=100)<br />**levy**](http://levy.work)<br />[💻](https://github.com/FEMessage/upload-to-ali/commits?author=levy9527) [👀](#review-levy9527) [🚇](#infra-levy9527) [📝](#blog-levy9527) [🤔](#ideas-levy9527) | [![](https://avatars0.githubusercontent.com/u/11909145?v=4#alt=Alvin&width=100)<br />**Alvin**](https://github.com/Alvin-Liu)<br />[💻](https://github.com/FEMessage/upload-to-ali/commits?author=Alvin-Liu) [👀](#review-Alvin-Liu) | [![](https://avatars2.githubusercontent.com/u/20613509?v=4#alt=listars&width=100)<br />**listars**](https://github.com/listars)<br />[💻](https://github.com/FEMessage/upload-to-ali/commits?author=listars) [👀](#review-listars) [📖](https://github.com/FEMessage/upload-to-ali/commits?author=listars) | [![](https://avatars3.githubusercontent.com/u/19513289?v=4#alt=EVILLT&width=100)<br />**EVILLT**](https://evila.me)<br />[💻](https://github.com/FEMessage/upload-to-ali/commits?author=evillt) [📖](https://github.com/FEMessage/upload-to-ali/commits?author=evillt) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

