上传文件

```vue
<template>
  <upload-to-ali v-model="url" accept="text/markdown" />
</template>
<script>
export default {
  data() {
    return {
      url: [
        'https://raw.githubusercontent.com/FEMessage/upload-to-ali/dev/README.md'
      ]
    }
  }
}
</script>
```
