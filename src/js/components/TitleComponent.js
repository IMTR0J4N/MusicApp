import '../builder/ComponentBuilder';

class TitleComponent extends ComponentBuilder {
    constructor() {
        super();
    }

    // static get observedAttributes() {
    //     return ['title'];
    // }

    // renderer() {
    //     this.shadowRoot.innerHTML = `
    //         <h1>${this.getAttribute('title')}</h1>
    //     `;
    // }
}

customElements.define('title-component', TitleComponent);