<template>
  <div class="column" :style="{height: `${height}px`}">
    <slot name="plank"></slot>
  </div>
</template>

<script>
export default {
  name: 'Column',
  props: {
    height: Number
  }
}
</script>
