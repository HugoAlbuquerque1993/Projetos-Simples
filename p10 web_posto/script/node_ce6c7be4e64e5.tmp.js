const data_users = []
const amount_hoses = 3

class user {
    constructor(id, name, password, amount_hoses){
        this.id = id
        this.name = name
        this.password = password
        this.sales = []
        for (let i = 1; amount_hoses; i++){
            this.sales.push(i=[])
        }
    }
}

data_users.push(new user ("10", "HUGO", "4563", amount_hoses))
data_users.push(new user ("3", "CARLOS", "321", amount_hoses))

console.log(data_users[0])