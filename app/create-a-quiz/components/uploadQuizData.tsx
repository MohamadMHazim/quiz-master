'use server';
import { NextResponse } from "next/server";
import { Quiz } from "../types";
import prisma from "@/prisma/client";
import schema from "../schema";

export const uploadQuizData = async (quizData: Quiz) => {
  try {
    const validation = schema.safeParse(quizData);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    await prisma.quiz.create({
      data: {
        title: quizData.title,
        description: quizData.description,
        ownerId: quizData.userId,
        questions: {
          create: quizData.questions.map((question) => ({
            text: question.text,
            type: question.type,
            options: question.type === "MCQ" ? {
              create: question.options.map((option) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              })),
            } : undefined,
            answer: question.type !== "MCQ" ? {
              create: {
                text: question.options[0]?.text,
              },
            } : undefined,
          })),
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error uploading quiz data:", error);
    return { success: false, error: "Failed to upload quiz data" };
  }
};
