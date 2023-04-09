import { clock, today } from "./time.js"

export function random_sales(append_div, logged) {
	let users = JSON.parse(localStorage.users)

	users.map((el) => {
		if (el.id == logged.id) {
			if (!el.somesale) { 
				el.somesale = true
			}
			let res = add_hose_value(el)
			el.sales.map((sale) => {
				if (sale.hose == res.hose) {
					sale.data.push(res)
					localStorage.logged = JSON.stringify(el)
				}
			})
		}
	})

	localStorage.users = JSON.stringify(users)
	calculate_hoses(append_div, logged)
}

export function add_hose_value(el) {
	let hose = random_hoses()
	let abbr = hose_identify(hose)[0]
	let name = hose_identify(hose)[1]
	let liter = liter_value(abbr)
	let value = multiply_value(liter, abbr)
	let clock_time = clock("clock")
	let today_time = today("today")
	
	return { hose, abbr, name, liter, value, clock_time, today_time }
}

export function random_hoses() {
	let hose = Math.floor(Math.random() * 16 + 1).toString()
	hose < 10 ? hose = "0" + hose : hose
	return hose
}

export function hose_identify(hose) {
	if (hose == 1 || hose == 2 || hose == 15) {
		return ["GAS", "Gasolina"]
	} else if (hose == 4 || hose == 3 || hose == 16) {
		return ["ETA", "Etanol"]
	} else if (hose == 7 || hose == 8) {
		return ["DIS", "Dísel"]
	} else if (hose == 5 || hose == 6) {
		return ["ADT", "Gasolina Aditivada"]
	} else {
		return ["GNV", "Gás Natural Veicular"]
	}
}

export function liter_value(abbr) {
	if (abbr == "GAS") {
		return 5.48
	} else if (abbr == "ETA") {
		return 4.08
	} else if (abbr == "DIS") {
		return 5.49
	} else if (abbr == "ADT") {
		return 5.78
	} else {
		return 3.89
	}
}

export function multiply_value(liter, abbr) {
	if (abbr == "GNV") {
		let amount = Math.random() * 21 + 1
		let res = amount * liter
		console.log(res)
		return Number(res.toFixed(2))
	} else {
		let amount = Math.random() * 43 + 2
		let res = amount * liter
		console.log(res)
		return Number(res.toFixed(2))
	}
}

export function calculate_hoses(append_div, logged) {
	append_div.innerHTML = ""
	let users = JSON.parse(localStorage.users)
	let user = users.filter((el) => {
		if (el.id == logged.id) {
			return el.sales
		}
	})

	let us = user[0].sales
	for (let i = 0 ; i < us.length ; i++) {
		let usd = us[i].data

		let amount = usd.length
		amount < 10 ? amount = "0" + amount : amount

		amount.toString()
		usd.filter((sale, ind) => {
			if (ind == usd.length - 1) {
				render_div(append_div, sale, amount)
			}
		})
	}
}

export function render_div(append_div, sale, amount) {
	let new_hose = document.createElement("div")
	new_hose.className = "hose"
	new_hose.innerHTML = `<div class="top">
		<i class="material-symbols-outlined">
		  local_gas_station
		</i>
		<div>
		  B:${sale.hose} <br> ${sale.abbr}
		</div>
	  </div>
	  <div class="bot">
		<h2> ${amount} </h2>
		<div>
		  Último: <br> R$ ${sale.value}
		</div>
	  </div>`
	append_div.appendChild(new_hose)
}