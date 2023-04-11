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

document.querySelector("#icon_back").addEventListener("click",() => {
	window.location.href = "02.html"
})
