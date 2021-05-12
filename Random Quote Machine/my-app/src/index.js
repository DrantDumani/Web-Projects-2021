import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rndmElem = (arr) => {
	let lngth = arr.length
	return Math.floor(Math.random() * lngth)
}

class Container extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			text: "",
			author: "",
			tweetLink: ""
		}
		this.changeQuote = this.changeQuote.bind(this)
	}

	componentDidMount(){
		this.changeQuote()
	}

	changeQuote(){
		let currentQuote = this.state.text;
		const noRepeats = quoteList.filter(el => el.text !== currentQuote)
		let text = rndmElem(noRepeats);
		this.setState({
			text: noRepeats[text].text,
			author: noRepeats[text].author,
			tweetLink: "https://twitter.com/intent/tweet?text=" + noRepeats[text].text + " " + quoteList[text].author + "&hashtags=quotes"
		})
	}

	render(){
		return (
			<main id="quote-box">
				<p id="text">"{this.state.text}"</p>
				<div className="imgAndAuthor">
					<p id="author">- {this.state.author}</p>
				</div>
				<div className="btnAndLinks">
					<button onClick={this.changeQuote} id="new-quote" className="btn btn-primary">New Quote</button>
					<IconLinks tweet={this.state.tweetLink}/>
				</div>
			</main>
			)
	}
}

const IconLinks = (props) => {
	const iconStyle = {color: "#fff", fontSize: "1.6rem"}
	return (
		<div className="icons">
			<a className="icon-link" id="tweet-quote" key={props.tweet} href={props.tweet} target="_blank" >
				<i className="bi bi-twitter icon" style={iconStyle}></i>
			</a>
			<a className="icon-link" id="share-to-fb" href="https://www.facebook.com/sharer.php?u=https%3A%2F%2Fcodepen.io%2FElemeandor%2Ffull%2FabBVbPY" target="_blank">
				<i className="bi bi-facebook icon" style={iconStyle}></i>
			</a>
		</div>
		)
}

const quoteList = [
	{
		text: "I serve...a higher authority...",
		author: "Geno"
	},
	{
		text: 'True Beauty is Control',
		author: "Queen Sectonia"
	},
	{
		text: "I never cared about justice, and I don't recall ever calling myself a hero... I have always only fought for the people I believe in. I won't hesitate... If an enemy appears in front of me, I will destroy it!",
		author: "Zero, Maverick Hunter"
	},
	{
		text: "Tzu-li and Tzu-ssu were boasting about the size of their latest programs. ‘Two-hundred thousand lines,’ said Tzu-li, ‘not counting comments!’ Tzu-ssu responded, ‘Pssh, mine is almost a million lines already.’ Master Yuan-Ma said, ‘My best program has five hundred lines.’ Hearing this, Tzu-li and Tzu-ssu were enlightened.",
		author: "Master Yuan-Ma, The Book of Programming"
	},
	{
		text: "[...] the question of whether Machines Can Think [...] is about as relevant as the question of whether Submarines Can Swim.",
		author: "Edsger Dijkstra, The Threats to Computing Science"
	},
	{
		text: "Hmmm… It’s not over yet… C’mon troops! Let’s watch the ending together! Bwa ha ha!",
		author: "Bowser, King of the Koopas"
	},
	{
		text: "So you have come this far and still you understand nothing.",
		author: "Ansem"
	},
	{
		text: "I'm the coolest!",
		author: "Shadow the Hedgehog"
	},
	{
		text: "The wind... it is... blowing...",
		author: "Ganondorf, Great King of Evil"
	}
]

ReactDOM.render(
  <React.StrictMode>
    <Container />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();