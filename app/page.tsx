'use client';

import { useState, useEffect } from 'react';
import { Quiz } from '@/types/quiz';
import { quizzesApi } from '@/lib/api';
import QuizLine from '@/components/quizLine';

export default function Home() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getQuizzes = async () => { //
    try {
      setError(null);
      const response = await quizzesApi.getAll(true); // Include items for progress calculation
      
      if (response.success && response.data) {
        setQuizzes(response.data);
      } else {
        setError(response.message || 'Failed to fetch quizzes');
      }
    } catch (err) {
      console.error('Error fetching quizzes:', err);
      setError('Error fetching quizzes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuizzes(); //
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your quizzes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-lg font-semibold text-red-900 mb-2">Error Loading Quizzes</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={getQuizzes} //
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Practice Quizzes
          </h1>
          <p className="text-gray-600">
            Select the quiz that you would like to review
          </p>
        </div>
        
        {/*Quiz List*/}
        {quizzes.map((quiz) => (
            <QuizLine 
              key={quiz.id} 
              quiz={quiz} 
              onUpdate={getQuizzes} 
            />
          ))}
      </div>
    </div>
  );
}