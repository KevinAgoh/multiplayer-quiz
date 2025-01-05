export interface GameData {
  players: Player[];
  winner: null | Player;
}

export interface Player {
  name: string;
  score?: number;
}

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}
