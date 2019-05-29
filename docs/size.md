限制文件大小，size单位为kb

```vue
<template>
  <upload-to-ali v-model="url" :size="256" />
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
