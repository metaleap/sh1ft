// codegen'd at 2026-01-12 00:02:09

import { doFetch } from './util/doFetch'

export type SpacesCreateArgs = {
}

export type SpacesCreateResult = {
  Id: number
}

export type Api1HolaArgs = {
  Name: string
}

export type Api1HolaResult = {
  Greeting: string
}

export type Api2DoubleArgs = {
  Num: number
}

export type Api2DoubleResult = {
  Doubled: number
}

export const Spaces = {
  Create: (async (_: SpacesCreateArgs): Promise<SpacesCreateResult> => {
    return doFetch<SpacesCreateArgs, SpacesCreateResult>('/Spaces/Create', _)
  })

}

export const Api1 = {
  Hola: (async (_: Api1HolaArgs): Promise<Api1HolaResult> => {
    return doFetch<Api1HolaArgs, Api1HolaResult>('/Api1/Hola', _)
  })

}

export const Api2 = {
  Double: (async (_: Api2DoubleArgs): Promise<Api2DoubleResult> => {
    return doFetch<Api2DoubleArgs, Api2DoubleResult>('/Api2/Double', _)
  })

}

