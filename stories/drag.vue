<template>
  <div class="drag">
    <h2>拖拽上传</h2>
    <p>拖拽一张图片到下面试试👇 PS: 可在console查看信息</p>
    <upload-to-ali
      v-model="val"
      accessKeyId="key"
      accessKeySecret="secret"
      bucket="bucket"
      region="region"
      @loading="loading"
    ></upload-to-ali>
  </div>
</template>

<script>
const {log} = console

export default {
  data() {
    return {
      val: ''
    }
  },
  methods: {
    loading(name) {
      log`'上传中:', ${name}`
    }
  }
}
</script>
