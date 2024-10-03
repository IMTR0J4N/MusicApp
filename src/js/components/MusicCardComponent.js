export default class MusicCardComponent extends HTMLElement {

    constructor() {
        super()

        this.cssUrl = 'src/scss/components/music-card.scss';
        this.loaded = false;

        this.attachShadow({ mode: 'open' });

        this.load();
    }

    static get observedAttributes() {
        return ['liked', 'format', 'title', 'tag', 'artist', 'duration', 'cover'];
    }

    static style = null;

    async load() {
        if (!MusicCardComponent.style) {
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

            MusicCardComponent.style = styleSheet;
        }
        
        this.shadowRoot.adoptedStyleSheets = [MusicCardComponent.style];
        this.loaded = true;

        this.init()
    }

    init() {
        const div = document.createElement('div');
        const background = document.createElement('img');
        const button = document.createElement('button');
        const img = document.createElement('img');
        const tag = document.createElement('span');
        const title = document.createElement('span');

        background.className = 'background';

        title.className = 'title';

        button.appendChild(img);

        div.appendChild(background);
        div.appendChild(button);
        div.appendChild(tag);

        this.shadowRoot.appendChild(div);
        this.shadowRoot.appendChild(title);

        this.build();
    }

    build() {
        const div = this.shadowRoot.querySelector('div');
        const background = div.querySelector('img.background');
        const title = this.shadowRoot.querySelector('span.title');
        const button = div.querySelector('button');
        const img = button.querySelector('img');
        const tag = div.querySelector('span');

        background.setAttribute('src', this.getAttribute('cover') ?? '/assets/img/image.svg');

        img.setAttribute('src', this.getAttribute('liked') === 'true' ? '/assets/img/icons/heart-fill.svg' : '/assets/img/icons/heart.svg');
        img.setAttribute('alt', 'Coeur');

        tag.textContent = this.getAttribute('tag') ?? 'Tag';

        title.textContent = this.getAttribute('title') ?? 'Titre';

        div.className = this.getAttribute('format') ?? 'md';
    }

    attributeChangedCallback(name, oldValue, newValue) {
        
        if(!this.loaded) return;

        console.log(name, oldValue, newValue)

        if (MusicCardComponent.observedAttributes.includes(name) || MusicCardComponent.observedAttributes.includes(name) && oldValue && !newValue) {
            this.build();
        }
    }
}

customElements.define('music-card', MusicCardComponent);