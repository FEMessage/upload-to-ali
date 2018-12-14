<template>
  <div class="no-model">
    <upload-to-ali multiple
                   @loaded="loaded"
                   :value="url"
                   @delete="deleteImg"
    ></upload-to-ali>
  </div>
</template>

<script>
export default {
  name: 'no-model',
  components: {},
  data() {
    return {
      url: []
    }
  },
  methods: {
    loaded(url) {
      this.url = url
      console.log(url)
    },
    deleteImg(url, index) {
      this.url = this.url.filter(v => v != url)
      console.log(url, index)
    }
  }
}
</script>
<style>
</style>
