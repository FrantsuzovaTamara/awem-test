import {AnimatedSprite, Assets, Container, Texture} from 'pixi.js'

export class HintEntity {
  private readonly NUMBER_OF_SLIDES = 25

  private readonly container: Container
  private readonly hint: AnimatedSprite

  constructor() {
    this.container = new Container()

    const textures = []
    for (let i = 0; i < this.NUMBER_OF_SLIDES; i++) {
      const image = Assets.get(`whiteHand${i >= 10 ? i : '0' + i}`)
      const texture = new Texture(image)
      textures.push(texture)
    }

    this.hint = new AnimatedSprite(textures)

    this.hint.x = window.innerWidth / 2
    this.hint.y = window.innerHeight / 2
    this.hint.loop = false
    this.hint.scale = 0.7
    this.hint.alpha = 0
    this.hint.animationSpeed = 0.8

    this.container.addChild(this.hint)
  }

  public setOnCompleteAnimation(onStop: () => void): void {
    this.hint.onComplete = (): void => {
      this.stopHintAnimation()
      onStop()
    }
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }

  public startHintAnimation(): void {
    this.hint.play()
    this.hint.alpha = 1
  }

  public stopHintAnimation(): void {
    this.hint.currentFrame = 0
    this.hint.alpha = 0
  }
}
