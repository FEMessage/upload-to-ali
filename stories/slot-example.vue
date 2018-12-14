<template>
  <div>
    <h2>自定义slot展示</h2>
    <upload-to-ali v-model="url">
      <!--@slot 自定义上传占位符 -->
      <p slot="placeholder">点击上传</p>
      <!--@slot 自定义loading图标 -->
      <p slot="spinner">上传中</p>
    </upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'slot-example',
  data() {
    return {
      url: ''
    }
  }
}
</script>
