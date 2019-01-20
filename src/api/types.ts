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
