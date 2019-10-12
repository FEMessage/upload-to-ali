覆盖默认的上传行为，可以自定义上传的实现

```vue
<template>
	<upload-to-ali v-model="url" :http-request="myUpload" />
</template>

<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  methods: {
    myUpload(file) {
      const url = ajax(file)

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(url)
        }, 2000)
      })
    }
  }
}

// 模拟 Ajax
function ajax() {
	return '\/\/deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/logo_Deepexi_640x640.jpg'
}
</script>
```