<template>
  <div class="accept">
    <h2>默认图片格式</h2>
    <upload-to-ali v-model="image"></upload-to-ali>

    <h2>pdf格式</h2>
    <upload-to-ali accept="application/pdf" v-model="pdf"></upload-to-ali>

    <h2>xlsx格式</h2>
    <upload-to-ali accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" v-model="xlsx"></upload-to-ali>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: '',
      pdf: '',
      xlsx: ''
    }
  }
}
</script>
