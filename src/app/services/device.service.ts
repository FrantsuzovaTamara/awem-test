import {Position, ResizeHandlerOptions, ScreenAspect, Size} from '../types'

export class DeviceService {
  private readonly resizeHandlers: Array<(options: ResizeHandlerOptions) => void> = []

  public readonly currWindowSize: Size = {width: 0, height: 0}
  public readonly centralWindowPoint: Position = {x: 0, y: 0}
  public gameScaleFactor: number = 1
  public currScreenAspect: ScreenAspect = ScreenAspect.Album

  constructor() {}

  public init(): void {
    this.updateWindowData()
    window.addEventListener('resize', this.onGlobalResize)
    window.addEventListener('orientationchange', this.onGlobalResize)
  }

  public onResize(handler: (data: ResizeHandlerOptions) => void): void {
    this.resizeHandlers.push(handler)
  }

  public getDevicePixelRatio(): number {
    return window.devicePixelRatio || 1
  }

  private readonly onGlobalResize = (): void => {
    const currScreenAspect = this.currScreenAspect
    this.updateWindowData()

    const isScreenAspectChanged = currScreenAspect !== this.currScreenAspect

    this.resizeHandlers.forEach(handler =>
      handler({screenAspect: {isChanged: isScreenAspectChanged, value: this.currScreenAspect}}),
    )
  }

  private updateWindowData(): void {
    const windowSize = this.getWindowSize()
    this.updateWindowSize(windowSize)
    this.updateCentralPoint(windowSize)
    this.updateScreenAspect(windowSize)
  }

  private updateWindowSize(windowSize: Size): void {
    this.currWindowSize.width = windowSize.width
    this.currWindowSize.height = windowSize.height
  }

  private updateCentralPoint(windowSize: Size): void {
    this.centralWindowPoint.x = windowSize.width / 2
    this.centralWindowPoint.y = windowSize.height / 2
  }

  private updateScreenAspect(windowSize: Size): void {
    this.currScreenAspect = windowSize.width > windowSize.height ? ScreenAspect.Album : ScreenAspect.Portrait
  }

  private getWindowSize(): Size {
    return {width: window.innerWidth, height: window.innerHeight}
  }
}

export default DeviceService
