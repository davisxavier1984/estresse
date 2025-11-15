import { Question, Option } from './types.ts';

export const QUESTIONS: Question[] = [
  { id: 1, text: 'Você se sente cansado(a) mesmo após uma boa noite de sono?' },
  { id: 2, text: 'Você tem dores de cabeça, tensão muscular ou palpitações?' },
  { id: 3, text: 'Você se sente irritado(a), impaciente ou com os nervos à flor da pele?' },
  { id: 4, text: 'Você tem dificuldade para se concentrar em suas tarefas?' },
  { id: 5, text: 'Você percebeu alterações no seu apetite (comendo mais ou menos que o normal)?' },
  { id: 6, text: 'Você está com problemas para dormir (insônia, sono agitado)?' },
  { id: 7, text: 'Você se sente constantemente preocupado(a) ou sobrecarregado(a)?' },
];

export const OPTIONS: Option[] = [
  { label: 'Nunca', value: 0 },
  { label: 'Às vezes', value: 1 },
  { label: 'Frequentemente', value: 2 },
];