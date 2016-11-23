export var searchArtist = (queryString, limit = 10, offset = 0) => {
  var genre = new RegExp('genre:%22.+%22', 'gi');
  queryString = encodeURIComponent(queryString);
  console.log(queryString.match(genre))
  return fetch(`https://api.spotify.com/v1/search?q=${queryString.replace(genre, '')}${(() => {
      var match = queryString.match(genre);
      return match ? `${match[0]}` : '';
    })()}&type=artist&limit=${limit}&offset=${offset}`)
  .then(res => res.json())
  .then(res => {console.log(res); return res})
  .catch(err => console.error(err));}

export var getArtistData = (queryString, artistId, countryCode) => 
  //possible queries are: 
  // - top-tracks
  // - albums
  // - related-artists
  fetch(`https://api.spotify.com/v1/artists/${artistId}/${queryString}${
    queryString === 'top-tracks' ? 
      `?country=${countryCode}`
      : queryString === 'albums' ? 
        `?market=${countryCode}`
        : ''}`)
  .then(res => res.json())
  .catch(err => console.error(err));