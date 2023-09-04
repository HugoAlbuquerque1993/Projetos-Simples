const pokemonLogo = document.querySelector(".pokemonLogo")
window.addEventListener("scroll", () => {
	if (window.scrollY > 70) {
		pokemonLogo.classList.add("toggle")
	} else {
		pokemonLogo.classList.remove("toggle")
	}
})

var from = 0
var limit = 1
var resultCount = 0

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
	if (textBar.value == "") {
		let turns = 3
		for (let i = 0; i < turns; i++) {
			findNow()
		}
	} else {
		findNow()
	}
})

function findNow() {
	rotineControl()
	container.innerHTML = ""
	if (textBar.value == "") {
		limit = 1
		randomHunter()
		startSearch()
	} else {
		limit = 1281
		from = 0
		startSearch(textBar.value.toLowerCase())
	}
	createLoad()
	hiddenMenu()
}

function rotineControl() {
	resultCount = 0
	findBtn.setAttribute("disabled", "disabled")
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

	if (closeBtn.innerHTML != "X") {
		closeBtn.innerHTML = "X"
	} else {
		closeBtn.innerHTML = "&equiv;"
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
		.catch((e) => {
			noResponse("internetError")
		})
}

function getPok(poks, campText) {
	poks.forEach((pok, ind) => {
		if (campText) {
			if (pok.name.includes(campText) == true) {
				fetchPok(pok.url)
			}
		} else {
			fetchPok(pok.url)
		}

		if (ind == poks.length - 1) {
			findBtn.removeAttribute("disabled")
			if (resultCount < 1) {
				noResponse("nameError")
			}
		}
	})
}

function noResponse(res) {
	removeLoad()
	const alertWarning = document.createElement("div")
	alertWarning.className = "alert alert-warning d-flex flex-column align-items-center text-center gap-3"

	if (res == "nameError") {
		alertWarning.innerHTML = `
			<span class="material-symbols-outlined warnSpan">
				warning
			</span>
			Nome não encontrado. </br> Tente um nome válido </br> e não utilize espaços </br> nem caracteres especiais.
		`
	}
	if (res == "internetError") {
		alertWarning.innerHTML = `
			<span class="material-symbols-outlined warnSpan">
				warning
			</span>
			Problema de conexão. </br> Verifique a conexão </br> e tente novamente.
		`
	}

	container.appendChild(alertWarning)
}

function fetchPok(pokUrl) {
	resultCount == 0 ? resultCount++ : null
	fetch(pokUrl)
		.then((dataJson) => {
			return dataJson.json()
		})
		.then((el) => {
			if (el.name.includes("mode") || el.name.includes("build")) {
				return
			}
			createDiv(el)
		})
		.catch((e) => {
			console.log(`Erro: ${e}`)
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
        <img src="${imgUrl}" class="card-img-top" alt="${pok.name}.img"/>
        <div class="card-body">
            <h5 class="card-title">${pokName}</h5>
			<p class="card-text"> ID: ${pok.id} <br/>
            Tipo: ${type} </p>
            <button type="button" class="btn btn-outline-success">Detalhes</button>
        </div>
    `
	removeLoad()
	container.appendChild(card)
}

function removeLoad() {
	findBtn.removeAttribute("disabled")
	document.querySelector("#load") ? document.querySelector("#load").remove() : null
}

function imgSearch(pok) {
	return pok.sprites.versions["generation-v"]["black-white"].animated.front_default || pok.sprites.versions["generation-v"]["black-white"].front_default || pok.sprites.versions["generation-viii"].icons.front_default || pok.sprites.front_default || pok.sprites.other["official-artwork"].front_default
}

function firstUpper(word) {
	const modified = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
	return modified
}

const openModal = document.querySelector("#openModal")
openModal.addEventListener("click", () => {
	const myModal = document.querySelector("#myModal")
	const modal = new bootstrap.Modal(myModal)
	modal.show()
})

const lightTheme = ["#87ceeb", "#0000ff"]
const darkTheme = ["#2c5364", "#0f2027"]
const mainContainer = document.querySelector(".mainContainer")
const bgColorChangerInputs = [...document.querySelectorAll(".bgColorChanger input")]
bgColorChangerInputs[4].addEventListener("click", handleChangeColor)
let lightAndDark = [bgColorChangerInputs[2], bgColorChangerInputs[3]].forEach(el => {
	el.addEventListener("click", (e) => {
		handleChangeColor(e)
	})
})

function handleChangeColor(e) {
	let colorTemp = []

	if(e.target.value == "Aplicar") {
		colorTemp = [bgColorChangerInputs[0].value, bgColorChangerInputs[1].value]
	} else if (e.target.value == "Light") {
		colorTemp = lightTheme
	} else {
		colorTemp = darkTheme
	}
	
	mainContainer.style.backgroundImage = `linear-gradient(to right, ${colorTemp[0]}, ${colorTemp[1]})`
}
