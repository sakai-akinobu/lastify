export interface RecentTracks {
  recenttracks: {
    track: [
      {
        name: string;
        album: {
          '#text': string;
        };
        artist: {
          '#text': string;
        };
        date?: {
          '#text': string;
        };
      }
    ];
  };
}

export interface TopAlbums {
  topalbums: {
    album: [
      {
        name: string;
        artist?: {
          name: string;
        };
        playcount: number;
      }
    ];
  };
}

export interface TopArtist {
  topartists: {
    artist: [
      {
        name: string;
        playcount: number;
      }
    ];
  };
}

export interface TopTracks {
  toptracks: {
    track: [
      {
        name: string;
        artist?: {
          name: string;
        };
        playcount: number;
      }
    ];
  };
}
