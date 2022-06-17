import './UserRegisterPage.css';
import React from 'react';
import { Link } from 'react-router-dom';

const UserRegisterPage: React.FC = () => {
  return (
    <div className='UserRegisterPage'>
      <h1>가족등록하기</h1>
      <h3>아이디:</h3>
      <input className='id-input' type='text' placeholder='아이디' />
      <h3>패스워드:</h3>
      <input className='password-input' type='password' placeholder='패스워드'/> 
      <h3>패스워드 확인:</h3>
      <input className='pass-confirm-input' type='password' placeholder='위의 패스워드와 동일하게 입력해 주세요'/>     
      <h3>이름:</h3>
      <input className='name-input' type='text' placeholder='홍길동' />
      <h3>생년월일:</h3>
      <input className='birthday-input' type='date'/>
      <h3>이메일:</h3>
      <input className='email-input' type='text'/>
      <button className='register-btn'>등록 요청하기</button>
      <Link to="/userlogin" className='user-login-link'>뒤로</Link>
    </div>
  )
}

export default UserRegisterPage