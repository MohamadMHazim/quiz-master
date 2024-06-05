"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import {
  FaBrain,
  FaFlask,
  FaHistory,
  FaBook,
  FaGlobe,
  FaPuzzlePiece,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

interface Quiz {
  title: string;
  description: string;
  id: number;
}

const icons = [
  <FaBrain className="text-4xl text-yellow-500" />,
  <FaFlask className="text-4xl text-green-500" />,
  <FaHistory className="text-4xl text-red-500" />,
  <FaBook className="text-4xl text-blue-500" />,
  <FaGlobe className="text-4xl text-purple-500" />,
  <FaPuzzlePiece className="text-4xl text-orange-500" />,
];

const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const TakeAQuiz = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [displayedQuizzes, setDisplayedQuizzes] = useState<Quiz[]>([]);
  const [shuffledIcons, setShuffledIcons] = useState<JSX.Element[]>([]);
  const [showClearButton, setShowClearButton] = useState<boolean>(false);

  useEffect(() => {
    // Shuffle the icons array
    const shuffled = shuffleArray(icons);
    setShuffledIcons(shuffled);
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch("/api/quizfetch", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: Quiz[] = await response.json();
      setQuizzes(data);
      const shuffledQuizzes = shuffleArray(data);
      const selectedQuizzes = shuffledQuizzes.slice(0, 4);
      setDisplayedQuizzes(selectedQuizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleTakeQuiz = (id: number) => {
    if (!session?.user?.id) {
      Swal.fire({
        title: 'Error',
        text: 'Please sign in before taking a quiz.',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/api/auth/signin');
        }
      });
      return;
    }
    router.push(`/take-a-quiz/${id}`);
  };

  const handleSearch = (query: string) => {
    if (query === "") {
      // Reset to 4 random quizzes when the search query is empty
      setShowClearButton(false);
      const shuffledQuizzes = shuffleArray(quizzes);
      const selectedQuizzes = shuffledQuizzes.slice(0, 4);
      setDisplayedQuizzes(selectedQuizzes);
    } else {
      // Filter and display quizzes based on the search query
      setShowClearButton(true);
      const filteredQuizzes = quizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(query.toLowerCase()) ||
        quiz.description.toLowerCase().includes(query.toLowerCase())
      );
      const shuffledFilteredQuizzes = shuffleArray(filteredQuizzes);
      const selectedQuizzes = shuffledFilteredQuizzes.slice(0, 4);
      setDisplayedQuizzes(selectedQuizzes);
    }
  };

  const handleClear = () => {
    setShowClearButton(false);
    const shuffledQuizzes = shuffleArray(quizzes);
    const selectedQuizzes = shuffledQuizzes.slice(0, 4);
    setDisplayedQuizzes(selectedQuizzes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200 to-yellow-400 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-yellow-800 drop-shadow-lg">
          🎒 Take A Quiz! 📝
        </h1>
        <p className="text-lg text-gray-800 mb-12">
          Search for a specific quiz, or choose from one of the quizzes below:
        </p>
        <SearchBar onSearch={handleSearch} />
        {showClearButton && (
          <button
            type="button"
            onClick={handleClear}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Clear
          </button>
        )}
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {displayedQuizzes.map((quiz, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <div className="p-6 flex items-center">
              <div className="mr-8">
                {shuffledIcons[index % shuffledIcons.length]}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {quiz.title}
                </h3>
                <p className="text-gray-600">{quiz.description}</p>
                <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800" onClick={() => handleTakeQuiz(quiz.id)}>
                  Take Quiz
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TakeAQuiz;
