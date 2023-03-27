const txt_logado = document.querySelector("#txt_logado")
var logado = JSON.parse(localStorage.logado)
txt_logado.innerHTML = logado.nome

import { clock , today } from "./time.js"
function clockOn() {
	clock(document.querySelector("#txt_clock"))
	today(document.querySelector("#txt_today"))
}
clockOn()
setInterval(clockOn, 1000);
