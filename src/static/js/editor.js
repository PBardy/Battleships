import Game from './game.js'
import Board, { Cell } from './board.js'
import { vectorToIndex, indexToVector } from './util.js'

let boardAngle = 0

const deltaRows = [0, -1, 0, 1]
const deltaColumns = [1, 0, -1, 0]
const hboard = document.getElementById('hboard')
const cboard = document.getElementById('cboard')
const container = document.getElementById('game-container')
const ships = Array.from(container.querySelectorAll('.ship'))
const hships = document.getElementById('hships')
const cships = document.getElementById('cships')

function rotateBoard(event, board = hboard) {
  boardAngle = boardAngle + 1 === 4 ? 0 : boardAngle + 1
  board.style.transform = 'rotate(' + (boardAngle * 90) + 'deg)'
}

function onDragOver(event) {
  event.preventDefault()
}
  
function onDragStart(event) {
  event.dataTransfer.setData("text", event.target.id)
}

function onDrop(event) {
  event.preventDefault()
  if(isGameBoard(event.target)) return
  const id = event.dataTransfer.getData("text")
  const ship = document.getElementById(id)
  const cells = Array.from(hboard.children)
  const index = cells.indexOf(event.target)
  const [row, column] = indexToVector(index, Board.size)
  const [dr, dc] = angleToDeltas(boardAngle)
  const placed = placeShip(ship.children, row, column, dr, dc, id)
  if(placed) removeShip(ship)
}

function mergeReplacements(replacements) {
  return replacements.forEach((replacement) => {
    const [original, clone] = replacement[0]
    const [newRow, newColumn, id] = replacement[1]
    original.replaceWith(clone)
    Game.instance.hboard.setCellAt(newRow, newColumn, new Cell(id))
    Game.instance.hboard.ships[id].push([newRow, newColumn])
  })
}

function placeShip(ship, row, column, deltaRow, deltaColumn, id) {
  const replacements = []
  for(let i = 0; i < ship.length; i++) {
    const clone = ship[i].cloneNode(true)
    const [nr, nc] = [row + (i * deltaRow), column + (i * deltaColumn)]
    const index = vectorToIndex([nr, nc], Board.size)
    const original = hboard.children[index]
    if(!Game.instance.hboard.isCellOccupied(nr, nc)) return // prevent ships overlapping (stop cell intersections)
    replacements.push([[original, clone], [nr, nc, id]]) // store replacement info
  }
  return mergeReplacements(replacements) || true // merge blocks on board
}

function removeShip(ship) {
  const parent = ship.closest('.ship-container')
  const shipsRemaining = hships.children.length - 1
  hships.removeChild(parent)
  if(shipsRemaining === 0) {
    clearComputerShips()
    disableBoardEditing()
    enableTorpedoes()
    Game.instance.begin()
  }
}

function enableTorpedoes() {
  Array.from(cboard.children).forEach((child) => {
    child.addEventListener('click', async (event) => {
      Game.instance.human.fireTorpedo(event)
      Game.instance.computer.fireTorpedo()
    })
  })
}

function angleToDeltas(angle) {
  return [deltaRows[angle], deltaColumns[angle]]
}

function isGameBoard(target) {
  return target.classList.contains('game-board')
}

function clearComputerShips() {
  cships.innerHTML = ""
}

function addShipEventListeners() {
  ships.forEach((ship) => {
    ship.setAttribute('draggable', true)
    ship.addEventListener('dragstart', onDragStart)
  })
}

function constructEmptyBoards() {
  const style = 'repeat(' + Board.size + ', 1fr)' 
  hboard.style.gridTemplateRows = style
  hboard.style.gridTemplateColumns = style
  cboard.style.gridTemplateRows = style
  cboard.style.gridTemplateColumns = style

  for(let i = 0; i < Board.size * Board.size; i++) {
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    hboard.appendChild(div1)
    cboard.appendChild(div2)
  }
}

function enableBoardEditing() {
  addShipEventListeners()
  hboard.addEventListener('drop', onDrop, false)
  hboard.addEventListener('dragover', onDragOver, false)
  window.addEventListener('keydown', rotateBoard, false)
}

function disableBoardEditing() {
  hboard.removeEventListener('drop', onDrop, false)
  hboard.removeEventListener('dragover', onDragOver, false)
  window.removeEventListener('keydown', rotateBoard, false)
}

export function setup() {
  constructEmptyBoards()
  enableBoardEditing()
  Game.instance.showEditingText()
}