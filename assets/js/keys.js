console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.ticketmaster = {
  id: process.env.Consumer_Key,
  secret: process.env.Consumer_Secret
};