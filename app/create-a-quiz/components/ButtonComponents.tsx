import React from "react";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonComponentsProps {
  handleAddQuestion: () => void;
  isSubmitting: boolean;
}

const ButtonComponents: React.FC<ButtonComponentsProps> = ({ handleAddQuestion,isSubmitting }) => {
  return (
    <>
      <button
        type="button"
        onClick={handleAddQuestion}
        className="bg-yellow-500 text-white px-4 py-2 rounded font-bold mb-4 flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Question
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-yellow-700 text-white px-4 py-2 rounded font-bold flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faCheck} className="mr-2" />
        Create Quiz
      </button>
    </>
  );
};

export default ButtonComponents;
