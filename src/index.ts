import * as apiUser from './api/user';
import {Period} from './api/types';

export async function main(apiKey: string, user: string, period: string, limit: number): Promise<any> {
  return Promise.all([
    apiUser.getRecentTracks(apiKey, user, limit),
    apiUser.getTopAlbums(apiKey, user, period as Period, limit),
    apiUser.getTopArtists(apiKey, user, period as Period, limit),
    apiUser.getTopTracks(apiKey, user, period as Period, limit),
  ]);
}
