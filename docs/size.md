限制文件大小

```vue
<template>
  <!--size单位为kb-->
  <upload-to-ali v-model="url" :size="256"></upload-to-ali>
</template>

<script>
export default {
  name: 'size',
  data() {
    return {
      url: ''
    }
  }
}
</script>
```
