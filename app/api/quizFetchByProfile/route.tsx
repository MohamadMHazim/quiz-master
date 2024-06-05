import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userId = body.userId;

  // Get distinct (userId, quizId, tryId) tuples
  const userAnswers = await prisma.userAnswer.findMany({
    where: { userId },
    distinct: ["quizId", "tryid"], // Distinct by quizId and tryId
  });


  // Fetch details for each try and calculate grade percentage
  const quizDetails = await Promise.all(
    userAnswers.map(async (answer) => {
      const quiz = await prisma.quiz.findUnique({
        where: { id: answer.quizId },
        select: { id: true, title: true, description: true },
      });

      // Fetch total number of questions for the quiz
      const totalQuestions = await prisma.question.count({
        where: { quizId: answer.quizId },
      });

      // Fetch number of correct answers for the quiz and try
      const totalCorrectAnswers = await prisma.userAnswer.count({
        where: {
          userId,
          quizId: answer.quizId,
          tryid: answer.tryid,
          grade: true,
        }, // Consider distinct quizId, tryId
      });

      // Calculate grade percentage
      const gradePercentage = (totalCorrectAnswers / totalQuestions) * 100 || 0; // Avoid division by zero

      return {
        quizId: answer.quizId,
        title: quiz?.title || "Unknown",
        description: quiz?.description || "No description available",
        gradePercentage,
      };
    })
  );


  return NextResponse.json(quizDetails, { status: 200 });
}
