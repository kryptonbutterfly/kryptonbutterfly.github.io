class Slides extends HTMLElement {
	static get observedAttributes() {
		return ['prev', 'next'];
	}
	
	static defaultPrevious = "❮";
	static defaultNext = "❯";

	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: "open"});
		shadowRoot.innerHTML = `<style>
		.prev, .next {
			cursor: pointer;
			position: absolute;
			top: 50%;
			width: auto;
			padding: 16px;
			color: white !important;
			font-weight: bold;
			font-size: 18px;
			transition: 0.3s ease;
			transform: translate(0, -50%);
			user-select: none;
			z-index: 1;
		}
		.prev {
			border-radius: 0 0.5em 0.5em 0;
			left: 0;
		}
		.next {
			border-radius: 0.5em 0 0 0.5em;
			right: 0;
		}
		.prev:hover, .next:hover {
			background: #000C;
		}
		div {
			font-size: 14px;
			padding: 8px 12px;
			position: absolute;
			top: 0;
			color: whitesmoke;
		}
		</style>
		<slot></slot>`;
		const style = document.createElement("style");
		style.textContent = `
			:host {
				display: block;
				margin: 1em 0em;
				border-radius: 1em;
				position: relative;
				height: 24em;
				background: dimgray;
				padding: 1em 0em;
			}
			::slotted(img) {
				display: block;
				position: absolute;
				top: 50%;
				left: 50%;
				max-width: 100%;
				max-height: 22em;
				transform: translate(-50%, -50%);
			}
			::slotted(.invis) {
				display: none;
			}
			`;
		shadowRoot.appendChild(style);
		this.label = document.createElement("div");
		this.label.classList.add("dark");
		this.label.part = "slide-counter";
		shadowRoot.appendChild(this.label);
		this.prev = document.createElement("span");
		this.prev.classList.add("prev");
		this.prev.onclick = (e) => this.nextSlide(false);
		shadowRoot.appendChild(this.prev);
		this.next = document.createElement("span");
		this.next.classList.add("next");
		this.next.onclick = (e) => this.nextSlide(true);
		shadowRoot.appendChild(this.next);
		this.slide = 0;
	}

	showSlide(direction = 0) {
		const slides = this.getElementsByTagName("img");
		const count = slides.length;
		if (count > 0) {
			this.slide = (this.slide + direction + count) % count;
			let isLazy = false;
			for (let i = 0; i < count; i++)
			{
				const s = slides[i];
				const lazy = s.getAttribute("loading") == "lazy";
				isLazy ||= lazy;
				if (i == this.slide)
					s.classList.remove("invis");
				else
					s.classList.add("invis");
			}
			if (isLazy) {
				if (direction != 0) {
					this.preloadNeighbor(slides, direction);
				}
				else {
					this.preloadNeighbor(slides, 1);
					this.preloadNeighbor(slides, 1);
				}
			}
		}
		this.label.innerHTML = `${this.slide + 1}/${count}`;
	}

	preloadNeighbor(slides, direction) {
		setTimeout(() => {
			const index = (this.slide + direction + slides.length) % slides.length;
			const slide = slides[index];
			fetch(slide.src);
		});
	}
	
	nextSlide(forward) {
		this.showSlide(forward ? 1 : -1)
	}

	connectedCallback() {
		this.prev.innerHTML = this.getAttribute("prev") ?? Slides.defaultPrevious;
		this.next.innerHTML = this.getAttribute("next") ?? Slides.defaultNext;
		const slot = this.shadowRoot.querySelector('slot');
		slot.addEventListener('slotchange', (e) => this.showSlide());
	}
}

customElements.define("slides-", Slides)

