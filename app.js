var SpotifyWebApi = require('spotify-web-api-node');
var express = require('express');
const app = express();

var scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-read-currently-playing',
  'streaming',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-read-private',
  'user-library-read',
  'user-top-read',
  'user-read-recently-played',
];

var spotifyApi = new SpotifyWebApi({
    clientId: '',
    clientSecret: '',
    redirectUri: 'http://localhost:8888/callback'
});

app.get('/login', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      console.log('access_token:', access_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      res.send('Success! You can now close the window.');

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.listen(8888, () =>
  console.log('HTTP Server up. Now go to http://localhost:8888/login in your browser.')
);
