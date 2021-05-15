import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const soundBank = [
	{
		key: "Q",
		link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Hammond%20Drum%20Machine/16[kb]ham-bd-01.wav.mp3",
		name: "Hammond",
	},
	{
		key: "W",
		link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/87[kb]80s-CRASH1.wav.mp3",
		name: "Crash",
	},
	{
		key: "E",
		link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Pearl%20SC-40%20Kicks/35[kb]SC40BD010.wav.mp3",
		name: "Pearl SC-40",
	},
	{
		key: "A",
		link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Jomox%20MBrane%2011/287[kb]jmox-mbrane-r03a.wav.mp3",
		name: "MBrane 11",
	},
	{
		key: "S",
		link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Psycore%20Kit/72[kb]psycore-kick-snare.wav.mp3",
		name: "Psycore",
	},
	{
		key: "D",
		link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/EMU%20SP%2012%20Kult/25[kb]sp12-02.wav.mp3",
		name: "EMU SP"
	},
	{
		key: "Z",
		link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/57[kb]wersi-bdhh2.wav.mp3",
		name: "Wersimat"
	},
	{
		key: "X",
		link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/14[kb]wersi-cow2.wav.mp3",
		name: "Wersimat2"
	},
	{
		key: "C",
		link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Alesis%20HR16/17[kb]BELL1.wav.mp3",
		name: "Alesis"
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
 		let audio = event.target.querySelector(".clip");
 		audio.currentTime = 0;
 		audio.play()
 		setTitle(event.target.id)
 	}

 	const changeVolume = (event) => {
 		setVolume(event.target.value)
 	}

 	useEffect(() => {
               let sounds = document.querySelectorAll(".clip");
               sounds.forEach(audio => audio.volume = volume)
               setTitle(`Volume: ${(volume*100).toFixed()}%`)
          }, [volume])


 	const audio = soundBank.map(obj => {
 		return (<button id={obj.name} className="drum-pad" onClick={playPlease} key={obj.key}>{obj.key}
 			<audio className="clip" id={obj.key} src={obj.link}></audio>
 			</button>)})

 	return (<div id="display">
 		<h1 id="title">Drum Sound Effects</h1>
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