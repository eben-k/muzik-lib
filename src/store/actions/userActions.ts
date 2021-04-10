import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserDataService,
  loginUserService,
} from '../../services/userService';
import { ISpotifyUser, IUserAuthResponse } from '../../types/user';
import withPayloadType from '../../utils/withPayloadType';
import { UserActions } from './actionTypes';

export const loginSuccessAction = createAction(
  UserActions.LOGIN_USER_SUCCESS,
  withPayloadType<IUserAuthResponse>()
);

export const loginErrorAction = createAction(
  UserActions.LOGIN_USER_ERROR,
  withPayloadType<{ error: Error }>()
);

export const logoutUserAction = createAction(UserActions.LOGOUT_USER);

export const loginUserAction = createAsyncThunk(
  UserActions.LOGIN_USER,
  async (authCode: string, { dispatch }) => {
    try {
      const response = await loginUserService(authCode);

      dispatch(loginSuccessAction(response));
      dispatch(getUserDataAction());
    } catch (error) {
      dispatch(loginErrorAction(error));
    }
  }
);

export const getUserDataSuccessAction = createAction(
  UserActions.GET_USER_DATA_SUCCESS,
  withPayloadType<ISpotifyUser>()
);

export const getUserDataErrorAction = createAction(
  UserActions.GET_USER_DATA_ERROR,
  withPayloadType<{ error: string }>()
);

export const getUserDataAction = createAsyncThunk(
  UserActions.GET_USER_DATA,
  async (data, { dispatch }) => {
    try {
      const response = await getUserDataService();

      dispatch(getUserDataSuccessAction(response));
    } catch (error) {
      dispatch(getUserDataErrorAction(error.message));
    }
  }
);
