'use client';

import { Scores } from '@/types/quiz';
import { Quiz } from '@/types/quiz';
import { Responses } from '@/types/quiz';
import { scoreQuizApi } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';

interface SubmitQuizProps {
  quizId: number;
  session: number;
}

export default function SubmitQuiz({ quizId, session}: SubmitQuizProps) {

  const isLoading = false;

  const start: Date = new Date();
  const end: Date = new Date();

  const [currentScore, setCurrentScore] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
      try {
        const response = await scoreQuizApi.create(start, end, quizId, session, {
          starttime: start,
          endtime: end,
          quizId: quizId,
          session: session
        });

        if (response.success) {
          const theScore = response.data?.score.toString() ?? "";
          setCurrentScore(theScore);
        } else {
          console.error('Failed to submit quiz:', response.message);
        }
      } catch (error) {
        console.error('Error submitting quiz:', error);
      } finally {
        //setIsLoading(false);
      }
  };

  return (
    <div>
      <div>
        {/* Quiz Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <button
          type="submit"
          //disabled={isLoading || !answer.trim() || submitted}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Scoring Quiz...
            </div>
            ) : (
              'Finish'
            )}
          </button>
        </form>
      </div>
      <div>
        {/* Quiz Results */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Score: {currentScore}%</h3>
      </div>
    </div>
  );
}