export type QuestionType = "MCQ" | "FILL_IN_THE_BLANKS" | "WRITTEN_ANSWER";

export interface Option {
  id: number;
  questionId: number;
  text: string;
  isCorrect: boolean;
}

export interface Options {
  questionId: number;
  options: Option[];
}

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options?: Option[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}
