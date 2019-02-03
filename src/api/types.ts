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

export enum Period {
  Overall = 'overall',
  Week = '7day',
  Month = '1month',
  Quarter = '3month',
  HalfYear = '6month',
  Year = '12month',
}
