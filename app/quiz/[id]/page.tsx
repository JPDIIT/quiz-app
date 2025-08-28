'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QuestionBank, Quiz } from '@/types/quiz';
import { quizzesApi, quizQuestionsApi } from '@/lib/api';
import QuestionBox from '@/components/QuestionBox';
import Link from 'next/link';

export default function TakeQuiz() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [qs, setQuestions] = useState<QuestionBank[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const quizId = params.id ? parseInt(params.id as string) : null;

  const getQuizzes = async () => {
    if (!quizId) {
      setError('Invalid quiz ID');
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await quizzesApi.getById(quizId);
      
      if (response.success && response.data) {
        setQuiz(response);
      } else {
        setError(response.message || 'Failed to fetch quiz');
      }
    } catch (err) {
      console.error('Error fetching quiz:', err);
      setError('Error fetching quiz');
    } finally {
      setIsLoading(false);
    }
  };

  const getQuestions = async () => {
    if (!quizId) {
      setError('Invalid quiz ID');
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await quizQuestionsApi.getAll(quizId);
      
      if (response.success && response.data) {
        setQuestions(response);
      } else {
        setError(response.message || 'Failed to fetch quiz');
      }
    } catch (err) {
      console.error('Error fetching quiz:', err);
      setError('Error fetching quiz');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuizzes();
    getQuestions();
  }, [quizId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-lg font-semibold text-red-900 mb-2">List Not Found</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Quizzes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const questions = qs.data || [];
  const theseQuestions = questions.filter((q: { quizId: number | null; }) => q.quizId == quizId);

  return (
    <div>
    <h1 className="text-4xl font-bold text-gray-900 mb-2">{quiz.name }</h1> 
        <div className="space-y-6">
          {/* Quiz Questions */}
          {theseQuestions.length > 0 && (
            <div>
              <div className="space-y-2">
                {theseQuestions.map((item: QuestionBank) => (
                  <QuestionBox 
                    key={item.id} 
                    question={item}
                    quizNumber={quizId}
                    session={qs.session}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
    </div>
  );

}