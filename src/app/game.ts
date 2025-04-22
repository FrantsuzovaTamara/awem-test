import {Application} from 'pixi.js'
import DeviceService from './services/device.service'
import {injected} from 'brandi'
import {TOKENS} from './di/di.tokens'
import {AssetsLoaderService} from './services/assets-loader/assets-loader.service'
import {SceneEntity} from './entities/scene.entity'

export class Game {
  public readonly app: Application

  constructor(
    private readonly $root: HTMLElement,
    private readonly deviceService: DeviceService,
    private readonly assetsLoaderService: AssetsLoaderService,
    private readonly createAppScene: () => SceneEntity,
  ) {
    this.app = new Application()
  }

  public async start(): Promise<void> {
    await this.app.init({
      antialias: true,
      resolution: this.deviceService.getDevicePixelRatio(),
      autoDensity: true,
      background: 0x000000,
    })
    this.$root.appendChild(this.app.canvas)
    await this.assetsLoaderService.loadAssets()
    this.createAppScene()
  }
}

injected(Game, TOKENS.root, TOKENS.deviceService, TOKENS.assetsLoaderService, TOKENS.sceneFactory)
