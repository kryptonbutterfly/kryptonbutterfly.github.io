function copyToClipboard(btn, text) {
	navigator.clipboard.writeText(text)
		.then(() => {
			const msg = btn.parentElement.querySelector("span");
			msg.style.display = "inline";
			setTimeout(() => {
				msg.style.display = "none";
			}, 1500);
		}).catch(err => {
			console.log("Failed to copy text: " + err);
		});
}

function createContent(content, copy) {
	return `${content}
<div style="float:right">
<span id="copy-message" style="font-size:100%; background:#8888; border:0px; border-radius:15px; padding: 2px 10px;display:none;">Copied!</span>
<button style="width:16px; height:16px; background-image: url('assets/copy.svg'); background-size: cover; background-color: #0000; border:none; cursor:pointer;"/></div>`;
}

class TermUser extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open'});
		this.setAttribute('content', this.innerHTML);
		this.render();
	}

	render() {
		const content = this.getAttribute('content');
		this.shadowRoot.innerHTML = createContent(content, content);
		const btn = this.shadowRoot.querySelector("button");
		btn.addEventListener('click', () => {
			copyToClipboard(btn, content);
		});
	}

	static get observedAttributes() {
		return ['content'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.render();
	}
}

class TermRoot extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open'});
		this.setAttribute('content', this.innerHTML);
		this.render();
	}

	render() {
		const content = this.getAttribute('content');
		const root = `sudo ${content}`;
		this.shadowRoot.innerHTML = createContent(content, root);
		const btn = this.shadowRoot.querySelector("button");
		btn.addEventListener('click', () => {
			copyToClipboard(btn, root);
		});
	}

	static get observedAttributes() {
		return ['content'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.render();
	}
}

customElements.define('term-user', TermUser);
customElements.define('term-root', TermRoot);

