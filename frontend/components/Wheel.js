import React from 'react'

import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Wheel(props) {
  
  console.log(props)
  const selectedCog = props.wheel;
  const cogs = [];
  for (let i = 0; i <= 5; i++){
    cogs.push(<div key = {i} className={selectedCog === i ? "cog active" : "cog"}style={{ "--i": i }}>{selectedCog === i && "B"}</div>)
  }
  return (
    <div id="wrapper">
      <div id="wheel">
      {cogs}

        {/* <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>--i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick ={props.moveCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick = {props.moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st => st, actionCreators)(Wheel)