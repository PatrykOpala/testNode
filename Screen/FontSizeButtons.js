class FontSizeButtons extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: 'open' })
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