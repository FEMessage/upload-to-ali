自定义事件

```vue
<template>
  <upload-to-ali :onClick="onClick" v-model="url" />
</template>
<script>
export default {
  data() {
    return {
      url: '\/\/deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefined头像-1544260671963.jpg'
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
