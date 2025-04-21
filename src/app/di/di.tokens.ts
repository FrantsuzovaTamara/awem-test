import {Factory, token} from 'brandi'
import {Game} from '../app'
import DeviceService from '../services/device.service'

export const TOKENS = {
  deviceService: token<DeviceService>('deviceSevice'),
  game: token<Game>('game'),
  root: token<HTMLElement>('root'),
}
