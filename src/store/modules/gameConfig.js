function gameConfig (store, name = 'gameNameId') {
  store.registerModule(name, {
    namespaced: true,
    state: () => ({
      name,
      figureTypes: ['circle', 'rectangle', 'triangle'],
      figureMinWeight: 2,
      figureMaxWeight: 10,
      kgm_side_limit: 20,
      plankWidth: 10,
      landingPlaceCount: 5,
      degreesLimit: 30,
      scoreLimit: 25,
      columnHeight: 170
    })
  })
}

export { gameConfig }
