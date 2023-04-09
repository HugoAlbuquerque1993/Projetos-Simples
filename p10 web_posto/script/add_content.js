export function footer_div(div) {
  div.innerHTML = footer_create()
  footer_css()
}

export function footer_create() {
  let logged
  if (localStorage.logged != "undefined") {
    let x = JSON.parse(localStorage.logged)
    logged = x.name
  } else {
    logged = "REALIZE O LOGIN"
  }
	return (`
  <div>
    <p> Versão: 23.1.7 </p>
    <p id="txt_clock"> 00:00:00 </p>
  </div>
  <div>
    <p id="nome_frentista"> ${logged} </p>
    <p id="txt_today"> 00/00/0000 </p>
  </div>
  <p> 004 - PDV CIELO LIO (4AC931D52) </p>
  `)
}

export function footer_css() {
  let dad = document.querySelector(".footer")
  let son = [... document.querySelectorAll(".footer div")]
  dad.style = `
    position: relative;
    background-color: #fff;
    padding: 2px 20px;
    width: 100%;
    height: 10%;
  	box-shadow: 0px -5px 5px #00000090;
  `
  son.map((el) => {
    el.style = `
      display: flex;
      justify-content: space-between;
    `
  })
}