import {Container, Graphics, Text} from 'pixi.js'

export class NextButtonEntity {
  private readonly WIDTH: number = 350
  private readonly ARROW_SIZE: number = 50
  private readonly HEIGHT: number = 150

  private readonly container: Container
  private readonly button: Graphics
  private readonly text: Text

  constructor() {
    this.container = new Container()

    this.button = new Graphics()
      .moveTo(0, 0)
      .lineTo(this.WIDTH, 0)
      .lineTo(this.WIDTH + this.ARROW_SIZE, this.HEIGHT / 2)
      .lineTo(this.WIDTH, this.HEIGHT)
      .lineTo(0, this.HEIGHT)
      .lineTo(0, 0)
      .fill(0x007bff)
    this.button.eventMode = 'static'
    this.button.on('pointertap', () => {
      console.log('click')
    })

    this.text = new Text('NEXT STAGE', {
      fontFamily: 'Arial',
      fontSize: 40,
      fill: 0xffffff,
      align: 'center',
    })
    this.text.x = this.WIDTH / 2
    this.text.y = this.HEIGHT / 2
    this.text.anchor.set(0.5)

    this.container.addChild(this.button, this.text)
    this.container.x = window.innerWidth - this.WIDTH - this.ARROW_SIZE - 20
    this.container.y = window.innerHeight - this.HEIGHT - 50
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }
}
