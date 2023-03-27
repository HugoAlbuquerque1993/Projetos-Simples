export default function timmer(x) {
    let time = new Date()
    let hour = time.getDate().toString()
    let min = time.getMinutes().toString()
    let sec = time.getSeconds().toString()

    if (hour < 10) {hour = "0" + hour}
    if (min < 10) {min = "0" + min}
    if (sec < 10) {sec = "0" + sec}
    
    let timeString = `${hour}:${min}:${sec}`
    return x.innerHTML = timeString
}