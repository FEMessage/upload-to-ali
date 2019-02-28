<template>
  <div class="drag">
    <h2>拖拽上传</h2>
    <upload-to-ali
      v-model="val"
    ></upload-to-ali>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val:
        '//deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefinedtooopen_sy_231281461769-1544864776323.jpg'
    }
  }
}
</script>
