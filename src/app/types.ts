export type Position = {x: number; y: number}
export type Size = {width: number; height: number}

export type ResizeHandlerOptions = {
  screenAspect: {isChanged: boolean; value: ScreenAspect}
}

export type AssetsObject = {
  spine: SpineAsset[]
  image: Resource[]
}

export type SpineAsset = {
  image: Resource
  atlas: Resource
  json: Resource
}

export type Resource = {
  alias: string
  src: string
  data?: unknown
}

export enum ScreenAspect {
  Album = 'album',
  Portrait = 'portrait',
}
