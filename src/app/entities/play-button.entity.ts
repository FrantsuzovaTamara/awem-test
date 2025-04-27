import {Assets, Container, Sprite} from 'pixi.js'
import click from '../../assets/sound/click.mp3'
import {Position, ScreenAspect, Size} from '../types'
import {injected} from 'brandi'
import {TOKENS} from '../di/di.tokens'
import DeviceService from '../services/device.service'

export class PlayButtonEntity {
  private readonly IOS_URL = 'https://apps.apple.com/us/app/cradle-of-empires-match-3-game/id738480930'
  private readonly ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.awem.cradleofempires.andr&hl=en'
  private readonly container: Container
  private readonly button: Sprite
  private readonly sound: HTMLAudioElement
  private readonly koeff: number = 0

  constructor(private readonly deviceService: DeviceService) {
    this.container = new Container()

    const texture = Assets.get('playButton')
    this.button = new Sprite(texture)
    this.koeff = this.button.height / this.button.width
    this.button.anchor.set(0.5, 0)
    this.button.eventMode = 'static'
    this.button.cursor = 'pointer'
    this.button.on('pointertap', () => this.goToStore())

    this.sound = new Audio(click)
    this.sound.volume = 0.5
    this.sound.loop = false

    this.container.addChild(this.button)
    this.deviceService.onResize(this.onResize)
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }

  public updatePosition(getDataForUpdatePosition: () => {position: Position; size: Size}): void {
    this.getDataForUpdatePosition = getDataForUpdatePosition
    this.onResize()
  }

  private getDataForUpdatePosition = (): {position: Position; size: Size} => {
    return {position: {x: 0, y: 0}, size: {width: 0, height: 0}}
  }

  private readonly onResize = (): void => {
    if (this.deviceService.currScreenAspect === ScreenAspect.Album) {
      this.button.width = this.deviceService.currWindowSize.width / 10
      this.button.height = this.button.width * this.koeff
    } else {
      this.button.height = this.deviceService.currWindowSize.height / 10
      this.button.width = this.button.height / this.koeff
    }

    const {position, size} = this.getDataForUpdatePosition()
    this.button.y = position.y + size.height + 10
    this.button.x = position.x + size.width / 2
  }

  private goToStore(): void {
    this.sound.play()
    const userAgent = navigator.userAgent || navigator.vendor

    if (/android/i.test(userAgent)) {
      window.open(this.ANDROID_URL, '_blank')
    } else if (/iPad|iPhone|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && 'ontouchend' in document)) {
      window.open(this.IOS_URL, '_blank')
    } else {
      window.open(this.ANDROID_URL, '_blank')
    }

    window.playableGoToStore()
  }
}

injected(PlayButtonEntity, TOKENS.deviceService)
