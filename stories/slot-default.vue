<template>
  <div class="slot-default">
    <h2>自定义上传</h2>
    <upload-to-ali v-model="fileUrl" accept="application/pdf">
      <button>选择文件</button>
    </upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'slot-default',
  data() {
    return {
      fileUrl: ''
    }
  }
}
</script>
