<template>
  <div>
    <h2>限制上传数量3张</h2>
    <upload-to-ali v-model="url" :max="3" multiple></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'max',
  data() {
    return {
      url: []
    }
  }
}
</script>
