export default function timer(x) {
	let time = new Date()
	let hour = time.getHours().toString()
	let min = time.getMinutes().toString()
	let sec = time.getSeconds().toString()

	hour < 10 ? (hour = "0" + hour) : hour
	min < 10 ? (min = "0" + min) : min
	sec < 10 ? (sec = "0" + sec) : sec

	let timeString = `${hour}:${min}:${sec}`
	return (x.innerHTML = timeString)
}
