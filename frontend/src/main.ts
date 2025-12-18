import van from "vanjs-core"
// import van from "vanjs-core/debug"
import htm from 'htm'
// import htm from 'htm/mini'

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
      <button class="btn-secondary" onclick=${()=> ++counter.val}>👍</button>
      <button class="btn-secondary" onclick=${()=> --counter.val}>👎</button>
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
      <button class="btn btn-neutral" onclick=${window.greet}>${_.btnText ?? "Say Hi"}</button>
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

const html = htm.bind((tagNameOrCtor: any, props: Record<string, any>, ...children: any[]): Node => {
  const ctor = (typeof tagNameOrCtor === 'function') ? tagNameOrCtor : van.tags[tagNameOrCtor]
  return props ? ctor(props, ...children) : ctor(...children)
})

main()
