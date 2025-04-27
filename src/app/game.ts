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
    this.deviceService.init()

    await this.app.init({
      antialias: true,
      resolution: this.deviceService.getDevicePixelRatio(),
      autoDensity: true,
      background: 0x000000,
      width: this.deviceService.currWindowSize.width,
      height: this.deviceService.currWindowSize.height,
    })
    this.$root.appendChild(this.app.canvas)

    this.deviceService.onResize(this.resizeCanvas)

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

  private readonly resizeCanvas = (): void => {
    const newCanvasWidth = this.deviceService.currWindowSize.width
    const newCanvasHeight = this.deviceService.currWindowSize.height

    this.app.renderer.resize(newCanvasWidth, newCanvasHeight)
  }
}

injected(Game, TOKENS.root, TOKENS.deviceService, TOKENS.assetsLoaderService, TOKENS.sceneFactory)
