'use client';
import React from "react";
import { BiMessageSquareCheck } from "react-icons/bi";
import { FiAward, FiThumbsUp, FiMeh, FiFrown } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

const FinalResults = () => {
  const searchParams = useSearchParams();
  const totalQuestions = searchParams.get('totalQuestions');
  const correctAnswers = searchParams.get('correctAnswers');
  const gradeString = searchParams.get('grade');
  const grade = gradeString ? parseFloat(gradeString).toFixed(2) : "0.00";

  let message = "";
  let icon = null;
  let iconColor = "";

  const gradeNumber = parseFloat(grade);

  if (gradeNumber >= 75) {
    message = "Excellent! Keep up the fantastic work!";
    icon = <FiAward />;
    iconColor = "text-yellow-500";
  } else if (gradeNumber >= 50) {
    message = "Great job! Keep up the good work!";
    icon = <FiThumbsUp />;
    iconColor = "text-green-500";
  } else if (gradeNumber >= 30) {
    message = "Good effort! Keep practicing!";
    icon = <FiMeh />;
    iconColor = "text-orange-500";
  } else {
    message = "Don't be discouraged. Try again!";
    icon = <FiFrown />;
    iconColor = "text-red-500";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 to-yellow-400 animate-gradient">
      <div className="bg-white p-8 rounded-md shadow-md max-w-lg text-center">
        <div className="text-4xl font-bold mb-4">Quiz Results</div>
        <div className="flex items-center justify-center mb-6">
          <BiMessageSquareCheck className="text-6xl text-green-500 mr-4" />
          <div className="text-5xl font-semibold">{grade}%</div>
        </div>
        <div className="text-lg text-center mb-4">
          Congratulations! You have successfully completed the quiz.
        </div>
        <div className="text-lg text-center mt-4">
          You got <span className="font-bold">{correctAnswers}</span> out of <span className="font-bold">{totalQuestions}</span> questions correct.
        </div>
        <div className="flex items-center justify-center mt-6">
          <div className={`text-5xl ${iconColor} mr-4`}>
            {icon}
          </div>
          <div className="text-lg">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalResults;
