class Logo extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
    <style>
      :host{
        display:flex;
        flex-direction: row;
      }
      .whiteSquareRounded{
        width: 45px;
        height: 45px;
        background-color: var(--primary-colour);
        margin-right: 10px;
        margin-top: 2px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .Logo{
        font-size: 1.7rem;
        font-family: sans-serif;
        margin-top: 10px;
        color:var(--primary-colour);
      }

      .Logo > span{
        font-weight: 600;
        letter-spacing: 3px;
      }
    </style>
    <div class="whiteSquareRounded">
        <div style="width:26px;height:5px;background-color:rgba(250, 250, 250, .9);margin:1px;"></div>
        <div style="width:26px;height:5px;background-color:rgba(250, 250, 250, .9);margin:1px;"></div>
        <div style="width:26px;height:5px;background-color:rgba(250, 250, 250, .9);margin:1px;"></div>
    </div>
    <div class="Logo">Document <span>Office</span></div>
    <div style="width:2px;height:40px;background-color:var(--primary-colour);margin-top:6px;"></div>
    `
    }
}

customElements.define('do-logo', Logo);