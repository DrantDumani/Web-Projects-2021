let rghtBtn = document.querySelector(".next");
let lftBtn = document.querySelector(".prev");
let defBtn = document.querySelector(".default");

let regionBtns = document.querySelectorAll(".switch-region")
for (let btn of regionBtns)
	btn.addEventListener("click", changeRegion)

let pieces = document.querySelectorAll(".tri-btn")
for (let piece of pieces)
  piece.addEventListener("click", hilightPiece);

let left = navSct(-1);
let right = navSct(1);

rghtBtn.addEventListener("click", right);
lftBtn.addEventListener("click", left);
defBtn.addEventListener("click",restoreDefault);



function navSct(dir){
  let mod = dir;
  return function(e){
    let sectWidth = document.querySelector(".triforce").offsetWidth;
    let sectNum = document.querySelectorAll(".triforce").length - 1;
    
    let totalWidth = sectWidth * sectNum * mod;
    let edge = totalWidth > 0 ? totalWidth : 0;
    let main = document.querySelector("#hist-container");
    let currPos = main.scrollLeft;
    main.scrollTo({
      left: currPos + sectWidth * mod,
      behavior: "smooth",
    });
  }
}

function hilightPiece(e){
	let container = this.parentNode;
	let sectionPieces = container.parentNode.querySelectorAll(".img-container");
	console.log(sectionPieces);
	let chosenClass = container.classList;
  let dftBtn = document.querySelector(".default");
	for (let piece of sectionPieces){
		if (piece.classList === chosenClass){
			let lore = piece.querySelector(".lore-text");
			piece.classList.add("selected");
			lore.classList.add("selected-lore");
			piece.parentNode.classList.add("selected-grid");
		}
		else {
			piece.classList.add("unselected");
		}
	}
  dftBtn.classList.add("dft-clickable");
}

function restoreDefault(){
  for (let piece of pieces){
    piece.parentNode.className = piece.parentNode.className.replace(/(un)?selected/, '');
    piece.parentNode.querySelector(".lore-text").classList.remove("selected-lore");
    piece.parentNode.parentNode.className = piece.parentNode.parentNode.className.replace("selected-grid", "");
  }
  this.className = this.className.replace("dft-clickable", "");
}

function changeRegion(){
	let hyrule = document.querySelector("#ALBW");
	let lorule = document.querySelector("#ALBW-L");

	hyrule.classList.toggle("active-region");
	hyrule.classList.toggle("inactive-region");

	lorule.classList.toggle("inactive-region");
	lorule.classList.toggle("active.region");
}