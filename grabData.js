const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const token = '';
var express = require('express');
var http = require('http');

const app = express();
var spotifyApi = new SpotifyWebApi({
  clientId: '',
  clientSecret: '',
  redirectUri: 'http://localhost:8888/callback'
});
spotifyApi.setAccessToken('');
spotifyApi.setRefreshToken('');

(async () => {
  const me = await spotifyApi.getMe();
  const currentlyPlaying = await spotifyApi.getMyCurrentPlayingTrack();
  const getTracks = await spotifyApi.getMyTopTracks();
  const getArtists = await spotifyApi.getMyTopArtists();
  const playbackState = await spotifyApi.getMyCurrentPlaybackState();
  var topArtists = getArtists.body.items;
  var topTracks = getTracks.body.items;
  var albumArray = currentlyPlaying.body.item.album;
  var artistsArray = currentlyPlaying.body.item.artists;
  artistName = artistsArray[0].name;
  albumCover = albumArray.images[0].url;
  app.get('/about', (req, res) => {
    res.write('<!doctype html>\n<html lang="en">\n' +
      '\n<meta charset="utf-8">\n<title>Your Spotify data</title>\n' +
      '<style type="text/css">* {font-family:"Arial", sans-serif;color:#d8d8d8;} img {height:200px;width:200px} body {background-color:#121212;} h1, h2 {text-align:center;} ol {margin-left: 30vw;} img {display: block; margin: 0 auto 0 auto;}</style>\n' +
      '\n\n<h1>Current user: ' + me.body.display_name + '</h1>\n' +
      '<h2>Currently playing: ' + currentlyPlaying.body.item.name + ' by ' + artistName + '</h2>' +
      '<img src=' + albumCover + '>\n' +
      '<h2>Top tracks (last 6 months)</h2>\n' +
      '<ol>' +
      '<li>' + topTracks[0].name + ' by ' + topTracks[0].artists[0].name + '</li>' +
      '<li>' + topTracks[1].name + ' by ' + topTracks[1].artists[0].name + '</li>' +
      '<li>' + topTracks[2].name + ' by ' + topTracks[2].artists[0].name + '</li>' +
      '<li>' + topTracks[3].name + ' by ' + topTracks[3].artists[0].name + '</li>' +
      '<li>' + topTracks[4].name + ' by ' + topTracks[4].artists[0].name + '</li>' +
      '</ol>' +
      '<h2>Top artists (last 6 months)</h2>\n' +
      '<ol>' +
      '<li>' + topArtists[0].name + '</li>' +
      '<li>' + topArtists[1].name + '</li>' +
      '<li>' + topArtists[2].name + '</li>' +
      '<li>' + topArtists[3].name + '</li>' +
      '<li>' + topArtists[4].name + '</li>' +
      '</ol>' +
      '\n\n')
    res.end();
  });
})().catch(e => {
  console.error(e);
});

spotifyApi.refreshAccessToken().then(
  function(data) {
    console.log('The access token has been refreshed!');
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Could not refresh access token', err);
  }
);

app.listen(8888, () =>
  console.log(
    'HTTP Server up. Now go to http://localhost:8888/about in your browser.'
  )
);
