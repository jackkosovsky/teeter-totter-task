import { figureSettings } from './figureSettings'

function initializationGame (store, name, configuration) {
  const context = {
    configuration: store.state[configuration],
    commit: (mutationName, payload) => store.commit(`${name}/${mutationName}`, payload)
  }

  const emptyLeftPlace = []
  const emptyRightPlace = []
  for (let i = 0; i < context.configuration.landingPlaceCount; i++) {
    emptyLeftPlace.push([])
    emptyRightPlace.push([])
  }

  store.registerModule(name, {
    namespaced: true,

    state: () => ({
      name,
      configuration,
      left_items: emptyLeftPlace,
      right_items: emptyRightPlace,
      current_item: null,
      items: {},
      turn: false,
      pause: false,
      plank_angle: 0,
      botSpeed: 1,
      leftSumWeight: 0,
      isLoseModal: false,
      isAbout: false,
      isAutopilot: false
    }),

    mutations: {
      PLAY (state) {
        state.pause = false
      },

      SET_PAUSE (state) {
        state.pause = true
      },

      SET_CURRENT_ITEM (state, payload) {
        if (payload) {
          payload.id = Object.keys(state.items).length
          state.current_item = payload.id
          state.items[payload.id] = payload
        } else {
          state.current_item = null
        }
      },

      MOVE_LEFT (state) {
        if (state.items[state.current_item].x === 0 || state.pause || state.current_item === null) {
          return
        }
        state.items[state.current_item].x -= 1
      },

      MOVE_RIGHT (state) {
        if (state.items[state.current_item].x === context.configuration.landingPlaceCount - 1 || state.pause || state.current_item === null) {
          return
        }
        state.items[state.current_item].x += 1
      },

      MOVE_DOWN (state) {
        if (state.pause || state.current_item === null) {
          return
        }
        state.items[state.current_item].y -= 50
      },

      TIME_TICK (state, multiplierLogic = 0) {
        let autoSpeed = 0
        state.isAutopilot ? autoSpeed = 20 : autoSpeed = 0
        state.turn ? state.botSpeed = 20 : state.botSpeed = 0 + autoSpeed
        state.items[state.current_item].y -= multiplierLogic + state.botSpeed
      },

      CHANGE_ANGLE (state, value) {
        state.plank_angle += value
        if (Math.abs(state.plank_angle) > context.configuration.degreesLimit) {
          context.gameOver()
          state.isLoseModal = !state.isLoseModal
        }
      }
    },

    getters: {
      current_item_full (state) {
        return state.items[state.current_item]
      }
    }
  })

  context.state = store.state[name]
  const boundedTick = tick.bind(context)

  return {
    start (timerTime = 1000 / 30) {
      boundedTick()

      return play.call(context, timerTime, () => {
        context.commit('TIME_TICK', Object.keys(context.state.items).length / 5)
      })
    },

    hit (place) {
      const item = context.state.items[context.state.current_item]
      if (!context.state.turn) {
        context.state.leftSumWeight += item.weight
        if (context.state.leftSumWeight > context.configuration.scoreLimit) {
          context.gameOver()
        }
      }

      context.state[`${item.side ? 'left' : 'right'}_items`][place - 1].push(item.id)
      context.commit('SET_CURRENT_ITEM', false)
      setTimeout(() => {
        boundedTick()
      }, 1)
    },

    left () {
      context.commit('MOVE_LEFT')
    },

    right () {
      context.commit('MOVE_RIGHT')
    },

    down () {
      context.commit('MOVE_DOWN')
    },

    change_angle (value) {
      context.commit('CHANGE_ANGLE', value)
    },

    getLoseModal () {
      this.staticBackdrop = true
    }
  }
}

function tick () {

  if (this.state.current_item === null && this.state.isAbout !== true) {
    this.commit('SET_CURRENT_ITEM', figureSettings.call(this, this.state.turn))
    this.state.turn = !this.state.turn
  }
}

function play (timerTime, startPlay) {
  const evtGame = new Event('check_collide', {
    'bubbles': true,
    'cancelable': false
  })
  const evtBalancer = new Event('check_balancer', {
    'bubbles': true,
    'cancelable': false
  })
  this.commit('PLAY')

  const gameInterval = setInterval(() => {

    if (this.state.current_item !== null && this.state.isAbout === false) {
      startPlay()
      document.dispatchEvent(evtGame)
    }
  }, timerTime)

  const balancerInterval = setInterval(() => {
    if (this.state.isAbout === false) {
      document.dispatchEvent(evtBalancer)
    }
  }, 100)

  this.gameOver = () => {
    this.commit('SET_PAUSE')
    clearInterval(gameInterval)
    clearInterval(balancerInterval)
    return false
  }
  return this.gameOver
}

export {
  initializationGame
}
