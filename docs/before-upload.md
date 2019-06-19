使用 beforeUpload 自定义上传前检查。比如检查图片的尺寸

```vue
<template>
  <upload-to-ali v-model="url" :before-upload="beforeUpload" />
</template>
<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  methods: {
    beforeUpload(files) {
      return Promise.all(
        Array.from(files)
          .filter(f => /image\/.*/.test(f.type))
          .map(f => createImageBitmap(f))
      )
        .then(imgs => {
          for (let i = 0; i < imgs.length; i++) {
            if (imgs[i].width > 30) {
              alert('图片过宽！' + imgs[i].width)
              return Promise.reject()
            }
          }
        })
    }
  }
}
</script>
```
