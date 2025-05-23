import {Factory, token} from 'brandi'
import {Game} from '../game'
import DeviceService from '../services/device.service'
import {ImageLoaderService} from '../services/images-loader.service'
import {SceneEntity} from '../entities/scene.entity'
import {ChipEntity} from '../entities/chip.entity'
import {MapEntity} from '../entities/map.entity'
import {FieldEntity} from '../entities/field.entity'
import {LogoEntity} from '../entities/logo.entity'
import {NextButtonEntity} from '../entities/next-button.entity'
import {PlayButtonEntity} from '../entities/play-button.entity'
import {CharacterEntity} from '../entities/character.entity'
import {FireworkEntity} from '../entities/firework.entity'
import {HintEntity} from '../entities/hint.entity'

export const TOKENS = {
  game: token<Game>('game'),
  root: token<HTMLElement>('root'),

  deviceService: token<DeviceService>('deviceSevice'),
  imageLoaderService: token<ImageLoaderService>('imageLoaderService'),

  sceneFactory: token<Factory<SceneEntity>>('sceneFactory'),
  mapFactory: token<Factory<MapEntity>>('mapFactory'),
  logoFactory: token<Factory<LogoEntity>>('logoFactory'),
  nextButtonFactory: token<Factory<NextButtonEntity>>('nextButtonFactory'),
  playButtonFactory: token<Factory<PlayButtonEntity>>('appSceneFactory'),

  fieldFactory: token<Factory<FieldEntity>>('fieldFactory'),
  chipFactory: token<Factory<ChipEntity>>('chipFactory'),

  characterFactory: token<Factory<CharacterEntity>>('characterFactory'),
  fireworkFactory: token<Factory<FireworkEntity>>('fireworkFactory'),
  hintFactory: token<Factory<HintEntity>>('hintFactory'),
}
