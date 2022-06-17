import HttpRequest from '../HttpRequest';
import { LOGIN_USER, LOGOUT_USER, AUTH_USER } from './types'

type loginData =  {
  userId: String,
  userPass: String
}

export const loginUser = (body: loginData) => { 
  const request = HttpRequest.post('/api/users/login', body)
  .then(res => res.data);  

  return {
    type: LOGIN_USER,
    payload: request
  };
};

export const logoutUser = () => { 
  const request = HttpRequest.get('/api/users/logout')
  .then(res => res.data);

  return {
    type: LOGOUT_USER,
    payload: request
  };
};

export const authUser = () => { 
  const request = HttpRequest.get('/api/users/auth')
  .then(res => res.data);

  return {
    type: AUTH_USER,
    payload: request
  };
}


export type userAction = 
  | ReturnType<typeof loginUser>
  | ReturnType<typeof logoutUser>
  | ReturnType<typeof authUser>