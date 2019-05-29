自定义事件

```vue
<template>
  <upload-to-ali :onClick="onClick" v-model="url" />
</template>
<script>
export default {
  data() {
    return {
      url: 'https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/logo_Deepexi_640x640.jpg'
    }
  },
  methods: {
    onClick(url) {
      alert(url)
    }
  }
}
</script>
```
