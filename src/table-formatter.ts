import Table = require('cli-table');

import {
  RecentTracks,
  TopAlbums,
} from './api/types';

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

export function topAlbums(json: TopAlbums): string {
  const topAlbumdTable = new Table({
    head: ['Album', 'Artist', 'Play count'],
  });
  json.topalbums.album.forEach(album => {
    topAlbumdTable.push([
      album.name,
      album.artist ? album.artist.name : '',
      album.playcount,
    ]);
  });
  return topAlbumdTable.toString() + '\n';
}
