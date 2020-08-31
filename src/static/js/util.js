export function numberToLetter(number) {
  return String.fromCharCode(65 + number)
}

export function letterToNumber(letter) {
  return letter.charCodeAt(0) - 65
}

export function mirrorNumber(number, length) {
  return (length - (number + length) % length) - 1
}

export function indexToVector(index, gridSize) {
  const row = Math.floor(index / gridSize)
  const column = index - (row * gridSize)
  return [row, column]
}

export function vectorToIndex(vector, gridSize) {
  const [row, column] = vector
  return (row * gridSize) + column
}

export function showPage(page) {
  window.location.href = window.location.origin + window.location.pathname + '#' + page
}

export function wait(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}