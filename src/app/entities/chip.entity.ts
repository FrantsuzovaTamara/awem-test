import {Assets, Container, Sprite} from 'pixi.js'
import {Position} from '../types'

export class ChipEntity {
  private chip!: Sprite
  public x: number = 0
  public y: number = 0
  public row: number = 0
  public column: number = 0

  constructor() {}

  public init({
    name,
    position,
    container,
    row,
    column,
    onPointerDown,
    onPointerMove,
    cleanupDrag,
  }: {
    name: string
    position: Position
    row: number
    column: number
    container: Container
    onPointerDown: (e: PointerEvent) => void
    onPointerMove: (e: PointerEvent) => void
    cleanupDrag: () => void
  }): void {
    const texture = Assets.get(name)
    this.chip = new Sprite(texture)

    this.chip._anchor.set(0.5)
    this.chip.scale = 1.2
    this.chip.position = position

    this.x = position.x
    this.y = position.y
    this.row = row
    this.column = column

    this.chip.eventMode = 'static'
    this.chip.cursor = 'pointer'
    this.chip.on('pointerdown', e => {
      onPointerDown(e)
      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', cleanupDrag)
    })

    container.addChild(this.chip)
  }

  public setPosition(position: Position): void {
    this.chip.position = position
    this.x = position.x
    this.y = position.y
  }

  public lock(): void {
    this.chip.eventMode = 'none'
    this.chip.cursor = 'none'
  }

  public unlock(): void {
    this.chip.eventMode = 'static'
    this.chip.cursor = 'pointer'
  }
}
