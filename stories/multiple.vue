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
        '//deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefinedtooopen_sy_231281461769-1544864776323.jpg',
        '//deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefined头像-1544260671963.jpg'
      ]
    }
  }
}
</script>
