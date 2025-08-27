'use client';

import { Quiz } from '@/types/quiz';
import { quizzesApi } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';

interface QuizLineProps {
  quiz: Quiz;
  onUpdate: () => void;
}

export default function QuizLine({ quiz, onUpdate}: QuizLineProps) {
    const [isLoading, setIsLoading] = useState(false);

    const totalItems = 0;
    const currentScore = quiz.currentScore || 0;
    const avgScore = quiz.averageScore || 0;

    return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
            <Link href={`/quiz/${quiz.id}`}>
              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                {quiz.subject}: {quiz.name}
              </h3>
              <p>
                Most recent score: {currentScore.toString()}
              </p>
              <p>
                Average score: {avgScore.toString()}
              </p>
            </Link>
        </div>
      </div>

      <div className="mt-4">
        <Link 
          href={`/quizzes/${quiz.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View Details
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}