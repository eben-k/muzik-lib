import { createReducer } from '@reduxjs/toolkit';
import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import { ISpotifyUser } from '../../types/user';
import {
  getUserDataErrorAction,
  getUserDataSuccessAction,
  logoutUserAction,
} from '../actions/userActions';

export interface IUserReducer {
  userData: ISpotifyUser | null;
  error: string | null;
}

const initialState: IUserReducer = {
  userData: null,
  error: null,
};

const userReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getUserDataSuccessAction, (state, action) => {
      state.userData = action.payload;
      state.error = null;
    })
    .addCase(getUserDataErrorAction, (state, action) => {
      state.userData = null;
      state.error = action.payload.error;
    })
    .addCase(logoutUserAction, () => initialState)
);

export default persistReducer(
  {
    key: 'user_data',
    storage: localForage,
    whitelist: ['userData'],
  },
  userReducer
);
