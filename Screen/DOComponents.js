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

class DragAndDrop extends HTMLElement{
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      :host{
        width: 100%;
        height: 99.7%;
        position: relative;
      }
      .dragAndDrop{
        position: absolute;
        width:100%;
        height:100%;
        text-align:center;
        font-size:1.3rem;
        color:rgba(2, 2, 2, .6);
        cursor:default;
      }
      .dragAndDrop > p{
        margin-top: 35vh;margin-left: 4vw;
      }
    </style>
    <div id="dragAndDrop" class="dragAndDrop">
      <p style="pointer-events: none;">Przeciągnij i upuść tutaj plik Worda, aby rozpocząć.</p>
    </div>
    `;

    this.attachEvent();
  }

  attachEvent(){
    this.shadowRoot.querySelector('#dragAndDrop').addEventListener("dragenter", (e)=>{
      e.preventDefault();
      e.stopPropagation();
      e.target.style.backgroundColor = "rgba(205, 205, 205, 1)";
    });
    this.shadowRoot.querySelector('#dragAndDrop').addEventListener("dragleave", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
    });
    this.shadowRoot.querySelector('#dragAndDrop').addEventListener("dragover", (e)=>{
        e.preventDefault();
        e.stopPropagation();
    });
    this.shadowRoot.querySelector('#dragAndDrop').addEventListener("drop",(e)=>{
        e.preventDefault();
        e.stopPropagation();
        e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
        if(e.dataTransfer.files.length > 0){
            let files = e.dataTransfer.files;
            let dEvent = new CustomEvent('dd', {
              detail: {
                f: files
              },
              composed: true
            });
            this.shadowRoot.dispatchEvent(dEvent);
        }
    });
  }
}
customElements.define('drag-and-drop', DragAndDrop);

