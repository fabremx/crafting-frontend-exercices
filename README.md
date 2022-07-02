# Memo

## Web Component Template

```js
/* Create template */
const template = document.createElement('template');
template.innerHTML = `
    <div>Hello World !</div>
`
class MyComponent extends HTMLElement {
     constructor() {
        super();

        /* Attach template to shadow DOM */
        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));
     }
}

/* Define tag */
customElements.define('arl-my-component', MyComponent);
```

In our HTML

```html
<body>
    <!-- Use our component -->
    <arl-my-component></arl-my-component>

     <!-- Import our component -->
    <script type="module" src="/myPath/my-component.ts"></script>
</body>
```

## How to test my web component ?

* How to load my component ?

```js
class MyComponent extends HTMLElement {}

const myComponent = new MyComponent();
```

* How to access to the rendering of my component ?

```js
// myComponent is a HTMLElement you can access to the DOM with classical js methods
myComponent.shadowRoot.querySelector(...)
```

## How to pass data to our components ?

```HTML
<!-- /!\ attributes must be in lowercase --> 
<arl-footer is-user-connected="false"></arl-footer>​
```

```js
class MyComponent extends HTMLElement {
    ...

     static get observedAttributes() {
        return ['is-user-connected']
    }

    attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string) {
        // catch any attributes changes
    }
}
```

## Step 2 - Helpers

code to render dynamic text ("Connexion" or "Déconnexion")

```html
<!-- Create empty p balise -->
<p></p>
```

```ts
appendText(isUserConnected: string) {
        const footerText = this.shadowRoot?.querySelector('#footer p');

        isUserConnected === 'true'
            ? footerText!.textContent = 'Contact | Plan | Log out'
            : footerText!.textContent = 'Contact | Plan | Log in';
    }
```

How to do snapshot test with Jest ?

```js
expect(...).toMatchSnapshot();
```
