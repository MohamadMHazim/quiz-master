// pages/quiz/[id].tsx

import React from "react";
import QuizPage from "./components/QuizPage"; // Adjust the import path as necessary

interface QuizPageProps {
  params: { id: string };
}

const Quiz: React.FC<QuizPageProps> = ({ params }) => {
  return <QuizPage params={params} />;
};

export default Quiz;
