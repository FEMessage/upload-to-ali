自定义上传内容

下面是一个真实遇到过的例子：上传组件被包在 form 元素里，上传组件自定义上传内容为 button, 此时需要设置 button 的 type="button"，否则点击按钮后会触发表单的提交。

```vue
<template>
  <form>
    <upload-to-ali v-model="fileUrl" accept="application/pdf">
      <button type="button">选择文件</button>
    </upload-to-ali>
  </form>
</template>
<script>
export default {
  data() {
    return {
      fileUrl: ''
    }
  }
}
</script>
```
