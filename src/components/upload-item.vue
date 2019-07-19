<template>
  <div class="upload-item" title="拖拽可排序" @click="onClick">
    <span v-if="isFile" class="upload-item-filename">{{ fileName }}</span>
    <img v-else class="upload-item-img" :src="url" @error="onLoadError" />
  </div>
</template>

<script>
import {getBasename} from '../utils'

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
      return getBasename(this.url)
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

<style>
.upload-item {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  transform: translate(0, -50%);
}
.upload-item-img {
  height: 100%;
  width: 100%;
}
.upload-item-filename {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 4px;
  font-size: 12px;
  word-break: break-all;
  color: #5e6781;
  cursor: pointer;
  user-select: none;
  line-height: 1.2;
}
</style>
