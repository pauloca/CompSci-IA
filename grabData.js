const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const token = '';
var express = require('express');

const app = express();
var spotifyApi = new SpotifyWebApi({
  clientId: '',
  clientSecret: '',
  redirectUri: 'http://localhost:8888/callback'
});
spotifyApi.setAccessToken('');

(async () => {
  const me = await spotifyApi.getMe();
  const data = spotifyApi.getAlbum('2fGCAYUMssLKiUAoNdxGLx').then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });
  // console.log(me);
  app.get('/login', (req, res) => {
  //  res.send(me);
    res.send(data);
  });
})().catch(e => {
  console.error(e);
});

app.listen(8888, () =>
    console.log(
      'HTTP Server up. Now go to http://localhost:8888/login.html in your browser.'
    )
);
