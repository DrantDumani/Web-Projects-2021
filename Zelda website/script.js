let triforce = document.querySelector("#main")
console.log(triforce.offsetWidth)
console.log(triforce.scrollLeft)

function test(e){
	if (e.target.scrollLeft === e.target.offsetWidth)
		console.log("The test was a success.");
}

triforce.addEventListener("scroll", test)