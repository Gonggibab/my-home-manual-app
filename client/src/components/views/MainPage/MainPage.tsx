import './MainPage.css';
import React from 'react';
import { BsFillCursorFill } from 'react-icons/bs'

const MainPage: React.FC = () => {

  return (
    <div className='MainPage'>
      <h1>우리집<br />사용설명서</h1>
      <h2>
        <BsFillCursorFill />
        밀양시 단장면 바드리마을
      </h2>
    </div>
  );
}

export default MainPage;