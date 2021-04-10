import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/uiActions';

interface IUIReducer {
  screenWidth: number;
}

const initialState: IUIReducer = {
  screenWidth: window.innerWidth,
};

const uiReducer = createReducer(initialState, (builder) =>
  builder.addCase(actions.setScreenWidth, (state, action) => {
    state.screenWidth = action.payload.width;
  })
);

export default uiReducer;
