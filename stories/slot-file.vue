<template>
  <div class="slot-file">
    <h2>自定义上传</h2>
    <upload-to-ali v-model="fileUrl" accept="application/pdf">
      <button>选择文件</button>
    </upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'slot-file',
  data() {
    return {
      fileUrl: ''
    }
  }
}
</script>
