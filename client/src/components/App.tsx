import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring'
import './App.css';
import Header from './views/Header/Header';
import MainPage from './views/MainPage/MainPage';
import StoryPage from './views/StoryPage/StoryPage';
import StoryManage from './views/StoryManage/StoryManage';
import UserLogin from './views/LoginPage/LoginPage';
import UserRegister from './views/UserRegisterPage/UserRegisterPage';
import MessageButton from './views/MessageButton';
import MessageBox from './views/MessageBox/MessageBox';
import imgMain from '../Images/background-img.jpg';
import { RootState } from '../_reducers';


const App: React.FC = () => {
  const location = useLocation();
  
  const background = useSelector((state: RootState) => state.app.backgournd);
  const isMessageOpen = useSelector((state: RootState) => state.message.isMessageOpen);
  const isLogin = useSelector((state: RootState) => state.user.payload.isLogin);


  const transitions = useTransition(location, {
    from: { opacity: 0, },
    enter: { opacity: 1, }
  });

  useEffect(() => {
    if(background === 'default') {
      document.body.style.backgroundImage = `url('${imgMain}')`;
    };
  }, [background])

  return (
      <div className='App'>      
        <Header />
        { transitions((props, item) => (
          <animated.div 
            className='app'
            style={props}
          >  
            <Routes location={item}>
              <Route path='/' element={<MainPage />} />
              <Route path='/userlogin' element={<UserLogin />} />
              <Route path='/userregister' element={<UserRegister />} />
              <Route path='/story' element={<StoryPage />} />
              <Route path='/storyManage' element={<StoryManage />} />
            </Routes>      
          </animated.div>
        ))}    
        { isLogin && !isMessageOpen && <MessageButton /> } 
        { isLogin && <MessageBox /> }       
      </div >
  )
};
    



export default App