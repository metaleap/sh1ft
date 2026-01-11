import { ht, cn } from '../'
import * as daisy from './'

const undef = void 0

// TWduty
'btn-square btn-circle btn-wide btn-block btn-soft btn-outline btn-dash btn-ghost btn-link'
'btn-xs btn-sm btn-md btn-lg btn-xl'
'btn-neutral btn-primary btn-secondary btn-accent btn-info btn-success btn-warning btn-error'

export type ButtonProps = (HTMLButtonElement | HTMLAnchorElement | HTMLInputElement) & {
  tagName?: 'button' | 'input' | 'a'
  size?: daisy.Sizes | 'auto'
  shape?: 'square' | 'circle' | 'wide' | 'block'
  buttonStyle?: 'soft' | 'outline' | 'dash' | 'ghost' | 'link'
  color?: daisy.Colors
}

export function Button(props: ButtonProps, ...children: any[]) {
  const { tagName, size, shape, buttonStyle, color, ...btnProps } = props
  if (color === 'neutral' && (buttonStyle === 'dash' || buttonStyle === 'outline'))
    alert(`dark-incompatible button combo: 'neutral' color with '${buttonStyle}' style`)
  const Elem = tagName ?? 'button'
  return ht`<${Elem} ...${btnProps} role="${tagName !== 'a' ? undef : 'button'}" class="${cn(
    'btn',
    size === 'auto'
      ? "btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
      : (!size ? undef : `btn-${size}`),
    !shape ? undef : `btn-${shape}`,
    !buttonStyle ? undef : `btn-${buttonStyle}`,
    !color ? undef : `btn-${color}`,
    props.className,
  )}">${children}</${Elem}>`
}
