import {AnimatedSprite, Assets, Container, Size, Texture} from 'pixi.js'
import DeviceService from '../services/device.service'
import {Position, ScreenAspect} from '../types'
import {injected} from 'brandi'
import {TOKENS} from '../di/di.tokens'

export class HintEntity {
  private readonly NUMBER_OF_SLIDES = 25

  private readonly container: Container
  private readonly hint: AnimatedSprite
  private readonly koeff: number

  constructor(private readonly deviceService: DeviceService) {
    this.container = new Container()

    const textures = []
    for (let i = 0; i < this.NUMBER_OF_SLIDES; i++) {
      const image = Assets.get(`whiteHand${i >= 10 ? i : '0' + i}`)
      const texture = new Texture(image)
      textures.push(texture)
    }

    this.hint = new AnimatedSprite(textures)
    this.koeff = this.hint.height / this.hint.width

    this.hint.loop = false
    this.hint.scale = 0.6
    this.hint.alpha = 0
    this.hint.animationSpeed = 0.8

    this.container.addChild(this.hint)
    this.deviceService.onResize(this.onResize)
  }

  public setOnCompleteAnimation(onStop: () => void): void {
    this.hint.onComplete = (): void => {
      this.stopHintAnimation()
      onStop()
    }
  }

  public updatePosition(getDataForUpdatePosition: () => {position: Position; size: Size}): void {
    this.getDataForUpdatePosition = getDataForUpdatePosition
    this.onResize()
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

  private getDataForUpdatePosition = (): {position: Position; size: Size} => {
    return {position: {x: 0, y: 0}, size: {width: 0, height: 0}}
  }

  private readonly onResize = (): void => {
    const padding = 50

    const {size, position} = this.getDataForUpdatePosition()
    this.container.x = position.x + size.width / 2 - padding / 2
    this.container.y = position.y + size.height / 2 - padding

    if (this.deviceService.currScreenAspect === ScreenAspect.Album) {
      this.hint.width = this.deviceService.currWindowSize.width / 6
      this.hint.height = this.hint.width * this.koeff
    } else {
      this.hint.height = this.deviceService.currWindowSize.height / 6
      this.hint.width = this.hint.height / this.koeff
    }
  }
}

injected(HintEntity, TOKENS.deviceService)
