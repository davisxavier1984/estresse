import React from 'react';
import { QUESTIONS, OPTIONS } from '../constants.ts';
import { AnswerValue } from '../types.ts';

interface QuizProps {
  currentQuestionIndex: number;
  onAnswer: (value: AnswerValue) => void;
  selectedAnswer: number | undefined;
}

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const progressPercentage = ((current + 1) / total) * 100;
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-6">
      <div
        className="bg-sky-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

const Quiz: React.FC<QuizProps> = ({ currentQuestionIndex, onAnswer, selectedAnswer }) => {
  const currentQuestion = QUESTIONS[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center text-center">
      <ProgressBar current={currentQuestionIndex} total={QUESTIONS.length} />
      <p className="text-lg text-slate-500 dark:text-slate-400 mb-2 font-medium">
        Pergunta {currentQuestion.id} de {QUESTIONS.length}
      </p>
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-8 min-h-[84px] flex items-center">
        {currentQuestion.text}
      </h2>
      <div className="w-full flex flex-col sm:flex-row justify-center gap-4">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className={`w-full sm:w-auto flex-1 text-center py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
              selectedAnswer === option.value
                ? 'bg-sky-600 text-white shadow-lg scale-105 ring-sky-400'
                : 'bg-slate-100 dark:bg-slate-700 hover:bg-sky-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;