<template>
  <div>
    <h2>限制上传大小256KB</h2>
    <!--size单位为kb-->
    <upload-to-ali v-model="url" :size="256"></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'size',
  data() {
    return {
      url: ''
    }
  }
}
</script>
