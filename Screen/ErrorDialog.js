class ErrorDialog extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: 'open' })
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