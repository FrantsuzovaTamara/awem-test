import {Spine} from '@esotericsoftware/spine-pixi-v8'
import {injected} from 'brandi'
import {Container} from 'pixi.js'
import {TOKENS} from '../di/di.tokens'
import DeviceService from '../services/device.service'

export class BuilderEntity {
  private readonly builder: Spine

  constructor(private readonly deviceService: DeviceService) {
    this.builder = Spine.from({skeleton: 'builderScrollData', atlas: 'builderScrollAtlas'})
    this.builder.skeleton.setSkinByName('default')

    this.builder.scale = 1
    this.builder.alpha = 0
    this.onResize()
    this.deviceService.onResize(this.onResize)
  }

  public addToContainer(container: Container): void {
    container.addChild(this.builder)
  }

  public show(): void {
    this.builder.alpha = 1
    this.builder.state.setAnimation(0, 'scroll_flap', true)
  }

  private readonly onResize = (): void => {
    this.builder.x = this.deviceService.centralWindowPoint.x
    this.builder.y = this.deviceService.centralWindowPoint.y
  }
}

injected(BuilderEntity, TOKENS.deviceService)
