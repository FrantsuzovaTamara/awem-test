export type Position = {x: number; y: number}

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
  srcs?: string
  src?: string
  data?: unknown
}
