<template>
  <div clas="slot-scope-page">
    <h2>作用域插槽例子</h2>
    <upload-to-ali v-model="url" accept :size="999999999">
      <template slot-scope="{ loading }">
        <section>
          <section class="donut" v-if="loading"></section>
          <button v-else>点击上传</button>
        </section>
      </template>
    </upload-to-ali>
    <section>{{url}}</section>
    <button v-if="url" @click="url = ''">清除</button>
  </div>
</template>

<script>
export default {
  name: 'VSlotDemo',
  data() {
    return {
      url: ''
    }
  }
}
</script>


<style >
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}
</style>
