<template>
  <div class="img-preview">
    <h2>图片预览</h2>
    <upload-to-ali preview v-model="url" multiple></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'img-preview',
  data() {
    return {
      url: [
        '//deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefinedWechatIMG7-1544429373120.jpeg',
        '//deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefined头像-1544260671963.jpg'
      ]
    }
  }
}
</script>
