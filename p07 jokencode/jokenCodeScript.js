document.getElementById("imgPedra").addEventListener("click", jogaPedra)
document.getElementById("imgPapel").addEventListener("click", jogaPapel)
document.getElementById("imgTesoura").addEventListener("click", jogaTesoura)

var divCpu = document.getElementById("cpuPlay")
var divPlayer = document.getElementById("playerPlay")
var divSelect = document.getElementById("select")
var divKO = document.getElementById("KO")

var imgPlayer = document.getElementById("imgPlayerPlay")
var jogada = null
var CPU = null
function cpuSelectFunc(){
    var random = Math.floor(Math.random() * 3)
    var imgCpu = document.getElementById("imgCpuPlay")
    if (random == 0){
        imgCpu.src = "img/iniPedra.png"
        CPU = "Pedra"
        return imgCpu, CPU
    } if (random == 1){
        imgCpu.src = "img/iniPapel.png"
        CPU = "Papel"
        return imgCpu, CPU
    } if (random == 2){
        imgCpu.src = "img/iniTesoura.png"
        CPU = "Tesoura"
        return imgCpu, CPU
    }
}
function jogaPedra(){
    jogada = "Pedra"
    imgPlayer.src = "img/pedra.png"
    return jogada, imgPlayer, jogar()
}
function jogaPapel(){
    jogada = "Papel"
    imgPlayer.src = "img/papel.png"
    return jogada, imgPlayer, jogar()
}
function jogaTesoura(){
    jogada = "Tesoura"
    imgPlayer.src = "img/tesoura.png"
    return jogada, imgPlayer, jogar()
}
function resultado(){
    if(jogada == CPU){
        divKO.innerHTML = "Empate!"
    } else if(jogada == "Pedra" && CPU == "Tesoura"){
        divKO.innerHTML = "Vitória!"
    } else if(jogada == "Papel" && CPU == "Pedra"){
        divKO.innerHTML = "Vitória!"
    } else if(jogada == "Tesoura" && CPU == "Papel"){
        divKO.innerHTML = "Vitória!"
    } else {
        divKO.innerHTML = "Derrota"
    }
}
function jogar(){
    cpuSelectFunc()
    resultado()
    divSelect.setAttribute("class", "dropMenu")
    divPlayer.setAttribute("id", "showPlayer")
    divCpu.setAttribute("id", "showCpuPlayer")
    function wait(){divKO.setAttribute("id", "showKO")}
    setTimeout(wait, 1000)
    setTimeout(reloadd, 3000)
}
function reloadd(){
    divSelect.removeAttribute("class", "dropMenu")
    divPlayer.removeAttribute("id", "showPlayer")
    divPlayer.setAttribute("id", "playerPlay")
    divCpu.removeAttribute("id", "showCpuPlayer")
    divCpu.setAttribute("id", "cpuPlay")
    divKO.removeAttribute("id", "showKO")
    divKO.setAttribute("id", "KO")
}