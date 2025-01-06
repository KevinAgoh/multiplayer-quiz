export interface GameData {
  id: string;
  players: Player[];
  winner?: null | Player;
}

export interface Player {
  id: string;
  username: string;
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
