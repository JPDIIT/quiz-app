'use client';

import { QuestionBank } from '@/types/quiz';
import { Responses } from '@/types/quiz'
import { quizAnswersApi } from '@/lib/api';
import { useRef, useState } from 'react';
import Link from 'next/link';

interface QuestionBoxProps {
  question: QuestionBank;
  quizNumber: number;
  session: number;
  //onUpdate: () => void;
}

export default function QuestionBox({ question, quizNumber, session}: QuestionBoxProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setResponse] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!answer.trim()) return;

    setIsLoading(true);
    
    //Get question ID of answer
    const form = e.currentTarget;
    const input = form.querySelector<HTMLInputElement>('input[name="answer"]');
    if (!input) return;
    const qid = parseInt(input.id)

    try {
      const response = await quizAnswersApi.create(quizNumber, qid, session, {
        response: answer.trim(),
        session: session,
        questId: qid
      });
      
      if (response.success) {
        setResponse('');
        //onAdd();
      } else {
        console.error('Failed to submit answer:', response.message);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

    return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 
    ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
      

      {/* Question Text */}
      <span>{question.q_num}: {question.question}
      </span>
      {/* Submit Answer Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
        {/* Answer Box */}
        <input 
          type="text"
          id={question.id.toString()}
          name="answer"
          value={answer}
          onChange={(e) => setResponse(e.target.value)}
        />
        <button
          type="submit"
          //disabled={isLoading || !itemName.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Submitting...
            </div>
            ) : (
              'Submit'
            )}
        </button>
      </form>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex-shrink-0">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}