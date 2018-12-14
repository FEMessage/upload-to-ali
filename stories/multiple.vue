<template>
  <div class="multiple">
    <h2>多张上传</h2>
    <upload-to-ali v-model="url" multiple></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'multiple',
  data() {
    return {
      url: [
        '//moby-oss-dev.oss-cn-beijing.aliyuncs.com/undefinedWechatIMG3-1543636527415.jpeg',
        '//moby-oss-dev.oss-cn-beijing.aliyuncs.com/undefinedWechatIMG14-1543644359792.jpeg'
      ]
    }
  }
}
</script>
