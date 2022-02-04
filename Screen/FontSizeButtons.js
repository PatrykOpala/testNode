class FontSizeButtons extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<style>
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
                                border:none;
                            }
                            button:hover{
                            background-color: rgba(230, 230, 230, .8);
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
                          </style>
                          <button>
                            <img src = "./img/minus.svg" alt = "minus" >
                          </button >
                          <input type="text" id="" value="0" class="fontSizeField">
                          <button>
                            <img src="./img/plus.svg" alt="minus">
                          </button>`
    }
}

customElements.define('font-size-buttons', FontSizeButtons);