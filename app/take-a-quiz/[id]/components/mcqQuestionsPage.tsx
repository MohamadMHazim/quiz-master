import React, { useState, useEffect } from "react";
import { Question, Option } from "../types";
import { BsCheck } from "react-icons/bs";
import ButtonsContainer from "./buttonsContainer";

interface MCQQuestionProps {
  question: Question;
  options: Option[];
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalquestions: number;
  quizid: string;
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({
  question,
  options,
  onNext,
  onPrev,
  currentIndex,
  totalquestions,
  quizid,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    const storedOption = sessionStorage.getItem(`${question.id}`);
    if (storedOption) {
      setSelectedOption(JSON.parse(storedOption));
    }
  }, [question.id]);

  const handleRadioChange = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    sessionStorage.setItem(
      `${question.id}`,
      JSON.stringify(selectedOption)
    );
    onNext();
  };
  console.log(sessionStorage);
  return (
    <div className="w-full max-w-md p-6 bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-purple-800">
        <BsCheck className="inline-block mr-2" /> Multiple Choice Question
      </h2>
      <div className="mb-6 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2 text-gray-700">
          Question {currentIndex + 1}: {question.text}
        </h3>
        <ul className="list-none pl-0">
          {options.map((option) => (
            <li key={option.id} className="mb-2">
              <label className="inline-flex items-center bg-white p-2 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out">
                <input
                  type="radio"
                  className="form-radio text-purple-600 focus:ring-2 focus:ring-purple-600 h-5 w-5"
                  checked={selectedOption === String(option.id)}
                  onChange={() => handleRadioChange(String(option.id))}
                />
                <span className="ml-2 text-gray-800">{option.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <ButtonsContainer
        currentIndex={currentIndex}
        totalquestions={totalquestions}
        onNext={handleNext}
        onPrev={onPrev}
        quizid={quizid}
        questionid={question.id}
        lastanswer={selectedOption}
      />
    </div>
  );
};

export default MCQQuestion;
