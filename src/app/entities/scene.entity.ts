import {injected} from 'brandi'
import {MapEntity} from './map.entity'
import {TOKENS} from '../di/di.tokens'
import {Container} from 'pixi.js'
import {LogoEntity} from './logo.entity'
import {PlayButtonEntity} from './play-button.entity'
import {NextButtonEntity} from './next-button.entity'

export class SceneEntity {
  public readonly container: Container
  private readonly map: MapEntity
  private readonly logo: LogoEntity
  private readonly playButton: PlayButtonEntity
  private readonly nextButton: NextButtonEntity

  constructor(
    private readonly createMap: () => MapEntity,
    private readonly createLogo: () => LogoEntity,
    private readonly createPlayButton: () => PlayButtonEntity,
    private readonly createNextButton: () => NextButtonEntity,
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
  }
}

injected(SceneEntity, TOKENS.mapFactory, TOKENS.logoFactory, TOKENS.playButtonFactory, TOKENS.nextButtonFactory)
