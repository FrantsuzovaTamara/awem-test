import {Container, Graphics, Text} from 'pixi.js'
import click from '../../assets/sound/click.mp3'
import {injected} from 'brandi'
import {TOKENS} from '../di/di.tokens'
import DeviceService from '../services/device.service'
import {Position, ScreenAspect, Size} from '../types'

export class NextButtonEntity {
  private readonly container: Container
  private readonly button: Graphics
  private readonly text: Text
  private readonly sound: HTMLAudioElement

  private width = 0
  private arrowSize = 0
  private height = 70

  constructor(private readonly deviceService: DeviceService) {
    this.container = new Container()

    this.button = new Graphics()
    this.button.eventMode = 'static'
    this.button.cursor = 'pointer'

    this.text = new Text({
      text: 'NEXT STAGE',
      style: {
        fontFamily: 'Arial',
        fontSize: 30,
        fill: 0xffffff,
        align: 'center',
      },
    })
    this.text.anchor.set(0.5)

    this.container.addChild(this.button, this.text)
    this.onResize()
    this.deviceService.onResize(this.onResize)

    this.sound = new Audio(click)
    this.sound.volume = 0.5
    this.sound.loop = false
  }

  public getSizeAndPosition = (): {position: Position; size: Size} => {
    return {
      position: this.container.position,
      size: {width: this.width + this.arrowSize, height: this.height},
    }
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }

  public setPointerEvents(onClick: () => void): void {
    this.button.on('pointertap', () => {
      this.sound.play()
      onClick()
    })
    this.button.on('pointerover', () => {
      this.button.tint = 0x0029b3
    })
    this.button.on('pointerout', () => {
      this.button.tint = 'white'
    })
  }

  public hide(): void {
    this.container.alpha = 0
  }

  public show(): void {
    this.container.alpha = 1
  }

  private readonly onResize = (): void => {
    const rightPadding = 20
    const bottomPadding = 80

    if (this.deviceService.currScreenAspect === ScreenAspect.Album) {
      this.width = this.deviceService.currWindowSize.width / 5
      this.arrowSize = this.width / 10
      this.height = this.width / 5

      this.container.x = this.deviceService.currWindowSize.width - this.width - this.arrowSize - rightPadding
      this.container.y = this.deviceService.currWindowSize.height - this.height - bottomPadding
    } else {
      this.width = Math.min(this.deviceService.currWindowSize.width - rightPadding * 2, 300)
      this.height = this.width / 5
      this.arrowSize = this.width / 10

      this.container.x = this.deviceService.centralWindowPoint.x - this.width / 2
      this.container.y = this.deviceService.currWindowSize.height - this.height - bottomPadding
    }

    this.text.x = (this.width - this.arrowSize) / 2
    this.text.y = this.height / 2
    this.text.style.fontSize = this.height / 2
    this.redrawBubble()
  }

  private redrawBubble(): void {
    this.button.clear()
    this.button
      .moveTo(0, 0)
      .lineTo(this.width - this.arrowSize, 0)
      .lineTo(this.width, this.height / 2)
      .lineTo(this.width - this.arrowSize, this.height)
      .lineTo(0, this.height)
      .lineTo(0, 0)
      .fill(0x007bff)
  }
}

injected(NextButtonEntity, TOKENS.deviceService)
