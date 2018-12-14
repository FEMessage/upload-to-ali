<template>
  <div class="basic">
    <h2>单图上传</h2>
    <upload-to-ali v-model="initUrl"></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'basic',
  data() {
    return {
      initUrl:
        '//moby-oss-dev.oss-cn-beijing.aliyuncs.com/undefinedWechatIMG3-1543636527415.jpeg'
    }
  }
}
</script>
