'use client';

import { QuestionBank } from '@/types/quiz';
import { quizzesApi } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';

interface QuestionBoxProps {
  question: QuestionBank;
  //onUpdate: () => void;
}

export default function QuestionBox({ question}: QuestionBoxProps) {
    const [isLoading, setIsLoading] = useState(false);

    return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 
    ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
      

      {/* Question Text */}
      <span>{question.q_num}: {question.question}
      </span>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex-shrink-0">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}