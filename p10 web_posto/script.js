const usuario = document.querySelector("#usuario")
const senha = document.querySelector("#senha")
const entrar = document.querySelector("#entrar")
const nome_frentista = document.querySelector("#nome_frentista")
entrar.addEventListener("click", verificar)
const add_novo = document.querySelector("#add_novo")
add_novo.addEventListener("click", campo_cadastro)

const senha_gerente = "010203"
const arrLogin = [
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
	let res = arrLogin.some((el, i) => {
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
		nome_frentista.innerHTML = '"FRENTISTA CONECTADO"'
        usuario.value = ""
        senha.value = ""
	})
	nome_frentista.appendChild(but)
}

function campo_cadastro() {
	const div_back = document.createElement("div")
	div_back.setAttribute("class", "div_back")
	div_back.innerHTML = '<div class="div_cadastro">' + '<div class="novo_frentista">' + '<label for="novo_ID">Novo ID: </label>' + '<input type="number" id="novo_ID">' + '<label for="novo_nome">Nome: </label>' + '<input type="text" id="novo_nome">' + '<label for="nova_senha">Senha: </label>' + '<input type="number" id="nova_senha">' + "</div>" + '<div class="div_concluir">' + '<label for="senha_gerente">Senha do Gerente: </label>' + '<input type="password" id="senha_gerente">' + '<input type="button" value="Salvar" id="salvar">' + '<input type="button" value="Cancelar" id="cancelar">' + "</div>" + "</div>"

	setTimeout(() => {
		let cancelar = document.querySelector("#cancelar")
		cancelar.addEventListener("click", () => {
			document.body.removeChild(div_back)
		})
	}, 10)

	document.body.appendChild(div_back)
}

