可以自定义如何处理文件大小、类型超出限制的情况（默认是alert警告）

```vue
<template>
  <upload-to-ali v-model="url" :onOversize="onOversize" :onWrongFormat="onWrongFormat" />
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
    onWrongFormat() {
      alert('所选文件类型错误')
    },
  }
}
</script>
```
