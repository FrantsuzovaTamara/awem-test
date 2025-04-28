export type Position = {x: number; y: number}
export type Size = {width: number; height: number}

export type ResizeHandlerOptions = {
  screenAspect: {isChanged: boolean; value: ScreenAspect}
}

export type Resource = {
  alias: string
  src: string
}

export enum ScreenAspect {
  Album = 'album',
  Portrait = 'portrait',
}
