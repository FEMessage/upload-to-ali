# 阿里云OSS配置指南

对于新建的bucket，需要做一些设置

### 绑定域名
![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562047369483-bd5f19e1-251c-46bb-b5a0-f344b2ad79e3.png#align=left&display=inline&height=254&name=image.png&originHeight=508&originWidth=2544&size=508458&status=done&width=1272)

假设用户域名为：static.deepexi.top<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562047202179-52f89729-e7f6-493e-8601-cb436712c056.png#align=left&display=inline&height=220&name=image.png&originHeight=440&originWidth=1502&size=193827&status=done&width=751)

则使用自定义域名访问，可以解决html变成下载的问题



### CNAME设置
如果绑定的是同一个阿里云账号下的域名，则可以自动添加CNAME记录。否则需要手动添加。

查看bucket外网地址：deepexi-serverless.oss-cn-shenzhen.aliyuncs.com<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562047414581-2ef41ac9-fa17-432a-9fd6-bf162ef8de72.png#align=left&display=inline&height=519&name=image.png&originHeight=1038&originWidth=2536&size=526883&status=done&width=1268)

则去域名解析供应商设置：

static.deepexi.top   -> CNAME -> deepexi-serverless.oss-cn-shenzhen.aliyuncs.com



### 公共读
点击基础设置，设置读写权限为公共读<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562047562541-751e73b6-1b02-446e-b929-2faab48cdda2.png#align=left&display=inline&height=283&name=image.png&originHeight=566&originWidth=2468&size=365147&status=done&width=1234)

这样可以解决访问链接超时的问题



### 跨域设置
在基础设置下，找到跨域设置<br />![](https://cdn.nlark.com/yuque/0/2019/png/160590/1547111265557-dd3885fc-1007-4dfe-bef9-1e70a3578f0f.png#align=left&display=inline&height=116&originHeight=314&originWidth=2022&status=done&width=747)<br />![](https://cdn.nlark.com/yuque/0/2019/png/160590/1547111287199-072507c0-02d4-4cdb-8be7-0bccc13c096c.png#align=left&display=inline&height=159&originHeight=438&originWidth=2058&status=done&width=747)

在来源中设置域名，或ip地址。下面给出最简单的示例为 `*`，实际可以根据需要填写允许的域名，一行一个。

- 将allowed origins设置成 `*`
- 将allowed methods设置成`GET, POST, PUT, DELETE, HEAD`
- 将allowed headers设置成 `*`
- 将expose headers设置成 
  - `etag`
  - `x-oss-request-id`
  
  

这样可以解决字体无法显示的问题
