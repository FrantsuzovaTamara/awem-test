import {Assets, Container, Sprite} from 'pixi.js'
import camera from '../../assets/sound/camera.mp3'

export class MapEntity {
  private readonly container: Container
  private readonly bg: Sprite
  private readonly sound: HTMLAudioElement

  constructor() {
    this.container = new Container()

    const texture = Assets.get('map')
    this.bg = new Sprite(texture)

    this.bg._anchor.set(0.5)
    this.bg.y = window.innerHeight / 2
    this.bg.x = window.innerWidth / 2

    this.sound = new Audio(camera)
    this.sound.volume = 0.8
    this.sound.loop = false

    this.container.addChild(this.bg)
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }

  public scaleChange(duration: number, onStop: () => void): void {
    this.sound.play()
    const startTime = performance.now()
    const startScale = this.bg.scale.x
    const targetScale = startScale === 1 ? 1.5 : 1
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
}
