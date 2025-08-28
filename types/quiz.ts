//import { QuestionBank } from "@/app/generated/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export interface Quiz {
  id: number;
  name: string;
  subject: string;
  currentScore: Decimal;
  averageScore: Decimal;
  active: Boolean;
  questions?: QuestionBank[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}

export interface QuestionBank {
  id: number;
  q_num: number;
  question: string;
  correct_answer: string;
  quizId: number;
  quiz?: Quiz;
}

export interface Responses {
  id: number;
  session: number;
  response: string;
  correct: Boolean;
  questId: number;
  questionBank?: QuestionBank;
}

export interface CreateResponses {
  session: number;
  response: string;
  questId: number;
}