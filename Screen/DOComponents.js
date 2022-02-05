class Logo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
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


class ErrorDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      :host{
        min-width: 250px;
        min-height: 130px;
        background-color: rgb(230, 20, 20);
        color: rgb(255, 200, 200);
        position: absolute;
        top: 40px;
        left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: 5px;
        padding-right: 5px;
        z-index: 99;
      }
      .b{
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .b button{
        width: 126px;
        min-height: 30px;
        background-color: transparent;
        color: rgb(255, 170, 170);
        outline: none;
        border: none;
      }
      .b button:hover{
        background-color: rgb(255, 140, 140);
        color:rgb(230, 20, 20);
        cursor: pointer;
      }
    </style>
    <h2>Coś nie poszło</h2>
    <span id="errContent"></span>
    <div class="b">
        <button id="errDClose">Zamknij komunikat</button>
    </div>
    `
  }
}

customElements.define('error-dialog', ErrorDialog);

class FontSizeButtons extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      :host{
        width: 103px;
        height: 29px;
        text-align: center;
        line-height: 30px;
        margin-top: 4px;
        margin-left: 4px;
        display: flex;
        flex-direction: row;
      }
      button{
        width:25px;
        height:25px;
        background-color: transparent;
        margin-top: 2px;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        outline: none;
        border: none;
        border-bottom:2px solid transparent;
      }
      button:hover{
        border-bottom:2px solid var(--primary-colour);
      }
      .fontSizeField{
        width: 46px;
        height: 23px;
        outline: none;
        border: none;
        margin-top:2px;
        text-align: center;
        background-color: transparent;
        border-left: 1px solid rgba(250, 250, 250, .9);
        border-right: 1px solid rgba(250, 250, 250, .9);
        font-size: 1.1em;
        line-height: 40px;
      }
      .fontSizeField:hover{
        border-bottom:2px solid var(--primary-colour);
      }
      .fontSizeField:focus{
        border-bottom:2px solid var(--primary-colour);
      }
    </style>
    <button>
     <img src = "./img/minus.svg" alt = "minus" >
    </button>
    <input type="text" id="" value="0" class="fontSizeField">
    <button>
     <img src="./img/plus.svg" alt="minus">
    </button>`
  }
}

customElements.define('font-size-buttons', FontSizeButtons);


class WorkNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      :host{
        width:100%;
        height:38px;
        background-color: rgba(250, 250, 250, .9);
        display: flex;
        flex-direction: row;
      }
    </style>
    <slot></slot>
    `
  }
}

customElements.define('work-nav', WorkNav);