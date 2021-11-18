import React, {useReducer, useEffect} from 'react';
import {Helmet} from 'react-helmet'
import useInterval from "./custom_hooks/useInterval.js"
import ReactDOM from 'react-dom';
import './index.css';

const createTimer = value => [value, 0]

const init = (state) => {return {...state}}

const reducer = (state, action) => {
  switch(action.type){
    case "incSession":
      if (state.sessTimer[0] < 60 && !state.isCountdown)
        return {...state, sessTimer: createTimer(state.sessTimer[0]+1)}
      else return state
    case "decSession":
      if (state.sessTimer[0] > 1 && !state.isCountdown)
        return {...state, sessTimer: createTimer(state.sessTimer[0]-1)}
      else return state
    case "incBreak":
      if (state.breakTimer[0] < 60 && !state.isCountdown)
        return {...state, breakTimer: createTimer(state.breakTimer[0]+1)}
      else return state
    case "decBreak":
      if (state.breakTimer[0] > 1 && !state.isCountdown)
        return {...state, breakTimer: createTimer(state.breakTimer[0]-1)}
      else return state
    case "toggleTimers":
      return {...state, 
        currentTimer: state.isSession ? state.sessTimer : state.breakTimer}
    case "toggleSessionFlag":
      return {...state, isSession: !state.isSession}
    case "updateSeconds":
      return {...state, currentTimer: [state.currentTimer[0], state.currentTimer[1] - 1]}
    case "updateMinutes":
      return {...state, currentTimer: [state.currentTimer[0] - 1, 59]}
    case "toggleCountdownFlag":
      return {...state, isCountdown: !state.isCountdown}
    case "reset":
      return init(action.payload)
    default:
      throw new Error()
  }
}

const Container = () => {
  const initialState = {
    sessTimer: createTimer(25),
    breakTimer: createTimer(5),
    isSession: true,
    isCountdown: false,
    sessTitle: "Session",
    breakTitle: "Break",
    alarmTime: 0,
  }
  initialState.currentTimer = initialState.sessTimer

  const [state, dispatch] = useReducer(reducer, initialState, init)

  useEffect(() => {
    dispatch({type: "toggleTimers"})
  }, [state.isSession, state.sessTimer, state.breakTimer])

  useInterval(() => {
    let current = state.currentTimer
    if (current[0] === 0 && current[1] === 0){
      dispatch({type: "toggleSessionFlag"})
    }
    else if (current[1] === 0){
      dispatch({type: "updateMinutes"})
    }
    else {
      dispatch({type: "updateSeconds"})
    }
  }, state.isCountdown ? 1000 : null)

  const restart = () => {
    let alarm = document.querySelector("#beep")
    alarm.pause()
    alarm.currentTime = 0
    return dispatch({type: "reset", payload: initialState})
  }

  return (
  <div id="content-wrapper">
    <Helmet>
      <title>{state.isCountdown ? `(${state.currentTimer[0].toString().padStart(2,0)}:${state.currentTimer[1].toString().padStart(2,0)}) Majora's Mask Clock` : `Majora's Mask Clock`}</title>
    </Helmet>
    <h1 id="title">Majora's Mask Timer</h1>
    <main>
      <Clock title={state.isSession ? state.sessTitle : state.breakTitle} timer={state.currentTimer}/>
      <ButtonBox toggleCountdown = {() => dispatch({type: "toggleCountdownFlag"})} 
      reset = {restart}/>
      <TimerLength incSession = {() => dispatch({type: "incSession"})} decSession = {() => dispatch({type: "decSession"})}
      incBreak = {() => dispatch({type: "incBreak"})} decBreak = {() => dispatch({type: "decBreak"})}
      sessTimer = {state.sessTimer[0]} breakTimer = {state.breakTimer[0]}/>
    </main>
  </div>)
}

const Clock = (props) => {
  useEffect(() => {
    if (props.timer[0] === 0 && props.timer[1] === 0){
      let alarm = document.querySelector("#beep");
      alarm.play();
    }
  }, [props.timer[1]])

  return (<div id="clock">
    <p id="timer-label">{props.title}</p>
    <p id="time-left">{props.timer[0].toString().padStart(2,0)}:{props.timer[1].toString().padStart(2,0)}</p>
    <audio id="beep" src="https://github.com/DrantDumani/Web-Projects-2021/blob/main/js_clock/public/alarmSFX/ClockTower.wav?raw=true"></audio>
  </div>)
}

const ButtonBox = (props) => {
  return (<div id="btn-container">
    <button id="start_stop" onClick={props.toggleCountdown}>Play/Pause</button>
    <button id="reset" onClick={props.reset}>Reset</button>
  </div>)
}

const TimerLength = (props) => {
  const elementInfo = [["Session", props.incSession, props.sessTimer, props.decSession],
   ["Break", props.incBreak, props.breakTimer, props.decBreak]]

  const mappedInfo = elementInfo.map(elem => (
  <div key={elem[0]}>
    <h2 id={`${elem[0].toLowerCase()}-label`}>{elem[0]} Length</h2>
    <div className="length-controls">
      <button className="btn" id={`${elem[0].toLowerCase()}-increment`} onClick={elem[1]}><div className="arrow-up"></div></button>
      <span id={`${elem[0].toLowerCase()}-length`}>{elem[2]}</span>
      <button className="btn" id={`${elem[0].toLowerCase()}-decrement`} onClick={elem[3]}><div className="arrow-down"></div></button>
    </div>
  </div>))

  return (<div id="length-container">{mappedInfo}</div>)
}

ReactDOM.render(
  <React.StrictMode>
    <Container />
  </React.StrictMode>,
  document.getElementById('root')
);