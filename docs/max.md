限制文件数量

```vue
<template>
  <upload-to-ali v-model="url" :max="3" multiple></upload-to-ali>
</template>

<script>
export default {
  name: 'max',
  data() {
    return {
      url: []
    }
  }
}
</script>
```
