const txt_logged = document.querySelector("#txt_logged")
var logged = JSON.parse(localStorage.logged)
txt_logged.innerHTML = logged.nome

import { clock , today } from "./time.js"
function clockOn() {
	clock(document.querySelector("#txt_clock"))
	today(document.querySelector("#txt_today"))
}
clockOn()
setInterval(clockOn, 1000);

import random_values from "./random_values.js"
const add_circle = document.querySelector("#add_circle")
add_circle.addEventListener("click", random_values(localStorage.logged))