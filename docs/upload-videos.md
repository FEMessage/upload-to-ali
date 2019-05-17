上传视频的用法

```vue
<template>
  <upload-to-ali
    v-model="videoUrl"
    accept="video/*"
    :size="1024 * 1024"
  >
    <video class="video" controls muted :src="videoUrl" slot="result"></video>
  </upload-to-ali>
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

<style>
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 720px;
}
</style>

