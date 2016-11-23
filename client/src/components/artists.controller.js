import {debounce} from '../utilities/utils';
import {searchArtist} from '../utilities/queries';
import {topTracks, albums, relatedArtists} from './profile.controller';
import {renderArtists} from './artists.render';

//get search results -- debounced to prevent excessive or malicious API calls and avoid stuttery user experience

export var addSearchListeners = (classList, type = null) => document.querySelectorAll(classList)
  .forEach(node => node.addEventListener('click', () => {
    var name = node.innerHTML;
    name = type ? `${type}:${name.includes(' ') ? `"${name}"` : name}` : name;
    document.getElementById('artistSearch').value = name;
    getResults(name, true);
    window.scrollTo(0,0);
  }));

export var getResults = debounce((v, clear = false, offset) => {
  var limit = +document.getElementById('limit').value;
  console.log(v)
  if(v) { //check if search input is an empty string before proceeding
    //escape user input before handling
    v = v.replace(/^\s+/, '');

    //fetch artist results
    searchArtist(v, limit, offset).then(data => {
      if(data) {
        //clear previous search data if present after successful fetch
        if(clear) document.querySelectorAll('.artist, #moreButton')
          .forEach(node => node.remove());

        //if no previous data, remove old button node
        //querySelectorAll + forEach handles case where no button exists (will not execute on empty array)
        document.querySelectorAll('#moreButton')
          .forEach(node => node.remove());

        renderArtists(data.artists.items);

        //fetch and render top tracks list for artist on click
        document.querySelectorAll('.topTracks')
        .forEach(node => node.addEventListener('click', topTracks));
        //fetch and render album list for artist on click 
        document.querySelectorAll('.albums')
        .forEach(node => node.addEventListener('click', albums));
        //fetch and render related artists list for artist on click
        document.querySelectorAll('.relatedArtists')
        .forEach(node => node.addEventListener('click', relatedArtists));

        var count = document.querySelectorAll('.artist').length;
        if(count > 0 && !(count % limit)) { //if a full set of artists was returned, show option to query an additional `limit` number of artists
          var moreButton = document.createElement('BUTTON');
          moreButton.id = 'moreButton';
          moreButton.innerHTML = `See ${limit} More`;
          //recursively call getResults on button press, update offset with count, do not clear previous results
          moreButton.addEventListener('click', 
            () => getResults(document.getElementById('artistSearch').value, false, count));
          document.getElementById('endDiv').appendChild(moreButton);
        }
        addSearchListeners('.artistProfile.genre', 'genre');
      }
    });
  } else if(clear) document.querySelectorAll('.artist, #moreButton')
    .forEach(node => node.remove());
});
