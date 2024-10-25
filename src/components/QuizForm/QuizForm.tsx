import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizForm = () => {
  const [quiz, setQuiz] = useState();
  const navigate = useNavigate();

  async function fetchQuiz(
    amount: string,
    category: string,
    difficulty: string
  ) {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

    try {
      const response = await axios.get(url);
      console.log(response.data); // The weather data is stored in response.data
      setQuiz(response.data);
      console.log(quiz);
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
    console.log(formData);
    await fetchQuiz(formData.quantity, formData.category, formData.difficulty);
    navigate('quiz');
    // Add your  submission logic here
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='quantity'>
        Choose number of questions:
        <select name='quantity' id='quantity' required onChange={handleChange}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
        </select>
      </label>
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
    </form>
  );
};

export default QuizForm;
