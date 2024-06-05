import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client"; // Import Prisma to use its types

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { quizId, userId, answers } = body;
  const questions = await prisma.question.findMany({
    where: { quizId },
    include: {
      options: true,
      answer: true,
    },
  });

  let correctAnswers = 0;
  const totalQuestions = questions.length;

  // Start a transaction with explicit type
  const transactions: Prisma.PrismaPromise<any>[] = [];
  let tryId: number;
  let isUnique = false;
  while (!isUnique) {
    tryId = Math.floor(Math.random() * 501);
    const existingCount = await prisma.userAnswer.count({
      where: {
        quizId: quizId,
        tryid: tryId,
      },
    });
    isUnique = existingCount === 0;
  }
  questions.forEach((question) => {
    const userAnswer = answers.find(
      (answer: { questionId: number; answer: string }) =>
        answer.questionId === question.id
    )?.answer;

    let isCorrect = false;

    if (question.type === "MCQ") {
      const intUserAnswer = parseInt(userAnswer, 10);
      const correctOption = question.options.find((option) => option.isCorrect);

      if (correctOption?.id === intUserAnswer) {
        correctAnswers++;
        isCorrect = true;
      }
    } else if (
      question.type === "FILL_IN_THE_BLANKS" ||
      question.type === "WRITTEN_ANSWER"
    ) {
      const correctAnswer = question.answer?.text;

      if (String(correctAnswer) === String(userAnswer)) {
        correctAnswers++;
        isCorrect = true;
      }
    }

    transactions.push(
      prisma.userAnswer.create({
        data: {
          userId,
          questionId: question.id,
          answer: userAnswer || "", // Ensure userAnswer is not undefined
          grade: isCorrect,
          quizId: quizId,
          tryid: tryId,
        },
      })
    );
  });
  const grade = (correctAnswers / totalQuestions) * 100;
  const results = { grade, correctAnswers, totalQuestions };

  // Execute the transaction
  await prisma.$transaction(transactions);

  return NextResponse.json(results, { status: 200 });
}
