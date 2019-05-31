自定义上传提示内容

```vue
<template>
  <upload-to-ali v-model="fileUrl" tip="单个文件大小不超过1024KB" />
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
