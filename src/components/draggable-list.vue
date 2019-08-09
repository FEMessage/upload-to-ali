<template>
  <transition-group name="draggable-list" tag="div" class="draggable-list">
    <slot />
  </transition-group>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      /**
       * 当前正在拖拽的dom元素
       * 不用vnode，因为vnode在重排序后已经重新生成了
       */
      dragging: null
    }
  },
  watch: {
    value() {
      this.$nextTick(() => this.initDraggable())
    }
  },
  mounted() {
    this.initDraggable()
  },
  methods: {
    initDraggable() {
      let nodes = this.$slots.default
      if (!nodes || !Array.isArray(nodes)) return
      nodes.forEach(({elm}, i) => {
        const img = elm.querySelector('img')
        if (!img) return

        img.ondragstart = e => {
          this.dragging = elm
          // 用上transition-group组件后，拖拽中途ghost类有时会消失
          elm.classList.add('ghost')
        }
        img.ondragend = e => {
          this.dragging = null
          elm.classList.remove('ghost')
        }
        img.ondragenter = e => {
          if (elm === this.dragging) return

          const j = nodes.findIndex(n => n.elm === this.dragging)
          const reordered = [...this.value]
          reordered.splice(i, 0, reordered.splice(j, 1)[0])
          this.$emit('input', reordered)
        }
      })
    }
  }
}
</script>
<style lang="less">
.draggable-list-move {
  transition: transform 0.3s;
}

.ghost {
  opacity: 0.5;
}

.draggable-list {
  display: inline-flex;
}
</style>
