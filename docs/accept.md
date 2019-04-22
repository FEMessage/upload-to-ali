自定义上传文件类型

```vue
<template>
  <div class="accept">
    <upload-to-ali v-model="fileUrl" accept="application/pdf"></upload-to-ali>
  </div>
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
