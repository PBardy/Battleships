export class Cell {

  hit = false

  constructor(value) {
    this.value = value
  }
 
}


export default class Board {

  static size = 10
  static shipLengths = { 'ac': 5, 'bs': 4, 'cr': 3, 'fr': 3, 'ds': 2 }

  cells = []
  ships = { 'ac': [], 'bs': [], 'cr': [], 'fr': [], 'ds': [] }
  size = Board.size
  shipsSunk = 0

  constructor(element) {
    this.element = element
    for(let row = 0; row < this.size; row++) {
      this.cells[row] = new Array(this.size)
      for(let column = 0; column < this.size; column++) {
        this.cells[row][column] = new Cell('empty')
      }
    }
  }

  isSunk(cell) {
    console.log('Checking is sunk')
    const hit = this.ships[cell.value].filter(c => {
      const current = this.getCellAt(c[0], c[1])
      if(current == null) return false
      else return current.hit
    })
    return hit.length === Board.shipLengths[cell.value]
  }

  getCellAt(row, column) {
    if(row == null) return
    if(column == null) return
    if(row < 0 || row >= this.size) return
    if(column < 0 || column >= this.size) return
    return this.cells[row][column]
  }

  setCellAt(row, column, newCell) {
    const cell = this.getCellAt(row, column)
    if(cell == null) return
    if(cell.value !== 'empty') return
    cell.value = newCell.value
    return true
  }

  isCellOccupied(row, column) {
    const cell = this.getCellAt(row, column) 
    if(cell == null) return false
    else return cell.value === 'empty'
  }

  fireTorpedoAt(row, column) {
    const cell = this.getCellAt(row, column)
    if(cell == null) return 'error'
    if(cell.hit) return 'occupied'
    cell.hit = true
    if(cell.value === 'empty') return 'miss'
    const sunk = this.isSunk(cell)
    return sunk ? 'sunk' : 'hit'
  }

  addShip(startRow, startColumn, deltaRow, deltaColumn, type) {
    const length = Board.shipLengths[type]
    for(let i = 0; i < length; i++) {
      const [cr, cc] = [startRow + (i * deltaRow), startColumn + (i * deltaColumn)]
      this.setCellAt(cr, cc, new Cell(type))
      this.ships[type].push([cr, cc])
    }
  }

  populate() {
    this.addShip(1, 1, 0, 1, 'ac')
    this.addShip(7, 5, 0, 1, 'bs')
    this.addShip(7, 2, 0, 1, 'cr')
    this.addShip(4, 5, 1, 0, 'fr')
    this.addShip(4, 7, 1, 0, 'ds')
  }

}