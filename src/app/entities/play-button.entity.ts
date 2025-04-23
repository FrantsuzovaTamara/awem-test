import {Assets, Container, Sprite} from 'pixi.js'

export class PlayButtonEntity {
  private readonly IOS_URL = 'https://apps.apple.com/us/app/cradle-of-empires-match-3-game/id738480930'
  private readonly ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.awem.cradleofempires.andr&hl=en'
  private readonly container: Container
  private readonly button: Sprite

  constructor() {
    this.container = new Container()

    const texture = Assets.get('playButton')
    this.button = new Sprite(texture)

    this.button.y = 150
    this.button.x = 35
    this.button.eventMode = 'static'
    this.button.cursor = 'pointer'
    this.button.on('pointertap', () => this.goToStore())

    this.container.addChild(this.button)
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }

  private goToStore(): void {
    const userAgent = navigator.userAgent || navigator.vendor

    if (/android/i.test(userAgent)) {
      window.open(this.ANDROID_URL, '_blank')
    } else if (/iPad|iPhone|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && 'ontouchend' in document)) {
      window.open(this.IOS_URL, '_blank')
    } else {
      window.open(this.ANDROID_URL, '_blank')
    }
  }
}
