function figureSettings (side) {
  const type = this.configuration.figureTypes[Math.floor(Math.random() * (1 + 2 - 0)) + 0]
  const randomWeight = Math.floor(Math.random() * (1 + this.configuration.figureMaxWeight - this.configuration.figureMinWeight)) + this.configuration.figureMinWeight

  const weightFactor = (((100 / this.configuration.figureMaxWeight) * randomWeight) / 100)
  const red = weightFactor > 0.65 ? 0 : 255 * weightFactor
  const green = weightFactor < 0.55 ? 100 : 255 * weightFactor
  const color = `rgb( ${red}, ${green}, 50)`
  return {
    side,
    weight: randomWeight,
    type,
    color,
    x: Math.round(Math.random() * 4.5),
    y: 0
  }
}
export {
  figureSettings
}
