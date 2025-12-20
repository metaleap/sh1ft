import van from 'vanjs-core'
// import van from 'vanjs-core/debug'


import { html } from './ui'

import './style.css'
// import logo from './assets/logo-universal.png'

import * as App from '../wailsjs/go/main/App'


declare global {
  interface Window {
    greet: () => Promise<void>
  }
}

function main() {
  van.add(document.body, Main())
}

function Main() {
  return 1 > 0 ? html`
    <div data-theme="business" class="w-screen h-screen overflow-hidden">
      <${Hello} />
      <hr />
      <Dropdown>
        <Button>Drop it</Button>
        <div class="w-77 h-44 bg-amber-800">Hola da drop</div>
      </Dropdown>
    </div>
  `: html`
      <div class="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <!-- Navbar -->
          <nav class="navbar w-full bg-base-300">
            <label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost">
              <!-- Sidebar toggle icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round"
                stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4">
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div class="px-4">Navbar Title</div>
          </nav>
          <!-- Page content here -->
          <div class="p-4">Page Content</div>
        </div>
      
        <div class="drawer-side is-drawer-close:overflow-visible">
          <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
          <div class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            <!-- Sidebar content here -->
            <ul class="menu w-full grow">
              <!-- List item -->
              <li>
                <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                  <!-- Home icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round"
                    stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4">
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path
                      d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                    </path>
                  </svg>
                  <span class="is-drawer-close:hidden">Homepage</span>
                </button>
              </li>
      
              <!-- List item -->
              <li>
                <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                  <!-- Settings icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round"
                    stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4">
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span class="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
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

  document.getElementById('result')!.innerText =
    await App.Greet(name)
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
