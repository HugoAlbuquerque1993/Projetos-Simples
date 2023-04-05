import { clock, today } from "./time.js"

export function random_sales(append_div, logged) {
	let data = JSON.parse(localStorage.data)

	data.map((el, i) => {
		if (el.id == logged.id) {
			if (!el.sales) {
				el.sales = []
			}
			el.sales.push(add_hose_value())
		}
	})

	localStorage.data = JSON.stringify(data)
	render_hoses(append_div, logged)
	console.log(data)
}

export function add_hose_value() {
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

export function render_hoses(append_div, logged) {
	let data = JSON.parse(localStorage.data)
	let user = data.filter((el) => {
		if (el.id == logged.id) {
			return el.sales
		}
	})

	const amout_sales_hose = (hose) => {
		let num = 0
		user[0].sales.map((el) => {
			if (el.hose == hose) {
				return num += 1
			}
		})

		num.toString()
		num < 10 ? num = "0" + num : num = num
		return num
	}
	
	let last_sale = user[0].sales[user[0].sales.length - 1]
	let new_hose = document.createElement("div")
	new_hose.className = "hose"
	new_hose.innerHTML = `<div class="top">
        <i class="material-symbols-outlined">
          local_gas_station
        </i>
        <div>
          B:${last_sale.hose} <br> ${last_sale.abbr}
        </div>
      </div>
      <div class="bot">
        <h2> ?? </h2>
        <div>
          Último: <br> R$ ${last_sale.value}
        </div>
      </div>`
	append_div.appendChild(new_hose)
}
