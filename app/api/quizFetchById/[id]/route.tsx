import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
    });
    if (!quiz) {
      return NextResponse.json({ error: "ID Not Found!" }, { status: 404 });
    }
    const mcq_questions = await prisma.question.findMany({
      where: { quizId: id, type: "MCQ" },
    });
    if (!mcq_questions) {
      return NextResponse.json(
        { error: "No questions found !" },
        { status: 404 }
      );
    }
    const mcq_options = await Promise.all(
      mcq_questions.map(async (question) => {
        const options = await prisma.option.findMany({
          where: { questionId: question.id },
        });
        return { questionId: question.id, options };
      })
    );

    const mcq = {mcq_questions,mcq_options};

    const rQuestions = await prisma.question.findMany({
      where: {
        quizId: id,
        type: { in: ["FILL_IN_THE_BLANKS", "WRITTEN_ANSWER"] },
      },
    });

    const whole_quiz = { quiz, mcq , rQuestions };

    return NextResponse.json(whole_quiz, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
