import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizForm from '../../components/QuizForm/QuizForm';

interface HomeProps {
  isConnected: boolean;
}

const Home = ({ isConnected }: HomeProps) => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  return (
    <>
      <QuizForm />
      <p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
    </>
  );
};

export default Home;
