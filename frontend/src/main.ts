import van from 'vanjs-core'
// import van from 'vanjs-core/debug'

import { html } from './ui'

import './style.css'


import { Plus as svgAdd, Settings as svgConfig, Search as svgFind, Import as svgImport, Archive as svgBackup, ArrowRightLeft as svgInOut } from 'vanjs-lucide'


declare global {
  interface Window {
    greet: () => Promise<void>
  }
}

function main() {
  van.add(document.body, Main())
}

function Main() {
  return 1 < 0 ? html`
    <div data-theme="business" class="w-screen h-screen overflow-hidden">
      <${Hello} />
      <hr />
      <Dropdown>
        <Button>Drop it</Button>
        <div class="w-77 h-44 bg-amber-800">Hola da drop</div>
      </Dropdown>
    </div>
  `: html`
      <div class="drawer drawer-open" data-theme="xbusiness">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <!-- Navbar -->
          <nav class="navbar w-full bg-base-300">
            <label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost">
              <!-- Sidebar toggle icon -->
              ${svgInOut}
            </label>
            <div class="px-4">Navbar Title</div>
          </nav>
          <!-- Page content here -->
          <div class="p-4">Page Content</div>
        </div>

        <div class="drawer-side is-drawer-close:overflow-visible">
          <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
          <div class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-12 is-drawer-open:w-123">
            <!-- Sidebar content here -->
            <ul class="menu w-full p-0 grow mt-3.5">
              <li>
                <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                  ${svgAdd}
                </button>
              </li>
            </ul>

            <ul class="menu w-full p-0 self-end">
              <li>
                <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right btn-active btn-secondary"
                  data-tip="Find">
                  ${svgFind}
                </button>
              </li>
              <li>
                <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Import / Export">
                  ${svgImport}
                </button>
              </li>
              <li>
                <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Backup / Share">
                  ${svgBackup}
                </button>
              </li>
              <li>
                <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                  ${svgConfig}
                </button>
              </li>
            </ul>
          </div>
          <div class="bg-base-content h-full w-111 overflow-auto absolute left-12 right-0 top-0 bottom-0 is-drawer-close:w-0">
            yoohoo
            <hr />
            yeah kewl
          </div>
        </div>
      </div>
  `
}

function Hello() {
  const counter = van.state(0)
  return html`
    <div class="text-xl">
      ${counter}
      <Button color="secondary" size="sm" shape="circle" onclick=${() => ++counter.val}>👍</Button>
      <Button color="secondary" size="sm" shape="circle" onclick=${() => --counter.val}>👎</Button>
    </div>
    <hr />
    <${WailsDemo} btnText="Greet" />
  `
}

function WailsDemo(_: { btnText?: string }) {
  return html`
    <div id="result">Please enter your name below</div>
    <div>
      <${TextInput} class="input bg-base-300" id="name" type="text" />
      <Button color="primary" onclick=${window.greet}>
        Yo ${_.btnText ?? "Say Hi"}
      </Button>
    </div>
  `
}

function TextInput(_: HTMLInputElement) {
  function onTextInputKeyUp(evt: KeyboardEvent) {
    if (evt.ctrlKey && evt.key === 'z')
      document.execCommand(evt.shiftKey ? 'redo' : 'undo')
    else if (evt.ctrlKey && evt.key === 'y')
      document.execCommand('redo')
  }
  return html`<input ...${_} onkeyup=${onTextInputKeyUp} />`
}

window.greet = errable(async () => {
  const name = (document.getElementById('name') as HTMLInputElement)?.value.trim() ?? ""
  if (name === "")
    return

  const fakeApi = async (s: string) => `Hola ${s}, how are ya?`
  document.getElementById('result')!.innerText =
    await fakeApi(name)
})


function errable(fn: () => Promise<void>) {
  return async () => {
    try {
      await fn()
    } catch (err) {
      const s1 = `${err}`, s2 = JSON.stringify(err)
      alert(s1 + ('\n\n') + s2)
    }
  }
}

main()
