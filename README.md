# 📝 Crafting Front-End Formation - Cheat sheet

___

## Summary

1. [Creating Web Component](#1)\
1.1 [basic component](#11)\
1.2 [components inputs by attributes](#12)\
1.3 [components inputs/outputs by events](#13)\

2. [Testing](#2)\
2.1 [first test](#21)\
2.2 [snapshot](#22)\
2.3 [test with test doubles](#23)\
2.4 [playwright](#24)\

3. [Storybook](#3)\
3.2 [controls](#32)\
___

## 📗 1. Creating Web component<a id='1'></a>

####  1.1 basic component<a id='11'></a>
In new .ts file :

1) Create template
either
```js
const template = `<template><div>Hello !</div></template>`;
```
/!\ this one cannot be changed after the first rendering

or 
```js
const template = document.createElement('template');
function createTemplate(name: string): string {
    return `<div>Hello ${name} !</div>`
}
```
2) Create component by Extending CustomHTMLElement
```js
export class MyComponent extends CustomHTMLElement {
     constructor() {
        super()

        /* Attach template to shadow DOM */
        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
    }

    /* connectedCallback() is automatically called once on first rendering */
    connectedCallback() {
        /* Create template with variable */
        const name = 'Maxime'
        const newTemplate = createTemplate(name)
        this.renderComponent(newTemplate)
    }
}
```
3) Define your new tag
```js
/* Define tag with 'arl' prefix */
customElements.define('arl-my-component', MyComponent);
```
/!\ prefix is mandatory, prevent collision of tag names


4)  Where you want to use it 
    In HTML template
```HTML
 <arl-my-component></arl-my-component>
```
    In TS file
```ts
 import './src/components/MyComponent/MyComponent'
```

####  1.2 components inputs by attributes<a id='12'></a>

@see [example](https://github.com/arolla/crafting-frontend-exercices/tree/main/src/examples/web-component/web-component-declarative.html)

in HTLM
```HTML
<arl-footer is-user-logged-in="false"></arl-footer>
```
/!\ attributes must be in lowercase

in TS

```ts
class MyComponent extends CustomHTMLElement {
    //...

     static get observedAttributes() {
        return ['is-user-logged-in']
    }

    // called an attribute value of the tag changes
    attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string) {
        //attributeName = 'is-user-logged-in' (if this is the attribute that just changed)
        //newValue = 'false' (in this example)
        //oldValue is the previous value
    }
}
```

####  1.3 components inputs/outputs by events<a id='13'></a>
@see [example](https://github.com/arolla/crafting-frontend-exercices/tree/main/src/examples/web-component/web-component-imperative.html)

In HTML
```html
<body>
    <custom-element-imperative></custom-element-imperative>
</body>
```
output : to send data out of a component
```ts
        window.dispatchEvent(new CustomEvent('MY_EVENT', { detail: { payload: 'Toto' } }))
```
input : to get data from outside another component
```ts
     window.addEventListener('MY_EVENT', callback((event: CustomEvent) => console.log(event.detail.payload)))
```

___

## 📙 2. Testing <a id='2'></a>

#### 2.1 first test <a id='21'></a>

in myComponent.spec.ts
```ts
//import your component
import {MyComponent} from './my-component'

it('title should be the right thing', () => {
    //given
    const component = new MyComponent()
    
    //when
    // call the connectedCallback to mimic the rendering of the component (=init)
    component.connectedCallback(); 
    
    //then
    
    //get dom element
    const title = component.shadowRoot?.querySelector('.title')?.textContent;
    
    //assertion
    expect(title).toEqual('the right thing')
})
```

#### 2.2 snapshot test with Jest <a id='22'></a>

in myComponent.spec.ts
```ts
    const component = new MyComponent();
    component.connectedCallback();
    expect(component.shadowRoot?.querySelector('#component-id')).toMatchSnapshot()
```
* The first time you run the test,
it creates a file with the name of your test file that is the snapshot template of the component
in "__snapshots__" folder,

* next runs, this automatically generated file will be used to compare the snapshot of the component with the one generated by the test


#### 2.3 test with test doubles<a id='23'></a>

SPY
```ts
const spyDispatchEvent = jest.spyOn(window, 'dispatchEvent');
const expectedParameters = (spyDispatchEvent.mock.calls[nthCall][nthParameter] as CustomEvent).detail /* nthCall: represent the nth call that we want to watch, nthParameter represent the nth parameter sent that we want to watch */
expect(expectedBetChoice).toEqual({ ... })
```

STUB
```ts
const stub = { key: 'value' }

jest.mock('../../services', () => ({
  fetchGameOdds: jest.fn().mockResolvedValue(stub)
}))
```
___

## 3 Storybook <a id='3'></a>

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

#### 3.2 controls <a id="3.2"></a>

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
