import './Header.css';
import React, { useEffect } from 'react';
import img from '../../../Images/app-white-logo-100.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../_reducers';
import LoginButton from '../LoginButton';
import { authUser } from '../../../_actions/user_actions';
import { clearStoryStates } from '../../../_actions/story_actions';
import { setRouteLocation } from '../../../_actions/app_actions';


const Header: React.FC = () => {   
  const dispatch: any = useDispatch();
  const isLogin = useSelector((state: RootState) => state.user.payload.isLogin)

  useEffect(()=> {
    dispatch(authUser());
  }, [dispatch])


  const onMainClicked = (location: string) => {
    dispatch(setRouteLocation(location));
    dispatch(clearStoryStates());
  };
  const onStoryClicked = (location: string) => {
    dispatch(setRouteLocation(location));
  };
  const onProductClicked = (location: string) => {
    dispatch(setRouteLocation(location));
    dispatch(clearStoryStates());
  };
  const onManualClicked = (location: string) => {
    dispatch(setRouteLocation(location));
    dispatch(clearStoryStates());
  };

  return (
    <div className='Header'>
      <div className='nav-bar'>
        <Link to="/" onClick={() => onMainClicked('/')}>
          <img 
            className='logo-white-img' 
            src={img} 
            alt='app logo' 
          />
        </Link>
        <Link 
          to="/story" 
          onClick={() => onStoryClicked('/story')}
        >
          우리집 이야기
        </Link>
        <Link 
          to="/product" 
          onClick={() => onProductClicked('/product')}
        >
          우리집 제품
        </Link>

        { isLogin && (
          <Link 
            to="/manual"
            onClick={() => onManualClicked('/manual')}
          >
            우리집 사용설명서
          </Link>
        )}
      </div>

      <LoginButton />

    </div >
  )
}

export default Header