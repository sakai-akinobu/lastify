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

export interface TopArtists {
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

export type Period =
  | 'overall'
  | '7day'
  | '1month'
  | '3month'
  | '6month'
  | '12month';
