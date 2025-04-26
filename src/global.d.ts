export {}

declare global {
  interface Window {
    playableLoaded: () => void
    playableStarted: () => void
    playableFinished: () => void
    playableGoToStore: () => void
  }
}
