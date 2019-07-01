# Upload-to-ali

![](https://cdn.nlark.com/yuque/0/2019/svg/224563/1561711810492-144f830f-091b-4881-beb7-98caed3c66f7.svg#align=left&display=inline&height=20&originHeight=20&originWidth=90&size=0&status=done&width=90) [![](https://img.shields.io/npm/dm/@femessage/upload-to-ali.svg#align=left&display=inline&height=20&originHeight=20&originWidth=140&status=done&width=140)](https://www.npmjs.com/package/@femessage/upload-to-ali) ![](https://img.shields.io/npm/v/@femessage/upload-to-ali.svg#align=left&display=inline&height=20&originHeight=20&originWidth=80&status=done&width=80) [![](https://img.shields.io/npm/l/@femessage/upload-to-ali.svg#align=left&display=inline&height=20&originHeight=20&originWidth=78&status=done&width=78)](https://github.com/FEMessage/upload-to-ali/blob/master/LICENSE) ![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg#align=left&display=inline&height=20&originHeight=20&originWidth=90&status=done&width=90) [![](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg#align=left&display=inline&height=20&originHeight=20&originWidth=104&status=done&width=104)](https://github-tools.github.io/github-release-notes/)

Docking Aliyun-OSS, you can configure OSS information through environmental variables, customize domain names, support multi-selection, limit file size, delete, paste Upload functions, drag and drop Upload functions, make the upload function simpler

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561711675156-a7375e06-509a-4722-b2d7-2a2d1ca80008.gif#align=left&display=inline&height=461&originHeight=461&originWidth=480&size=0&status=done&width=480)

<a name="9iGow"></a>

## Table of Contents

* [Feature](https://www.yuque.com/deepexi-serverless/onx52o/tl8dxe?translate=en#feature)
* [Documentation](https://www.yuque.com/deepexi-serverless/onx52o/tl8dxe?translate=en#documentation)
* [Install](https://www.yuque.com/deepexi-serverless/onx52o/tl8dxe?translate=en#install)
* [Config](https://www.yuque.com/deepexi-serverless/onx52o/tl8dxe?translate=en#config)
* [Dotenv](https://www.yuque.com/deepexi-serverless/onx52o/tl8dxe?translate=en#dotenv)
* [Contributors](https://www.yuque.com/deepexi-serverless/onx52o/tl8dxe?translate=en#contributors)

<a name="01HQ5"></a>

## Feature

* Pure front-end implementation, no need for background cooperation
* The upload function can be realized only by configuring the basic information of OSS
* Automatically compress pictures before uploading, there are loading prompts during uploading, support picture display and deletion
* Expand custom loading and default Upload styles
* Can limit the size of uploaded files and the number of uploaded files
* Screenshot paste Upload
* Can drag and Upload<br />**[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/tl8dxe?translate=en#table-of-contents)**

<a name="2IcK5"></a>

## Documentation

* [Doc And Online Demo](https://femessage.github.io/upload-to-ali/)<br />**[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/tl8dxe?translate=en#table-of-contents)**

<a name="z3Dyj"></a>

## Install

```bash
yarn add @femessage/upload-to-ali
```

**[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/tl8dxe?translate=en#table-of-contents)**

<a name="nP8fz"></a>

## Config

When using, the following four parameters of the component must be passed:<br />`accessKeyId` - Created by Ali Cloud Console `access key`<br />`accessKeySecret` - Created by Alibaba Cloud Console `access secret`<br />`bucket` - Storage space name<br />`region` - Ali Cloud area name<br />[Be sure to set cross-domain and ACLs before use](https://help.aliyun.com/document_detail/32069.html?spm=a2c4g.11186623.6.920.9ddd5557vJ6QU7)<br />**[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/tl8dxe?translate=en#table-of-contents)**

<a name="d2JkP"></a>

## Dotenv

Recommend using environment variables to configure OSS parameters<br />With dotenv, we just need to write the environment variable configuration in `.env` In the file, with the CI tool, the same set of code can meet the needs of docking different OSS in different environments<br />Here are all passed-in environment variables

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

`dotenv` Document reference [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)<br />**[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/tl8dxe?translate=en#table-of-contents)**
<a name="pED4Q"></a>

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

| [![](https://avatars3.githubusercontent.com/u/9384365?v=4#alt=levy&width=100)<br />**levy**](http://levy.work)<br />[💻](https://github.com/FEMessage/upload-to-ali/commits?author=levy9527) [👀](#review-levy9527) [🚇](#infra-levy9527) [📝](#blog-levy9527) [🤔](#ideas-levy9527) | [![](https://avatars0.githubusercontent.com/u/11909145?v=4#alt=Alvin&width=100)<br />**Alvin**](https://github.com/Alvin-Liu)<br />[💻](https://github.com/FEMessage/upload-to-ali/commits?author=Alvin-Liu) [👀](#review-Alvin-Liu) | [![](https://avatars2.githubusercontent.com/u/20613509?v=4#alt=listars&width=100)<br />**listars**](https://github.com/listars)<br />[💻](https://github.com/FEMessage/upload-to-ali/commits?author=listars) [👀](#review-listars) [📖](https://github.com/FEMessage/upload-to-ali/commits?author=listars) | [![](https://avatars3.githubusercontent.com/u/19513289?v=4#alt=EVILLT&width=100)<br />**EVILLT**](https://evila.me)<br />[💻](https://github.com/FEMessage/upload-to-ali/commits?author=evillt) [📖](https://github.com/FEMessage/upload-to-ali/commits?author=evillt) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

