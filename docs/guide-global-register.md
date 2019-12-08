如果组件在项目中多个地方被使用的话，每次指定 `request` 方法是比较烦琐的一件事情。

可以用两种方式去进行全局注册 `request` 方法

1.全局注册组件

```md
import Vue from 'vue';
import UploadToAli from 'upload-to-ali'

Vue.use(UploadToAli, {
  // 回调的文件
  async request(file) {
    const url = await customRequest(file)
    return url;
  }
})
```

2. 在 Vue 的原型链上添加 `$uploadRequest` 方法

```md
Vue.prototype.$uploadRequest = async request(file) {
  const url = await customRequest(file)
  return url;
}
```
