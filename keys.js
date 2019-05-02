console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
exports.ticketmaster = {
  id: process.env.TICKETMASTER_KEY,
  secret: process.env.TICKETMASTER_SECRET
};

const ticketmasterKey = process.env.TICKETMASTER_KEY;


exports.omdb = {
  id: process.env.OMDB_KEY
}
