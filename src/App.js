import React, { useState } from 'react';
import './App.css';
import QuestionAnswerSection from './components/QuestionAnswerSection/QuestionAnswerSection';
import ScoreSection from './components/ScoreSection/ScoreSection';
import Questions from './Questions';

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [buttonClass, setButtonClass] = useState(null)

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect == true){
      setButtonClass('correct');
    }
    else{
      setButtonClass('incorrect');
    }
    setTimeout (() => {
      if (currentQuestion < (Questions.length - 1)){
        setCurrentQuestion(currentQuestion + 1)
      }
      else{
        setShowScore(true);
      }
      if (isCorrect == true){
        setScore(score + 1);
      }
      setButtonClass(null)
    }, 500)
  }
  return (
      <div>
        <h1 data-testid = "heading" className='heading'>General Science Quiz</h1>
        {
          showScore ? 
          (
            <ScoreSection score = {score} />
          ) :
          (
            <QuestionAnswerSection currentQuestion={currentQuestion} handleAnswerOptionClick = {handleAnswerOptionClick} buttonClass = {buttonClass}/>
          )
        }
      </div>
    );
  }

export default App;
