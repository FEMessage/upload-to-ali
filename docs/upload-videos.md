上传视频的用法

```vue
<template>
  <upload-to-ali v-model="videoUrl" :max="3" multiple accept="video/*" :size="1024 * 1024" />
</template>
<script>
export default {
  name: 'UploadVideo',
  data() {
    return {
      videoUrl: ''
    }
  }
}
</script>
```
