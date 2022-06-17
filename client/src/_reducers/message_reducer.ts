import { messageAction } from '../_actions/message_actions';
import { MESSAGE_OPEN, MESSAGE_CLOSE } from '../_actions/types'

type messageState = {
  isMessageOpen: boolean
};

const initialState: messageState = {
  isMessageOpen: false
};


function message(
  state: messageState = initialState, 
  action: messageAction
): messageState {
    switch (action.type) {
      case MESSAGE_OPEN:
        return {
          ...state, 
          isMessageOpen: true
        };
      case MESSAGE_CLOSE:
        return {
          ...state, 
          isMessageOpen: false
        };
      default:
        return {...state};
    }
}

export default message;