import * as actionTypes from "./action-types"; 
import axios from "axios";
// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { 
  return function(dispatch){
    dispatch({type: actionTypes.MOVE_CLOCKWISE});
  }
}

export function moveCounterClockwise() { 
  return function(dispatch){
    dispatch({type: actionTypes.MOVE_COUNTERCLOCKWISE});
  }
}

export function selectAnswer(answer_id) { 
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_SELECTED_ANSWER,
      payload: answer_id,
    });
  }
}

export function setMessage() { }

export function setQuiz() { }

export function inputChange(inputKey, inputValue) { 
  return function (dispatch) {
    dispatch({
      type: actionTypes.INPUT_CHANGE,
      payload: {
        [inputKey]:inputValue
      }
    })
  }
}

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch({
      type: actionTypes.SET_QUIZ_INTO_STATE,
      payload: null,
    });
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get("http://localhost:9000/api/quiz/next")
    .then(response =>{
      dispatch({
        type: actionTypes.SET_QUIZ_INTO_STATE,
        payload: response.data,
      });
    })
  }
}
export function postAnswer() {
  return function (dispatch, getState) {
    const state = getState()
    console.log(state)
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to states
    // - Dispatch the fetching of the next quiz
    axios.post("http://localhost:9000/api/quiz/answer",{ 
      "quiz_id": state.quiz.quiz_id, 
      "answer_id": state.selectedAnswer
    })
    .then((response)=>{
      dispatch({
        type: actionTypes.SET_SELECTED_ANSWER,
        payload: null,
      });
      dispatch({
        type: actionTypes.SET_INFO_MESSAGE,
        payload: response.data.message,
      });
      fetchQuiz()(dispatch);
    })
  }
}
export function postQuiz() {
  return function (dispatch, getState) {
    const state = getState();
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post("http://localhost:9000/api/quiz/new",{
      "question_text": state.form.newQuestion,
      "true_answer_text": state.form.newTrueAnswer,
      "false_answer_text": state.form.newFalseAnswer
    })
    .then((response)=>{
      dispatch({
        type: actionTypes.SET_INFO_MESSAGE,
        payload: `Quiz ${response.data.quiz_id} was created`,
      });
      dispatch({
        type: actionTypes.RESET_FORM,
      })
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
