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
	let hose = Math.floor(Math.random() * 16 + 1).toString()
	hose < 10 ? hose = "0" + hose : hose

	let value = null
	if (hose > 8 && hose < 16) {
		let res = Math.random() * 70 + 5
		value = res.toFixed(2)
	} else {
		let res = Math.random() * 200 + 10
		value = res.toFixed(2)
	}

	let abbr = hose_identify(hose)[0]
	let name = hose_identify(hose)[1]
	let clock_time = clock("clock")
	let today_time = today("today")
	
	return { hose, value, abbr, name, clock_time, today_time }
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

export function calculate_hoses(append_div, logged) {
	append_div.innerHTML = ""
	let users = JSON.parse(localStorage.users)
	let user = users.filter((el) => {
		if (el.id == logged.id) {
			return el.sales
		}
	})

	let i = 0
	let us = user[0].sales
	for (i in us) {
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