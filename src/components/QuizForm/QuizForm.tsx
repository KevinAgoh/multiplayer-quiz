import axios from 'axios';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import { generateUniqueId } from '../../helpers/generateUniqueId';
import { Question } from '../../types/game';

interface QuizFormProps {
  setQuiz: (quiz: Question[]) => void;
}

const QuizForm = ({ setQuiz }: QuizFormProps) => {
  const socket = useContext(SocketContext);

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

  const handleCreateGame = () => {
    socket.emit('create-game', { id: generateUniqueId() });
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

      <button type='submit' onClick={handleCreateGame}>
        Submit
      </button>
    </form>
  );
};

export default QuizForm;
