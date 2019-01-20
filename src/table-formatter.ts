import Table = require('cli-table');

import {RecentTracks} from './api/types';

export function recentTracks(json: RecentTracks): string {
  const recentTracksTable = new Table({
    head: ['Artist', 'Album', 'Track', 'Date'],
  });
  json.recenttracks.track.forEach(track => {
    recentTracksTable.push([
      track.artist['#text'],
      track.album['#text'],
      track.name,
      track.date ? track.date['#text'] : '',
    ]);
  });
  return recentTracksTable.toString() + '\n';
}
