import {Container} from 'brandi'
import {Game} from '../game'
import {TOKENS} from './di.tokens'
import {AssetsLoaderService} from '../services/assets-loader/assets-loader.service'
import DeviceService from '../services/device.service'
import {SceneEntity} from '../entities/scene.entity'
import {MapEntity} from '../entities/map.entity'
import {LogoEntity} from '../entities/logo.entity'
import {PlayButtonEntity} from '../entities/play-button.entity'
import {NextButtonEntity} from '../entities/next-button.entity'
import {FieldEntity} from '../entities/field.entity'
import {ChipEntity} from '../entities/chip.entity'
import {CharacterEntity} from '../entities/character.entity'
import {FireworkEntity} from '../entities/firework.entity'
import {HintEntity} from '../entities/hint.entity'

export function createDiRootContainer($root: HTMLElement): Container {
  const container = new Container()

  container.bind(TOKENS.root).toConstant($root)
  container.bind(TOKENS.game).toInstance(Game).inSingletonScope()

  container.bind(TOKENS.deviceService).toInstance(DeviceService).inSingletonScope()
  container.bind(TOKENS.assetsLoaderService).toInstance(AssetsLoaderService).inSingletonScope()

  container.bind(TOKENS.sceneFactory).toFactory(SceneEntity)
  container.bind(TOKENS.mapFactory).toFactory(MapEntity)
  container.bind(TOKENS.logoFactory).toFactory(LogoEntity)
  container.bind(TOKENS.playButtonFactory).toFactory(PlayButtonEntity)
  container.bind(TOKENS.nextButtonFactory).toFactory(NextButtonEntity)

  container.bind(TOKENS.fieldFactory).toFactory(FieldEntity)
  container.bind(TOKENS.chipFactory).toFactory(ChipEntity)

  container.bind(TOKENS.characterFactory).toFactory(CharacterEntity)
  container.bind(TOKENS.fireworkFactory).toFactory(FireworkEntity)
  container.bind(TOKENS.hintFactory).toFactory(HintEntity)

  return container
}
