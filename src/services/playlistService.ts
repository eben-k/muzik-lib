import { ISpotifyPlaylist } from '../types/playlist';
import { authHttp } from './httpService';

export const createAndAddItemsToPlaylistService = async (
  userId: string,
  name: string,
  description: string,
  items: string[]
) => {
  const newPlaylist = await authHttp.post<ISpotifyPlaylist>(
    `users/${userId}/playlists`,
    {
      name,
      description,
      public: false,
      collaborative: false,
    }
  );

  await authHttp.post<{ snapshot_id: string }>(
    `playlists/${newPlaylist.data.id}/tracks`,
    {
      uris: items.map((item) => `spotify:track:${item}`),
    }
  );

  return newPlaylist.data;
};
