const usuario = document.querySelector("#usuario")
const senha = document.querySelector("#senha")
const entrar = document.querySelector("#entrar")
const nome_frentista = document.querySelector("#nome_frentista")
entrar.addEventListener("click", verify)
const add_novo = document.querySelector("#add_novo")
add_novo.addEventListener("click", campo_cadastro)

import { clock , today } from "./time.js"
function clockOn() {
	clock(document.querySelector("#txt_clock"))
	today(document.querySelector("#txt_today"))
}
clockOn()
setInterval(clockOn, 1000);

const pass_manager = "333"

localStorage.logado = false

// function acessar_dados() {
// 	arr_login = JSON.parse(localStorage.arr)
// 	console.log(arr_login)
// }

// function salvar_dados() {
// 	localStorage.arr = JSON.stringify(arr_login)
// 	console.log(localStorage.arr)
// }

var arr_login = []
arr_login.push(
	{
		id: 10,
		nome: "HUGO HENRIQUE",
		senha: "4563",
	},
	{
		id: 3,
		nome: "CARLOS ELYMAR",
		senha: "321",
	}
)

usuario.addEventListener("input", enable_btn)
senha.addEventListener("input", enable_btn)
function enable_btn() {
	if (usuario.value.length > 0) {
		if (senha.value.length > 0) {
			entrar.removeAttribute("disabled", "disabled")
		} else {
			entrar.setAttribute("disabled", "disabled")
		}
	} else {
		entrar.setAttribute("disabled", "disabled")
	}
}

function verify() {
	let uv = usuario.value
	let sv = senha.value

	if (uv == "" || sv == "") {
		alert("Preencha todos os campos.")
	} else if (uv.length > 2) {
		alert("Usuário só pode ter até 2 números.")
	} else if (sv.length > 4) {
		alert("Senha só pode conter até 4 dígitos.")
	} else {
		validarLogin(uv, sv)
	}
}

function validarLogin(uv, sv) {
	let res = arr_login.some((el, i) => {
		if (el.id == uv) {
			validarSenha(el, sv)
			return el
		}
	})
	if (!res) {
		alert("Usuário não registrado.")
		limparCampos()
	}
}

function validarSenha(el, sv) {
	if (el.senha == sv) {
		logar(el)
	} else {
		alert("Senha inválida")
		senha.value = ""
	}
}

function logar(logado) {
	window.location.href = "./pages/01.html"
	localStorage.logado = JSON.stringify(logado)
	// nome_frentista.innerHTML = logado.nome.toUpperCase() + " "

	// let but = document.createElement("button")
	// but.innerHTML = "Desconectar"
	// but.addEventListener("click", () => {
	// 	nome_frentista.innerHTML = '"NINGUÉM CONECTADO"'
	// 	limparCampos()
	// })
	// nome_frentista.appendChild(but)
}

function limparCampos() {
	usuario.value = ""
	senha.value = ""
}

function campo_cadastro() {
	const back_div = document.createElement("div")
	back_div.setAttribute("class", "back_div")
	back_div.innerHTML = '<div class="div_cadastro">' + '<div class="novo_frentista">' + '<label for="novo_ID"> Novo ID: </label>' + '<input type="number" id="novo_ID">' + '<label for="novo_nome"> Nome: </label>' + '<input type="text" id="novo_nome">' + '<label for="nova_senha"> Senha: </label>' + '<input type="number" id="nova_senha">' + "</div>" + '<div class="div_concluir">' + '<label for="gerente">Senha do Gerente: </label>' + '<input type="password" id="gerente">' + '<input type="button" value="Salvar" id="salvar">' + '<input type="button" value="Sair" id="sair">' + "</div>" + "</div>"

	document.body.appendChild(back_div)

	const novo_ID = document.querySelector("#novo_ID")
	const novo_nome = document.querySelector("#novo_nome")
	const nova_senha = document.querySelector("#nova_senha")
	const gerente = document.querySelector("#gerente")

	const sair = document.querySelector("#sair")
	sair.addEventListener("click", remover_cadastro)

	function remover_cadastro() {
		let res = true
		if (novo_ID.value != "" || novo_nome.value != "" || nova_senha.value != "") {
			res = confirm("Todos os valores atuais serão perdidos. Tem certeza que deseja sair?")
		}
		if (res == true) {
			document.body.removeChild(back_div)
		}
	}

	const salvar = document.querySelector("#salvar")
	salvar.addEventListener("click", () => {
		if (novo_ID.value == "" || novo_nome.value == "" || nova_senha.value == "" || gerente.value == "") {
			return alert("Preencha todos os campos")
		}
		if (novo_ID.value.length > 2) {
			return alert("ID deve conter até 2 números.")
		}
		if (nova_senha.value.length > 4) {
			alert("Senha deve conter até 4 números.")
		}
		if (novo_nome.value.length < 3) {
			return alert("Nome deve conter o mínimo de 3 caracteres.")
		}
		let ID_igual = arr_login.filter((el) => {
			if (el.id == novo_ID.value) {
				return el
			}
		})
		if (ID_igual.length == 1) {
			return alert("ID já existe, escolha outro.")
		}
		if (gerente.value != pass_manager) {
			return alert("Senha do gerente inválida!")
		}
		arr_login.push({
			id: novo_ID.value,
			nome: novo_nome.value.toUpperCase(),
			senha: nova_senha.value,
		})
		document.body.removeChild(back_div)
		setTimeout(() => {
			alert("Cadastro realizado com sucesso.")
		}, 100)
	})
}

document.querySelector("#span_IDs").addEventListener("click", () => {
	const back_div = document.createElement("div")
	back_div.setAttribute("class", "back_div")
	document.body.appendChild(back_div)
})