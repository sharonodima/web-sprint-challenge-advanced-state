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
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick ={props.moveCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick = {props.moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st => st, actionCreators)(Wheel)