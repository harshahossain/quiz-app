import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import { v4 as uuidv4 } from "uuid";
import QuizCompleted from "../assets/quiz-completee.png";
import Question from "./Question";
//

export default function Quiz() {
  //refs

  //states
  // const [activeQuestion, setActiveQuestion] = useState(0);
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  //derived value from state
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  //using callback here too . for the dependencies on the handleSkipAnswer
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevState) => {
        return [...prevState, selectedAnswer];
      });
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  //so the handleSelectAnswer doesnt keep executing in QuestineTimer Comp
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={QuizCompleted} alt="Ball inside net" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }
  //

  //

  //adding keys in question timer so it gets destoryed and re-created after a question has been changed
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
