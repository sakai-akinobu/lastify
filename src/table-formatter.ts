import Table = require('cli-table');

import {
  RecentTracks,
  TopAlbums,
  TopArtists,
  TopTracks,
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
  const topAlbumTable = new Table({
    head: ['Album', 'Artist', 'Play count'],
  });
  json.topalbums.album.forEach(album => {
    topAlbumTable.push([
      album.name,
      album.artist ? album.artist.name : '',
      album.playcount,
    ]);
  });
  return topAlbumTable.toString() + '\n';
}

export function topArtists(json: TopArtists): string {
  const topArtistsTable = new Table({
    head: ['Artist', 'Play count'],
  });
  json.topartists.artist.forEach(artist => {
    topArtistsTable.push([
      artist.name,
      artist.playcount,
    ]);
  });
  return topArtistsTable.toString() + '\n';
}

export function topTracks(json: TopTracks): string {
  const topTracksTable = new Table({
    head: ['Artist', 'Track', 'Play count'],
  });
  json.toptracks.track.forEach(track => {
    topTracksTable.push([
      track.artist ? track.artist.name : '',
      track.name,
      track.playcount,
    ]);
  });
  return topTracksTable.toString() + '\n';
}
