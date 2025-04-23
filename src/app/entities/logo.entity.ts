import {Assets, Container, Sprite} from 'pixi.js'

export class LogoEntity {
  private readonly container: Container
  private readonly logo: Sprite

  constructor() {
    this.container = new Container()

    const texture = Assets.get('logo')
    this.logo = new Sprite(texture)

    this.logo.y = 20
    this.logo.x = 20
    this.logo.scale = 0.45

    this.container.addChild(this.logo)
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }
}
