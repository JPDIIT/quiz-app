import { QuestionBank } from "@/app/generated/prisma";
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