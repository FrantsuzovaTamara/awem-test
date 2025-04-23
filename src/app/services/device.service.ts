export class DeviceService {
  public readonly WINDOW_MAX_WIDTH: number = 1400
  public readonly WINDOW_MAX_HEIGHT: number = 1400

  constructor() {}

  public getDevicePixelRatio(): number {
    return window.devicePixelRatio || 1
  }

  public getWindowWidth(): number {
    return window.innerWidth
  }

  public getWindowHeight(): number {
    return window.innerHeight
  }
}

export default DeviceService
