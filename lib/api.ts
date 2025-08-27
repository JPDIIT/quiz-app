import {
  Quiz,
  ApiResponse,
  QuestionBank
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