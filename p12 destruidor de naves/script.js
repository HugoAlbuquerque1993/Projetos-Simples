const naveGame = {
	config: {
		playerLifes: 4,
		neverDie: false,
		playerDamage: 3,

		audio: {
			music: true,
			effect: true,
			masterVolume: 0.2,
		},

		difficults: {
			normal: 3,
			hard: 2,
			insane: 1,
		},
	},

	states: {
		playerInteract: false,
		playerNick: undefined,
		score: 0,
		stageLifes: 0,
		arrHearts: [],
	},

	soundPack: {
		musics: [new Audio("./sound/opening.mp3"), new Audio("./sound/stage1.mp3"), new Audio("./sound/gameOver-NoHope.mp3")],

		effects: [new Audio("./sound/canon.ogg")],

		soundVolume: function () {
			naveGame.soundPack.musics.forEach((el, i, arr) => {
				el.loop = true
				if (i == arr.length - 1) {
					el.loop = false
				}
				el.volume = naveGame.config.audio.masterVolume
			})
			naveGame.soundPack.effects.forEach((el) => {
				el.volume = naveGame.config.audio.masterVolume
			})
		},
	},

	scoreView: function (field) {
		if (field) {
			const scoreboard = document.createElement("div")
			scoreboard.classList.add("scoreboard")
			field.appendChild(scoreboard)

			const killsPar = document.createElement("p")
			killsPar.classList.add("killsPar")
			killsPar.innerHTML = `Abates: ${naveGame.score}`
			scoreboard.appendChild(killsPar)

			const lifePar = document.createElement("p")
			for (let i = 0; i < naveGame.stageLifes; i++) {
				const heart = document.createElement("i")
				heart.classList.add("material-symbols-outlined")
				heart.classList.add(`life${i}`)
				heart.innerHTML = "favorite"
				naveGame.arrHearts.push(heart)
				lifePar.appendChild(heart)
			}
			scoreboard.appendChild(lifePar)

			const screenNick = document.createElement("div")
			screenNick.classList.add("screenNick")
			screenNick.innerHTML = naveGame.states.playerNick
			scoreboard.appendChild(screenNick)
		}
		if (!field) {
			document.querySelector(".killsPar").innerHTML = `Abates: ${naveGame.score}`
		}
	},

	newNave01: class simpleNave {
		constructor() {
			const content = document.createElement("div")
			content.classList.add("content")

			const aeronave = document.createElement("img")
			content.appendChild(aeronave)
			aeronave.classList.add("aeronave")
			aeronave.src = "./img/aeronave.png"
			aeronave.setAttribute("draggable", false)

			const lifeBar = document.createElement("div")
			content.appendChild(lifeBar)
			lifeBar.classList.add("lifeBar")
			lifeBar.classList.add("treeLifes")

			this.left = Math.round(Math.random() * (85 - 1) + 1)
			content.style.left = this.left + "%"

			this.size = Math.round(Math.random() * (20 - 10) + 10)
			aeronave.style.height = `100%`
			content.style.height = `${this.size}%`
			content.style.width = `${(this.size * 5) / 6}%`

			this.speed = Math.round(Math.random() * (6 - 3) + 3)
			content.style.transition = `${this.speed}s ease-in-out`
			setTimeout(() => {
				content.style.top = "-25%"
			}, 10)

			this.armor = 3
			this.isAlive = true
			this.div = content
			this.div.style.zIndex = 2
			this.div.addEventListener("click", () => {
				this.armor -= naveGame.config.playerDamage
				if (this.armor == 2) {
					this.div.lastChild.classList.remove("treeLifes")
					this.div.lastChild.classList.add("twoLifes")
				}
				if (this.armor == 1) {
					this.div.lastChild.classList.remove("twoLifes")
					this.div.lastChild.classList.add("oneLifes")
				}
				if (this.armor <= 0 && this.isAlive == true) {
					this.div.lastChild.classList.remove("oneLifes")
					this.div.lastChild.classList.add("zeroLifes")
					aeronave.src = "https://img1.picmix.com/output/stamp/normal/7/1/8/4/1944817_4359e.gif"
					this.isAlive = false
					this.div.style.zIndex = 0
					naveGame.score++
					naveGame.scoreView()
				}
			})
		}
	},

	startEvents: function (field) {
		let allNaves = []

		let naveSpawner = setInterval(() => {
			allNaves.push(new naveGame.newNave01())
			field.appendChild(allNaves[allNaves.length - 1].div)
		}, 500 * naveGame.config.difficults.insane)

		let checkElements = setInterval(() => {
			allNaves.filter((obj, i) => {
				if (obj.div.offsetTop < -100) {
					allNaves.splice(i, 1)
					field.removeChild(obj.div)
					if (obj.isAlive == true && naveGame.stageLifes > -1 && naveGame.config.neverDie == false) {
						naveGame.reduceLife(obj)
					}
				}
			})
		}, 250 * naveGame.config.difficults.insane)

		document.addEventListener("visibilitychange", seeWindow)
		function seeWindow(evt) {
			if (evt.target.hidden) {
				allNaves.filter((el, i) => {
					el.div.style.position = `${el.div.style.position}`
					el.div.style.transition = "none"
				})
			}
		}
	},

	reduceLife: function (el) {
		naveGame.stageLifes -= 1
		if (naveGame.stageLifes > -1) {
			naveGame.arrHearts[naveGame.arrHearts.length - 1].classList.add("lostLife")
			naveGame.arrHearts.pop()
		}
		if (naveGame.stageLifes == -1) {
			naveGame.removeScenery(naveGame.gameOver)
		}
	},

	removeScenery: function (nextScene) {
		const arrfield = [...document.body.childNodes]
		console.log(arrfield)
		let field = arrfield.filter((el, i) => {
			if (el.data == "interactWindow") {
				return el
			}
		})
		if (field.length > 0) {
			field[0].style.opacity = 0
			setTimeout(() => {
				document.body.removeChild(field[0])

				naveGame.soundPack.musics.forEach((el) => {
					el.pause()
					el.currentTime = 0
				})

                nextScene()
			}, 1000)
		}
	},

	gameOver: function () {

		const gameOverDiv = document.createElement("div")
		gameOverDiv.classList.add("gameOverDiv", "screenPreset")
		gameOverDiv.data = "interactWindow"
		gameOverDiv.innerHTML = "VOCÊ FOI DESTRUÍDO"
        document.body.appendChild(gameOverDiv)
        
		setTimeout(() => {
            if (naveGame.config.audio.music == true) {
				naveGame.soundPack.musics[naveGame.soundPack.musics.length - 1].play()
			}
			gameOverDiv.style.opacity = 1

			const tryAgainBtn = document.createElement("button")
			tryAgainBtn.classList.add("tryAgainBtn")
			tryAgainBtn.innerHTML = "Tentar de novo?"

			tryAgainBtn.addEventListener("click", () => {
				naveGame.removeScenery()

				setTimeout(() => {
					naveGame.homeScreen()
				}, 1000)
			})
			gameOverDiv.appendChild(tryAgainBtn)
			setTimeout(() => {
				tryAgainBtn.style.opacity = 1
			}, 500)
		}, 1000)
	},

	stage01: function () {
		const battleField = document.createElement("div")
		battleField.classList.add("battleField", "screenPreset")
		battleField.id = "stage01"
		battleField.data = "interactWindow"
		naveGame.scoreView(battleField)
		document.body.appendChild(battleField)

		if (naveGame.config.audio.music == true) {
			naveGame.soundPack.musics[1].play()
		}
		battleField.addEventListener("click", shooting)
		function shooting(e) {
			if (naveGame.config.audio.effect == true) {
				naveGame.soundPack.effects[0].play()
			}
		}
		setTimeout(() => {
			battleField.style.opacity = 1
		}, 100)

		naveGame.startEvents(battleField)
	},

	sideMenu: function () {},

	homeScreen: function () {
		const initialWindow = document.createElement("div")
		initialWindow.data = "interactWindow"
		initialWindow.classList.add("initialWindow", "screenPreset")

		setTimeout(() => {
			initialWindow.style.opacity = 1
		}, 100)

		naveGame.soundPack.soundVolume()
		if (naveGame.states.playerInteract == true && naveGame.config.audio.music == true) {
			naveGame.soundPack.musics[0].play()
		}

		initialWindow.addEventListener("click", () => {
			naveGame.states.playerInteract = true
			if (naveGame.config.audio.music == true) {
				naveGame.soundPack.musics[0].play()
			}
		})

		const gameTitle = document.createElement("h2")
		gameTitle.innerHTML = "Destruidor de Naves"
		gameTitle.classList.add("gameTitle")
		initialWindow.appendChild(gameTitle)

		const inpName = document.createElement("input")
		inpName.classList.add("inpName")
		inpName.type = "text"
		inpName.placeholder = "Seu apelido aqui"
		inpName.required = true
		initialWindow.appendChild(inpName)

		const startBtn = document.createElement("button")
		startBtn.innerHTML = "Iniciar!"
		startBtn.classList.add("startBtn")
		startBtn.addEventListener("click", startGame)

		function startGame() {
			naveGame.score = 0
			naveGame.arrHearts = []
			naveGame.stageLifes = naveGame.config.playerLifes

			let inpNick = inpName.value

			if (inpNick.length < 3) {
				alert("Seu apelido deve conter no mínimo 3 caracteres.")
			} else if (inpNick.length > 15) {
				alert("Nome muito extenso...")
			} else {
				initialWindow.style.opacity = 0
				setTimeout(() => {
					document.body.removeChild(initialWindow)
					naveGame.soundPack.musics[0].pause()
					naveGame.soundPack.musics[0].currentTime = 0
					naveGame.states.playerNick = inpNick
					naveGame.stage01()
				}, 1000)
			}
		}
		initialWindow.appendChild(startBtn)

		const configMenu = document.createElement("div")
		configMenu.classList.add("configMenu")
		configMenu.innerHTML = `
            <i class="material-symbols-outlined">settings</i>
        `
		initialWindow.appendChild(configMenu)

		document.body.appendChild(initialWindow)
	},
}

naveGame.homeScreen()
