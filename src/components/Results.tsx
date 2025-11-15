import React from 'react';
import { ResultHistoryItem } from '../types';

interface ResultsProps {
  score: number;
  history: ResultHistoryItem[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, history, onRestart }) => {
  let level: string;
  let message: string;
  let colorClass: string;
  let emoji: string;

  if (score <= 4) {
    level = 'Estresse Baixo';
    message = 'Você parece estar bem equilibrado. Continue cuidando da sua rotina e mantendo seus hábitos saudáveis.';
    colorClass = 'text-green-500';
    emoji = '😊';
  } else if (score <= 8) {
    level = 'Estresse Moderado';
    message = 'Atenção aos sinais. Tente desacelerar um pouco e incluir mais pausas ou momentos de lazer no seu dia a dia.';
    colorClass = 'text-yellow-500';
    emoji = '🤔';
  } else {
    level = 'Estresse Alto';
    message = 'Seu corpo e sua mente pedem um descanso. É importante buscar formas de relaxar e, se possível, conversar com um profissional.';
    colorClass = 'text-red-500';
    emoji = '😥';
  }

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Seu Resultado</h2>
      <div className={`text-5xl font-bold ${colorClass} my-4`}>
        {score} <span className="text-3xl text-slate-500 dark:text-slate-400">pontos</span>
      </div>
      <p className={`text-2xl font-semibold mb-4 ${colorClass}`}>
        {emoji} {level}
      </p>
      <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8">{message}</p>
      
      <div className="bg-sky-50 dark:bg-sky-900/50 p-4 rounded-lg mb-8">
        <p className="text-sky-800 dark:text-sky-200 font-medium">
          Lembre-se: cuidar da sua saúde mental é um ato de amor-próprio. Você merece estar bem! ✨
        </p>
      </div>

      <button
        onClick={onRestart}
        className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-400 focus:ring-opacity-50"
      >
        Refazer o Teste
      </button>

      {history && history.length > 1 && (
        <div className="mt-10 text-left">
          <h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">Histórico Recente</h3>
          <ul className="space-y-2">
            {history.slice(1).map((item, index) => (
              <li key={index} className="flex justify-between items-center bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 text-sm">{item.date}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{item.score} pontos</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Results;