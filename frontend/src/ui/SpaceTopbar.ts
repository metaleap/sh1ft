import { ht, t } from './'
import { newSillyName } from '../util/sillyNames'

import { Ellipsis as svgMenu } from 'vanjs-lucide'

export type SpaceTopbarProps = {
}

export function SpaceTopbar(props: SpaceTopbarProps) {
  return ht`
    <div class="absolute right-0 flex items-center bg-base-300 top-0 h-11 pt-1 left-11 pl-4 pr-2">
      <div class="text-3xl text-nowrap whitespace-nowrap">Example space</div>
      <div class="overflow-x-auto grow border-r border-r-base-100">
      <div role="tablist" class="ml-2 pl-2 border-l border-l-base-100 tabs tabs-lift self-end flex-nowrap">
        <a role="tab" class="tab text-nowrap">${t.spaceTmplViewTitle}</a>
        <a role="tab" class="tab tab-active text-nowrap">${newSillyName()}</a>
        <a role="tab" class="tab text-nowrap">${newSillyName()}</a>
      </div>
      </div>
      <div class="ml-2">
        <Button size="xs" shape="circle" buttonStyle="ghost">${svgMenu({ "class": "w-5 h-5" })}</Button>
      </div>
    </div>
  `
}
