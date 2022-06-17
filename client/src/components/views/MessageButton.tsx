import React from 'react';
import { BsChatRightDots } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../_reducers';
import { openMessage } from '../../_actions/message_actions';


const MessageButton: React.FC = () => {
  const isMessageOpen = useSelector((state: RootState) => state.message.isMessageOpen);
  const dispatch: any = useDispatch();

  const msgBtnClicked = () => {
    dispatch(openMessage(!isMessageOpen))
  }

  return (
    <div className='MessageButton' onClick={msgBtnClicked}>
      <BsChatRightDots size={25}/>
    </div>
)};

export default MessageButton;