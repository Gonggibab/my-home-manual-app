import './LoginPage.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import img from '../../../Images/app-white-logo-600.png';


const LoginPage: React.FC = (props) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const [loginErrMsg, setloginErrMsg] = useState<String>("");


  const onUserIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setloginErrMsg("");
    setUserId(e.currentTarget.value)
  };
  const onUserPassHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setloginErrMsg("");
    setUserPass(e.currentTarget.value)
  };

  const onLoginClicked = () => {     
    let body = {
      userId: userId,
      userPass: userPass
    };

    dispatch(loginUser(body))
      .then((res: { payload: { isLogin: Boolean; message: String; }; }) => {
        if (res.payload.isLogin) {
          setloginErrMsg("");
          navigate('/');
        } else if(userId === "" || userPass === "") {
          setloginErrMsg("아이디와 패스워드를 입력하세요!");
        } else {
          setloginErrMsg(res.payload.message);
        };       
      });
  };


  return (
    <div className='LoginPage'>
      <img className='logo-white-img' src={img} alt='app logo' /> 
      <input 
        className='id-input' 
        type='text' 
        placeholder='아이디' 
        value={userId}
        onChange={(e) => onUserIdHandler(e)}
      />
      <input 
        className='password-input' 
        type='password' 
        placeholder='패스워드' 
        value={userPass}
        onChange={(e) => onUserPassHandler(e)} 
      />      
      <button className='login-btn' onClick={onLoginClicked}>로그인</button>
      <div className='err-box'>
        {loginErrMsg}
      </div>
      <Link to="/userregister" className='user-register-link'>가족 등록하기</Link>
      <Link to="/userfind" className='user-find-link'>아이디 또는 비밀번호 찾기</Link>
    </div>
  )
}

export default LoginPage