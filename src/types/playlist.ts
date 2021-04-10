interface ExternalUrls {
  spotify: string;
}

interface Owner {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface ISpotifyPlaylist {
  collaborative: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: any[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}
