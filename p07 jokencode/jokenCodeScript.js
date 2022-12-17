document.getElementById("imgPedra").addEventListener("click", jogaPedra)
document.getElementById("imgPapel").addEventListener("click", jogaPapel)
document.getElementById("imgTesoura").addEventListener("click", jogaTesoura)

var random = Math.floor(Math.random() * 3)
var imgCpu = document.getElementById("imgCpuPlay")
function CpuSelectFunc(){
    if (random == 0){
        imgCpu.src = "img/iniPedra.png"
        return imgCpu
    } if (random == 1){
        imgCpu.src = "img/iniPapel.png"
    } if (random == 2){
        imgCpu.src = "img/iniTesoura.png"
    }
}
CpuSelectFunc()
var imgPlayer = document.getElementById("imgPlayerPlay")
var jogada = null
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

var divCpu = document.getElementById("cpuPlay")
var divPlayer = document.getElementById("playerPlay")
var divSelect = document.getElementById("select")
var divKO = document.getElementById("KO")
function jogar(){
    divSelect.setAttribute("class", "dropMenu")
    divPlayer.setAttribute("id", "showPlayer")
    divCpu.setAttribute("id", "showCpuPlayer")
    divKO.innerHTML = "Vitória!"
    function wait(){divKO.setAttribute("id", "showKO")}
    setTimeout(wait, 2000)
    function reloadd(){location.reload()}
    setTimeout(reloadd, 4000)
}


// function jogaPedra(){
//     function alertRock(){alert("Selecionou Pedra")}
//     setTimeout(alertRock, 1000)
// }
