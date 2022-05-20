import './Header.css';
import React from 'react';
import img from '../../Images/app-white-logo-100.png';
import { Link } from 'react-router-dom';
import { IoLogIn } from 'react-icons/io5'


interface IBackgroundProps {
  setBackground: (background:string) => void,
}


const Header: React.FC<IBackgroundProps> = props => {
  const { setBackground } = props

  const changeBackgournd = (img: string) => {
    setBackground(img)
  }

  return (
    <div className='Header'>
      <div className='nav-bar'>
        <Link 
          to="/"
          onClick={() => changeBackgournd("main")}
        >
          <img className='logo-white-img' src={img} alt='app logo' />
        </Link>
        <Link to="/intro" >우리집 소개</Link>
        <Link 
          to="/story" 
          onClick={() => changeBackgournd("2009")}
        >
          우리집 이야기
        </Link>
        <Link to="/product">우리집 제품</Link>
      </div>
      <div className='login-btn'>
        <Link to="/userlogin" >
          로그인
          <IoLogIn 
            size={20}
          />
        </Link>
      </div>
    </div >
  )
}

export default Header