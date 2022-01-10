<template>
  <div class="row about mt-5">

    <div class="col-6">
      <h2 class="text-center">Insider’s Teeter Totter rules</h2>
      <p class="mt-4">
        This is a test task is the game "teeter totter" that imitate some physic on with help of three random
        figure and their random weight. In front of you is a board on some column. The left field is yours, the right
        one is controlled by the computer (random).
        The game is played one by one. You can influence the falling speed and position of each current figure that
        appears on your board with help of buttons in top of game or with help of arrows keys in keyboard.
      </p>
      <p class="mt-4">
        You can change the win weight and the maximum bending of the board in the <code>gameConfig.js</code>
        file. As and many other parameters. Also you can activated the autopilot on the top of the game for a
        automatically placed figures.
      </p>
      <strong class="mt-3">
        Enjoy!
      </strong>
    </div>

    <div class="col-6">
      <h2 class="text-center">Used technologies:</h2>
      <div class="mt-4 text-center">
        <p>Vue 3</p>
        <p>Vue-router 4</p>
        <p>Vuex 4</p>
        <p>Bootstrap 5 + Material Design</p>
        <div class="d-flex flex-column">
          My code here:
          <div>
            <MDBBtn @click="delayBeforeGoToGit"
                    class="mt-1"
                    color="light"
            >
              To github
            </MDBBtn>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { MDBBtn } from 'mdb-vue-ui-kit'

export default {
  name: 'About',
  components: {
    MDBBtn
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const externalUrl = 'https://github.com/j-kristo/teeter-totter-task'
    const toGithub = () => {
      window.open(externalUrl, '_blank')
    }
    const delayBeforeGoToGit = () => {
      setTimeout(() => {
        toGithub()
      }, 700)
    }

    return {
      router,
      route,
      externalUrl,
      delayBeforeGoToGit,
      toGithub
    }
  }
}
</script>
