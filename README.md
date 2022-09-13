# 📝 Crafting Front-End Formation - Cheat sheet

___

## Summary

1. [Creating Web Component](#1)\
1.1  [How to create a web component ?](#11)\
1.2  [How to import component in file ?](#12)\
1.3  [How to set a web component attribute ?](#13)\
1.4  [How to create a custom event and dispatch it ?](#14)
1.5  [How to listen and handle an event ?](#15)

1. [Testing Web component](#2)\
2.1  [How to load my web component ?](#21)\
2.2  [How to access to the DOM of my web component ?](#22)\
2.3  [How to create a story with controls](#23)\
2.4  [How to do snapshot test with Jest ?](#24)\
2.5  [How to create a custom event and dispatch it ?](#25)\
2.6  [How to create a stub of a function ?](#26)\
2.7  [How to set attributes to a web component ?](#27)

1. [Utilities & Cheat sheet](#3)\
3.1  [DOM selectors cheat sheet](#31)\
3.2  [Jest cheat sheet](#32)\
3.3  [Functions](#33)\
3.4  [Playwrigth cheat sheet](#34)

1. [Exercices Helpers](#4)\
4.1  [Create a Footer - Exercice n°2](#41)\
4.2  [Testing Betting-list - Exercice n°4](#42)

___

## 📗 1. Creating Web component<a id='1'></a>

#### 1.1 How to create a web component ?<a id='11'></a>

```js
import { CustomHTMLElement } from '../../utils'

/* Create template */
const template = document.createElement('template');
function createTemplate(name: string): string {
    return `
        <div>Hello ${name} !</div>
    `
}
export class MyComponent extends CustomHTMLElement {
     constructor() {
        super()

        /* Attach template to shadow DOM */
        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        /* Create template with variable on the first rendering */
        const name = 'Maxime'
        const newTemplate = createTemplate(name)
        this.renderComponent(newTemplate)
    }
}

/* Define tag with 'arl' prefix */
customElements.define('arl-my-component', MyComponent);
```

You can call now your component with the tag `<arl-my-component></arl-my-component>`

#### 1.2 How to import component in file ?<a id='12'></a>

In order to import a component "Header" in `App.ts` for example use

```ts
import './src/components/header/header'
```

#### 1.3 How to set a web component attribute ?<a id='13'></a>

```HTML
<!-- /!\ attributes must be in lowercase --> 
<arl-footer is-user-connected="false"></arl-footer>​
```

```js
class MyComponent extends CustomHTMLElement {
    ...

     static get observedAttributes() {
        return ['is-user-connected']
    }

    attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string) {
        // catch any attributes changes
    }
}
```

#### 1.4 How to create a custom event and dispatch it ?<a id='14'></a>

```ts
const objectToPass = { key: 'value' }
const event = new CustomEvent('eventName', { detail: objectToPass }) /* 'detail' is mandatory in customEvent */

window.dispatchEvent(event)
```

#### 1.5 How to listen and handle an event ?<a id='15'></a>

```ts
window.addEventListener('eventName', callback())
```

___

## 📙 2. Testing Web component<a id='2'></a>

#### 2.1 How to load my web component ?<a id='21'></a>

```ts
class MyComponent extends CustomHTMLElement {}

const myComponent: HTMLElement = render(MyComponent)
```

#### 2.2 How to access to the DOM of my web component ?<a id='22'></a>

```js
// myComponent is a HTMLElement you can access to the DOM with classical js **methods**
myComponent.shadowRoot.querySelector(...)
```

#### 2.3 How to create a story with controls ?<a id="23"></a>

```ts
import { StorybookControls } from '../../models'
import './footer'

export default {
    title: 'Components/Footer',
    argTypes: {
        isUserConnected: {
            control: 'boolean',
            defaultValue: false
        },
    }
}

type ArgTypes = {
    isUserConnected: StorybookControls,
}

export const Default = (argTypes: ArgTypes) => `<arl-footer is-user-connected="${argTypes.isUserConnected}"></arl-footer>`
```

#### 2.4 How to do snapshot test with Jest ?<a id='24'></a>

```js
expect(...).toMatchSnapshot();
```

#### 2.5 How to spy parameters sent (dispatchEvent) ?<a id='25'></a>

```ts
const spyDispatchEvent = jest.spyOn(window, 'dispatchEvent');
const expectedParameters = (spyDispatchEvent.mock.calls[nthCall][nthParameter] as CustomEvent).detail /* nthCall: represent the nth call that we want to watch, nthParameter represent the nth parameter sent that we want to watch */
expect(expectedBetChoice).toEqual({ ... })
```

#### 2.6 How to create a stub of a function ?<a id='26'></a>

```ts
const stub = { key: 'value' }

jest.mock('../../services', () => ({
  fetchGameOdds: jest.fn().mockResolvedValue(stub)
}))
```

#### 2.7 How to set attribute to a web component ?<a id='27'></a>

```ts
const objectToPass = { key: 'value' }
const myComponent: HTMLElement = render(MyComponent)

myComponent.setAttribute('my-prop-key', JSON.stringify(objectToPass))
```

___

## 📕 3. Utilities & Cheat sheet<a id='3'></a>

#### 3.1 DOM selectors cheat sheet<a id='31'></a>

##### querySelectorAll

```ts
/* Return an array of requested DOM elements */
myComponent.querySelectorAll(' CSS selectors ')
```

##### querySelector

```ts
/* Return the requested DOM element */
myComponent.querySelector(' CSS selectors ')
```

##### contains

```ts
/* Return true/false if class exists or not in requested element  */
myComponent.classList.contains(' class name')
```

##### click

```ts
/* Simulate a click */
myComponent.click()
```

#### 3.2 Jest cheat sheet<a id='32'></a>

##### toBeTruthy

```ts
/* Check if value exists or is true */
expect(value).toBeTruthy()
```

##### toBeFalsy

```ts
/* Check if value does NOT exist or is false */
expect(value).toBeFalsy()
```

##### toEqual

```ts
/* Check equality with object/array */
expect(value).toEqual(expectedValue)
```

##### toBe

```ts
/* Check equality with literal type */
expect(value).toBe(expectedValue) 
```

##### toContain

```ts
/* Check if value contains a expected value */
expect(value).toContain(expectedValue) 
```

##### toHaveBeenCalled

```ts
/* Check if method have been called (true / false) */
expect(method).toHaveBeenCalled(expectedValue) 
```

##### toMatchSnapshot

```ts
/* Create or check validity of snapshot */
expect(...).toMatchSnapshot() 
```

#### 3.3 Functions in `utils/webComponent.ts`<a id='33'></a>

##### render

```ts
/* Instanciate a component and launch 'connectedCallback()' method if exists */
const myComponent: HTMLElement = render(MyComponent)
```

##### stringify

```ts
/* Stringify any type of variable in order to pass it as a prop */
myComponent.setAttribute('key-attribute', stringify(object))
```

##### parse

```ts
/* Parse any stringified attribute value in order to manipulate it */
attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    const parsedValue = parse(newValue)
}
```

#### 3.4 Playwrigth cheat sheet<a id='34'></a>

```ts
const browser: Browser = await chromium.launch({
    headless: true,
    slowMo: 0,
    devtools: false
})

const context: BrowserContext = await browser.newContext()
const page: Page = await context.newPage()

await myComponent.isBlockDisplayed('tag or CSS selectors')
await input.type('100')
await input.press('Backspace')
await myComponent.getSummaryContent()
```

___

## 📘 4. Exercices Helpers<a id='4'></a>

### 4.1 Create a Footer - Exercice n°2<a id='41'></a>

Update template depending on the recieved attributes.

```ts
import { CustomHTMLElement } from '../../utils'

function createTemplate(text: string): string {
    return `
        <footer>
            <h3>Besoin d'aide ?</h3>
            <p>${text}</p>
        </footer>
    `
}

export class Footer extends CustomHTMLElement {
    constructor() {
        ...
        this.render()
    }


    static get observedAttributes() {
        return ['is-user-connected']
    }

    attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string) {
        if (attributeName !== 'is-user-connected') {
            return
        }

        this.render(newValue)
    }

    render(isUserConnected?: string) {
        const footerText = (isUserConnected === 'true')
            ? 'Contact | Plan | Deconnexion'
            : 'Contact | Plan | Connexion'

        const newTemplate = createTemplate(footerText)
        this.renderComponent(newTemplate)
    }
}
```

### 4.2 Testing Betting-list - Exercice n°4<a id='42'></a>

Display a list of game odds using component `Betting Item`.

```ts
function createTemplate(gameOddsList: GameOdds[]) {
  return `
    <div class="betting-list">
        <h3>Liste des paris - Football</h3>
        ${gameOddsList
      .map((gameOdds: GameOdds) => `<arl-betting-item game-odds='${JSON.stringify(gameOdds)}'></arl-betting-item>`)
      .join('')
    }
    </div>
  `
}
```
