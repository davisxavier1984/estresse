
export type AnswerValue = 0 | 1 | 2;

export interface Question {
  id: number;
  text: string;
}

export interface Option {
  label: string;
  value: AnswerValue;
}

export interface ResultHistoryItem {
  score: number;
  date: string;
}
