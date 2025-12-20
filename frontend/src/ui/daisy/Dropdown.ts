let counter = 0

export function Dropdown(_: any, ...children: Element[]): Node[] {
  if (children.length !== 2) {
    alert("Dropdown without exactly 2 children: " + JSON.stringify(children))
    return []
  }
  counter++
  const [trigger, dropdown] = children
  trigger.setAttribute('popovertarget', 'popover-' + counter)
  trigger.setAttribute('style', (trigger.getAttribute('style') ?? '') + ';anchor-name:--anchor-' + counter)
  dropdown.toggleAttribute('popover', true)
  dropdown.setAttribute('id', 'popover-' + counter)
  dropdown.setAttribute('style', (dropdown.getAttribute('style') ?? '') + ';position-anchor:--anchor-' + counter)
  dropdown.classList.add('dropdown')
  return [trigger, dropdown]
}
