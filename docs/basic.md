基本用法。全局注入`img-preview`组件后，还可以进行图片预览

```vue
<template>
  <upload-to-ali v-model="url" />
</template>
<script>
export default {
  data() {
    return {
      url: ''
    }
  }
}
</script>
```
