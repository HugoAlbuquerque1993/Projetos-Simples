var optCreate = document.createElement("option")
var secBicos = document.getElementById("secBicos")
var tagP = document.getElementsByTagName("p")
var tagDiv = document.getElementsByTagName("div")
var popup = document.getElementById("popup")

const iselBicos = document.getElementById("iselBicos")
const valBicos = document.getElementById("ivalBicos")

var bico01 = []
var bico02 = []
var bico03 = []
var bico04 = []

document.getElementById("envBicos").addEventListener("click", ()=>{
    let s = Number(iselBicos.value)
    let r = Number(valBicos.value)
    if (r <= 0){
    alert("Valor inválido.")
    } else if (r >= 3000){
    alert("Valor excede limite máximo.")
    } else {
    valBicos.value = ""
    verificarBico(s, r)
    atualizarValor()
    }
})

function verificarBico(s, r){
    if (s == 0){
    return bico01.unshift(r)
    } if (s == 1){
    return bico02.unshift(r)
    } if (s == 2){
    return bico03.unshift(r)
    } if (s == 3){
    return bico04.unshift(r)
    }
}

function atualizarValor(){
    if (bico01[0] > 0){
    tagP[0].innerHTML = "R$ " + bico01[0].toFixed(2)
    tagDiv[0].style.backgroundColor = "darkgreen"
    } if (bico02[0] > 0){
    tagP[1].innerHTML = "R$ " + bico02[0].toFixed(2)
    tagDiv[1].style.backgroundColor = "darkgreen"
    } if (bico03[0] > 0){
    tagP[2].innerHTML = "R$ " + bico03[0].toFixed(2)
    tagDiv[2].style.backgroundColor = "darkgreen"
    } if (bico04[0] > 0){
    tagP[3].innerHTML = "R$ " + bico04[0].toFixed(2)
    tagDiv[3].style.backgroundColor = "darkgreen"
    }
}

function chamarPopup(){
    if (popup.style.display == "flex"){
    popup.style.display = "none"
    } else {
    popup.style.display = "flex"
    }
}




function valorBico01(){
    if (bico01[0] == ""){
    alert("Não há valores neste bico.")
    } else {
    chamarPopup()
    
    }
}
function valorBico02(){
    if (bico02[0] == null){
    alert("Não há valores neste bico.")
    } else {
    chamarPopup()
    }
}
function valorBico03(){
    if (bico03[0] == null){
    alert("Não há valores neste bico.")
    } else {
    chamarPopup()
    }
}
function valorBico04(){
    if (bico04[0] == null){
    alert("Não há valores neste bico.")
    } else {
    chamarPopup()
    }
}