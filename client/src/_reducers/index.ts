import { combineReducers } from "redux";
import app from './app_reducer';
import user from './user_reducer';
import message from './message_reducer';
import story from './story_reducer';


const rootReducer = combineReducers({
  app,
  user,
  message,
  story
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;