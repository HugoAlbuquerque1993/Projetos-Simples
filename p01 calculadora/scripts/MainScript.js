const campo = document.getElementById("campo")
const validade = [
    "0","1","2","3","4","5","6","7","8","9","/","*","-","+",",",".","Enter","=","Backspace"
]
var restVal = ""

function callNum(num){
    var valor = campo.innerHTML
    if (valor == "0"){valor = ""}
    if (valor.length > 17){
        alert("Máximo de valores permitidos atingido")
    } else {
        return campo.innerHTML = valor + num
    }
}

function zerar(){
    return restVal = campo.innerHTML, campo.innerHTML = "0"
}

function restaurar(){    
    if(restVal != "0"){
        return campo.innerHTML = restVal, restVal = "0"
    } else {
        alert("Não há valores para restaurar.")
    }
}

function corrigir(){
    var valor = campo.innerHTML
    if (valor != "0"){
        return campo.innerHTML = valor.substring(0, valor.length - 1)
    } else {
        return campo.innerHTML = "0"
    }
}

function igual(){
    var valor = campo.innerHTML
    if (valor != "0"){
        var valor = campo.innerHTML
        return campo.innerHTML = eval(valor)
    } else {
        console.log(campo.innerHTML)
    }
}

function botao(x){
    for (let i = 0; i < validade.length; i++){
        if (x.key == validade[i]){
            console.log(x.key == validade[i])
            return acionar(x)
        }
    }
}

function acionar(x){
    if (campo.innerHTML.length > 17 && x.key != "Backspace"){
        alert("Máximo de valores permitidos atingido")
        return
    }
    if (campo.innerHTML == "0" && x.key != "Backspace"){campo.innerHTML = ""}
    if (x.key == "0"){campo.innerHTML += "0"}
    if (x.key == "1"){campo.innerHTML += "1"}
    if (x.key == "2"){campo.innerHTML += "2"}
    if (x.key == "3"){campo.innerHTML += "3"}
    if (x.key == "4"){campo.innerHTML += "4"}
    if (x.key == "5"){campo.innerHTML += "5"}
    if (x.key == "6"){campo.innerHTML += "6"}
    if (x.key == "7"){campo.innerHTML += "7"}
    if (x.key == "8"){campo.innerHTML += "8"}
    if (x.key == "9"){campo.innerHTML += "9"}
    if (x.key == "."){campo.innerHTML += "."}
    if (x.key == ","){campo.innerHTML += "."}
    if (x.key == "="){igual()}
    if (x.key == "Enter"){igual()}
    
    if (x.key == "Backspace"){corrigir()}
    if (x.key == "/"){campo.innerHTML += "/"}
    if (x.key == "-"){campo.innerHTML += "-"}
    if (x.key == "*"){campo.innerHTML += "*"}
    if (x.key == "+"){campo.innerHTML += "+"}
}