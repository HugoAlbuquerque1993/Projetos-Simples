export function footer_div(div) {
	let logged
	if (localStorage.logged != "undefined") {
		let x = JSON.parse(localStorage.logged)
		logged = x.name
	} else {
		logged = "REALIZE O LOGIN"
	}
	div.innerHTML = `
    <div>
      <p> Versão: 23.1.7 </p>
      <p id="txt_clock"> 00:00:00 </p>
    </div>
    <div>
      <p id="nome_frentista"> ${logged} </p>
      <p id="txt_today"> 00/00/0000 </p>
    </div>
    <p> 004 - PDV CIELO LIO (4AC931D52) </p>
  `

	document.querySelector(".footer").style = `
    position: absolute;
    top: 84vh;
    background-color: #fff;
    padding: 2px 20px;
    width: 100%;
    height: 10%;
    box-shadow: 0px -5px 5px #00000030;
  `

	let son = [...document.querySelectorAll(".footer > div")]
	son.map((el) => {
		el.style = `
      display: flex;
      justify-content: space-between;
    `
	})
}

export function GoTo_logginDiv(body) {
	let div = document.createElement("div")
	div.setAttribute("id", "not_logged_in")
	div.innerHTML = `
    <h2> Não foi possível identificar o usuário. <a href="../index.html" style="color: #00ff00;">Clique aqui</a> para retornar à area de login. </h2>
  `
	body.appendChild(div)

	document.querySelector("#not_logged_in").style = `
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100vw;
    height: 100vh;
    padding: 20px;
    background-color: #00f;
    top: 0;
    left: 0;
    color: #fff;
    z-index: 1000;
  `

	document.querySelector("#not_logged_in h2").style = `
    position: relative;
    padding: 20px;
    border-radius: 20px;
    background-color: #00000090;
    z-index: 2;
  `
}

export function render_hose(append_div, sale, amount, usd) {
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

	new_hose.addEventListener("click", () => {
		localStorage.selected_hose = JSON.stringify(usd)
		document.location.href = "./03.html"
	})
	append_div.appendChild(new_hose)
}

export function render_value(div_bot, page_hose) {
	let logged = JSON.parse(localStorage.logged)
	let values = JSON.parse(localStorage.selected_hose)
	page_hose.innerHTML = values[0].hose

	values.map((sale) => {
		let new_div = document.createElement("div")
		new_div.setAttribute("class", "hose_value")

		new_div.innerHTML = `
      <div class="top">
        <div class="top_left">
          R$ ${sale.value}
        </div>
        <div class="top_right">
          ${logged.name}
        </div>
      </div>
      <div class="bot">
        <p> 
          <i class="material-symbols-outlined" id="icon_bot">
            schedule
          </i>
          ${sale.clock_time} 
        </p>
        <p> 
          <i class="material-symbols-outlined" id="icon_bot">
            opacity
          </i>
          ${sale.amount_liters} ${sale.abbr == "GNV" ? "Mts" : "Lts"}
        </p>
        <p> 
          <i class="material-symbols-outlined" id="icon_bot">
            local_gas_station
          </i>
          ${sale.hose}
        </p>
      </div>
    `
		div_bot.append(new_div)
		new_div.addEventListener("click", () => {
			localStorage.selected_value = JSON.stringify(sale)
			window.location.href = "04.html"
		})
	})
}
