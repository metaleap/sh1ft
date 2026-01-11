import { ht, t } from './'

import { Bell as svgBell } from 'vanjs-lucide'


export type MainStatusbarItem = {
  text: string
  icon: (props?: any) => SVGSVGElement
  sep?: boolean
  onClick?: () => void
}

export type MainStatusbarProps = HTMLDivElement & {
  top: MainStatusbarItem[]
  bottom: MainStatusbarItem[]
}

export function MainStatusbar(props: MainStatusbarProps) {
  return ht`
    <div class="absolute right-0 flex items-center bg-base-300 bottom-0 h-6 left-0">
      <div class="flex items-center">
        <Button shape="square" size="xs" buttonStyle="ghost" className="text-lg">?</Button>
      </div>
      <div class="flex items-center absolute right-0 p-1">
        <Button title="${t.mainStatusbarNotifications}" shape="square" size="xs" buttonStyle="ghost" className="text-lg">${svgBell({ "class": "w-4 h-4" })}</Button>
      </div>
    </div>
  `
}
