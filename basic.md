基本用法。内部使用`img-preview`组件进行图片预览

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
