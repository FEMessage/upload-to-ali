# 阿里云OSS配置指南

对于新建的bucket，需要做一些设置
<style>
.guide-ali-oss-img {
  max-width: 100%;
}
</style>

### 绑定域名
<img class="guide-ali-oss-img" src="https://i.loli.net/2019/11/15/mpLCBnJiVr3EDRq.png">

假设用户域名为：static.deepexi.top<br />
<img class="guide-ali-oss-img" src="https://i.loli.net/2019/11/15/l2oJe5D7gAXkLvs.png">

则使用自定义域名访问，可以解决html变成下载的问题

### CNAME设置
如果绑定的是同一个阿里云账号下的域名，则可以自动添加CNAME记录。否则需要手动添加。

查看bucket外网地址：deepexi-serverless.oss-cn-shenzhen.aliyuncs.com<br />
<img class="guide-ali-oss-img" src="https://i.loli.net/2019/11/15/XYVBKEnsHqNka5Q.png">

则去域名解析供应商设置：

static.deepexi.top   -> CNAME -> deepexi-serverless.oss-cn-shenzhen.aliyuncs.com


### 证书托管

上传HTTPS证书，开启HTTPS

<img class="guide-ali-oss-img" src="https://i.loli.net/2019/11/15/vgsmb2PCI6rAYe4.png">

<img class="guide-ali-oss-img" src="https://i.loli.net/2019/11/15/dPuWw7U51hYaoqk.png">

如果没有证书，查看教程获取：[🔒免费开启HTTPS](https://github.com/levy9527/blog/issues/5)

### 公共读

点击基础设置，设置读写权限为公共读<br />
<img src="https://i.loli.net/2019/11/15/bnekHcQ4GJ73Cd5.png" style="max-width: 100%">

这样可以解决访问链接超时的问题

### 跨域设置
在基础设置下，找到跨域设置
<img class="guide-ali-oss-img" src="https://i.loli.net/2019/11/15/9n8MahOyi75N23Q.png">
<img class="guide-ali-oss-img" src="https://i.loli.net/2019/11/15/twF9YZbVHjCSmQ6.png">

在来源中设置域名，或ip地址。下面给出最简单的示例为 `*`，实际可以根据需要填写允许的域名，一行一个。

- 将allowed origins设置成 `*`
- 将allowed methods设置成`GET, POST, PUT, DELETE, HEAD`
- 将allowed headers设置成 `*`
- 将expose headers设置成 
  - `etag`
  - `x-oss-request-id`

这样可以解决字体无法显示的问题
