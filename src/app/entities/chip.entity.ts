import {Assets, Container, Sprite} from 'pixi.js'
import {Position} from '../types'

export class ChipEntity {
  private chip!: Sprite

  constructor() {}

  public init(name: string, position: Position, container: Container): void {
    const texture = Assets.get(name)
    this.chip = new Sprite(texture)

    this.chip._anchor.set(0.5)
    this.chip.scale = 1.2
    this.chip.position = position

    container.addChild(this.chip)
  }
}
