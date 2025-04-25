import {Assets, Container, Sprite} from 'pixi.js'
import {ChipEntity} from './chip.entity'
import {injected} from 'brandi'
import {TOKENS} from '../di/di.tokens'
import {Position} from '../types'
import mistake from '../../assets/sound/mistake.mp3'

export class FieldEntity {
  private readonly chipTypes = [
    'blueChip',
    'greenChip',
    'pinkChip',
    'redChip',
    'yellowChip',
    'blueChip',
    'pinkChip',
    'redChip',
    'yellowChip',
  ]
  private readonly container: Container
  private readonly field: Sprite
  private readonly chipsContainer: Container
  private readonly chips: ChipEntity[] = []
  private readonly sound: HTMLAudioElement

  constructor(private readonly createChip: () => ChipEntity) {
    this.container = new Container()
    this.chipsContainer = new Container()

    const texture = Assets.get('field')
    this.field = new Sprite(texture)

    this.field._anchor.set(0.5)
    this.field.y = window.innerHeight / 2
    this.field.x = window.innerWidth / 2
    this.field.alpha = 0
    this.field.scale = 1.5
    this.container.addChild(this.field)

    const x = window.innerWidth / 2
    const y = window.innerHeight / 2

    this.chipTypes.forEach((chipName, i) => {
      const chip = this.createChip()

      const chipPosition = this.getChipPosition(x, y, i)
      chip.init(chipName, chipPosition, this.chipsContainer)

      this.chips.push(chip)
    })
    this.chipsContainer.alpha = 0
    this.container.addChild(this.chipsContainer)

    this.sound = new Audio(mistake)
    this.sound.volume = 0.5
    this.sound.loop = false
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }

  public hide(): void {
    this.container.alpha = 0
  }

  public alphaChange(duration: number): void {
    this.chipsContainer.alpha = 1
    const startTime = performance.now()
    const startAlpha = this.field.alpha
    const targetAlpha = 1
    const alphaDiff = targetAlpha - startAlpha

    const frame = (now: number): void => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentAlpha = startAlpha + alphaDiff * progress

      this.field.alpha = currentAlpha

      if (progress < 1) requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
  }

  private getChipPosition(x: number, y: number, chipIndex: number): Position {
    const rowNumb = Math.floor(chipIndex / 3)
    const columnNumb = chipIndex % 3
    const squareSide = 75
    switch (rowNumb) {
      case 0:
        y -= squareSide
        break
      case 2:
        y += squareSide
        break
    }

    switch (columnNumb) {
      case 0:
        x -= squareSide
        break
      case 2:
        x += squareSide
        break
    }
    return {x, y}
  }
}

injected(FieldEntity, TOKENS.chipFactory)
