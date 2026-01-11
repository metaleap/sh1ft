import { ht, t } from './'
import { newSillyName } from '../util/sillynames'

import { Ellipsis as svgMenu } from 'vanjs-lucide'

export type SpaceTopbarProps = {
}

export function SpaceTopbar(props: SpaceTopbarProps) {
  return ht`
    <div class="absolute right-0 flex items-center bg-neutral top-0 h-11 left-11 pl-4 pr-2">
      <div class="text-3xl text-nowrap whitespace-nowrap">Example space</div>
      <div style="transform: scaleY(-1)" role="tablist" class="ml-2 pl-2 tabs tabs-lift self-end flex-nowrap border-l border-l-base-100 border-r border-r-base-100 grow overflow-auto">
        <a style="transform: scaleY(-1)" role="tab" class="tab tab-active">${t.spaceTmplViewTitle}</a>
        <a style="transform: scaleY(-1)" role="tab" class="tab">${newSillyName()}</a>
        <a style="transform: scaleY(-1)" role="tab" class="tab">${newSillyName()}</a>
      </div>
      <div class="ml-2">
        <Button size="xs" shape="circle" buttonStyle="ghost">${svgMenu({ "class": "w-5 h-5" })}</Button>
      </div>
    </div>
  `
}
