export default class NavItemComponent extends HTMLElement {

    constructor() {
        super()

        this.cssUrl = 'src/scss/components/navitem.scss';
        this.loaded = false;

        this.attachShadow({ mode: 'open' });

        this.load();
    }

    static get observedAttributes() {
        return ['active', 'icon', 'text'];
    }

    static style = null;

    async load() {
        if (!NavItemComponent.style) {
            console.log(this.cssUrl)
            const response = await fetch(this.cssUrl);

            let cssText = await response.text();

            const cssBegin = cssText.indexOf('__vite__css');
            const cssEnd = cssText.lastIndexOf('__vite__update');


            // Netoyage du résultat du fetch pour ne récuperer que le css
            if (cssBegin !== -1 && cssEnd !== -1) {
                cssText = cssText.substring(cssBegin + 15, cssEnd - 2);
                cssText = cssText.replaceAll('\\r', '');
                cssText = cssText.replaceAll('\\n', '');
            }

            const styleSheet = new CSSStyleSheet();

            styleSheet.replaceSync(cssText);

            NavItemComponent.style = styleSheet;
        }
        
        this.shadowRoot.adoptedStyleSheets = [NavItemComponent.style];
        this.loaded = true;

        this.init()
    }

    init() {
        this.li = document.createElement('li');

        const img = document.createElement('img');
        const a = document.createElement('a');

        if(this.hasAttribute('icon')) {
            this.li.appendChild(img);
        }

        this.li.appendChild(a);

        this.shadowRoot.appendChild(this.li);

        this.build();
    }

    build() {
        const a = this.shadowRoot.querySelector('a');
        const img = this.shadowRoot.querySelector('img');

        if(a) {
            a.setAttribute('href', this.getAttribute('href') ?? '#');
            a.textContent = this.getAttribute('text') ?? 'Texte';
        }

        if(img) img.setAttribute('src', this.hasAttribute('active') ? this.getAttribute('icon').replace('.svg', '-fill.svg') : this.getAttribute('icon'));

        this.li.className = this.hasAttribute('active') ? 'active' : '';
    }

    attributeChangedCallback(name, oldValue, newValue) {
        
        if(!this.loaded) return;

        console.log(name, oldValue, newValue)

        if (NavItemComponent.observedAttributes.includes(name) || NavItemComponent.observedAttributes.includes(name) && oldValue && !newValue) {
            this.build();
        }
    }
}

customElements.define('nav-item', NavItemComponent);