import {injected} from 'brandi'
import {MapEntity} from './map.entity'
import {TOKENS} from '../di/di.tokens'
import {Container} from 'pixi.js'
import {LogoEntity} from './logo.entity'
import {PlayButtonEntity} from './play-button.entity'
import {NextButtonEntity} from './next-button.entity'
import {FieldEntity} from './field.entity'
import {BuilderEntity} from './builder.entity'

export class SceneEntity {
  private readonly DURATION: number = 800

  public readonly container: Container
  private readonly map: MapEntity
  private readonly logo: LogoEntity
  private readonly playButton: PlayButtonEntity
  private readonly nextButton: NextButtonEntity
  private readonly field: FieldEntity
  private readonly builder: BuilderEntity

  private stage: 'initial' | 'field' | 'builder' | 'fireworks' = 'initial'

  constructor(
    private readonly createMap: () => MapEntity,
    private readonly createLogo: () => LogoEntity,
    private readonly createPlayButton: () => PlayButtonEntity,
    private readonly createNextButton: () => NextButtonEntity,
    private readonly createField: () => FieldEntity,
    private readonly createBuilder: () => BuilderEntity,
  ) {
    this.container = new Container()
    this.map = this.createMap()
    this.map.addToContainer(this.container)

    this.logo = this.createLogo()
    this.logo.addToContainer(this.container)

    this.playButton = this.createPlayButton()
    this.playButton.addToContainer(this.container)

    this.nextButton = this.createNextButton()
    this.nextButton.addToContainer(this.container)
    this.nextButton.setPointerEvents(this.onNextButtonClick)

    this.field = this.createField()
    this.field.addToContainer(this.container)

    this.builder = this.createBuilder()
    this.builder.addToContainer(this.container)
  }

  private readonly onNextButtonClick = (): void => {
    this.nextButton.hide()
    switch (this.stage) {
      case 'initial':
        this.startStageWithField()
        this.stage = 'field'
        break
      case 'field':
        this.startStageWithBuilder()
        this.stage = 'builder'
        break
      case 'builder':
        this.startStageWithFireworks()
        this.stage = 'fireworks'
        break
      case 'fireworks':
        this.startFireworks()
        break
      default:
        throw new Error('Stage not found')
    }
  }

  private startStageWithField(): void {
    this.map.scaleChange(this.DURATION, () => this.nextButton.show())
    this.field.alphaChange(this.DURATION)
  }

  private startStageWithBuilder(): void {
    this.builder.show()
    this.field.hide()
    setTimeout(() => this.nextButton.show(), this.DURATION)
  }

  private startStageWithFireworks(): void {
    this.map.scaleChange(this.DURATION, () => this.nextButton.show())
    this.startFireworks()
  }

  private startFireworks(): void {
    this.nextButton.show()
  }
}

injected(
  SceneEntity,
  TOKENS.mapFactory,
  TOKENS.logoFactory,
  TOKENS.playButtonFactory,
  TOKENS.nextButtonFactory,
  TOKENS.fieldFactory,
  TOKENS.builderFactory,
)
