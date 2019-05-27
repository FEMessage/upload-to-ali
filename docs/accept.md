自定义上传文件类型

```vue
<template>
  <upload-to-ali v-model="fileUrl" accept="application/pdf"></upload-to-ali>
</template>

<script>
export default {
  name: 'accept',
  data() {
    return {
      fileUrl: ''
    }
  }
}
</script>
```
