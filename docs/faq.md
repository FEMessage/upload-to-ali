## 在 TypeScript 中指定组件的类型

```html
<template>
  <upload-to-ali ref="uploadToAli" v-model="url" />
</template>
<script lang="ts">
// 需要引入这个
// import { UploadToAliType } from '@femessage/upload-to-ali'
export default {
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    (this.$refs.uploadToAli as UploadToAliType).dir = 'images/'
  },
}
</script>
```
