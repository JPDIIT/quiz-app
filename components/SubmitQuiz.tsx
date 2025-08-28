'use client';

import { QuestionBank } from '@/types/quiz';
import { quizzesApi } from '@/lib/api';
import { useState } from 'react';
import QuestionBox from './QuestionBox';
import Link from 'next/link';

interface QuestionBoxProps {
  question: QuestionBank;
  //onUpdate: () => void;
}

export default function SubmitQuiz({ question}: QuestionBoxProps) {
  return (
      <div>
      {/* Quiz Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="space-y-6">
            {/* Quiz Questions */}
            {theseQuestions.length > 0 && (
              <div>
                <div className="space-y-2">
                  {theseQuestions.map((item) => (
                    <QuestionBox 
                      key={item.id} 
                      question={item} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    );
}