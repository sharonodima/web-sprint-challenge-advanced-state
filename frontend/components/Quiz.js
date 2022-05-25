import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Quiz(props) {
  console.log(props)
  useEffect(props.fetchQuiz, [])
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
            {props.quiz.answers.map((answer)=>{
              return <div key = {answer.answer_id} className={props.selectedAnswer === answer.answer_id ? "answer selected" : "answer"}>
              {answer.text}
                <button onClick = {() =>props.selectAnswer(answer.answer_id)}>
                {props.selectedAnswer === answer.answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            })}
              {/* <div className="answer selected">
                A function
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
                An elephant
                <button>
                  Select
                </button>
              </div> */}
            </div>

            <button id="submitAnswerBtn" onClick = {props.postAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actionCreators)(Quiz)