class ComponentBuilder extends HTMLElement {
    constructor() {
        if(new.target === ComponentBuilder) throw new Error('Cannot instantiate abstract class');

        super();

        const link = document.createElement('link');

        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', 'src/scss/main.scss');

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(link);

        this.renderer();
    }

    static get observedAttributes() {
        throw new Error('Method not implemented');
    }

    renderer() {
        throw new Error('Method not implemented');
    }

    attributeChangedCallback(name) {
        if (ComponentBuilder.observedAttributes.includes(name)) {
            this.applyStyles();
        }
    }
}