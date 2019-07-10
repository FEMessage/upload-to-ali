<template>
  <div class="upload-wrapper" @click="onClick">
    <span v-if="isFile" class="upload-filename">{{ fileName }}</span>
    <img v-else class="upload-img" title="拖拽可排序" :src="url" @error="onLoadError" />
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isFile: false
    }
  },
  computed: {
    fileName() {
      const filename = this.url ? this.url.split('/').pop() : ''
      return filename.length > 40 ? `${filename.slice(0, 40)}...` : filename
    }
  },
  methods: {
    onClick() {
      this.$emit('click', this.isFile)
    },
    onLoadError() {
      this.isFile = true
    }
  }
}
</script>

<style scoped>
.upload-wrapper {
  position: absolute;
  width: 100%;
  max-height: 100%;
  top: 50%;
  transform: translate(0, -50%);
}
.upload-img {
  width: 100%;
  max-height: 100%;
}
.upload-filename {
  display: block;
  padding: 0 4px;
  font-size: 12px;
  word-break: break-all;
  color: #5e6781;
}
</style>
