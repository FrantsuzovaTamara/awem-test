import {createDiRootContainer} from './app/di/di.root-container'
import {TOKENS} from './app/di/di.tokens'
import './global.css'
import TESTapi from './test.js'

async function startApp($root: HTMLElement): Promise<void> {
  const container = createDiRootContainer($root)
  const game = container.get(TOKENS.game)
  await game.start()
}

new TESTapi()

const appEl = document.getElementById('app')
if (!appEl) throw new Error(`appEl="#app" not found`)

startApp(appEl)
  .then(() => window.playableStarted())
  .catch(error => console.error(error))
