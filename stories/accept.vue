<template>
  <div class="accept">
    <h2>默认图片格式</h2>
    <upload-to-ali v-model="val1"></upload-to-ali>

    <h2>pdf格式</h2>
    <upload-to-ali accept="application/pdf" v-model="val2"></upload-to-ali>

    <h2>xlsx格式</h2>
    <upload-to-ali accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" v-model="val3"></upload-to-ali>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val1: '',
      val2: '',
      val3: ''
    }
  }
}
</script>
