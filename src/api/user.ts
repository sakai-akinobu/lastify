import * as http from 'http';

import {
  RecentTracks,
  TopAlbums,
  TopArtist,
  TopTracks,
} from './types';

const ROOT_URL = 'http://ws.audioscrobbler.com/2.0';

function getRequest<T>(apiKey: string, user: string, apiMethod: string): Promise<T> {
  const url = `${ROOT_URL}/?method=user.${apiMethod}&user=${user}&api_key=${apiKey}&format=json`;
  return new Promise((resolve, reject) => {
    let body = '';
    http.get(url, res => {
      res.on('data', data => {
        body += data;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error.message);
        }
      });
      res.on('error', error => {
        reject(error.message);
      });
    });
  });
}

export function getRecentTracks(apiKey: string, user: string): Promise<RecentTracks> {
  return getRequest<RecentTracks>(apiKey, user, 'getrecenttracks');
}

export function getTopAlbums(apiKey: string, user: string): Promise<TopAlbums> {
  return getRequest<TopAlbums>(apiKey, user, 'gettopalbums');
}

export function getTopArtists(apiKey: string, user: string): Promise<TopArtist> {
  return getRequest<TopArtist>(apiKey, user, 'gettopartists');
}

export function getTopTracks(apiKey: string, user: string): Promise<TopTracks> {
  return getRequest<TopTracks>(apiKey, user, 'gettoptracks');
}
