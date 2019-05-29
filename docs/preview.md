结合`img-preview`组件进行图片预览

```vue
<template>
  <upload-to-ali preview v-model="url" multiple />
</template>
<script>
export default {
  data() {
    return {
      url: [
        `\/\/deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefinedWechatIMG7-1544429373120.jpeg`,
        `\/\/deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefined头像-1544260671963.jpg`
      ]
    }
  }
}
</script>
```
