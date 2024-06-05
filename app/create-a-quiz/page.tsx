"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import logo from "../../public/images/quiz-master-logo-nobg.png";
import Image from "next/image";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuizForm from "./components/FormCreator";
import OptionForm from "./components/OptionForm";
import QuestionForm from "./components/QuestionForm";
import { Quiz } from "./types";
import { useQuizState } from "../utilities/QuizCreationUtilities";
import { uploadQuizData } from "./components/uploadQuizData";
import ButtonComponents from "./components/ButtonComponents";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const CreateAQuiz: React.FC = () => {
  const {
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
  } = useQuizState();
  const [isSubmitting, setSubmitting] = useState(false);
  const { status, data: session } = useSession();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const userId = session?.user?.id;
    try {
      const quizData: Quiz = { title, description, questions,userId };
      await uploadQuizData(quizData);
      setSubmitting(false);
      Swal.fire({
        title: "Success!",
        text: "Quiz Successfully Created !",
        icon: "success"
      });
    } catch (error) {
      console.error("Error submitting quiz data:", error);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200 to-yellow-400 flex items-center justify-center">
      <div className="w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-lg max-w-lg w-full"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <div className="flex justify-center mb-6">
            <Image
              src={logo}
              alt="QuizMaster Logo"
              width={70}
              height={70}
              className="block"
            />
          </div>
          <h1 className="text-2xl font-bold mb-6 text-yellow-700 text-center">
            Create your quiz!
          </h1>

          <QuizForm
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
          />

          <h2 className="text-xl font-bold mb-4 text-yellow-700 text-center">
            Questions
          </h2>

          {questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-6">
              <QuestionForm
                qIndex={qIndex}
                question={question}
                handleQuestionChange={handleQuestionChange}
                handleRemoveQuestion={handleRemoveQuestion}
              />
              {question.type === "MCQ" && (
                <div className="mb-4">
                  <label className="block text-yellow-700 font-bold mb-2">
                    Options
                  </label>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center mb-2">
                      <OptionForm
                        qIndex={qIndex}
                        oIndex={oIndex}
                        option={option}
                        handleOptionChange={handleOptionChange}
                        handleRemoveOption={handleRemoveOption}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddOption(qIndex)}
                    className="text-yellow-700 font-bold flex items-center"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Option
                  </button>
                </div>
              )}

              {question.type === "FILL_IN_THE_BLANKS" && (
                <div className="mb-4">
                  <label className="block text-yellow-700 font-bold mb-2">
                    Correct Answer
                  </label>
                  <input
                    type="text"
                    value={question.options[0].text} // Assuming there's only one correct answer for FILL_IN_THE_BLANKS
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleOptionChange(qIndex, 0, "text", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              )}

              {question.type === "WRITTEN_ANSWER" && (
                <div className="mb-4">
                  <label className="block text-yellow-700 font-bold mb-2">
                    Correct Answer
                  </label>
                  <input
                    type="text"
                    value={question.options[0].text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleOptionChange(qIndex, 0, "text", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              )}
            </div>
          ))}
          <ButtonComponents
            handleAddQuestion={handleAddQuestion}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateAQuiz;
