import { GoTo_logginDiv } from "./add_content.js"
if (localStorage.logged == "undefined") {
	GoTo_logginDiv(document.body)
}

import { footer_div } from "./add_content.js"
import { clock, today } from "./time.js"
footer_div(document.querySelector(".footer"))
function clockOn() {
	clock(document.querySelector("#txt_clock"))
	today(document.querySelector("#txt_today"))
}
clockOn()
setInterval(clockOn, 1000)

document.querySelector("#icon_back").addEventListener("click", () => {
	window.location.href = "03.html"
})

let selected_value = JSON.parse(localStorage.selected_value)
document.getElementById("total").innerHTML = selected_value.value
document.getElementById("rest").innerHTML = selected_value.value

let txt_pay = document.getElementById("txt_pay")
let div_payments = document.querySelector(".div_payments")
div_payments.addEventListener("scroll", () => {
	if (div_payments.scrollTop > 0) {
		document.getElementById("txt_pay").style.opacity = "0.2"
	} else {
		document.getElementById("txt_pay").style.opacity = "1"
	}
})

const payment_btns = [... document.querySelectorAll(".div_btns > input")]
payment_btns.forEach((el)=> {
	el.addEventListener("click", () => {
		alert(`Função de pagamento "${el.value}" em desenvolvimento :)`)
	})
})	
