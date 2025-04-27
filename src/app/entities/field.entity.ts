import {Assets, Container, Sprite} from 'pixi.js'
import {ChipEntity} from './chip.entity'
import {injected} from 'brandi'
import {TOKENS} from '../di/di.tokens'
import {Position, ScreenAspect} from '../types'
import mistake from '../../assets/sound/mistake.mp3'
import DeviceService from '../services/device.service'

export class FieldEntity {
  private readonly chipTypes = [
    'blueChip',
    'greenChip',
    'pinkChip',
    'redChip',
    'yellowChip',
    'blueChip',
    'pinkChip',
    'redChip',
    'yellowChip',
  ]
  private readonly container: Container
  private readonly field: Sprite
  private readonly chipsContainer: Container
  private readonly chips: ChipEntity[] = []
  private readonly sound: HTMLAudioElement

  private activeChip: ChipEntity | undefined = undefined
  private startDragPosition: Position | undefined = undefined
  private readonly koeff: number

  constructor(
    private readonly createChip: () => ChipEntity,
    private readonly deviceService: DeviceService,
  ) {
    this.container = new Container()
    this.chipsContainer = new Container()

    const texture = Assets.get('field')
    this.field = new Sprite(texture)
    this.koeff = this.field.height / this.field.width

    this.field._anchor.set(0.5)
    this.field.alpha = 0
    this.field.scale = 1.5
    this.container.addChild(this.field)

    this.createChips()
    this.chipsContainer.alpha = 0
    this.container.addChild(this.chipsContainer)

    this.sound = new Audio(mistake)
    this.sound.volume = 0.5
    this.sound.loop = false

    this.onResize()
    this.deviceService.onResize(this.onResize)
  }

  public addToContainer(container: Container): void {
    container.addChild(this.container)
  }

  public hide(): void {
    this.container.alpha = 0
  }

  public alphaChange(duration: number): void {
    this.chipsContainer.alpha = 1
    const startTime = performance.now()
    const startAlpha = this.field.alpha
    const targetAlpha = 1
    const alphaDiff = targetAlpha - startAlpha

    const frame = (now: number): void => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentAlpha = startAlpha + alphaDiff * progress

      this.field.alpha = currentAlpha

      if (progress < 1) requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
  }

  private readonly onResize = (): void => {
    const padding = 40
    this.field.x = this.deviceService.centralWindowPoint.x
    this.field.y = this.deviceService.centralWindowPoint.y

    if (this.deviceService.currScreenAspect === ScreenAspect.Album) {
      this.field.width = this.deviceService.currWindowSize.width / 2 - padding * 2
      this.field.height = this.field.width * this.koeff
    } else {
      this.field.height = this.deviceService.currWindowSize.height / 2 - padding * 2
      this.field.width = this.field.height / this.koeff
    }

    this.chips.forEach(chip => {
      const size = this.field.width / 7
      const newPosition = this.getChipPosition(0, 0, chip.row, chip.column, size)
      chip.setPosition(newPosition)
      chip.onResize(size)
    })
    this.chipsContainer.x = this.deviceService.centralWindowPoint.x
    this.chipsContainer.y = this.deviceService.centralWindowPoint.y
  }

  private readonly cleanupDrag = (): void => {
    this.activeChip = undefined
    this.startDragPosition = undefined
    window.removeEventListener('pointermove', this.onPointerMove)
    window.removeEventListener('pointerup', this.cleanupDrag)
  }

  private readonly onPointerMove = (e: PointerEvent): void => {
    if (!this.activeChip || !this.startDragPosition) return

    const dx = e.clientX - this.startDragPosition.x
    const dy = e.clientY - this.startDragPosition.y

    const distance = Math.hypot(dx, dy)
    if (distance < 30) return

    const dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up'

    const neighbor = this.findNeighbor(dir)
    if (neighbor) this.swapChipsAnimated(this.activeChip, neighbor)

    this.cleanupDrag()
  }

  private findNeighbor(dir: 'left' | 'right' | 'up' | 'down'): ChipEntity | undefined {
    if (!this.activeChip) return

    for (const chip of this.chips) {
      switch (dir) {
        case 'left':
          if (chip.column + 1 === this.activeChip.column && chip.row === this.activeChip.row) {
            return chip
          }
          break
        case 'right':
          if (chip.column - 1 === this.activeChip.column && chip.row === this.activeChip.row) {
            return chip
          }
          break
        case 'up':
          if (chip.column === this.activeChip.column && chip.row + 1 === this.activeChip.row) {
            return chip
          }
          break
        case 'down':
          if (chip.column === this.activeChip.column && chip.row - 1 === this.activeChip.row) {
            return chip
          }
          break
      }
    }
    return
  }

  private async swapChipsAnimated(firstChip: ChipEntity, secondChip: ChipEntity): Promise<void> {
    this.chips.forEach(chip => chip.lock())
    const firstPos = {x: firstChip.x, y: firstChip.y}
    const secondPos = {x: secondChip.x, y: secondChip.y}
    const duration = 20
    this.sound.play()

    await this.swap(firstChip, secondChip, secondPos, firstPos, duration)

    await new Promise(resolve => setTimeout(resolve, duration))

    await this.swap(firstChip, secondChip, firstPos, secondPos, duration)
  }

  private swap(
    firstChip: ChipEntity,
    secondChip: ChipEntity,
    firstTo: Position,
    secondTo: Position,
    duration: number,
  ): Promise<void> {
    return new Promise(resolve => {
      const startFirstX = firstChip.x
      const startFirstY = firstChip.y
      const deltaFirstX = firstTo.x - startFirstX
      const deltaFirstY = firstTo.y - startFirstY

      const startSecondX = secondChip.x
      const startSecondY = secondChip.y
      const deltaSecondX = secondTo.x - startSecondX
      const deltaSecondY = secondTo.y - startSecondY

      let elapsed = 0

      const frame = (): void => {
        elapsed++

        const progress = Math.min(elapsed / duration, 1)
        firstChip.setPosition({x: startFirstX + deltaFirstX * progress, y: startFirstY + deltaFirstY * progress})
        secondChip.setPosition({x: startSecondX + deltaSecondX * progress, y: startSecondY + deltaSecondY * progress})

        if (progress < 1) {
          requestAnimationFrame(frame)
        } else {
          this.chips.forEach(chip => chip.unlock())
          resolve()
        }
      }

      requestAnimationFrame(frame)
    })
  }

  private createChips(): void {
    this.chipTypes.forEach((name, i) => {
      const chip = this.createChip()

      const row = Math.floor(i / 3)
      const column = i % 3

      chip.init({
        name,
        row,
        column,
        container: this.chipsContainer,
        onPointerDown: (e: PointerEvent) => {
          this.activeChip = chip
          this.startDragPosition = {x: e.clientX, y: e.clientY}
        },
        onPointerMove: this.onPointerMove,
        cleanupDrag: this.cleanupDrag,
      })

      this.chips.push(chip)
    })
  }

  private getChipPosition(x: number, y: number, row: number, column: number, size: number): Position {
    switch (row) {
      case 0:
        y -= size
        break
      case 2:
        y += size
        break
    }

    switch (column) {
      case 0:
        x -= size
        break
      case 2:
        x += size
        break
    }
    return {x, y}
  }
}

injected(FieldEntity, TOKENS.chipFactory, TOKENS.deviceService)
