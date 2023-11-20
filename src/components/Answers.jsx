import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  //
  const shuffledAnswers = useRef();
  //
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={uuidv4()} className="answer">
            <button
              disabled={answerState !== ""}
              onClick={() => onSelect(answer)}
              className={cssClass}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
