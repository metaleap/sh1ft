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
  return html`
    <div data-theme="business" class="w-screen h-screen overflow-hidden">
      <${Hello} />
    </div>
  `
}

function Hello() {
  const counter = van.state(0)
  return html`
    <div class="text-xl">
      ${counter}
      <Btn color="secondary" size="sm" shape="circle" onclick=${() => ++counter.val}>👍</Btn>
      <Btn color="secondary" size="sm" shape="circle" onclick=${() => --counter.val}>👎</Btn>
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
      <Btn color="primary" onclick=${window.greet}>
        Yo ${_.btnText ?? "Say Hi"}
      </Btn>
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

  const result = await App.Greet(name)
  document.getElementById('result')!.innerText = result
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
