import * as http from 'http';

import {
  RecentTracks,
  TopAlbums,
  TopArtists,
  TopTracks,
  Period,
} from './types';

const ROOT_URL = 'http://ws.audioscrobbler.com/2.0';

function getRequest<T>(apiKey: string, user: string, apiMethod: string, option: {period?: Period, limit?: number}): Promise<T> {
  const url = `${ROOT_URL}/?method=user.${apiMethod}&user=${user}&api_key=${apiKey}&period=${option.period}&limit=${option.limit}&format=json`;
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

export function getRecentTracks(apiKey: string, user: string, limit: number = 5): Promise<RecentTracks> {
  return getRequest<RecentTracks>(apiKey, user, 'getrecenttracks', {limit});
}

export function getTopAlbums(apiKey: string, user: string, period: Period = '1month', limit: number = 5): Promise<TopAlbums> {
  return getRequest<TopAlbums>(apiKey, user, 'gettopalbums', {period, limit});
}

export function getTopArtists(apiKey: string, user: string, period: Period = '1month', limit: number = 5): Promise<TopArtists> {
  return getRequest<TopArtists>(apiKey, user, 'gettopartists', {period, limit});
}

export function getTopTracks(apiKey: string, user: string, period: Period = '1month', limit: number = 5): Promise<TopTracks> {
  return getRequest<TopTracks>(apiKey, user, 'gettoptracks', {period, limit});
}
