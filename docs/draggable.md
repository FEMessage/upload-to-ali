可以拖拽排序

```vue
<template>
  <upload-to-ali preview v-model="url" multiple />
</template>
<script>
export default {
  data() {
    return {
      url: [
        'https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/logo_Deepexi_640x640.jpg',
        'https://picsum.photos/200/300'
      ]
    }
  }
}
</script>
```
