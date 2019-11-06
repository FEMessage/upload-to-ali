可以自定义如何处理文件大小超出的情况（默认是alert警告）

```vue
<template>
  <upload-to-ali v-model="url" :onOversize="onOversize" />
</template>
<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  methods: {
    onOversize() {
      alert('所选文件大小溢出')
    },
  }
}
</script>
```
