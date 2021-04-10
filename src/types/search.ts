export interface ExternalUrls {
  spotify: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface ISpotifyAlbum {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface ExternalIds {
  isrc: string;
}

export interface ISpotifyTrack {
  album: ISpotifyAlbum;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url?: any;
  track_number: number;
  type: string;
  uri: string;
}

export interface ISpotifyResultMeta {
  limit: number;
  next: string;
  offset: number;
  previous?: any;
  total: number;
  href: string;
}
export interface Tracks extends ISpotifyResultMeta {
  items: ISpotifyTrack[];
}

export interface ISpotifyTracksSearchResult {
  tracks: Tracks;
}

export interface ISpotifyNewReleasesResult {
  albums: {
    items: ISpotifyAlbum[];
  } & ISpotifyResultMeta;
}

export interface IGetTrackByIdsResult {
  tracks: ISpotifyTrack[];
}

export interface IGetAlbumsByIdsResult {
  albums: ISpotifyAlbum[];
}
