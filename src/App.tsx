import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';

function App(): ReactNode {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quiz' element={<Quiz />} />
      </Routes>
    </>
  );
}

export default App;
