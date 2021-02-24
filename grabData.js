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
spotifyApi.setAccessToken(token);

(async () => {
  var me = await spotifyApi.getMe();
  var playbackState = await spotifyApi.getMyCurrentPlaybackState()
  var currentlyPlaying = await spotifyApi.getMyCurrentPlayingTrack();
  if (playbackState.body && playbackState.body.is_playing) {
      app.get('/about', (req, res) => {
        res.write('<!doctype html><html lang="en">' +
          '<meta charset="utf-8"><title>Your Spotify data</title>' +
          '<style type="text/css">* {font-family: "Helvetica", sans-serif; color:#d8d8d8; font-weight: lighter;} .head {text-align: center;} img {height: 200px; width: 200px} body {background-color: #121212;} img {display: block; margin: 0 auto 0 auto;} .data {display: flex; flex-wrap: wrap; margin-left: 5vw;} .dataItem {width: 50%;}</style>' +
          '<h1 class="head">Current user: <a href="' + me.body.uri + '" target="_blank">' + me.body.display_name + '</a></h1>' +
          '<h2 class="head">Currently playing: <a href="' + currentlyPlaying.body.item.uri + '" target="_blank">' + currentlyPlaying.body.item.name + '</a> by ' + artistName + '</h2>' +
          '<img src=' + albumCover + '>' +
          '<div class="data">' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Top tracks (last 6 months)</h2>' +
          '<ol>' +
          '<li><a href="' + topTracks[0].uri + '">' + topTracks[0].name + '</a> by ' + topTracks[0].artists[0].name + '</li>' +
          '<li><a href="' + topTracks[1].uri + '">' + topTracks[1].name + '</a> by ' + topTracks[1].artists[0].name + '</li>' +
          '<li><a href="' + topTracks[2].uri + '">' + topTracks[2].name + '</a> by ' + topTracks[2].artists[0].name + '</li>' +
          '<li><a href="' + topTracks[3].uri + '">' + topTracks[3].name + '</a> by ' + topTracks[3].artists[0].name + '</li>' +
          '<li><a href="' + topTracks[4].uri + '">' + topTracks[4].name + '</a> by ' + topTracks[4].artists[0].name + '</li>' +
          '</ol>' +
          '</div>' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Top artists (last 6 months)</h2>' +
          '<ol>' +
          '<li><a href="' + topArtists[0].uri + '">' + topArtists[0].name + '</a></li>' +
          '<li><a href="' + topArtists[1].uri + '">' + topArtists[1].name + '</a></li>' +
          '<li><a href="' + topArtists[2].uri + '">' + topArtists[2].name + '</a></li>' +
          '<li><a href="' + topArtists[3].uri + '">' + topArtists[3].name + '</a></li>' +
          '<li><a href="' + topArtists[4].uri + '">' + topArtists[4].name + '</a></li>' +
          '</ol>' +
          '</div>' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Recently played tracks</h2>' +
          '<ol>' +
          '<li><a href="' + recentlyPlayedTracks[0].track.uri + '">' + recentlyPlayedTracks[0].track.name + '</a> by ' + recentlyPlayedTracks[0].track.artists[0].name + '</li>' +
          '<li><a href="' + recentlyPlayedTracks[1].track.uri + '">' + recentlyPlayedTracks[1].track.name + '</a> by ' + recentlyPlayedTracks[1].track.artists[0].name + '</li>' +
          '<li><a href="' + recentlyPlayedTracks[2].track.uri + '">' + recentlyPlayedTracks[2].track.name + '</a> by ' + recentlyPlayedTracks[2].track.artists[0].name + '</li>' +
          '<li><a href="' + recentlyPlayedTracks[3].track.uri + '">' + recentlyPlayedTracks[3].track.name + '</a> by ' + recentlyPlayedTracks[3].track.artists[0].name + '</li>' +
          '<li><a href="' + recentlyPlayedTracks[4].track.uri + '">' + recentlyPlayedTracks[4].track.name + '</a> by ' + recentlyPlayedTracks[4].track.artists[0].name + '</li>' +
          '</ol>' +
          '</div>' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Top user playlists</h2>' +
          '<ol>' +
          '<li><a href="' + getPlaylists.body.items[0].uri + '">' + getPlaylists.body.items[0].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[1].uri + '">' + getPlaylists.body.items[1].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[2].uri + '">' + getPlaylists.body.items[2].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[3].uri + '">' + getPlaylists.body.items[3].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[4].uri + '">' + getPlaylists.body.items[4].name + '</a></li>' +
          '</ol>' +
          '</div>' +
          '</div>'
          )
        res.end();
      });
  }
  else {
      app.get('/about', (req, res) => {
        res.write('<!doctype html><html lang="en">' +
          '<meta charset="utf-8"><title>Your Spotify data</title>' +
          '<style type="text/css">* {font-family: "Helvetica", sans-serif; color:#d8d8d8; font-weight: lighter;} .head {text-align: center;} img {height: 200px; width: 200px} body {background-color: #121212;} img {display: block; margin: 0 auto 0 auto;} .data {display: flex; flex-wrap: wrap; margin-left: 5vw;} .dataItem {width: 50%;} .notice {text-align: center;}</style>' +
          '<h1 class="head">Current user: <a href="' + me.body.uri + '">' + me.body.display_name + '</a></h1>' +
          '<h2 class="notice">User is not currently playing any tracks</h2>' +
          '<div class="data">' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Top tracks (last 6 months)</h2>' +
          '<ol>' +
          '<li><a href="' + topTracks[0].uri + '">' + topTracks[0].name + '</a> by ' + topTracks[0].artists[0].name + '</li>' +
          '<li><a href="' + topTracks[1].uri + '">' + topTracks[1].name + '</a> by ' + topTracks[1].artists[0].name + '</li>' +
          '<li><a href="' + topTracks[2].uri + '">' + topTracks[2].name + '</a> by ' + topTracks[2].artists[0].name + '</li>' +
          '<li><a href="' + topTracks[3].uri + '">' + topTracks[3].name + '</a> by ' + topTracks[3].artists[0].name + '</li>' +
          '<li><a href="' + topTracks[4].uri + '">' + topTracks[4].name + '</a> by ' + topTracks[4].artists[0].name + '</li>' +
          '</ol>' +
          '</div>' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Top artists (last 6 months)</h2>' +
          '<ol>' +
          '<li><a href="' + topArtists[0].uri + '">' + topArtists[0].name + '</a></li>' +
          '<li><a href="' + topArtists[1].uri + '">' + topArtists[1].name + '</a></li>' +
          '<li><a href="' + topArtists[2].uri + '">' + topArtists[2].name + '</a></li>' +
          '<li><a href="' + topArtists[3].uri + '">' + topArtists[3].name + '</a></li>' +
          '<li><a href="' + topArtists[4].uri + '">' + topArtists[4].name + '</a></li>' +
          '</ol>' +
          '</div>' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Recently played tracks</h2>' +
          '<ol>' +
          '<li><a href="' + recentlyPlayedTracks[0].track.uri + '">' + recentlyPlayedTracks[0].track.name + '</a> by ' + recentlyPlayedTracks[0].track.artists[0].name + '</li>' +
          '<li><a href="' + recentlyPlayedTracks[1].track.uri + '">' + recentlyPlayedTracks[1].track.name + '</a> by ' + recentlyPlayedTracks[1].track.artists[0].name + '</li>' +
          '<li><a href="' + recentlyPlayedTracks[2].track.uri + '">' + recentlyPlayedTracks[2].track.name + '</a> by ' + recentlyPlayedTracks[2].track.artists[0].name + '</li>' +
          '<li><a href="' + recentlyPlayedTracks[3].track.uri + '">' + recentlyPlayedTracks[3].track.name + '</a> by ' + recentlyPlayedTracks[3].track.artists[0].name + '</li>' +
          '<li><a href="' + recentlyPlayedTracks[4].track.uri + '">' + recentlyPlayedTracks[4].track.name + '</a> by ' + recentlyPlayedTracks[4].track.artists[0].name + '</li>' +
          '</ol>' +
          '</div>' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Top user playlists</h2>' +
          '<ol>' +
          '<li><a href="' + getPlaylists.body.items[0].uri + '">' + getPlaylists.body.items[0].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[1].uri + '">' + getPlaylists.body.items[1].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[2].uri + '">' + getPlaylists.body.items[2].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[3].uri + '">' + getPlaylists.body.items[3].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[4].uri + '">' + getPlaylists.body.items[4].name + '</a></li>' +
          '</ol>' +
          '</div>' +
          '</div>'
        )
        res.end();
    });
  }
  var getTracks = await spotifyApi.getMyTopTracks();
  var getArtists = await spotifyApi.getMyTopArtists();
  var recentTracks = await spotifyApi.getMyRecentlyPlayedTracks();
  var getPlaylists = await spotifyApi.getUserPlaylists(me.body.id);
  var recentlyPlayedTracks = recentTracks.body.items;
  var topArtists = getArtists.body.items;
  var topTracks = getTracks.body.items;
  var albumArray = currentlyPlaying.body.item.album;
  var artistsArray = currentlyPlaying.body.item.artists;
  var artistName = artistsArray[0].name;
  var albumCover = albumArray.images[0].url;
})().catch(e => {
  console.error(e);
});

app.listen(8888, () =>
  console.log(
    'HTTP Server up. Now go to http://localhost:8888/about in your browser.'
  )
);
