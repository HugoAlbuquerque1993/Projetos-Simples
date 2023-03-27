const txt_logado = document.querySelector("#txt_logado")
var logado = JSON.parse(localStorage.logado)
txt_logado.innerHTML = logado.nome

import timer from "../script/timer.js"
setInterval(() => {
	timer(document.querySelector("#txt_timer"))
}, 1000);