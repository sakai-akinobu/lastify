#!/usr/bin/env node

const path = require('path');

const main = require(path.join(__dirname, '../lib/src/index')).main;
const parse = require(path.join(__dirname, '../lib/src/options')).parse;
const exitWithErrorMessage = require(path.join(__dirname, '../lib/src/error-handler')).exitWithErrorMessage;
const tableFormatter = require(path.join(__dirname, '../lib/src/table-formatter'));

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
    'overall',
    '7day',
    '1month',
    '3month',
    '6month',
    '12month',
  ].includes(period)) {
    exitWithErrorMessage(process, `--period must either overall | 7day | 1month | 3month | 6month | 12month.`);
  }
}
if (limit !== undefined) {
  if (Number.isNaN(Number(limit)) || Number(limit) !== parseInt(limit, 10)) {
    exitWithErrorMessage(process, `--limit must be integer.`);
  }
}

main(apiKey, user, period, limit)
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
