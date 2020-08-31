import Board from './board.js'
import Sounds from './sounds.js'
import { showPage } from './util.js'
import { Computer, Human } from './players.js'

export default class Game {
 
  static _instance = new Game()

  static get instance() {
    return Game._instance
  }

  running = true

  hboard = new Board(document.getElementById('hboard'))
  cboard = new Board(document.getElementById('cboard'))
  human = new Human(this.hboard, this.cboard)
  computer = new Computer(this.cboard, this.hboard)

  title = document.getElementById('game-title')
  subtitle = document.getElementById('game-subtitle')

  showEditingText() {
    this.title.innerHTML = "Place Your Ships, Admiral!"
    this.subtitle.innerHTML = "'R' to Rotate the Board. Drag ships from leftmost tile."
  }

  showPlayingText() {
    this.title.innerHTML = "Time to fire your torpedoes, Admiral! "
    this.subtitle.innerHTML = "Your enemy's response will be rash, but not without reasoning."
  }

  handleTorpedoDamageReport(result, target, cpu = false) {
    if(result === 'error'   ) this.onTorpedoError(target, cpu)
    if(result === 'occupied') this.onCellOccupied(target, cpu)
    if(result === 'hit'     ) this.onTorpedoHit(target, cpu)
    if(result === 'miss'    ) this.onTorpedoMiss(target, cpu)
    if(result === 'sunk'    ) this.onSunkShip(target, cpu)
  }

  async onSunkShip(target, cpu) {
    this.onTorpedoHit(target, cpu)
    if(cpu) {
      await Sounds.sunk_1.load()
      await Sounds.sunk_1.play()
      this.hboard.shipsSunk++
      this.checkLossCondition()
    } else {
      await Sounds.sunk_2.load()
      await Sounds.sunk_2.play()
      this.cboard.shipsSunk++
      this.checkWinCondition()
    }
  }

  async onTorpedoMiss(target, cpu) {
    await Sounds.miss_2.play()
    await Sounds.miss_2.play()
    target.style.backgroundColor = '#111'
  }
  
  async onTorpedoHit(target, cpu) {
    cpu ? await Sounds.hit_1.play() : await Sounds.hit_2.play()
    target.innerHTML = '&times'
    target.style.color = 'red'
    target.style.backgroundColor = '#777'
  }

  async onTorpedoError(target, cpu) {
    await Sounds.error.load()
    await Sounds.error.play()
  }
  
  async onCellOccupied(target, cpu) {
    await Sounds.miss_1.load()
    await Sounds.miss_1.play()
  }

  async checkWinCondition() {
    if(this.cboard.shipsSunk === 5) {
      this.running = false
      await Sounds.victory.load()
      await Sounds.victory.play()
      showPage('victory-screen')
    }
  }
  
  async checkLossCondition() {
    if(this.hboard.shipsSunk === 5) {
      this.running = false
      await Sounds.defeat.load()
      await Sounds.defeat.play()
      showPage('defeat-screen')
    }
  }

  begin() {
    this.showPlayingText()
    this.cboard.populate()
  }

}