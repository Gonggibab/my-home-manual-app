import './Story.css';
import React from 'react';
import img2009 from '../../Images/Satellite/2009.png';

const Story: React.FC = () => { 
  const changeBackground = () => {
    document.body.style.background = `url('${img2009}')` ;
  }

  return (
    <div className='Story'>
    </div>
  );
}

export default Story