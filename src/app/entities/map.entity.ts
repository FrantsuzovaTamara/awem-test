import {Assets, Container, Sprite} from 'pixi.js'
import camera from '../../assets/sound/camera.mp3'
import DeviceService from '../services/device.service'
import {ScreenAspect} from '../types'
import {TOKENS} from '../di/di.tokens'
import {injected} from 'brandi'

export class MapEntity {
  private readonly container: Container
  private readonly bg: Sprite
  private readonly sound: HTMLAudioElement
  private readonly koeff: number = 0
  private initialScale: number = 0
  private currentScale: number = 0

  constructor(private readonly deviceService: DeviceService) {
    this.container = new Container()

    const texture = Assets.get('map')
    this.bg = new Sprite(texture)
    this.koeff = this.bg.height / this.bg.width
    this.onResize()
    this.bg._anchor.set(0.5)

    this.sound = new Audio(camera)
    this.sound.volume = 0.8
    this.sound.loop = false

    this.container.addChild(this.bg)
    this.deviceService.onResize(this.onResize)
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }

  public scaleChange(duration: number, mode: 'up' | 'down', onStop: () => void): void {
    this.sound.play()
    const startTime = performance.now()
    const startScale = this.bg.scale.x
    const targetScale = mode === 'up' ? 1.5 : this.initialScale
    this.currentScale = targetScale
    const scaleDiff = targetScale - startScale

    const frame = (now: number): void => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentScale = startScale + scaleDiff * progress

      this.bg.scale.set(currentScale)

      if (progress < 1) {
        requestAnimationFrame(frame)
      } else {
        onStop()
      }
    }

    requestAnimationFrame(frame)
  }

  private readonly onResize = (): void => {
    if (this.deviceService.currScreenAspect === ScreenAspect.Album) {
      this.bg.width = this.deviceService.currWindowSize.width
      this.bg.height = this.koeff * this.bg.width
    } else {
      this.bg.height = this.deviceService.currWindowSize.height
      this.bg.width = this.bg.height / this.koeff
    }
    if (this.initialScale !== this.currentScale) {
      this.initialScale = this.bg.scale.x
      this.bg.scale = this.currentScale
    } else {
      this.initialScale = this.bg.scale.x
      this.currentScale = this.bg.scale.x
    }
    this.bg.y = this.deviceService.centralWindowPoint.y
    this.bg.x = this.deviceService.centralWindowPoint.x
  }
}

injected(MapEntity, TOKENS.deviceService)
