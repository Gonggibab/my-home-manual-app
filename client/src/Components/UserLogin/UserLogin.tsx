import './UserLogin.css';
import React from 'react';
import img from '../../Images/app-white-logo-600.png';
import { Link } from 'react-router-dom';

const UserLogin: React.FC = () => {
  return (
    <div className='UserLogin'>
      <img className='logo-white-img' src={img} alt='app logo' />
      <input className='id-input' type='text' placeholder='아이디' />
      <input className='password-input' type='password' placeholder='패스워드'/>
      <button className='login-btn'>로그인</button>
      <Link to="/userregister" className='user-register-link'>가족 등록하기</Link>
      <Link to="/userfind" className='user-find-link'>아이디 또는 비밀번호 찾기</Link>
    </div>
  )
}

export default UserLogin