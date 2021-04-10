import { createAction } from '@reduxjs/toolkit';
import withPayloadType from '../../utils/withPayloadType';
import { LibraryActions } from './actionTypes';

export const setLibraryDataAction = createAction(
  LibraryActions.SET_LIBRARY_DATA,
  withPayloadType<{
    tracks: Record<string, true | undefined>;
    albums: Record<string, true | undefined>;
  }>()
);
