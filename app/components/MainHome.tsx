'use client';
import Image from "next/image";
import React from "react";
import image from "../../public/images/Home-Quiz.jpg";
import { useRouter } from "next/navigation";

const MainHome = () => {
  const router = useRouter();
  const handleClickButton = () => {
    router.push("/take-a-quiz");
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200 to-yellow-400 flex flex-col justify-center items-center">
      <div className="hero-content flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl p-4 lg:p-8">
        <div className="lg:w-1/2 lg:pr-16 mt-20 mb-10 lg:mb-0 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold mb-8 text-yellow-800 drop-shadow-lg">
            🎉 Welcome to Quiz Master! 🌟
          </h1>
          <p className="text-gray-900 mb-9 text-xl">
            Welcome to Quiz Master, your ultimate destination for interactive
            quizzes! Whether you're a student looking to test your knowledge, a
            teacher seeking to engage your students, or just someone who loves a
            good challenge, you've come to the right place. Dive into our
            diverse collection of quizzes crafted by experts and enthusiasts
            alike.
          </p>
          <button className="btn btn-primary bg-gray-800 hover:bg-gray-700 text-white mx-auto lg:mx-0 block text-lg px-8 py-3 rounded-lg transition-colors duration-300"
          onClick={handleClickButton}
          >
            Get Started
          </button>
        </div>
        <div className="mt-10 lg:mt-0 lg:ml-8">
          <Image
            src={image}
            width={300}
            height={300}
            alt="Home Image"
            className="rounded-full border-4 border-black"
          />
        </div>
      </div>
    </div>
  );
};

export default MainHome;
