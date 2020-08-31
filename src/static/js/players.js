import Game from './game.js'
import Board from './board.js'
import { indexToVector, vectorToIndex, wait } from './util.js'

export class Player {

  hits = []
  misses = []
  previous = []

  constructor(myBoard, otherBoard) {
    this.myBoard = myBoard
    this.otherBoard = otherBoard
  }

  fireTorpedo() {}

}

export class Human extends Player {

  constructor(myBoard, otherBoard) {
    super(myBoard, otherBoard)
  }

  fireTorpedo(event) {
    const cells = Array.from(this.otherBoard.element.children)
    const index = cells.indexOf(event.target)
    const [row, column] = indexToVector(index, Board.size)
    const result = this.otherBoard.fireTorpedoAt(row, column)
    Game.instance.handleTorpedoDamageReport(result, event.target)
  } 

}

export class Computer extends Player {

  constructor(myBoard, otherBoard) {
    super(myBoard, otherBoard)
  }

  getRandomCoords() {
    if(this.previous.length === Board.size * Board.size) return
    while(true) {
      const vector = [Math.floor(Math.random() * Board.size), Math.floor(Math.random() * Board.size)]
      const index = (vector[0] * Board.size + vector[1])
      if(!this.previous.includes(index)) {
        this.previous.push(index)
        return vector
      }
    }
  }

  async fireTorpedo() {
    await wait(1000)
    const cells = Array.from(this.otherBoard.element.children)
    const [row, column] = this.getRandomCoords()
    const result = this.otherBoard.fireTorpedoAt(row, column)
    const index = vectorToIndex([row, column], Board.size)
    Game.instance.handleTorpedoDamageReport(result, cells[index], true)
  }

}