import {injected} from 'brandi'
import {MapEntity} from './map.entity'
import {TOKENS} from '../di/di.tokens'
import {Container} from 'pixi.js'
import {CharacterEntity} from './character.entity'
import {LogoEntity} from './logo.entity'
import {PlayButtonEntity} from './play-button.entity'
import {NextButtonEntity} from './next-button.entity'
import {FieldEntity} from './field.entity'
import {FireworkEntity} from './firework.entity'
import {HintEntity} from './hint.entity'
import music from '../../assets/sound/music.mp3'
import ovation from '../../assets/sound/ovation.mp3'

export class SceneEntity {
  private readonly DURATION: number = 800
  private readonly IDLE_TIME = 3000

  public readonly container: Container
  private readonly map: MapEntity
  private readonly logo: LogoEntity
  private readonly playButton: PlayButtonEntity
  private readonly nextButton: NextButtonEntity
  private readonly field: FieldEntity
  private readonly character: CharacterEntity
  private readonly fireworks: FireworkEntity
  private readonly hint: HintEntity
  private readonly bgMusic: HTMLAudioElement
  private readonly ovationSound: HTMLAudioElement

  private stage: 'initial' | 'field' | 'character' | 'fireworks' = 'initial'
  private idleTimeoutId: ReturnType<typeof setTimeout> | null = null

  constructor(
    private readonly createMap: () => MapEntity,
    private readonly createLogo: () => LogoEntity,
    private readonly createPlayButton: () => PlayButtonEntity,
    private readonly createNextButton: () => NextButtonEntity,
    private readonly createField: () => FieldEntity,
    private readonly createCharacter: () => CharacterEntity,
    private readonly createFireworks: () => FireworkEntity,
    private readonly createHint: () => HintEntity,
  ) {
    this.resetIdleTimer()
    window.onpointerdown = (): void => this.onUserInteraction()
    window.onpointermove = (): void => this.onUserInteraction()

    this.container = new Container()

    this.map = this.createMap()
    this.map.addToContainer(this.container)

    this.logo = this.createLogo()
    this.logo.addToContainer(this.container)

    this.playButton = this.createPlayButton()
    this.playButton.addToContainer(this.container)
    this.playButton.updatePosition(this.logo.getSizeAndPosition)

    this.nextButton = this.createNextButton()
    this.nextButton.addToContainer(this.container)
    this.nextButton.setPointerEvents(this.onNextButtonClick)

    this.field = this.createField()
    this.field.addToContainer(this.container)

    this.character = this.createCharacter()
    this.character.addToContainer(this.container)

    this.fireworks = this.createFireworks()
    this.fireworks.addToContainer(this.container)

    this.hint = this.createHint()
    this.hint.addToContainer(this.container)
    this.hint.updatePosition(this.nextButton.getSizeAndPosition)
    this.hint.setOnCompleteAnimation(() => this.resetIdleTimer())

    this.bgMusic = new Audio(music)
    this.bgMusic.volume = 0.3
    this.bgMusic.loop = true

    this.ovationSound = new Audio(ovation)
    this.ovationSound.volume = 0.5
    this.ovationSound.loop = false
  }

  private readonly onNextButtonClick = (): void => {
    this.nextButton.hide()
    if (this.idleTimeoutId) clearTimeout(this.idleTimeoutId)
    switch (this.stage) {
      case 'initial':
        this.startStageWithField()
        this.stage = 'field'
        break
      case 'field':
        this.startStageWithCharacter()
        this.stage = 'character'
        break
      case 'character':
        this.startStageWithFireworks()
        this.stage = 'fireworks'
        window.playableFinished()
        break
      case 'fireworks':
        this.character.startAnimation()
        this.fireworks.startFireworks(() => {
          this.nextButton.show()
          this.resetIdleTimer()
          this.character.stopAnimation()
        })
        break
      default:
        throw new Error('Stage not found')
    }
  }

  private startStageWithField(): void {
    this.bgMusic.play()
    document.addEventListener('visibilitychange', () => {
      document.hidden ? this.bgMusic.pause() : this.bgMusic.play()
    })
    this.map.scaleChange(this.DURATION, 'up', () => {
      this.nextButton.show()
      this.resetIdleTimer()
    })
    this.field.alphaChange(this.DURATION)
  }

  private startStageWithCharacter(): void {
    this.ovationSound.play()
    this.character.show()
    this.field.hide()
    setTimeout(() => {
      this.nextButton.show()
      this.resetIdleTimer()
    }, this.DURATION)
  }

  private startStageWithFireworks(): void {
    this.map.scaleChange(this.DURATION, 'down', () => {})
    this.character.scaleDown(this.DURATION)
    this.character.startAnimation()
    this.fireworks.startFireworks(() => {
      this.nextButton.show()
      this.resetIdleTimer()
      this.character.stopAnimation()
    })
  }

  private onUserInteraction(): void {
    this.hint.stopHintAnimation()
    this.resetIdleTimer()
  }

  private resetIdleTimer(): void {
    if (this.idleTimeoutId) clearTimeout(this.idleTimeoutId)
    this.idleTimeoutId = setTimeout(() => {
      this.hint.startHintAnimation()
      if (this.idleTimeoutId) clearTimeout(this.idleTimeoutId)
    }, this.IDLE_TIME)
  }
}

injected(
  SceneEntity,
  TOKENS.mapFactory,
  TOKENS.logoFactory,
  TOKENS.playButtonFactory,
  TOKENS.nextButtonFactory,
  TOKENS.fieldFactory,
  TOKENS.characterFactory,
  TOKENS.fireworkFactory,
  TOKENS.hintFactory,
)
