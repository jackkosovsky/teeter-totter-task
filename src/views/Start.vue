<template>
  <MDBBtn
    @click="start"
    class="start-btn"
    color="primary"
    size="lg"
    autofocus
  >
    Start the game
  </MDBBtn>
</template>

<script>
import { MDBBtn } from 'mdb-vue-ui-kit'

export default {
  name: 'startScreen',
  emits: ['start'],
  components: { MDBBtn },
  setup (props, ctx) {
    let oneClick = true

    function start () {
      if (oneClick) {
        setTimeout(() => {
          ctx.emit('start')
        }, 800)
      }
      oneClick = false
    }

    return {
      start,
      oneClick
    }
  }
}
</script>
