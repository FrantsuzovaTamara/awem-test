import {Assets, Container, Sprite} from 'pixi.js'

export class MapEntity {
  private readonly container: Container
  private readonly bg: Sprite

  constructor() {
    this.container = new Container()

    const texture = Assets.get('map')
    this.bg = new Sprite(texture)

    this.bg._anchor.set(0.5)
    this.bg.y = window.innerHeight / 2
    this.bg.x = window.innerWidth / 2

    this.container.addChild(this.bg)
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }
}
