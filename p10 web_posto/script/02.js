import { is_logged } from "./database.js"
import { clock, today } from "./time.js"
import random_sales from "./random_sales.js"

function clockOn() {
	clock(document.querySelector("#txt_clock"))
	today(document.querySelector("#txt_today"))
}
clockOn()
setInterval(clockOn, 1000)

is_logged(document.querySelector("#txt_logged"), document.querySelector("#not_logged_in"))

const add_circle = document.querySelector("#add_circle")
add_circle.addEventListener("click", random_sales)
