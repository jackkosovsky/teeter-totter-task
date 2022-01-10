<template>
  <div class="content d-flex flex-column align-items-center pb-4">

    <div v-if="!isPreview" class="buttons-top d-flex align-items-center my-1 text-center">
      <MDBBtn @click="left" :disabled="isPause" color="light">Left</MDBBtn>
      <MDBBtn @click="toggle" class="b-pause" color="secondary">{{ isPause ? 'Play' : 'Pause' }}</MDBBtn>
      <MDBBtn @click="right" :disabled="isPause" color="light">Right</MDBBtn>
    </div>

    <div v-if="!isPreview" class="buttons-top-2 d-flex align-items-center my-1 text-center">
      <MDBBtn @click="down" :disabled="isPause" color="light">Down</MDBBtn>
    </div>

    <div class="game-place d-flex flex-grow-1 flex-column align-items-center my-1 w-100 position-relative">
      <start-screen @start="onStart" v-if="isPreview"/>
      <template v-else>
        <game-screen
          :game-ref="gameName"
          @hit="handleHit"
          @angle="handleAngle"
        />
      </template>
      <MDBCheckbox @click="checkingMode"
                   v-if="!isPreview"
                   label="Autopilot mode"
                   v-model="check"
      />
    </div>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { MDBBtn } from 'mdb-vue-ui-kit'
import { MDBCheckbox } from 'mdb-vue-ui-kit'

import StartScreen from './Start.vue'
import GameScreen from './Game.vue'

import { gameConfig } from '@/store/modules/gameConfig'
import { initializationGame } from '@/store/modules/game'

const ID = 'game' // for possible localStorage or back-end for scores

export default {
  name: 'App',
  components: {
    StartScreen,
    GameScreen,
    MDBBtn,
    MDBCheckbox
  },

  setup () {

    const gameName = 'teeter-totter'
    const store = useStore()
    let game = {}
    gameConfig(store, gameName)

    const isPreview = computed(() => store.state.view === 'beginGame')
    const isPause = computed(() => store.state.game && store.state.game.pause)

    function onStart () {
      store.commit('change_view', ID)
      const controls = initializationGame(store, ID, gameName)
      game = { ...controls }
      game.pause = controls.start()
    }

    function handleHit (event) {
      game.hit(event)
    }

    function handleAngle (event) {
      if (event) {
        game.change_angle(event)
      }
    }

    let check = ref(false)

    function checkingMode () {
      store.state.game.isAutopilot = !store.state.game.isAutopilot
    }

    function left () {
      if (!store.state.game.turn && !check.value) game.left()
    }

    function right () {
      if (!store.state.game.turn && !check.value) game.right()
    }

    function down () {
      if (!store.state.game.turn && !check.value) game.down()
    }

    function toggle () {
      if (game.pause) {
        game.pause = game.pause()
      } else {
        game.pause = game.start()
      }
    }

    document.addEventListener('keydown', function (event) {
      const key = event.keyCode
      switch (+key) {
        case 37:
          if (!store.state.game.turn && !check.value) game.left()
          break
        case 39:
          if (!store.state.game.turn && !check.value) game.right()
          break
        case 40:
          if (!store.state.game.turn && !check.value) game.down()
          break
      }
    })

    return {
      onStart,
      handleHit,
      handleAngle,
      left,
      right,
      down,
      toggle,

      isPreview,
      isPause,
      gameName,
      check,
      checkingMode
    }
  },
  methods: {
    showResultModal () {
      this.staticBackdrop = true
    }
  },
  mounted () {
    this.showResultModal()
  }
}
</script>
