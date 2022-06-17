import { LOGIN_USER, LOGOUT_USER, AUTH_USER } from '../_actions/types'
import { userAction } from '../_actions/user_actions';

type userState = {
  payload: any
};

const initialState: userState = {
  payload: {
    isLogin: false,
    message: ""    
  }
};


function user(
  state: userState = initialState, 
  action: userAction
): userState {
    switch (action.type) {
      case LOGIN_USER:
        return {
          ...state, 
          payload: action.payload
        };
      case LOGOUT_USER:
        return {
          ...state,
          payload: action.payload
        };
      case AUTH_USER:
        return {
          ...state,
          payload: action.payload
        };
      default:
        return {...state};
    }
}

export default user;