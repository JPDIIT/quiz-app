import { Scores } from '@/app/generated/prisma';
import {
  Quiz,
  ApiResponse,
  QuestionBank,
  Responses,
  CreateResponses,
  CreateScore
} from '@/types/quiz';

const API_BASE = '/api';

// Helper function to handle API responses
async function handleApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();
  return data;
}

// Quizzes API
export const quizzesApi = {
  // Get all quizzes
  getAll: async (includeItems = false): Promise<ApiResponse<Quiz[]>> => {
    const response = await fetch(`${API_BASE}/quizzes`);
    return handleApiResponse<Quiz[]>(response);
  },

  // Get a specific quiz
  getById: async (id: number): Promise<ApiResponse<Quiz>> => {
    const response = await fetch(`${API_BASE}/quizzes/${id}/questions`);
    return handleApiResponse<Quiz>(response);
  },
};


//Quiz Questions API
export const quizQuestionsApi = {
  // Get all questions for a quiz
  getAll: async (quizId: number): Promise<ApiResponse<QuestionBank[]>> => {
    let url = `${API_BASE}/quizzes/${quizId}/questions`;
    const response = await fetch(url);
    return handleApiResponse<QuestionBank[]>(response);
  },
};


//Quiz Answers API
export const quizAnswersApi = {
  // Post answer to a quiz question
  create: async (quizId: number, qid: number, session: number, data: CreateResponses): Promise<ApiResponse<Responses>> => {
    const response = await fetch(`${API_BASE}/quizzes/${quizId}/questions/${qid}/response`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleApiResponse<Responses>(response);
  },
};


//Score Quiz API
export const scoreQuizApi = {
  // Update the quiz scores
  create: async (start: Date, end: Date, quizId: number, session: number, data: CreateScore): Promise<ApiResponse<Scores>> => {
    const response = await fetch(`${API_BASE}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleApiResponse<Scores>(response);
  },
};