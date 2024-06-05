import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  faPlus,
  faQuestion,
  faCheck,
  faTrash,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface QuizFormProps {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({
  title,
  description,
  setTitle,
  setDescription,
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-yellow-700 font-bold mb-2" htmlFor="title">
          <FontAwesomeIcon icon={faQuestion} className="mr-2" />
          Quiz Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-yellow-700 font-bold mb-2"
          htmlFor="description"
        >
          <FontAwesomeIcon icon={faQuestion} className="mr-2" />
          Quiz Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          className="w-full px-3 py-2 border rounded"
        ></textarea>
      </div>
      </>
  );
};

export default QuizForm;
