export interface IUserAuthResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
}

export interface ISpotifyUserImage {
  height?: any;
  url: string;
  width?: any;
}

export interface ISpotifyUser {
  display_name: string;
  email: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: ISpotifyUserImage[];
  product: string;
  type: string;
  uri: string;
}
