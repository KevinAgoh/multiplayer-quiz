import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizSummary from '../QuizSummary/QuizSummary';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

const QuizForm = () => {
  const [quiz, setQuiz] = useState<Question[]>();
  const navigate = useNavigate();

  async function fetchQuiz(category: string, difficulty: string) {
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

    try {
      const response = await axios.get(url);
      setQuiz(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }

  const [formData, setFormData] = useState({
    quantity: '',
    difficulty: '',
    category: ''
  });
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetchQuiz(formData.category, formData.difficulty);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='category'>
        Choose a category:
        <select name='category' id='category' required onChange={handleChange}>
          <option value='9'>General knowledge</option>
          <option value='11'>Films</option>
          <option value='12'>Music</option>
          <option value='15'>Video games</option>
          <option value='17'>Science and nature</option>
          <option value='21'>Sports</option>
          <option value='22'>Geography</option>
          <option value='23'>History</option>
        </select>
      </label>
      <label htmlFor='category'>
        Choose difficulty:
        <select
          name='difficulty'
          id='difficulty'
          required
          onChange={handleChange}
        >
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='difficult'>Difficult</option>
        </select>
      </label>

      <button type='submit'>Submit</button>

      {quiz && <QuizSummary quiz={quiz} />}
      <button>Start Game</button>
    </form>
  );
};

export default QuizForm;
