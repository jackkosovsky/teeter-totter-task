<template>
  <div ref="board" class="plank d-flex justify-content-between" :style="{width: `${width}%`}">
    <div ref="playground1" class="playground">
      <slot name="side_left"></slot>
    </div>
    <div ref="playground2" class="playground">
      <slot name="side_right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: {
    width: Number
  },

  data () {
    return {
      height: 0
    }
  },

  mounted () {
    this.height = this.$refs.board.parentElement.clientHeight - this.columnHeight
  }
}
</script>
