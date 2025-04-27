import {Assets, Container, Sprite} from 'pixi.js'
import DeviceService from '../services/device.service'
import {Position, ScreenAspect, Size} from '../types'
import {injected} from 'brandi'
import {TOKENS} from '../di/di.tokens'

export class LogoEntity {
  private readonly container: Container
  private readonly logo: Sprite
  private readonly koeff: number = 0

  constructor(private readonly deviceService: DeviceService) {
    this.container = new Container()

    const texture = Assets.get('logo')
    this.logo = new Sprite(texture)
    this.koeff = this.logo.height / this.logo.width
    this.onResize()

    this.container.addChild(this.logo)
    this.deviceService.onResize(this.onResize)
  }

  public readonly getSizeAndPosition = (): {position: Position; size: Size} => {
    return {
      size: {width: this.logo.width, height: this.logo.height},
      position: this.logo.position,
    }
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }

  private readonly onResize = (): void => {
    if (this.deviceService.currScreenAspect === ScreenAspect.Album) {
      this.logo.width = this.deviceService.currWindowSize.width / 10
      this.logo.height = this.logo.width * this.koeff
      this.logo.y = 20
      this.logo.x = 20
    } else {
      this.logo.height = this.deviceService.currWindowSize.height / 10
      this.logo.width = this.logo.height / this.koeff
      this.logo.y = 20
      this.logo.x = this.deviceService.centralWindowPoint.x - this.logo.width / 2
    }
  }
}

injected(LogoEntity, TOKENS.deviceService)
