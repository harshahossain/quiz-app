import { useState } from "react";

//
export default function Quiz() {
  //states
  // const [activeQuestion, setActiveQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  //derived value from state
  const activeQuestionIndex = userAnswers.length;

  return <p>currently active questine</p>;
}
