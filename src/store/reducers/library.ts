import { createReducer } from '@reduxjs/toolkit';
import { setLibraryDataAction } from '../actions/libraryActions';
import { logoutUserAction } from '../actions/userActions';

export interface IUserReducer {
  tracks: Record<string, true | undefined>;
  albums: Record<string, true | undefined>;
}

const initialState: IUserReducer = {
  tracks: {},
  albums: {},
};

const libraryReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setLibraryDataAction, (state, action) => {
      state.tracks = action.payload.tracks;
      state.albums = action.payload.albums;
    })
    .addCase(logoutUserAction, () => initialState)
);

export default libraryReducer;
