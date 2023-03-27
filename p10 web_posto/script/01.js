const main_menu = document.querySelector("#main_menu")
const txt_logado = document.querySelector("#txt_logado")
var logado = JSON.parse(localStorage.logado)
txt_logado.innerHTML = logado.nome

if (logado == false) {
	document.querySelector("#not_logged_in").style.display = "flex"
}

import { clock , today } from "./time.js"
function clockOn() {
	clock(document.querySelector("#txt_clock"))
	today(document.querySelector("#txt_today"))
}
clockOn()
setInterval(clockOn, 1000);

const gasolina = document.querySelector("#gasolina")
gasolina.addEventListener("click", abastecimentos)

function abastecimentos() {
	window.location.href = "./02.html"
}

const back_shadow = document.querySelector("#back_shadow")
back_shadow.addEventListener("click", closeMenu)

function closeMenu() {
	main_menu.style.left = "-100%"
	back_shadow.style.display = "none"
}

const icon_menu = document.querySelector("#icon_menu")
icon_menu.addEventListener("click", showMenu)

function showMenu() {
	main_menu.style.left = "0%"
	back_shadow.style.display = "flex"
}
