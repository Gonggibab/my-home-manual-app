import React from 'react';
import { Link } from 'react-router-dom';
import { IoLogIn } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../_reducers';
import UserOption from './UserOption';
import { clearStoryStates } from '../../_actions/story_actions';


const LoginButton: React.FC = () => {
  const dispatch: any = useDispatch();

  const isLogin = useSelector((state: RootState) => state.user.payload.isLogin);

  const selectBackground = (img: string) => {
    dispatch(clearStoryStates())
  }

  return (
    <div className='LoginButton'>
        { isLogin ? (
          <UserOption />
        ) : (
          <Link to="/userlogin" onClick={() => selectBackground("main")}>
            로그인
            <IoLogIn 
              size={20}
            />
          </Link>
        )}      
      </div>
)};

export default LoginButton;