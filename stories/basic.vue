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
        '//deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefinedtooopen_sy_231281461769-1544864776323.jpg'
    }
  }
}
</script>
