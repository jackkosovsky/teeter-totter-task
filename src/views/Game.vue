<template>
  <div class="container">
    <div class="row d-flex text-center">
      <div>You will win if you will gain more <strong>{{ leftScoreLimit }} kg</strong> and save balance on the board
      </div>
      <div>Now you gained weight on your side: <strong>{{ leftSumWeight }} kg</strong></div>
    </div>
  </div>

  <Balancer
    :left="left_items"
    :right="right_items"
    :bending-limit="maxBending"
    :kgm-limit="maxBending"
    :vocabulary="all_items"
    @angle="$emit('angle', $event)"
  >
    <template v-slot:objects>
      <item v-if="current_item" id="object" :hitboxes-count="hitboxesCount" :item-value="current_item"></item>
    </template>

    <Board
      :style="{'transform': `rotate(${plankAngle}deg)`}"
      :width="plankWidth"
    >
      <template v-slot:side_left>
        <landing-box
          @hit="$emit('hit', $event)"
          :key="hitbox"
          :place="hitbox"
          :items="left_items[hitbox - 1]"
          :vocabulary="all_items"
          :hitboxesCount="hitboxesCount"
          v-for="hitbox in hitboxesCount"
        />
      </template>
      <template v-slot:side_right>
        <landing-box
          @hit="$emit('hit', $event)"
          :key="hitbox"
          :place="hitbox"
          :items="right_items[hitbox - 1]"
          :vocabulary="all_items"
          :hitboxesCount="hitboxesCount"
          v-for="hitbox in hitboxesCount"
        />
      </template>
    </Board>
    <Column
      :height="columnHeight"
    />
  </Balancer>

  <MDBModal
    v-on:shown="setFocus"
    id="staticBackdrop"
    tabindex="-1"
    labelledby="staticBackdropLabel"
    v-model="staticBackdrop"
  >
    <MDBModalHeader :close="false" class="align-items-center d-flex text-center flex-column">
      <Skull :width='`40%`' v-if="this.getLoseModal"/>
      <Biceps :width='`40%`' v-if="!this.getLoseModal"/>
      <MDBModalTitle id="staticBackdropLabel">
        <strong>{{ modalTitle }}</strong>
      </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody class="text-center">
      {{ !this.getLoseModal ? 'You collected over' : 'Unfortunately right now you collect only' }}
      <strong>{{ leftSumWeight }} kg</strong>
      {{ !this.getLoseModal ? 'and kept the board in balance' : 'and lost the "board balance"' }}
    </MDBModalBody>
    <MDBModalFooter class="d-flex justify-content-center w-100">
      <MDBBtn
        class="w-75"
        :class="colorObject"
        @click="restartGame"
        size="lg"
        id="autofocusInput"
      >
        {{ !this.getLoseModal ? 'Play again' : 'Try again' }}
      </MDBBtn>
    </MDBModalFooter>
  </MDBModal>

</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onDeactivated, onBeforeUnmount, onMounted, onActivated } from 'vue'

import Column from '../components/Column'
import Board from '../components/Board'
import landingBox from '../components/landingBox'
import Balancer from '../components/RotatedScene'
import Item from '../components/Item'
import Biceps from '../components/Modal/Biceps'
import Skull from '../components/Modal/Skull'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBModalTitle } from 'mdb-vue-ui-kit'

export default {
  name: 'gameScreen',
  components: {
    landingBox,
    Column,
    Board,
    Balancer,
    Item,
    Biceps,
    Skull,

    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn
  },

  props: {
    gameRef: String
  },

  emits: ['hit', 'angle'],

  setup (props) {
    const store = useStore()
    const configuration = store.state[props.gameRef]
    const game = store.state.game
    // const game = store.state[props.gameRef];
    const staticBackdrop = ref(false)
    const modalTitle = 'the game is on ...'

    function restartGame () {
      document.location.reload()
    }

    function setFocus () {
      const autofocusInput = document.getElementById('autofocusInput')
      autofocusInput.focus()
    }

    const plankWidth = ref(configuration.plankWidth * 10)
    const columnHeight = ref(configuration.columnHeight)
    const maxBending = ref(configuration.max_bending)
    const kgmLimit = ref(configuration.kgm_side_limit)
    const leftScoreLimit = ref(configuration.scoreLimit)

    const hitboxesCount = ref(configuration.landingPlaceCount)

    const current_item = computed(() => store.getters[`game/current_item_full`])
    const left_items = computed(() => game.left_items)
    const right_items = computed(() => game.right_items)
    const all_items = computed(() => game.items)
    const plankAngle = computed(() => game.plank_angle)

    const leftSumWeight = computed(() => game.leftSumWeight)
    const getLoseModal = computed(() => game.isLoseModal)

    onBeforeUnmount(() => {
      restartGame()
    })

    return {
      plankWidth,
      columnHeight,
      maxBending,
      kgmLimit,
      hitboxesCount,
      plankAngle,
      leftSumWeight,
      leftScoreLimit,
      getLoseModal,
      staticBackdrop,
      current_item,
      left_items,
      right_items,
      all_items,
      restartGame,
      modalTitle,
      setFocus
    }
  },
  computed: {
    colorObject: function () {
      return {
        'btn-success': !this.getLoseModal,
        'btn-danger': this.getLoseModal
      }
    }
  },
  watch: {
    leftSumWeight () {
      if (this.leftSumWeight > this.leftScoreLimit) {
        this.modalTitle = 'Congratulations, you won!'
        this.staticBackdrop = true
      }
    },
    getLoseModal () {
      if (this.getLoseModal) {
        this.modalTitle = 'You are lose'
        this.staticBackdrop = true
      }
    }
  }
}
</script>
