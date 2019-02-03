import * as tableFormatter from './table-formatter';
import * as apiUser from './api/user';
import {Period} from './api/types';
import {parse} from './options';
import {exitWithErrorMessage} from './error-handler';

const {
  apiKey,
  user,
  period,
  limit,
} = parse(process.env, process.argv);

if (apiKey === undefined) {
  exitWithErrorMessage(process, `--api-key argument is required.`);
}
if (user === undefined) {
  exitWithErrorMessage(process, `--user argument is required.`);
}
if (period !== undefined) {
  if (![
    Period.Overall,
    Period.Week,
    Period.Month,
    Period.Quarter,
    Period.HalfYear,
    Period.Year,
  ].includes(period as Period)) {
    exitWithErrorMessage(process, `--period must either overall | 7day | 1month | 3month | 6month | 12month.`);
  }
}
if (limit !== undefined) {
  if (isNaN(Number(limit)) || Number(limit) !== parseInt(limit, 10)) {
    exitWithErrorMessage(process, `--limit must be integer.`);
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
  exitWithErrorMessage(process, `${e.message}`);
});
