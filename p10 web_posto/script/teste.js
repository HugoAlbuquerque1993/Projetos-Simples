let arr = ['1','5','4','7','9']

arr.map((el, i) => {
    if (el == 5){
        return el + el
    }
})

console.log(arr)