import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";
//

export default function Quiz() {
  //refs

  //states
  // const [activeQuestion, setActiveQuestion] = useState(0);

  const [userAnswers, setUserAnswers] = useState([]);
  //derived value from state
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  //using callback here too . for the dependencies on the handleSkipAnswer
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevState) => {
      return [...prevState, selectedAnswer];
    });
  },
  []);

  //so the handleSelectAnswer doesnt keep executing in QuestineTimer Comp
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }
  //

  //

  //adding keys in question timer so it gets destoryed and re-created after a question has been changed
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
