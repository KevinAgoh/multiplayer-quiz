import { Question } from '../QuizForm/QuizForm';

interface QuizSummaryProps {
  quiz: Question[];
}

const QuizSummary = ({ quiz }: QuizSummaryProps) => {
  return (
    <div>
      <h2>Quiz summary</h2>
      <p>Category: {quiz[0].category ?? quiz[1].category}</p>
      <p>Difficulty: {quiz[0].difficulty}</p>
    </div>
  );
};

export default QuizSummary;
