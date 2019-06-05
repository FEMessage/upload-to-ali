可以拖拽排序

```vue
<template>
  <upload-to-ali :preview="false" v-model="url" multiple />
</template>
<script>
export default {
  data() {
    return {
      url: [
        'https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/logo_Deepexi_640x640.jpg',
        'https://picsum.photos/300/300',
        'https://picsum.photos/400/400',
        'https://picsum.photos/555/555'
      ],
    }
  }
}
</script>
```
