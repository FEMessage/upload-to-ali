上传视频的用法

```vue
<template>
  <upload-to-ali v-model="videoUrl" :max="3" multiple accept="video/*" :size="1024 * 1024">
    <span slot="result">上传完成了</span>
    <div class="wrap">
      <span slot="placeholder">点击上传</span>
    </div>
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
.wrap {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed darkcyan;
}
</style>

