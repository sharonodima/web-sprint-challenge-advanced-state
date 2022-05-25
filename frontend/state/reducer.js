// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import * as actionTypes from "./action-types";

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type){
    case actionTypes.MOVE_CLOCKWISE:
      return state === 5 ? 0 : state + 1;
    case actionTypes.MOVE_COUNTERCLOCKWISE:
      return state === 0 ? 5 : state - 1;
  }
  return state
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch (action.type){
    case actionTypes.SET_QUIZ_INTO_STATE:
      return action.payload
  }
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_ANSWER:
      return action.payload
  }
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case actionTypes.SET_INFO_MESSAGE:
      return action.payload
  }
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case actionTypes.INPUT_CHANGE:
      return{
        ...state,
        ...action.payload
      }
      case actionTypes.RESET_FORM:
        return initialFormState
  }
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
