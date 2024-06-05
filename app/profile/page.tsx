"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { FaUser, FaEnvelope, FaStar, FaPlus } from "react-icons/fa";

interface QuizTaken {
  quizId: string;
  title: string;
  description: string;
  gradePercentage: number;
}

const Profile = () => {
  const { status, data: session } = useSession();
  const [quizTakenDetails, setQuizTakenDetails] = useState<QuizTaken[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 2;

  useLayoutEffect(() => {
    const isAuth = status === "authenticated";
    if (!isAuth) {
      redirect("/");
    }
  }, []);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        if (session) {
          const response = await fetch("/api/quizFetchByProfile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: session?.user.id }),
          });

          if (response.ok) {
            const data = await response.json();
            setQuizTakenDetails(data);
          } else {
            console.error("Failed to fetch quiz details:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchQuizDetails();
  }, [session]);

  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = quizTakenDetails.slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200 to-yellow-400 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-gray-900">
          Your Profile
        </h1>
        {/* Personal Information Card */}
        <div className="w-full md:w-1/2 mx-auto mb-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
              Personal Information
            </h2>
            <div className="flex items-center mb-2">
              <FaUser className="mr-2 text-blue-500 dark:text-blue-800" />
              <span className="text-gray-700 dark:text-gray-900">
                Name: {session?.user.name}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <FaEnvelope className="mr-2 text-blue-500 dark:text-blue-800" />
              <span className="text-gray-700 dark:text-gray-900">
                Email: {session?.user.email}
              </span>
            </div>
            <div className="flex items-center">
              <FaPlus className="mr-2 text-blue-500 dark:text-blue-800" />
              <span className="text-gray-700 dark:text-gray-900">
                Quiz Attempts: {quizTakenDetails.length}
              </span>
            </div>
          </div>
        </div>
        {/* Quiz Attempts Table */}
        <div className="w-full md:w-3/4 mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
              Your Quiz Attempts
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Quiz Title
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentQuizzes.map((quiz, index) => (
                    <tr
                      key={quiz.quizId}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {quiz.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {quiz.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span>{quiz.gradePercentage.toFixed(2)}/100</span>
                      </td>
                    </tr>
                  ))}
                  {currentQuizzes.length === 0 && (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">-</td>
                      <td className="px-6 py-4 whitespace-nowrap">-</td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        -
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
              {Array.from(
                { length: Math.ceil(quizTakenDetails.length / quizzesPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className="mx-1 px-3 py-1 bg-yellow-300 rounded-md text-sm font-medium text-gray-800 hover:bg-yellow-400 focus:outline-none focus:bg-yellow-400"
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
