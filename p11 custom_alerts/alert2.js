export default function alert2(text, title, type, btn) {
	class other_alert {
		constructor(config) {
			this.type = config.type
			this.title = config.title
			this.element = config.element
			this.text = config.text
			this.element.appendChild(this.builder())
			this.return = undefined
		}

		builder() {
			let back_shadow = document.createElement("div")
			back_shadow.className = "back_shadow"
			back_shadow.style = `
                position: absolute;
                display: flex;
                justify-content: center;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                color: white;
				background-color: #00000050;
            `

			let box_div = document.createElement("div")
			box_div.style = `
                position: fixed;
                display: flex;
                flex-direction: column;
                top: 15%;
                left: 50%;
                transform: translateX(-50%);
                width: 300px;
                color: #000;
                box-shadow: 5px 5px 5px #000000c0;
                border-radius: 5px 20px;
                overflow: hidden;
            `

			let top_side = document.createElement("div")
			top_side.style = `
                padding: 5px;
                text-align: center;
                background-image: linear-gradient(to bottom, #8b4513, #d2691e);
                box-shadow: inset 5px 5px 5px #ffffff50;
                color: #fff;
                font-size: 1.2rem;
                text-shadow: 3px 3px 2px #000;
                font-weight: bold;
            `

			let text_area = document.createElement("div")
			text_area.style = `
                padding: 16px;
                background-image: linear-gradient(to bottom, #fff, #bbb);
                box-shadow: inset 5px 5px 5px #ffffff50;
                overflow-y: auto;
                min-height: 50px;
                max-height: 150px;
                text-align: left;
            `

			let bot_side = document.createElement("div")
			bot_side.style = `
                background-image: linear-gradient(to bottom, #0000ff, #191970);
                box-shadow: inset 5px 0px 10px #ffffff50;
                text-align: end;
                padding: 10px;
            `
			if (this.type == "confirm") {
				bot_side.appendChild(this.cancel_btn())
			}
			if (this.type == "prompt") {
				bot_side.appendChild(this.prompt_btn())
			}
			bot_side.appendChild(this.ok_btn())
			top_side.innerHTML = this.title
			box_div.appendChild(top_side)
			text_area.innerHTML = this.text
			box_div.appendChild(text_area)
			box_div.appendChild(bot_side)
			back_shadow.appendChild(box_div)
			return back_shadow
		}

		ok_btn() {
			let confirm_btn = document.createElement("button")
			confirm_btn.innerHTML = "Beleza!"
			confirm_btn.style = `
                padding: 5px 10px;
                border-radius: 10px;
                cursor: pointer;
             `
			confirm_btn.addEventListener("click", () => {
				this.element.removeChild(this.element.lastElementChild)
				if (this.type != "prompt") {
					this.return = true
				}
			})
			return confirm_btn
		}

		cancel_btn() {
			let cancel_btn = document.createElement("button")
			cancel_btn.innerHTML = "Cancelar"

			cancel_btn.style = `
                padding: 5px 10px;
                border-radius: 10px;
                cursor: pointer;
               `

			cancel_btn.addEventListener("click", () => {
				this.element.removeChild(this.element.lastElementChild)
				this.return = false
			})
			return cancel_btn
		}

		prompt_btn() {
			let prompt_btn = document.createElement("input")
			prompt_btn.type = "text"

			prompt_btn.style = `
                padding: 5px 10px;
                border-radius: 10px;
                cursor: pointer;
               `

			prompt_btn.addEventListener("change", (e) => {
				this.return = e.target.value
			})
			return prompt_btn
		}
	}

	function new_alert() {
        if (btn) {
            btn.setAttribute("disabled", "disabled")
			btn.removeAttribute("disabled")
        }

		var a_alert = type == "prompt" 
			? type : type == "confirm" 
			? type : "alert"
		var a_element = document.body
		var a_title = title 
			? title : document.title + " diz:"
		var a_text = text 
			? text : `Passe os parâmetros para a função, todos devem ser string. Para saber como utilizar, inicie a função utilizando a string "ajuda" no seu script: alert2("ajuda")`

		if (text == "ajuda") {
			a_text = `Você pode passar até 4 parâmetros para esta função, todos são opcionais. <br> 
			O 1º parâmetro é o texto que desejar, assim como você fez agora para abrir o menu de ajuda. <br> 
			O 2º é o título, ele usa o nome do seu document.title como padrão, mas você pode usar o nome de sua preferência. <br> 
			O 3º parâmetro é o tipo da caixa, existem 3 tipos: "alert", "confirm" e "prompt". <br> 
			O 4º parâmetro é para caso seu evento de chamada utiize um botão para exibir o alert2, o botão não bugue, então salve seu botão numa variável e passe essa variável como 4º parâmetro. <br> 
			EX: alert2("Sejá bem vindo, novo usuário! Nos informe seu nome.", "Site diz:", "prompt", button) <br> 
			=> Por que buga? <= Após clicar no botão em tela, ele permanece selecionado. Se você apertar Enter ou Spacebar após clicar no seu botão, será possível abrir várias caixas alert uma por cima da outra. Passando seu botão como parâmetro isso não vai mais acontecer.`
		}
		
		const config_alert = {
			type: a_alert,
			element: a_element,
			text: a_text,
			title: a_title,
		}

		let data = new other_alert(config_alert)

		new Promise((res) => {
			function verifier() {
				if (data.return == undefined) {
					setTimeout(() => {
						verifier()
					}, 500)
				} else {
					res(data.return)
				}
			}
			verifier()
		}).then(function (value) {
			
		})
	}

	new_alert()
}
