'use server';
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function fetchQuizzes () {
    const quizzes = await prisma.quiz.findMany();
    return quizzes;
}