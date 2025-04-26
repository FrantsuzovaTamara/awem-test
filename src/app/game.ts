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
    private readonly createScene: () => SceneEntity,
  ) {
    this.app = new Application()
  }

  public async start(): Promise<void> {
    await this.app.init({
      antialias: true,
      resolution: this.deviceService.getDevicePixelRatio(),
      autoDensity: true,
      background: 0x000000,
      width: this.deviceService.getWindowWidth(),
      height: this.deviceService.getWindowHeight(),
    })
    //@ts-ignore
    globalThis.__PIXI_APP__ = this.app
    this.$root.appendChild(this.app.canvas)

    await this.assetsLoaderService
      .loadAssets()
      .then(() => {
        const scene = this.createScene()
        this.app.stage.addChild(scene.container)
      })
      .then(() => {
        window.playableLoaded()
      })
  }
}

injected(Game, TOKENS.root, TOKENS.deviceService, TOKENS.assetsLoaderService, TOKENS.sceneFactory)
