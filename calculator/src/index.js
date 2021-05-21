import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const Calculator = () => {
	const [display, setDisplay] = useState("0");
	const [inputs, setInputs] = useState("");

	const numButtons = [
		["zero", "0"],
		["one", "1"],
		["two", "2"],
		["three", "3"],
		["four", "4"],
		["five", "5"],
		["six", "6"],
		["seven", "7"],
		["eight", "8"],
		["nine", "9"],
		["decimal", "."],
		["add", "+"],
		["subtract", "-"],
		["multiply", "*"],
		["divide", "/"],
		["clear", "CLR"],
		["equals", "="]
	];

	const simpleBttnClick = (event) => {
		let term = event.target.textContent;
		let termArr = inputs.match(/\d+\.*\d*|\d*\.*\d+|\W|\w+/g);
		let lastTerm = termArr?.[termArr.length - 1];

		switch (term) {
			case "0": case "1": case "2": case "3": case "4": case "5":
			case "6": case "7": case "8": case "9":
				if (lastTerm !== "0"){
					inputs.includes("=") ? setInputs(term) : setInputs(inputs + term);
					display === "0" || isNaN(lastTerm) || inputs.includes("=") ? setDisplay(term) : setDisplay(display + term)
				}
				else {
					setInputs(inputs.slice(0, inputs.length - 1) + term);
					setDisplay(term)
				}
				break;
			case ".":
				if (inputs.includes("=")) {
						setInputs("0.");
						setDisplay("0.")
					}
				else if (!lastTerm?.includes(".")) {
					if (!isNaN(lastTerm?.[lastTerm.length - 1])) {
						setInputs(inputs + term);
						setDisplay(display + term);
					}
					else {
						setInputs(inputs + "0" + term);
						setDisplay("0" + term)
					}
				}
				break;
			case "+": case "*": case "/": case "-":
				if (inputs.includes("=")) setInputs(lastTerm + term)
				else if (inputs === "") setInputs("0" + term);
				else if (!isNaN(lastTerm)) setInputs(inputs + term);
				else if (term === "-" && /[-+*/]/.test(lastTerm) && !isNaN(inputs[inputs.length - 2])) {
					setInputs(inputs + term);
				}
				else if (["+", "-", "/", "*"].includes(lastTerm) && !isNaN(inputs[inputs.length - 2])) setInputs(inputs.slice(0, inputs.length - 1) + term);
				else if (["+", "-", "/", "*"].includes(lastTerm) && isNaN(inputs[inputs.length - 2])) {
					setInputs(inputs.slice(0, inputs.length - 2) + term)
				}
				break;
			case "CLR": 
				setInputs("");
				setDisplay("0");
				break;
			case "=":
				if (!inputs.includes("=") && inputs !== "") {
					let errLess = inputs.replace(/--/g, "- -").replace(/(\D)$/, "");
					let ans = parseFloat(eval(errLess).toFixed(12))
					setInputs(inputs + "=" + ans);
					setDisplay(ans)
				}
		}
	}

	const simpleNumBttns = numButtons.map((arr, ind) => {
		return <button key={ind} id={arr[0]} onClick={simpleBttnClick}>{arr[1]}</button>
	})

	return (<div>
		<Title />
		<main id="calculator">
			<Display inputs={inputs} display={display}/>
			<div id="user-interface">{simpleNumBttns}</div>
		</main>
		<Footer />
	</div>)
}

const Title = () => {
	return <h1 id="title">React Calculator</h1>
}

const Display = (props) => {
	return (
		<div>
			<p id="inputs">{props.inputs}</p>
			<h2 id="display">{props.display}</h2>
		</div>)
}

const Footer = () => {
	return <footer id="footer">
		<p>Made by <a rel="noreferrer" href="https://codepen.io/Elemeandor" target="_blank">Darnell</a>. React and SCSS.</p>
	</footer>
}


ReactDOM.render(<Calculator />, document.getElementById('root'));