import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../_reducers';
import { logoutUser } from '../../_actions/user_actions';
import { BsFillCaretDownFill } from 'react-icons/bs'
import { BsFillCaretUpFill } from 'react-icons/bs'


const UserOption: React.FC = () => {   
  const dispatch: any = useDispatch();
  const name = useSelector((state: RootState) => state.user.payload.name);
  const [showList, setShowList] = useState<boolean>(false);


  const onLogoutClicked = () => {    
    dispatch(logoutUser());
  };

  const onUserOptionClicked = () => {
    showList ? setShowList(false) : setShowList(true)    
  };



  return (
    <div className='UserOption'>
      <h3>
        반갑습니다, {name}님
        { showList ? (
          <BsFillCaretUpFill onClick={onUserOptionClicked} />
        ) : (
          <BsFillCaretDownFill onClick={onUserOptionClicked} />
        )}
      </h3>
      { showList && (
        <ul>
          <li onClick={onLogoutClicked}>로그아웃</li>
          <li>계정 설정</li>
        </ul>
      )}      
    </div>          
          
)};

export default UserOption;