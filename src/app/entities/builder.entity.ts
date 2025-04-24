import {AtlasAttachmentLoader, SkeletonJson, Spine} from '@esotericsoftware/spine-pixi-v8'
import {Assets, Container} from 'pixi.js'

export class BuilderEntity {
  private readonly builder: Spine

  constructor() {
    this.builder = Spine.from({skeleton: 'builderScrollData', atlas: 'builderScrollAtlas'})
    this.builder.skeleton.setSkinByName('default')

    this.builder.x = window.innerWidth / 2
    this.builder.y = window.innerHeight / 2
    this.builder.scale = 1
    this.builder.alpha = 0
  }

  public addToContainer(container: Container): void {
    container.addChild(this.builder)
  }

  public show(): void {
    this.builder.alpha = 1
    this.builder.state.setAnimation(0, 'scroll_flap', true)
  }
}
