# 📝 Crafting Front-End Formation - Cheat sheet

___

## Summary

1. [Creating Web Component](#1)\
1.1 [basic component](#11)\
1.2 [components inputs by attributes](#12)\
1.3 [components inputs by events](#13)\
1.4 [components outputs by events](#14)\

2. [Testing](#2)\
2.1 [first test with Jest](#21)\
2.2 [snapshot](#22)\
2.3 [test with test doubles](#23)\
2.4 [playwright](#24)\

3. [Storybook](#3)\

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

@see [example](https://github.com/arolla/crafting-frontend-exercices/tree/main/src/examples/web-component/web-component-declartaive.html)

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
