<template>
  <div class="objects">
    <slot name="objects"></slot>
  </div>
  <div class="teeter-totter d-flex justify-content-around align-items-end">
    <slot></slot>
  </div>
  <div class="ground">
    <slot name="ground"></slot>
  </div>
</template>

<script>
function countPerformance (allItems, matrix, reverse) {
  const countAll = matrix.slice()
  if (reverse) {
    countAll.reverse()
  }

  let performance = 0
  countAll.forEach((itemsQueue, performanceIndex) => {
    const performanceSum = performanceIndex + 1
    itemsQueue.forEach((itemId) => {
      const weight = allItems[itemId].weight
      performance += weight * performanceSum
    })
  })
  return performance
}

export default {
  name: 'RotatedScene',
  props: {
    left: Object,
    right: Object,
    bendingLimit: Number,
    kgmLimit: Number,
    vocabulary: Object
  },

  emits: ['angle'],

  mounted () {
    document.addEventListener('check_balancer', () => {
      const leftPerformance = countPerformance(this.vocabulary, this.left, true)
      const rightPerformance = countPerformance(this.vocabulary, this.right, false)

      const angleChange = (rightPerformance - leftPerformance) / 100

      this.$emit('angle', angleChange)
    })
  }
}
</script>
