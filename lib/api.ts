import {
  Quiz,
  ApiResponse
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
};