import React, { useState, useEffect } from "react";
import { Question } from "../types";
import ButtonsContainer from "./buttonsContainer";

interface WrittenQuestionProps {
  question: Question;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalquestions: number;
  quizid: string;
}

const WrittenQuestion: React.FC<WrittenQuestionProps> = ({
  question,
  onNext,
  onPrev,
  currentIndex,
  totalquestions,
  quizid,
}) => {
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    const storedAnswer = sessionStorage.getItem(`${question.id}`);
    if (storedAnswer) {
      setAnswer(JSON.parse(storedAnswer));
    } else {
      setAnswer("");  // Clear the state when there is no stored answer
    }
  }, [question.id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };

  const handleNext = () => {
    sessionStorage.setItem(`${question.id}`, JSON.stringify(answer));
    onNext();
  };

  return (
    <div className="w-full max-w-md p-6 bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-red-800">
        {question.type === "FILL_IN_THE_BLANKS"
          ? "Fill in the Blank"
          : "Written Answer"}{" "}
        Question
      </h2>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">{question.text}</h3>
        {question.type === "FILL_IN_THE_BLANKS" && (
          <input
            type="text"
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-purple-400 w-full"
            placeholder="Your answer here"
            value={answer}
            onChange={handleInputChange}
          />
        )}
        {question.type === "WRITTEN_ANSWER" && (
          <textarea
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-purple-400 w-full"
            placeholder="Your answer here"
            value={answer}
            onChange={handleInputChange}
          ></textarea>
        )}
      </div>
      <ButtonsContainer
        currentIndex={currentIndex}
        totalquestions={totalquestions}
        onNext={handleNext}
        onPrev={onPrev}
        quizid={quizid}
        questionid={question.id}
        lastanswer={answer}
      />
    </div>
  );
};

export default WrittenQuestion;
