上传回调

上传后的文件 url 在`@loaded`事件会返回

```vue
<template>
  <upload-to-ali @loaded="loaded" v-model="url"></upload-to-ali>
</template>
<script>
export default {
  name: 'upload',
  data() {
    return {
      url: ''
    }
  },
  methods: {
    loaded(file) {
      console.log(file) // url地址
    }
  }
}
</script>
```
