如果 `upload-to-ali` 在项目中多个地方被使用的话，每次指定 `request` 方法是比较烦琐的一件事情。

这时候可以通过全局注册组件的方式传进去一个全局默认请求方法来解决多次重复指定 `request` 的问题。

```md
import Vue from 'vue';
import UploadToAli from 'upload-to-ali'

Vue.vue(UploadToAli, {
  // 回调的文件
  async request(file) {
    const url = await customRequest(file)
    return url;
  }
})
```


如果不想全局注册，也可以通过直接给 Vue 的原型链上面添加属性的方式去达到目的

main.js 下添加类似以下代码，注意， request 要换成对应上传的函数，最终返回一个 url 即可。 
```md
Vue.prototype.$uploadRequest = async request(file) {
  const url = await customRequest(file)
  return url;
}
```
