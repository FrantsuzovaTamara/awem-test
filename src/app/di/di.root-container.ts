import {Container} from 'brandi'
import {Game} from '../app'
import {TOKENS} from './di.tokens'

export function createDiRootContainer($root: HTMLElement): Container {
  const container = new Container()

  container.bind(TOKENS.root).toConstant($root)
  container.bind(TOKENS.game).toInstance(Game).inSingletonScope()

  return container
}
