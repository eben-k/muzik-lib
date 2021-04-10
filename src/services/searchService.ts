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
  const response = await authHttp.get<ISpotifyTracksSearchResult>(
    'https://api.spotify.com/v1/search',
    { params: { ...query, type: 'track', limit: 20 } }
  );

  return response.data;
};

export const newReleasesService = async (offset: number) => {
  const response = await authHttp.get<ISpotifyNewReleasesResult>(
    'https://api.spotify.com/v1/browse/new-releases',
    { params: { offset, limit: 4 } }
  );

  return response.data;
};

export const getTracksByIdsService = async (ids: string[]) => {
  const response = await authHttp.get<IGetTrackByIdsResult>(
    'https://api.spotify.com/v1/tracks',
    { params: { ids: ids.join(',') } }
  );

  return response.data;
};

export const getAlbumsByIdsService = async (ids: string[]) => {
  const response = await authHttp.get<IGetAlbumsByIdsResult>(
    'https://api.spotify.com/v1/albums',
    { params: { ids: ids.join(',') } }
  );

  return response.data;
};
