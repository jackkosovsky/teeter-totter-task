<template>
  <div ref="hitbox" className="hitbox">
    <div className="items">
      <item
        ref="item"
        :key="item"
        v-for="item in items"
        :hitboxesCount="hitboxesCount"
        :stable="true"
        :item-value="vocabulary[item]"
      />
    </div>
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  name: 'landingPlace',
  props: {
    place: Number,
    items: Array,
    vocabulary: Object,
    hitboxesCount: Number
  },

  components: {
    Item
  },

  emits: ['hit'],

  methods: {},

  mounted () {
    function isCollision (el1, el2) {
      const rect1 = el1.getBoundingClientRect()
      const rect2 = el2.getBoundingClientRect()
      return !(
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right
      )
    }

    document.addEventListener('check_collide', () => {
      const object = document.getElementById('object')
      const hitbox = this.$refs.hitbox

      if (this.$refs.item ? isCollision(object, this.$refs.item.$el) : isCollision(object, hitbox)) {
        this.$emit('hit', this.place)
        return
      }

      if (isCollision(object, hitbox)) {
        this.$emit('hit', this.place)
      }
    })
  }
}
</script>
