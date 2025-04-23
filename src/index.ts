import {createDiRootContainer} from './app/di/di.root-container'
import {TOKENS} from './app/di/di.tokens'
import './global.css'

async function startApp($root: HTMLElement): Promise<void> {
  console.debug('[🏁] Start', $root)
  const container = createDiRootContainer($root)
  const game = container.get(TOKENS.game)
  await game.start()
}

const appEl = document.getElementById('app')
if (!appEl) throw new Error(`appEl="#app" not found`)

startApp(appEl)
  .then(() => console.debug('[🏁] Finish'))
  .catch(error => console.error(error))
