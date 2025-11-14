import van from "vanjs-core"
// import van from "vanjs-core/debug"
import htm from 'htm/mini'

import './style.css'
import './app.css'
import logo from './assets/images/logo-universal.png'

import * as App from '../wailsjs/go/main/App'



declare global {
  interface Window {
    greet: () => Promise<void>
  }
}

function main() {
  van.add(document.getElementById('app')!, Hello())
}

function Hello() {
  const counter = van.state(0)
  return html`
    <div>
      ❤️ ${counter}
      <button onclick="${() => ++counter.val}">👍</button>
      <button onclick="${() => --counter.val}">👎</button>
    </div>
    <hr />
    <${WailsDemo} btnText='Greet' />
    <hr />`
}

function WailsDemo({ btnText = "Say Hello" }) {
  return html`
    <img id='logo' class='logo' src='${logo}' />
    <div class='result' id='result'>Please enter your name below</div>
    <div class='input-box' id='input'>
      <${TextInput} class='input' id='name' type='text' autocomplete='off' />
      <button class='btn' onclick=${window.greet}>${btnText}</button>
    </div>
  `
}

function onTextInputKeyUp(evt: KeyboardEvent) {
  if (evt.ctrlKey && evt.key === 'z')
    document.execCommand(evt.shiftKey ? 'redo' : 'undo')
  else if (evt.ctrlKey && evt.key === 'y')
    document.execCommand('redo')
}

function TextInput(props: HTMLInputElement) {
  return html`<input ...${props} onkeyup=${onTextInputKeyUp} />`
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
      alert(s1 + '\n\n' + s2)
    }
  }
}

const html = htm.bind((type: any, props: Record<string, any>, ...children: any[]): Node => {
  const tag = (typeof type === 'function') ? type : van.tags[type]
  if (props)
    return tag(props, ...children)
  return tag(...children)
})


main()
