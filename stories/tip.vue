<template>
  <div class="tip">
    <h2>自定义上传提示内容</h2>
    <upload-to-ali v-model="url" tip="单个文件大小不超过1024KB"></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'tip',
  data() {
    return {
      url:
        '//deepexi-moby.oss-cn-shenzhen.aliyuncs.com/undefined头像-1544260671963.jpg'
    }
  }
}
</script>
