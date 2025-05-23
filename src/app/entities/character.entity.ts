import {
  AtlasAttachmentLoader,
  SkeletonJson,
  Skin,
  Spine,
  SpineTexture,
  TextureAtlas,
} from '@esotericsoftware/spine-pixi-v8'
import {injected} from 'brandi'
import {Assets, Container, Texture} from 'pixi.js'
import {TOKENS} from '../di/di.tokens'
import DeviceService from '../services/device.service'
import {ScreenAspect} from '../types'

export class CharacterEntity {
  private readonly character: Spine
  private readonly koeff: number
  private initialScale: number = 0
  private currentScale: number = 0

  constructor(private readonly deviceService: DeviceService) {
    const atlasText = require('../../assets/character/spine-char.atlas')
    const jsonText = require('../../assets/character/spine-char.json')

    const pixiTexture = Assets.get('characterImage') as Texture

    const spineTexture = SpineTexture.from(pixiTexture.source)

    const atlas = new TextureAtlas(atlasText)
    for (const page of atlas.pages) {
      page.setTexture(spineTexture)
    }

    const attachmentLoader = new AtlasAttachmentLoader(atlas)
    const skeletonJson = new SkeletonJson(attachmentLoader)
    skeletonJson.scale = 0.5

    const skeletonData = skeletonJson.readSkeletonData(JSON.parse(jsonText))
    this.character = new Spine(skeletonData)

    const skinName = 'full-skins/girl-blue-cape'
    const newSkin = new Skin('newSkin')
    const skin = this.character.skeleton.data.skins.find(s => s.name === skinName)
    if (!skin) throw new Error(`Скин "${skinName}" не найден`)
    newSkin.addSkin(skin)
    this.character.skeleton.setSkin(newSkin)

    this.koeff = this.character.height / this.character.width

    this.character.scale = 1
    this.character.alpha = 0
    this.onResize()
    this.deviceService.onResize(this.onResize)
  }

  public addToContainer(container: Container): void {
    container.addChild(this.character)
  }

  public show(): void {
    this.character.alpha = 1
    this.character.state.setAnimation(0, 'dress-up', true)
  }

  public startAnimation(): void {
    this.character.state.setAnimation(0, 'dance', true)
  }

  public stopAnimation(): void {
    this.character.state.setAnimation(0, 'blink', true)
  }

  public scaleDown(duration: number): void {
    const startTime = performance.now()
    const startScale = this.initialScale
    const targetScale = this.initialScale / 2
    this.currentScale = targetScale
    const scaleDiff = targetScale - startScale

    const frame = (now: number): void => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentScale = startScale + scaleDiff * progress

      this.character.scale.set(currentScale)
      this.character.x = this.deviceService.centralWindowPoint.x + this.character.width / 4
      this.character.y = this.deviceService.centralWindowPoint.y + this.character.height / 2

      if (progress < 1) requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
  }

  private readonly onResize = (): void => {
    this.character.height =
      this.deviceService.currScreenAspect === ScreenAspect.Album
        ? this.deviceService.currWindowSize.height / 2
        : this.deviceService.currWindowSize.height / 4
    this.character.width = this.character.height / this.koeff
    if (this.initialScale === this.currentScale) {
      this.initialScale = this.character.scale.x
      this.currentScale = this.character.scale.x
    } else {
      this.initialScale = this.character.scale.x
      this.character.scale = this.currentScale
    }

    this.character.x = this.deviceService.centralWindowPoint.x + this.character.width / 4
    this.character.y = this.deviceService.centralWindowPoint.y + this.character.height / 2
  }
}

injected(CharacterEntity, TOKENS.deviceService)
