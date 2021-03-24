const SpotifyWebApi = require('spotify-web-api-node');
var express = require('express');
const app = express();

const token = '';

var spotifyApi = new SpotifyWebApi({
  clientId: '',
  clientSecret: '',
  redirectUri: 'http://localhost:8888/callback'
});
spotifyApi.setAccessToken(token);

(async() => {
  var me = await spotifyApi.getMe();
  var playbackState = await spotifyApi.getMyCurrentPlaybackState()
  if (playbackState.body && playbackState.body.is_playing) {
      app.get('/about', (req, res) => {
        res.write('<!doctype html><html lang="en">' +
          '<meta charset="utf-8"><title>Your Spotify data</title>' +
          '<style type="text/css">* {font-family: "Helvetica", sans-serif; color:#d8d8d8; font-weight: lighter;} .head {text-align: center;} img {height: 200px; width: 200px} body {background-color: #121212;} img {display: block; margin: 0 auto 0 auto;} .data {display: flex; flex-wrap: wrap; margin-left: 5vw;} .dataItem {width: 50%;} .notice {text-align: center;} audio {display: none;} p {display: inline;} li:hover audio {display: block;} audio:hover {display: block;}</style>' +
          '<h1 class="head">Current user: <a href="' + me.body.uri + '" target="_blank">' + me.body.display_name + '</a></h1>' +
          '<h2 class="head">Currently playing: <a href="' + currentlyPlaying.body.item.uri + '" target="_blank">' + currentlyPlaying.body.item.name + '</a> by ' + artistName + '</h2>' +
          '<img src=' + albumCover + '>' +
          '<div class="data">' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Top tracks (last 6 months)</h2>' +
          '<ol>' +
          '<li>' + topTracks[0].name + ' by ' + topTracks[0].artists[0].name + '<audio controls><source src="' + topTracks[0].preview_url + '"></audio></li>' +
          '<li>' + topTracks[1].name + ' by ' + topTracks[1].artists[0].name + '<audio controls><source src="' + topTracks[1].preview_url + '"></audio></li>' +
          '<li>' + topTracks[2].name + ' by ' + topTracks[2].artists[0].name + '<audio controls><source src="' + topTracks[2].preview_url + '"></audio></li>' +
          '<li>' + topTracks[3].name + ' by ' + topTracks[3].artists[0].name + '<audio controls><source src="' + topTracks[3].preview_url + '"></audio></li>' +
          '<li>' + topTracks[4].name + ' by ' + topTracks[4].artists[0].name + '<audio controls><source src="' + topTracks[4].preview_url + '"></audio></li>' +
          '</ol>' +
          '</div>' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Top artists (last 6 months)</h2>' +
          '<ol>' +
          '<li><a href="' + topArtists[0].external_urls.spotify + '">' + topArtists[0].name + '</a></li>' +
          '<li><a href="' + topArtists[1].external_urls.spotify + '">' + topArtists[1].name + '</a></li>' +
          '<li><a href="' + topArtists[2].external_urls.spotify + '">' + topArtists[2].name + '</a></li>' +
          '<li><a href="' + topArtists[3].external_urls.spotify + '">' + topArtists[3].name + '</a></li>' +
          '<li><a href="' + topArtists[4].external_urls.spotify + '">' + topArtists[4].name + '</a></li>' +
          '</ol>' +
          '</div>' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Recently played tracks</h2>' +
          '<ol>' +
          '<li>' + recentlyPlayedTracks[0].track.name + ' by ' + recentlyPlayedTracks[0].track.artists[0].name + '<audio controls><source src="' + recentlyPlayedTracks[0].track.preview_url + '"></audio></li>' +
          '<li>' + recentlyPlayedTracks[1].track.name + ' by ' + recentlyPlayedTracks[1].track.artists[0].name + '<audio controls><source src="' + recentlyPlayedTracks[1].track.preview_url + '"></audio></li>' +
          '<li>' + recentlyPlayedTracks[2].track.name + ' by ' + recentlyPlayedTracks[2].track.artists[0].name + '<audio controls><source src="' + recentlyPlayedTracks[2].track.preview_url + '"></audio></li>' +
          '<li>' + recentlyPlayedTracks[3].track.name + ' by ' + recentlyPlayedTracks[3].track.artists[0].name + '<audio controls><source src="' + recentlyPlayedTracks[3].track.preview_url + '"></audio></li>' +
          '<li>' + recentlyPlayedTracks[4].track.name + ' by ' + recentlyPlayedTracks[4].track.artists[0].name + '<audio controls><source src="' + recentlyPlayedTracks[4].track.preview_url + '"></audio></li>' +
          '</ol>' +
          '</div>' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Top user playlists</h2>' +
          '<ol>' +
          '<li><a href="' + getPlaylists.body.items[0].external_urls.spotify + '">' + getPlaylists.body.items[0].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[1].external_urls.spotify + '">' + getPlaylists.body.items[1].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[2].external_urls.spotify + '">' + getPlaylists.body.items[2].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[3].external_urls.spotify + '">' + getPlaylists.body.items[3].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[4].external_urls.spotify + '">' + getPlaylists.body.items[4].name + '</a></li>' +
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
          '<style type="text/css">* {font-family: "Helvetica", sans-serif; color:#d8d8d8; font-weight: lighter;} .head {text-align: center;} img {height: 200px; width: 200px} body {background-color: #121212;} img {display: block; margin: 0 auto 0 auto;} .data {display: flex; flex-wrap: wrap; margin-left: 5vw;} .dataItem {width: 50%;} .notice {text-align: center;} audio {display: none;} p {display: inline;} li:hover audio {display: block;} audio:hover {display: block;}</style>' +
          '<h1 class="head">Current user: <a href="' + me.body.uri + '">' + me.body.display_name + '</a></h1>' +
          '<h2 class="notice">User is not currently playing any tracks</h2>' +
          '<div class="data">' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Top tracks (last 6 months)</h2>' +
          '<ol>' +
          '<li>' + topTracks[0].name + ' by ' + topTracks[0].artists[0].name + '<audio controls><source src="' + topTracks[0].preview_url + '"></audio></li>' +
          '<li>' + topTracks[1].name + ' by ' + topTracks[1].artists[0].name + '<audio controls><source src="' + topTracks[1].preview_url + '"></audio></li>' +
          '<li>' + topTracks[2].name + ' by ' + topTracks[2].artists[0].name + '<audio controls><source src="' + topTracks[2].preview_url + '"></audio></li>' +
          '<li>' + topTracks[3].name + ' by ' + topTracks[3].artists[0].name + '<audio controls><source src="' + topTracks[3].preview_url + '"></audio></li>' +
          '<li>' + topTracks[4].name + ' by ' + topTracks[4].artists[0].name + '<audio controls><source src="' + topTracks[4].preview_url + '"></audio></li>' +
          '</ol>' +
          '</div>' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Top artists (last 6 months)</h2>' +
          '<ol>' +
          '<li><a href="' + topArtists[0].external_urls.spotify + '">' + topArtists[0].name + '</a></li>' +
          '<li><a href="' + topArtists[1].external_urls.spotify + '">' + topArtists[1].name + '</a></li>' +
          '<li><a href="' + topArtists[2].external_urls.spotify + '">' + topArtists[2].name + '</a></li>' +
          '<li><a href="' + topArtists[3].external_urls.spotify + '">' + topArtists[3].name + '</a></li>' +
          '<li><a href="' + topArtists[4].external_urls.spotify + '">' + topArtists[4].name + '</a></li>' +
          '</ol>' +
          '</div>' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Recently played tracks</h2>' +
          '<ol>' +
          '<li>' + recentlyPlayedTracks[0].track.name + ' by ' + recentlyPlayedTracks[0].track.artists[0].name + '<audio controls><source src="' + recentlyPlayedTracks[0].track.preview_url + '"></audio></li>' +
          '<li>' + recentlyPlayedTracks[1].track.name + ' by ' + recentlyPlayedTracks[1].track.artists[0].name + '<audio controls><source src="' + recentlyPlayedTracks[1].track.preview_url + '"></audio></li>' +
          '<li>' + recentlyPlayedTracks[2].track.name + ' by ' + recentlyPlayedTracks[2].track.artists[0].name + '<audio controls><source src="' + recentlyPlayedTracks[2].track.preview_url + '"></audio></li>' +
          '<li>' + recentlyPlayedTracks[3].track.name + ' by ' + recentlyPlayedTracks[3].track.artists[0].name + '<audio controls><source src="' + recentlyPlayedTracks[3].track.preview_url + '"></audio></li>' +
          '<li>' + recentlyPlayedTracks[4].track.name + ' by ' + recentlyPlayedTracks[4].track.artists[0].name + '<audio controls><source src="' + recentlyPlayedTracks[4].track.preview_url + '"></audio></li>' +
          '</ol>' +
          '</div>' +
          '<div class="dataItem">' +
          '<h2 class="dataHead">Top user playlists</h2>' +
          '<ol>' +
          '<li><a href="' + getPlaylists.body.items[0].external_urls.spotify + '">' + getPlaylists.body.items[0].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[1].external_urls.spotify + '">' + getPlaylists.body.items[1].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[2].external_urls.spotify + '">' + getPlaylists.body.items[2].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[3].external_urls.spotify + '">' + getPlaylists.body.items[3].name + '</a></li>' +
          '<li><a href="' + getPlaylists.body.items[4].external_urls.spotify + '">' + getPlaylists.body.items[4].name + '</a></li>' +
          '</ol>' +
          '</div>'
        )
        res.end();
    });
  }
  var currentlyPlaying = await spotifyApi.getMyCurrentPlayingTrack();
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
  var albumCover = currentlyPlaying.body.item.album.images[0].url;
})().catch(e => {
  console.error(e);
});

app.listen(8888, () =>
  console.log('HTTP Server up. Now go to http://localhost:8888/about in your browser.')
);
