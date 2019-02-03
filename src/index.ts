import * as tableFormatter from './table-formatter';
import * as apiUser from './api/user';
import {Period} from './api/types';
import {parse} from './options';

const {
  apiKey,
  user,
  period,
  limit,
} = parse(process.env, process.argv);

if (apiKey === undefined) {
  process.stderr.write(`--api-key argument is required.\n`);
  process.exit(1);
}
if (user === undefined) {
  process.stderr.write(`--user argument is required.\n`);
  process.exit(1);
}
if (period !== undefined) {
  if (![
    'overall',
    '7day',
    '1month',
    '3month',
    '6month',
    '12month',
  ].includes(period)) {
    process.stderr.write(`--period must be overall | 7day | 1month | 3month | 6month | 12month.\n`);
    process.exit(1);
  }
}
if (limit !== undefined) {
  if (isNaN(Number(limit)) || Number(limit) !== parseInt(limit, 10)) {
    process.stderr.write(`--limit must be integer.\n`);
    process.exit(1);
  }
}

Promise.all([
  apiUser.getRecentTracks(apiKey!, user!, Number(limit)),
  apiUser.getTopAlbums(apiKey!, user!, period as Period, Number(limit)),
  apiUser.getTopArtists(apiKey!, user!, period as Period, Number(limit)),
  apiUser.getTopTracks(apiKey!, user!, period as Period, Number(limit)),
])
.then(([
  recentTracks,
  topAlbums,
  topArtists,
  topTracks,
]) => {
  process.stdout.write(
    [
      tableFormatter.recentTracks(recentTracks),
      tableFormatter.topAlbums(topAlbums),
      tableFormatter.topArtists(topArtists),
      tableFormatter.topTracks(topTracks),
    ].join('\n'),
  );
  process.exit(0);
})
.catch(e => {
  process.stderr.write(`${e.message}\n`);
  process.exit(1);
});
