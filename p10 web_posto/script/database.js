export function add_user(id, name, password) {
    var arr_login = JSON.parse(localStorage.data)

    arr_login.push(
        {
            id: id,
		    name: name.toUpperCase(),
		    password: password
        }
    )

    arr_login.sort((a, b) => {return a.id - b.id})
    localStorage.data = JSON.stringify(arr_login)
}

export function check_login(uv, pv) {
    var arr_login = JSON.parse(localStorage.data)
    let res = arr_login.filter((el, i) => {
        if (el.id == uv) {
            return el
        }
    })
    if (!res[0]) {
        alert(`Usuário de número "${uv}" não registrado.`)
    } else {
        if (res[0].password != pv) {
            return alert("Senha inválida.")
        } else {
            log_into(res[0])
        }
    }
}

export function is_logged() {

}

export function log_into(logged) {
    window.location.href = "./pages/01.html"
	localStorage.logged = JSON.stringify(logged)
}

export function check_database() {
    
}