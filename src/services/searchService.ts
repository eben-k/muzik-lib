import {
  IGetAlbumsByIdsResult,
  IGetTrackByIdsResult,
  ISpotifyNewReleasesResult,
  ISpotifyTracksSearchResult,
} from '../types/search';
import { authHttp } from './httpService';

export const searchTracksService = async (query: {
  q: string;
  offset: number;
}) => {
  const response = await authHttp.get<ISpotifyTracksSearchResult>('/search', {
    params: { ...query, type: 'track', limit: 20 },
  });

  return response.data;
};

export const newReleasesService = async (offset: number) => {
  const response = await authHttp.get<ISpotifyNewReleasesResult>(
    '/browse/new-releases',
    { params: { offset, limit: 4 } }
  );

  return response.data;
};

export const getTracksByIdsService = async (ids: string[]) => {
  const response = await authHttp.get<IGetTrackByIdsResult>('/tracks', {
    params: { ids: ids.join(',') },
  });

  return response.data;
};

export const getAlbumsByIdsService = async (ids: string[]) => {
  const response = await authHttp.get<IGetAlbumsByIdsResult>('/albums', {
    params: { ids: ids.join(',') },
  });

  return response.data;
};
