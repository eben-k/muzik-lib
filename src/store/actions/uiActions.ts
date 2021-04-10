import { createAction } from '@reduxjs/toolkit';
import withPayloadType from '../../utils/withPayloadType';
import { UIActionTypes } from './actionTypes';

export const setScreenWidth = createAction(
  UIActionTypes.SET_SCREEN_WIDTH,
  withPayloadType<{ width: number }>()
);
