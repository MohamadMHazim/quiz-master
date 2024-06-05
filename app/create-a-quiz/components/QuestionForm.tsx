import React, { ChangeEvent } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Option,Question } from "../types";

interface QuestionFormProps {
  qIndex: number; // Add qIndex prop
  question: Question;
  handleQuestionChange: (
    index: number,
    field: keyof Question,
    value: string
  ) => void;
  handleRemoveQuestion: (index: number) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  qIndex, // Destructure qIndex from props
  question,
  handleQuestionChange,
  handleRemoveQuestion,
}) => {
  return (
    <div>
      <div className="flex items-center mb-2">
        <label className="block text-yellow-400 font-bold mr-2 text-3xl">
          Question {qIndex + 1}
        </label>
        <FontAwesomeIcon
          icon={faTrash}
          className="text-red-500 cursor-pointer"
          onClick={() => handleRemoveQuestion(qIndex)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-yellow-700 font-bold mb-2"
          htmlFor={`question-${qIndex}`}
        >
          Question Text
        </label>
        <input
          type="text"
          id={`question-${qIndex}`}
          value={question.text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleQuestionChange(qIndex, "text", e.target.value)
          }
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-yellow-700 font-bold mb-2">
          Question Type
        </label>
        <select
          value={question.type}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleQuestionChange(qIndex, "type", e.target.value)
          }
          className="w-full px-3 py-2 border rounded"
        >
          <option value="MCQ">Multiple Choice</option>
          <option value="FILL_IN_THE_BLANKS">Fill in the Blanks</option>
          <option value="WRITTEN_ANSWER">Written Answer</option>
        </select>
      </div>
    </div>
  );
};

export default QuestionForm;
