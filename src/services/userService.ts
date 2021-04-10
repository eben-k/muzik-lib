import qs from 'qs';
import { clientId, clientSecret, redirectURL } from '../config/environment';
import { ISpotifyUser, IUserAuthResponse } from '../types/user';
import { authHttp, http } from './httpService';

export const loginUserService = async (code: string) => {
  const response = await http.post<IUserAuthResponse>(
    'https://accounts.spotify.com/api/token',
    qs.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectURL,
    }),
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString('base64')}`,
      },
    }
  );

  return response.data;
};

export const getUserDataService = async () => {
  const response = await authHttp.get<ISpotifyUser>('/me');

  return response.data;
};
