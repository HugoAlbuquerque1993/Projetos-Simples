import { is_logged } from "./database.js"
import { clock, today } from "./time.js"
import { random_sales } from "./random_sales.js"

is_logged(document.querySelector("#txt_logged"), document.querySelector("#not_logged_in"))

var users = JSON.parse(localStorage.users)
var logged = JSON.parse(localStorage.logged)

users.map((el) => {
	if (el.id == logged.id) {
		if (el.sales) {
			return // FUNCAO
		}
	}
})

function clockOn() {
	clock(document.querySelector("#txt_clock"))
	today(document.querySelector("#txt_today"))
}
clockOn()
setInterval(clockOn, 1000)


const add_circle = document.querySelector("#add_circle")
add_circle.addEventListener("click", () => {
	let append_div = document.querySelector(".div_bot")
	random_sales(append_div, logged)
})
