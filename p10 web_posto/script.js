const usuario = document.querySelector("#usuario")
const senha = document.querySelector("#senha")
const entrar = document.querySelector("#entrar")
const nome_frentista = document.querySelector("#nome_frentista")
entrar.addEventListener("click", verificar)
const add_novo = document.querySelector("#add_novo")
add_novo.addEventListener("click", campo_cadastro)

const senha_gerente = "010203"
const arr_login = [
	{
		id: 10,
		nome: "Hugo Henrique",
		senha: "4563",
	},
	{
		id: 3,
		nome: "Carlos Elymar",
		senha: "321",
	},
]

function verificar() {
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
	}
}

function validarSenha(el, sv) {
	if (el.senha == sv) {
		alert("Usuário " + el.nome + " foi conectado.")
		logar(el)
	} else {
		alert("Senha inválida")
	}
}

function logar(logado) {
	nome_frentista.innerHTML = logado.nome.toUpperCase() + " "

	let but = document.createElement("button")
	but.innerHTML = "Desconectar"
	but.addEventListener("click", () => {
		nome_frentista.innerHTML = '"NINGUÉM CONECTADO"'
		usuario.value = ""
		senha.value = ""
	})
	nome_frentista.appendChild(but)
}

function campo_cadastro() {
	const div_back = document.createElement("div")
	div_back.setAttribute("class", "div_back")
	div_back.innerHTML = '<div class="div_cadastro">' + '<div class="novo_frentista">' + '<label for="novo_ID">Novo ID: </label>' + '<input type="number" id="novo_ID">' + '<label for="novo_nome">Nome: </label>' + '<input type="text" id="novo_nome">' + '<label for="nova_senha">Senha: </label>' + '<input type="number" id="nova_senha">' + "</div>" + '<div class="div_concluir">' + '<label for="gerente">Senha do Gerente: </label>' + '<input type="password" id="gerente">' + '<input type="button" value="Salvar" id="salvar">' + '<input type="button" value="Cancelar" id="cancelar">' + "</div>" + "</div>"

	setTimeout(() => {
		const novo_ID = document.querySelector("#novo_ID")
		const novo_nome = document.querySelector("#novo_nome")
		const nova_senha = document.querySelector("#nova_senha")
		const gerente = document.querySelector("#gerente")

		const cancelar = document.querySelector("#cancelar")
		cancelar.addEventListener("click", remover_cadastro)

		function remover_cadastro() {
			document.body.removeChild(div_back)
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
			if (gerente.value != senha_gerente) {
				return alert("Senha do gerente inválida!")
			}
			arr_login.push({
				id: novo_ID.value,
				nome: novo_nome.value,
				senha: nova_senha.value,
			})
			remover_cadastro()
			setTimeout(() => {
				alert("Cadastro realizado com sucesso.")
			}, 500)
		})
	}, 10)

	document.body.appendChild(div_back)
}
