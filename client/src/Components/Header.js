import { Link } from 'react-router-dom';
import './Header.css';
import img from '../Images/app-white-logo.png';
import UserLogin from './For_family/UserLogin';


export default function Header() {
  return (
    <div className='Header'>
      <div className='nav-bar'>
        <Link to="/">
          <img className='logo-white-img' src={img} alt='app logo' />
        </Link>
        <Link to="/">우리집 소개</Link>
        <Link to="/">우리집 이야기</Link>
        <Link to="/">우리집 제품</Link>
      </div>
      <UserLogin />
    </div >
  )
}