自定义事件

```vue
<template>
  <div class="on-click">
    <upload-to-ali :onClick="onClick" v-model="url"></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'on-click',
  components: {},
  data() {
    return {
      url:
        '\/\/deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefined头像-1544260671963.jpg'
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
