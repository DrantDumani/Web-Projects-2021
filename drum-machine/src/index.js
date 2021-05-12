import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const soundBank = [
	{
		key: "Q",
		link: "sfx/1UP.wav",
		name: "1UP",
	},
	{
		key: "W",
		link: "sfx/ATTACK.wav",
		name: "ATTACK",
	},
	{
		key: "E",
		link: "sfx/ATTACK2.wav",
		name: "ATTACK2",
	},
	{
		key: "A",
		link: "sfx/ATTACK3.wav",
		name: "ATTACK3",
	},
	{
		key: "S",
		link: "sfx/ATTACK4.wav",
		name: "ATTACK4",
	},
	{
		key: "D",
		link: "sfx/ATTACK5.wav",
		name: "ATTACK5"
	},
	{
		key: "Z",
		link: "sfx/BONUS.wav",
		name: "BONUS"
	},
	{
		key: "X",
		link: "sfx/BONUS2.wav",
		name: "BONUS2"
	},
	{
		key: "C",
		link: "sfx/BONUS3.wav",
		name: "BONUS3"
	}
];

const Container = () => {
	const [title, setTitle] = useState("");
	const [volume, setVolume] = useState("1.0")

	useEffect(() => {
		 const buttonPress = (event) => {
		 	let clickable = document.querySelector(`audio[id="${event.key.toUpperCase()}"]`);
		 	if (clickable) { 
		 		let bttn = clickable.parentElement;
		 		bttn.classList.add("active");
		 		bttn.click();
		 		setTimeout(() => {bttn.classList.remove("active")}, 200)
		 	}
		 }

		 window.addEventListener("keydown", buttonPress);

		 return () => {
		 	window.removeEventListener("keydown", buttonPress);
		 }
	}, []);

 	const playPlease = (event) => {
 		event.target.querySelector("audio").play();
 		setTitle(event.target.id)
 	}

 	const changeVolume = (event) => {
 		setVolume(event.target.value)
 	}

 	useEffect(() => {
               let sounds = document.querySelectorAll("audio");
               sounds.forEach(audio => audio.volume = volume)
               setTitle(`Volume: ${(volume*100).toFixed()}%`)
          }, [volume])


 	const audio = soundBank.map(obj => {
 		return (<button id={obj.name} className="drum-pad" onClick={playPlease} key={obj.key}>{obj.key}
 			<audio className="clip" id={obj.key} src={obj.link}></audio>
 			</button>)})

 	return (<div id="display">
 		<h1 id="title">Touhou Sound Effects</h1>
 		<main id="audio-box">
	 		<div id="noise">{audio}</div>
	 		<div id="vol-and-info">
	 			<h2>{title}</h2>
		 		<VolumeControls volume={volume} changeVolume={changeVolume}/>
	 		</div>
 		</main>
 		{<Footer/>}
 	</div>)
 }

 const VolumeControls = (props) => {
 	return <input type="range" value={props.volume} onChange={props.changeVolume} min="0.0" max="1.0" step="0.01"/>
 }

 const Footer = () => {
 	return (<footer>
 		<p>Made by <a rel="noreferrer" href="https://codepen.io/Elemeandor" target="_blank">Darnell</a></p>
 	</footer>)
 }

ReactDOM.render(
    <Container/>,
  document.getElementById('drum-machine')
);

reportWebVitals();