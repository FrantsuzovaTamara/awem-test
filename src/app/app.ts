import {Application} from 'pixi.js'
import DeviceService from './services/device.service'
import { injected } from 'brandi'
import { TOKENS } from './di/di.tokens'

export class Game {
  public readonly app: Application

  constructor(
    private readonly $root: HTMLElement,
    private readonly deviceService: DeviceService,
  ) {
    this.app = new Application()
  }

  public async start(): Promise<void> {
    await this.app.init({
      antialias: true,
      resolution: this.deviceService.getDevicePixelRatio(),
      autoDensity: true,
      background: 0xffffff,
    })
    this.$root.appendChild(this.app.canvas)
  }
}

injected(Game, TOKENS.root, TOKENS.deviceService)
