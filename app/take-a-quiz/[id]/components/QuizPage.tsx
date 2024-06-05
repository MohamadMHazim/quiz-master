"use client";
import React, { useEffect, useState } from "react";
import { Quiz, Question, QuestionType, Option, Options } from "../types";
import { useRouter, useSearchParams } from "next/navigation";
import { BsCheck } from "react-icons/bs";
import Custom404 from "@/app/404";
import schema from "../schema";
import MCQQuestion from "./mcqQuestionsPage";
import WrittenQuestion from "./writtenQuestionsPage";
interface QuizPageProps {
  params: { id: string };
}

const QuizPage: React.FC<QuizPageProps> = ({ params }) => {
  const { id } = params;
  const [title, setTitle] = useState<string>("");
  const [mcqQuestions, setMcqQuestions] = useState<Question[]>([]);
  const [rQuestions, setRQuestions] = useState<Question[]>([]);
  const [mcqOptions, setMcqOptions] = useState<Options[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/quizFetchById/${id}`);
        const data = await response.json();
        setTitle(data.quiz.title);
        setMcqQuestions(data.mcq.mcq_questions);
        setMcqOptions(data.mcq.mcq_options);
        setRQuestions(data.rQuestions);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  //   const validation = schema.safeParse(title);
  //   if (!validation.success) {
  //     return <Custom404 />;
  //   }

  const currentIndex =
    parseInt(searchParams.get("questionIndex") as string) || 0;
  const totalQuestions = mcqQuestions.length + rQuestions.length;

  const question =
    currentIndex < mcqQuestions.length
      ? mcqQuestions[currentIndex]
      : rQuestions[currentIndex - mcqQuestions.length];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!question && !isLoading) {
    return <div>No question found!</div>;
  }

  const handleNext = () => {
    const totalQuestions = mcqQuestions.length + rQuestions.length;
    if (currentIndex < totalQuestions - 1) {
      router.push(`/take-a-quiz/${id}?questionIndex=${currentIndex + 1}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      router.push(`/take-a-quiz/${id}?questionIndex=${currentIndex - 1}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 w-full px-0 py-8 flex flex-col items-center justify-center text-center h-screen">
      <h1 className="text-3xl font-bold mb-4 text-purple-800">
        Quiz Title: {title}
      </h1>
      {currentIndex < mcqQuestions.length ? (
        <MCQQuestion
          question={question}
          options={
            mcqOptions.find((o) => o.questionId === question.id)?.options || []
          }
          onNext={handleNext}
          onPrev={handlePrev}
          currentIndex={currentIndex}
          totalquestions={totalQuestions}
          quizid={id}
        />
      ) : (
        <WrittenQuestion
          question={question}
          onNext={handleNext}
          onPrev={handlePrev}
          currentIndex={currentIndex}
          totalquestions={totalQuestions}
          quizid={id}
        />
      )}
      <button onClick={() => sessionStorage.clear()}>Clear all answers</button>
    </div>
  );
};

export default QuizPage;
