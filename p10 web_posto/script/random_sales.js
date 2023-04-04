import { clock , today } from "./time.js"

export default function random_sales() {
	let logged = JSON.parse(localStorage.logged)
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
	console.log(data)
}

export function add_hose_value() {
	let hose = Math.floor(Math.random() * 16 + 1)

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

export function hose_identify(x) {
	if (x == 1 || x == 2 || x == 15) {
		return ["GAS", "Gasolina"]
	} else if (x == 4 || x == 3 || x == 16) {
		return ["ETA", "Etanol"]
	} else if (x == 7 || x == 8) {
		return ["DIS", "Dísel"]
	} else if (x == 5 || x == 6) {
		return ["ADT", "Gasolina Aditivada"]
	} else {
		return ["GNV", "Gás Natural Veicular"]
	}
}
