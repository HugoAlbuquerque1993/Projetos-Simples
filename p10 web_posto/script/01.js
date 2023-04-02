import { is_logged } from "./database.js"
import { clock, today } from "./time.js"

function clockOn() {
	clock(document.querySelector("#txt_clock"))
	today(document.querySelector("#txt_today"))
}
clockOn()
setInterval(clockOn, 1000)

is_logged(document.querySelector("#txt_logged"),document.querySelector("#not_logged_in"))

const main_menu = document.querySelector("#main_menu")
const enter_bomb = document.querySelector("#enter_bomb")
enter_bomb.addEventListener("click", abastecimentos)

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

document.querySelector("#icon_back").addEventListener("click", logOff)
function logOff() {
	localStorage.logged = undefined
	window.location.href = "../index.html"
}
