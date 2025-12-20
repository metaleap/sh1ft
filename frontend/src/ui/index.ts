import van from 'vanjs-core'
// import van from 'vanjs-core/debug'
import htm from 'htm'
// import htm from 'htm/mini'

import { Btn } from './daisy'

const compos = new Map<string, ((props: any, ...children: any[]) => Node | Node[])>([
  Btn,
].map(_ => [_.name, _]))


export const html = htm.bind((tagNameOrCtor: string | Function, props, ...children): Node => {
  const
    isCharUpper = (_: number) => _ > 64 && _ < 91, // 'A'..'Z'
    ctor = (typeof tagNameOrCtor === 'function')
      ? tagNameOrCtor
      : (isCharUpper(tagNameOrCtor.charCodeAt(0)) ? compos.get(tagNameOrCtor) : van.tags[tagNameOrCtor]) as Function
  if (!ctor || typeof ctor !== 'function')
    alert(`No such tag: ${tagNameOrCtor}`)
  return !props ? ctor(children) : ctor(props, children)
})

export type Cn = undefined | string | Cn[]

export function cn(...args: Cn[]) {
  const ret = new Set<string>()
  function walk(_: Cn) {
    if (Array.isArray(_))
      for (const it of _)
        walk(it)
    else if (_)
      ret.add(_)
  }
  walk(args)
  return ret.values().toArray().join(' ')
}
