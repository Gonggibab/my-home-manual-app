import './MessageBox.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../_reducers';
import { openMessage } from '../../../_actions/message_actions';
import { BsFillXCircleFill } from 'react-icons/bs'
import MessageButton from '../MessageButton';


const MessageBox: React.FC = () => {
  const isMessageOpen = useSelector((state: RootState) => state.message.isMessageOpen);
  const dispatch: any = useDispatch();

  const msgBtnClicked = () => {
    dispatch(openMessage(!isMessageOpen))
  }


  return (
    <div className='MessageBox'>
      { isMessageOpen ?
        <div className='message-box'>
          <BsFillXCircleFill size={20} onClick={msgBtnClicked}/>
          <ul>
            <li>가족</li>
            <li>채팅방</li>
          </ul>        
        </div>
        : <MessageButton/>
      }    
      
    </div>    
)};

export default MessageBox;