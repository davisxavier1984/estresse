import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { ResultHistoryItem } from './types';
import Quiz from './components/Quiz';
import Results from './components/Results';

const App: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [history, setHistory] = useState<ResultHistoryItem[]>([]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('stressTestHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage:", error);
    }
  }, []);

  const handleAnswer = (answerValue: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerValue;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateResults(newAnswers);
      }
    }, 300);
  };
  
  const calculateResults = (finalAnswers: number[]) => {
    const totalScore = finalAnswers.reduce((sum, answer) => sum + answer, 0);
    const newResult: ResultHistoryItem = {
      score: totalScore,
      date: new Date().toLocaleString('pt-BR'),
    };
    
    try {
      const updatedHistory = [newResult, ...history].slice(0, 5); // Keep last 5 results
      setHistory(updatedHistory);
      localStorage.setItem('stressTestHistory', JSON.stringify(updatedHistory));
    } catch (error) {
       console.error("Failed to save history to localStorage:", error);
    }

    setShowResults(true);
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const totalScore = answers.reduce((sum, answer) => sum + answer, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 transition-colors duration-300">
       <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-sky-600 dark:text-sky-400">Avaliação de Estresse</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Responda às perguntas para entender seu nível de estresse atual.</p>
        </header>

        <main className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300">
            {showResults ? (
                <Results score={totalScore} history={history} onRestart={handleRestart} />
            ) : (
                <Quiz 
                    currentQuestionIndex={currentQuestionIndex}
                    onAnswer={handleAnswer}
                    selectedAnswer={answers[currentQuestionIndex]}
                />
            )}
        </main>
      </div>
    </div>
  );
};

export default App;