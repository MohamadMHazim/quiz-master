export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  text: string;
  type: "MCQ" | "FILL_IN_THE_BLANKS" | "WRITTEN_ANSWER";
  options: Option[];
}

export interface Quiz {
  title: string;
  description: string;
  questions: Question[];
  userId: string;
}
