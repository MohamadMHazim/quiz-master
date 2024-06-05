// utilities.tsx
import { useState } from "react";
import { Question,Option } from "../create-a-quiz/types";
export const useQuizState = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", type: "MCQ", options: [{ text: "", isCorrect: false }] },
    ]);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value as any; // Type assertion because value is always string, but type can be 'MCQ' | 'FILL_IN_THE_BLANKS' | 'WRITTEN_ANSWER'
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    field: keyof Option,
    value: string | boolean
  ) => {
    const newQuestions = [...questions];
    if (field === "text" && typeof value === "string") {
      newQuestions[qIndex].options[oIndex][field] = value;
    } else if (field === "isCorrect" && typeof value === "boolean") {
      newQuestions[qIndex].options[oIndex][field] = value;
    }
    if (newQuestions[qIndex].type === "WRITTEN_ANSWER" && field === "text") {
      newQuestions[qIndex].options[oIndex].isCorrect = true;
    }
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(qIndex, 1);
    setQuestions(newQuestions);
  };

  const handleAddOption = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push({ text: "", isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleRemoveOption = (qIndex: number, oIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    handleAddQuestion,
    handleQuestionChange,
    handleOptionChange,
    handleRemoveQuestion,
    handleAddOption,
    handleRemoveOption,
  };
};
