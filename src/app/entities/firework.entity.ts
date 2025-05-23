import {AnimatedSprite, Assets, Container, Texture, TextureSource} from 'pixi.js'
import {Position} from '../types'
import salut from '../../assets/sound/salut.mp3'
import DeviceService from '../services/device.service'
import {injected} from 'brandi'
import {TOKENS} from '../di/di.tokens'

export class FireworkEntity {
  private readonly MAX_NUMBER_OF_FIREWORKS = 5
  private readonly NUMBER_OF_SLIDES = 30

  private currentNumberOfFireworks = 0

  private readonly container: Container
  private readonly textures: Texture<TextureSource<any>>[] = []

  constructor(private readonly deviceService: DeviceService) {
    this.container = new Container()

    for (let i = 0; i < this.NUMBER_OF_SLIDES; i++) {
      const image = Assets.get(`fireworks${i >= 10 ? i : '0' + i}`)
      const texture = new Texture(image)
      this.textures.push(texture)
    }
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }

  public startFireworks(onStop: () => void): void {
    const frame = (): void => {
      const firework = this.createFirework()

      const salutSound = new Audio(salut)
      salutSound.volume = 0.5
      salutSound.loop = false

      firework.onComplete = (): void => {
        if (this.currentNumberOfFireworks < this.MAX_NUMBER_OF_FIREWORKS) {
          requestAnimationFrame(frame)
        } else {
          onStop()
          this.currentNumberOfFireworks = 0
        }
        this.container.removeChild(firework)
        firework.destroy()
      }
      firework.play()
      salutSound.play()
    }

    requestAnimationFrame(frame)
  }

  private createFirework(): AnimatedSprite {
    const firework = new AnimatedSprite(this.textures)
    firework._anchor.set(0.5)
    const randomPosition = this.getRandomPosition()
    firework.x = randomPosition.x
    firework.y = randomPosition.y
    firework.animationSpeed = 0.8
    firework.loop = false
    this.container.addChild(firework)
    this.currentNumberOfFireworks++
    return firework
  }

  private getRandomPosition(): Position {
    const max = 200
    const half = max / 1.5
    const randomX = Math.random() * max
    const randomY = Math.random() * max
    const x = this.deviceService.centralWindowPoint.x + (randomX > half ? randomX - half : -randomX)
    const y = this.deviceService.centralWindowPoint.y + (randomY > half ? randomY - half : -randomY)
    return {x, y}
  }
}

injected(FireworkEntity, TOKENS.deviceService)
