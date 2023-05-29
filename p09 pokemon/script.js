const pokemonLogo = document.querySelector(".pokemonLogo")
window.addEventListener("scroll", () => {
	if (window.scrollY > 70) {
		pokemonLogo.classList.add("toggle")
	} else {
		pokemonLogo.classList.remove("toggle")
	}
})

var from = 4
var limit = 1
function randomHunter() {
	from = Math.round(Math.random() * 1281)
}

const container = document.querySelector(".container")
const navbar = document.querySelector("#navbar")
const textBar = document.querySelector("#textBar")
textBar.addEventListener("keyup", () => {
	textBar.value == "" ? (findBtn.innerHTML = "Descubra!") : (findBtn.innerHTML = "Caçar!")
})

const findBtn = document.querySelector("#findBtn")
findBtn.addEventListener("click", () => {
	rotineControl()
	container.innerHTML = ""
	if (textBar.value == "") {
		limit = 1
		randomHunter()
		startSearch()
	} else {
		limit = 1281
		from = 0
		startSearch(textBar.value)
	}
	createLoad()
	hiddenMenu()
})

function rotineControl() {
	findBtn.setAttribute("disabled", "disabled")

	setTimeout(() => {
		findBtn.removeAttribute("disabled")
		if (container.lastChild.id == "load") {
			removeLoad()
			noResponse()
		}
	}, 3000)
}

function createLoad() {
	const span = document.createElement("span")
	span.classList.add("material-symbols-outlined")
	span.id = "load"
	span.innerHTML = "rotate_right"

	container.appendChild(span)
}

const resetBtn = document.querySelector("#resetBtn")
resetBtn.addEventListener("click", () => {
	container.innerHTML = ""
	textBar.value = ""
	findBtn.innerHTML = "Descubra!"
})

const closeBtn = document.querySelector("#closeBtn")
closeBtn.addEventListener("click", hiddenMenu)
function hiddenMenu() {
	navbar.classList.toggle("hidden")
	closeBtn.classList.toggle("hidden")

	if (closeBtn.innerHTML == "Menu") {
		closeBtn.innerHTML = "Close"
	} else {
		closeBtn.innerHTML = "Menu"
	}
}

function startSearch(campText) {
	const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${from}`

	fetch(url)
		.then((el) => {
			return el.json()
		})
		.then((data) => {
			getPok(data.results, campText)
		})
}

function getPok(poks, campText) {
	poks.forEach((pok) => {
		if (campText) {
			if (pok.name.includes(campText) == true) {
				fetchPok(pok.url)
			}
		} else {
			fetchPok(pok.url)
		}
	})
}

function noResponse() {
	const alertWarning = document.createElement("div")
	alertWarning.className = "alert alert-warning d-flex flex-column align-items-center text-center gap-3"
	alertWarning.innerHTML = `
	<span class="material-symbols-outlined warnSpan">
	warning
	</span>
		</svg>
		Nome não encontrado </br> ou problema de conexão. </br> Tente um novo nome </br> ou verifique a conexão.
	`

	container.appendChild(alertWarning)
}

function fetchPok(pokUrl) {
	fetch(pokUrl)
		.then((dataJson) => {
			return dataJson.json()
		})
		.then((el) => {
			if (el.name.includes("mode") || el.name.includes("build")) {
				return
			}
			console.log(1)
			createDiv(el)
		})
}

function createDiv(pok) {
	const card = document.createElement("div")
	card.classList.add("card")
	card.id = pok.id

	const imgUrl = imgSearch(pok)
	imgUrl == undefined ? console.log(pok.name, pok) : null // teste de validação de sprite

	const pokName = firstUpper(pok.name)
	const type = firstUpper(pok.types[0].type.name)

	card.innerHTML = `
        <img src="${imgUrl}" class="card-img-top" alt="..."/>
        <div class="card-body">
            <h5 class="card-title">${pokName}</h5>
            <p class="card-text">
                Tipo: ${type}
            </p>
            <button type="button" class="btn btn-outline-success">Detalhes</button>
        </div>
    `
	removeLoad()
	container.appendChild(card)
}

function removeLoad() {
	document.querySelector("#load") ? document.querySelector("#load").remove() : null
}

function imgSearch(pok) {
	return pok.sprites.versions["generation-v"]["black-white"].animated.front_default || pok.sprites.versions["generation-v"]["black-white"].front_default || pok.sprites.versions["generation-viii"].icons.front_default || pok.sprites.front_default || pok.sprites.other["official-artwork"].front_default
}

function firstUpper(word) {
	const modified = word.charAt(0).toUpperCase() + word.slice(1)
	return modified
}
