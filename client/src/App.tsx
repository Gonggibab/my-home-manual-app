import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import MainPage from './Components/MainPage/MainPage';
import Story from './Components/Story/Story';
import UserLogin from './Components/UserLogin/UserLogin';
import UserRegister from './Components/UserRegister/UserRegister';
import imgMain from './Images/background-img.jpg';
import img2009 from './Images/Satellite/2009.png';


const App: React.FC = () => {
  const [background, setBackground] = useState<string>('main');

  useEffect(() => {
    if(background == 'main') {
      document.body.style.backgroundImage = `url('${imgMain}')` ;
    }
    if(background == '2009') {
      document.body.style.backgroundImage = `url('${img2009}')` ;
    }
  }, [background])

  return (
    <div className='App'>      
      <BrowserRouter>
      <Header       
        setBackground={setBackground}
      />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/userlogin' element={<UserLogin />} />
          <Route path='/userregister' element={<UserRegister />} />
          <Route path='/story' element={<Story />} />
        </Routes>
      </BrowserRouter>   
    </div >
  );
}


export default App