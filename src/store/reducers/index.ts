import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
