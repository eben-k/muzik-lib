import { createReducer } from '@reduxjs/toolkit';
import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import { IUserAuthResponse } from '../../types/user';
import {
  loginErrorAction,
  loginSuccessAction,
  logoutUserAction,
} from '../actions/userActions';

export interface TAuthReducer {
  authData: IUserAuthResponse | null;
  isAuthenticated: boolean;
  expires: number;
  error: Error | null;
}

const initialState: TAuthReducer = {
  authData: null,
  isAuthenticated: false,
  expires: Date.now(),
  error: null,
};

const authReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(loginSuccessAction, (state, action) => {
      state.authData = action.payload;
      state.isAuthenticated = true;
      state.expires = Date.now() + action.payload.expires_in * 100;
      state.error = null;
    })
    .addCase(loginErrorAction, (state, action) => {
      state.authData = null;
      state.error = action.payload.error;
      state.isAuthenticated = false;
    })
    .addCase(logoutUserAction, () => initialState)
);

export default persistReducer(
  {
    key: 'auth_data',
    storage: localForage,
    whitelist: ['authData', 'isAuthenticated', 'expires'],
  },
  authReducer
);
