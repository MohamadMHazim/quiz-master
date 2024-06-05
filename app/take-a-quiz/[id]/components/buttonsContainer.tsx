import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ButtonProps {
  currentIndex: number;
  totalquestions: number;
  onNext: () => void;
  onPrev: () => void;
  quizid: string;
  questionid: number;
  lastanswer: string;
}

const ButtonsContainer: React.FC<ButtonProps> = ({
  currentIndex,
  totalquestions,
  onNext,
  onPrev,
  quizid,
  questionid,
  lastanswer,
}) => {
  const router = useRouter();
  const { status, data: session } = useSession();

  const handleSubmit = async () => {
    // Store the last answer in sessionStorage
    sessionStorage.setItem(`${questionid}`, JSON.stringify(lastanswer));

    const userId = session?.user?.id;
    const quizId: number = parseInt(quizid, 10);
    console.log("Quiz Id: ", quizId);
    const answers: { questionId: number; answer: string }[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const numericKey = parseInt(key || "");
      if (!isNaN(numericKey)) {
        const answer = sessionStorage.getItem(key || "");
        if (answer) {
          answers.push({ questionId: numericKey, answer: JSON.parse(answer) });
        }
      }
    }
    try {
      const response = await fetch("/api/storeQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, quizId, answers }),
      });
      sessionStorage.clear();
      if (response) {
        const results = await response.json();
        const grade = results.grade;
        const correctAnswers = results.correctAnswers;
        const totalQuestions = results.totalQuestions;
        const queryParams = new URLSearchParams({
          totalQuestions: totalQuestions.toString(),
          correctAnswers: correctAnswers.toString(),
          grade: grade.toString(),
        }).toString();
        router.push(`/final-results?${queryParams}`);
      } else {
        console.error("Failed to submit quiz");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="flex justify-between">
      {currentIndex != 0 && (
        <button
          onClick={onPrev}
          className="mt-4 px-4 py-2 flex items-center bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition duration-200 ease-in-out"
        >
          <BsChevronLeft className="mr-2" /> Previous
        </button>
      )}

      {currentIndex + 1 < totalquestions && (
        <button
          onClick={onNext}
          className="mt-4 px-4 py-2 flex items-center bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition duration-200 ease-in-out"
        >
          Next <BsChevronRight className="ml-2" />
        </button>
      )}

      {currentIndex + 1 === totalquestions && (
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default ButtonsContainer;
