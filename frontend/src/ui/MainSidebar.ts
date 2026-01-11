import { ht, cn } from './'


export type MainSidebarBtn = {
  text: string
  icon: (props?: any) => SVGSVGElement
  sep?: boolean
  onClick?: () => void
}

export type MainSidebarProps = HTMLDivElement & {
  alignment: 'left' | 'right'
  top: MainSidebarBtn[]
  bottom: MainSidebarBtn[]
}

export function MainSidebar(props: MainSidebarProps) {
  return ht`<div class="${cn(
    props.className,
    "absolute bg-base-300 w-11 flex flex-col flex-nowrap items-center bottom-6 top-0",
    props.alignment === 'left' ? 'left-0' : 'right-0',
  )}">

    <div class="absolute top-0 bottom-21 overflow-auto border-b border-b-neutral-500">
      ${props.top.map(_ => (ht`
        ${_.sep && ht`<div class="border-t border-t-neutral-500"></div>`}
        <Button shape="square" buttonStyle="ghost" className="hover:btn-accent self-center w-9 h-9 mt-1 mb-1" title="${_.text}">
          ${_.icon({ "class": "w-5 h-5" })}
        </Button>
      `))}
    </div>

    <div class="absolute bottom-1 flex flex-col items-center">
      ${props.bottom.map(_ => (ht`
        <div class="tooltip tooltip-right" data-tip="${_.text}">
          <Button shape="square" buttonStyle="ghost" className="hover:btn-info self-center w-6 h-6" aria-label="${_.text}">
            ${_.icon({ "class": "w-4 h-4" })}
          </Button>
        </div>
      `))}
    </div>
</div>`
}
