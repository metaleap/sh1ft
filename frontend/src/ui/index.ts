import van from 'vanjs-core'
// import van from 'vanjs-core/debug'
import htm from 'htm'
// import htm from 'htm/mini'

import * as loc_en from '../loc.en.json'

import { Button, Dropdown } from './daisy'
import { MainSidebar } from './MainSidebar'
import { MainStatusbar } from './MainStatusbar'
import { SpaceTopbar } from './SpaceTopbar'


const i18n = { 'en': loc_en }
export const t = i18n['en']


const compos = new Map<string, ((props: any, ...children: any[]) => Node | Node[])>([
  Button,
  Dropdown,
  MainSidebar,
  MainStatusbar,
  SpaceTopbar,
].map(_ => [_.name, _]))


export const ht = htm.bind((tagNameOrCtor, props, ...children): Node => {
  const ctor = (typeof tagNameOrCtor === 'function')
    ? tagNameOrCtor
    : (compos.get(tagNameOrCtor) ?? van.tags[tagNameOrCtor])
  if (import.meta.env.DEV && (!ctor || typeof ctor !== 'function'))
    alert(`No such tag: ${tagNameOrCtor}`)
  return ctor(props ?? {}, ...children)
})

type Cn = undefined | string | Cn[]
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
