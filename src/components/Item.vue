<template>
  <div ref="item" class="object"
       :style="{
       'width': `${widthAndHeight}px`,
       'height': `${widthAndHeight}px`,
       'left': `${step * itemValue.x + sideOffset}px`,
       'top': `${-itemValue.y}px`}"
  >
    <div class="inside"
         :class="{[itemValue.type]: true}"
         :style="{'background-color': itemValue.color}"
    >
      <div class="triangle-part triangle-part-1"
           :style="{ backgroundImage: trianglePartGradient1 }"
      ></div>
      <div class="triangle-part triangle-part-2"
           :style="{ backgroundImage: trianglePartGradient2 }"
      ></div>
      <div class="weight-size">{{ itemValue.weight }}</div>
    </div>
  </div>

</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'Item',
  props: {
    itemValue: Object,
    hitboxesCount: Number,
    stable: {
      type: Boolean
    }
  },
  data () {
    return {
      step: 0,
      store: useStore(),
      angle1: '298',
      percent1: '51',
      angle2: '63',
      percent2: '2',
      color1: this.itemValue.color,
      color2: '#f8fcff'
    }
  },
  mounted () {
    this.step = this.$refs.item.parentNode.offsetWidth / (this.hitboxesCount * 2)
  },
  computed: {
    trianglePartGradient1 () {
      return `linear-gradient(${this.angle1}deg, ${this.color1} ${this.percent1}%, ${this.color2} ${this.percent2}%)`
    },
    trianglePartGradient2 () {
      return `linear-gradient(${this.angle2}deg, ${this.color1} ${this.percent1}%, ${this.color2} ${this.percent2}%)`
    },
    sideOffset () {
      return (this.itemValue.side ? 4 : this.step * this.hitboxesCount + 5) + (this.step / (this.hitboxesCount * 2) * (10 - this.itemValue.weight) / 2 - 4)
    },
    stableSwitcher () {
      return this.stable ? 1 : this.hitboxesCount * 2
    },
    widthAndHeight () {
      return (this.step / this.stableSwitcher) * this.itemValue.weight
    }
  }
}
</script>
