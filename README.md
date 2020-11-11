# upload-to-ali

[![Build Status](https://badgen.net/travis/FEMessage/upload-to-ali/master)](https://travis-ci.com/FEMessage/upload-to-ali)
[![NPM Download](https://badgen.net/npm/dm/@femessage/upload-to-ali)](https://www.npmjs.com/package/@femessage/upload-to-ali)
[![NPM Version](https://badgen.net/npm/v/@femessage/upload-to-ali)](https://www.npmjs.com/package/@femessage/upload-to-ali)
[![NPM License](https://badgen.net/npm/license/@femessage/upload-to-ali)](https://github.com/FEMessage/upload-to-ali/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/upload-to-ali/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

In the beginning, this component is designed to upload file to Aliyun-OSS easily，but now it can upload to any oss as you wish.

You can configure OSS information through environmental variables, customize domain, support multi-selection, limit file size, delete, paste to upload, drag and drop to upload, make files upload simpler.

![](https://i.loli.net/2019/11/15/UZ2P7wR83GiDXky.gif)

[中文文档](./README-zh.md)

## Table of Contents

- [Feature](#feature)
- [Links](#links)
- [Install](#install)
- [Config](#config)
- [Dotenv](#dotenv)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Feature

- The upload function can be done with little oss configuration
- Automatically compress pictures before uploading, and loading prompts during uploading, support picture display and deletion
- With default styles and support customize
- Can limit the size or the number of files to upload
- Support paste screenshot to upload
- Can drag and drop to upload
- Can preivew img
- support v-model

You can only set `action` props, that refers to upload url, the component has a default implement to post data to the url.

You can set `request` props to customize own upload function.

[⬆Back to Top](#table-of-contents)

## Links

- [docs](https://FEMessage.github.io/upload-to-ali/)
- [ali oss guide](docs/guide-ali-oss.md)

[⬆ Back to Top](#table-of-contents)

## Install

```bash
yarn add @femessage/upload-to-ali
```

[⬆Back to Top](#table-of-contents)

## Dotenv

Recommend using environment variables to configure upload parameters<br />With dotenv, we just need to write the environment variable in `.env`. With CI tools, this can meet the needs of using different configuration in different environments without change the source code.<br />Here are all can passed-in environment variables

```sh
# .env file
# these params are all optional
UPLOAD_ACTION=upload-url

OSS_BUCKET=your-bucket
OSS_REGION=oss-cn-beijing
OSS_DIR=oss-dir
OSS_CUSTOM_DOMAIN=cdn.xxx.com
```

`dotenv` document reference [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)

### vue-cli3

vue-cli3 offers an easy solution to replace [process.env](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F), but it requires a pattern(VUE*APP*\*) to inject in client side. So we need to use `dotenv-webpack`'s solution.

```js
// vue.config.js
const Dotenv = require('dotenv-webpack')
module.exports = {
  configureWebpack: {
    plugins: [new Dotenv()]
  }
}
```

[⬆Back to Top](#table-of-contents)

## Contributing

For those who are interested in contributing to this project, such as:

- report a bug
- request new feature
- fix a bug
- implement a new feature

Please refer to our [contributing guide](https://github.com/FEMessage/.github/blob/master/CONTRIBUTING.md).

[⬆ Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://levy.work"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=levy9527" title="Code">💻</a> <a href="https://github.com/FEMessage/upload-to-ali/pulls?q=is%3Apr+reviewed-by%3Alevy9527" title="Reviewed Pull Requests">👀</a> <a href="#infra-levy9527" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#blog-levy9527" title="Blogposts">📝</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/Alvin-Liu"><img src="https://avatars0.githubusercontent.com/u/11909145?v=4" width="100px;" alt="Alvin"/><br /><sub><b>Alvin</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=Alvin-Liu" title="Code">💻</a> <a href="https://github.com/FEMessage/upload-to-ali/pulls?q=is%3Apr+reviewed-by%3AAlvin-Liu" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/listars"><img src="https://avatars2.githubusercontent.com/u/20613509?v=4" width="100px;" alt="listars"/><br /><sub><b>listars</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=listars" title="Code">💻</a> <a href="https://github.com/FEMessage/upload-to-ali/pulls?q=is%3Apr+reviewed-by%3Alistars" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/FEMessage/upload-to-ali/commits?author=listars" title="Documentation">📖</a></td>
    <td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/upload-to-ali/commits?author=evillt" title="Documentation">📖</a></td>
    <td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=donaldshen" title="Code">💻</a> <a href="https://github.com/FEMessage/upload-to-ali/commits?author=donaldshen" title="Documentation">📖</a> <a href="https://github.com/FEMessage/upload-to-ali/commits?author=donaldshen" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://67.216.223.155/resume/"><img src="https://avatars3.githubusercontent.com/u/26338853?v=4" width="100px;" alt="OuZuYu"/><br /><sub><b>OuZuYu</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/issues?q=author%3AOuZuYu" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://justcodeit.fun"><img src="https://avatars1.githubusercontent.com/u/18013127?v=4" width="100px;" alt="轻剑快马"/><br /><sub><b>轻剑快马</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=xrr2016" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://colmugx.github.io"><img src="https://avatars1.githubusercontent.com/u/21327913?v=4" width="100px;" alt="ColMugX"/><br /><sub><b>ColMugX</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/issues?q=author%3Acolmugx" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://rexer.wang"><img src="https://avatars2.githubusercontent.com/u/15629940?v=4" width="100px;" alt="Rexer Wang"/><br /><sub><b>Rexer Wang</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/issues?q=author%3Arexerwang" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.ccc1996.cn"><img src="https://avatars1.githubusercontent.com/u/20502762?v=4" width="100px;" alt="cjf"/><br /><sub><b>cjf</b></sub></a><br /><a href="https://github.com/FEMessage/upload-to-ali/commits?author=cjfff" title="Code">💻</a> <a href="https://github.com/FEMessage/upload-to-ali/commits?author=cjfff" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
