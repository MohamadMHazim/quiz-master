import React, { useState, ChangeEvent, FormEvent } from "react";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Option } from "../types";

interface OptionFormProps {
  option: Option;
  qIndex: number;
  oIndex: number; // Corrected from 'oIndexts'
  handleOptionChange: (
    qIndex: number,
    oIndex: number,
    field: keyof Option,
    value: string | boolean
  ) => void;
  handleRemoveOption: (qIndex: number, oIndex: number) => void;
}


const OptionForm: React.FC<OptionFormProps> = ({
  option,
  qIndex,
  oIndex,
  handleOptionChange,
  handleRemoveOption,
}) => {
  return (
    <div>
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={option.text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleOptionChange(qIndex, oIndex, "text", e.target.value)
          }
          className="w-full px-3 py-2 border rounded mr-2"
        />
        <label className="text-yellow-700 font-bold mr-2">
          <input
            type="checkbox"
            checked={option.isCorrect}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleOptionChange(qIndex, oIndex, "isCorrect", e.target.checked)
            }
            className="mr-1"
          />
          Correct
        </label>
        <button
          type="button"
          onClick={() => handleRemoveOption(qIndex, oIndex)}
          className="text-yellow-700 font-bold flex items-center"
        >
          <FontAwesomeIcon icon={faMinus} className="mr-2" />
        </button>
      </div>
    </div>
  );
};

export default OptionForm;
