import * as http from 'http';
import * as url from 'url';

const ROOT_URL = 'http://ws.audioscrobbler.com/2.0';

export function getRecentTracks(apiKey: string, user: string) {
  return new Promise((resolve, reject) => {
    const query = `${ROOT_URL}/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json`;
    let body = '';
    http.get(query, res => {
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
