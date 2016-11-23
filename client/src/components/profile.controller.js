const DEFAULT_COUNTRY = 'US'; //possible future feature: localization.

import {getArtistData} from '../utilities/queries';
import {removeListeners, renderProfileElement, removeProfileElement} from './profile.render';
import {getResults, addSearchListeners} from './artists.controller';

var updateProfileElement = (target, cb) => {
  target = removeListeners(target);
  target.addEventListener('click', e => removeProfileElement(e, cb));
  return target;
}

export var topTracks = e => {
  e.preventDefault();
  const CLASS_NAME = 'topTracksContainer';
  const CB = topTracks;
  var target = e.target;
  var parent = target.parentNode;
  var next = target.nextSibling;

  if(next && next.classList && Array.from(next.classList).indexOf(CLASS_NAME) > -1) {
    renderProfileElement(target, CLASS_NAME)
    target = updateProfileElement(target, CB);
  } else {
    getArtistData('top-tracks', parent.getAttribute('data-id'), DEFAULT_COUNTRY).then(data => {
      if(data) {
        renderProfileElement(target, CLASS_NAME, `
          <iframe src="https://embed.spotify.com/?uri=spotify:trackset:${parent.getAttribute('data-name')} Top Tracks:${
          //tracklist: spotify track ids, comma separated
            data.tracks.reduce((list, next, i) => `${i ? 
              `${list}, `
              : list}${next.id}`, '')
          }" class="topTracksPlayer" frameborder="0" allowtransparency="true"></iframe>
        `);
        target = updateProfileElement(target, CB);
      }
    });
  }
};

export var albums = e => {
  e.preventDefault();
  const CLASS_NAME = 'relatedArtistsContainer';
  const CB = relatedArtists;
  var target = e.target;
  var parent = target.parentNode;
  var next = target.nextSibling;

  if(next && next.classList && Array.from(next.classList).indexOf(CLASS_NAME) > -1) {
    renderProfileElement(target, CLASS_NAME);
    target = updateProfileElement(target, CB);
  } else {
    getArtistData('albums', parent.getAttribute('data-id'), DEFAULT_COUNTRY).then(data => {
      if(data) {
        var content = '';
        data.items.filter((item, i, arr) => !(i && item.name === arr[i - 1].name && item.type === arr[i - 1].type)).forEach(({name, album_type, images: [,,image], id}) => content += `
          <div class="album">
            <div>
              <img src="${ 
                image ? //check for image url, insert placeholder if absent
                  image.url 
                  : './content/No_image_available.svg'
              }" class="albumImg">
            </div>
            <div class="albumContainer" data-id="${id}" data-name="${name}">
              <span class="albumProfile name"><a href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Ddigital-music&field-keywords=${name.replace(/\b\s+\b/g, '+').replace(' ', '')}" title="Discover ${name} on Amazon.com">${name}</a></span>
              <span class="albumProfile tracks">+ See Tracks</span>
            </div>
          </div>
        `);
        renderProfileElement(target, CLASS_NAME, content); 
        var albumTracks = node => {
          const CLASS_NAME = 'albumTracksContainer';
          const CB = albumTracks;
          let next = node.nextSibling;
          if(node.next && next.classList && Array.from(next.classList).indexOf(CLASS_NAME) > -1) {
            renderProfileElement(node, CLASS_NAME)
            node = updateProfileElement(node, CB);
          } else {
            renderProfileElement(node, CLASS_NAME, `
              <iframe src="https://embed.spotify.com/?uri=spotify:album:${node.parentNode.getAttribute('data-id')}" class="albumPlayer" frameborder="0" allowtransparency="true"></iframe>
            `);
            node = updateProfileElement(node, e =>albumTracks(e.target))
          }
        }
        document.querySelectorAll('.album .tracks')
        .forEach(node => node.addEventListener('click', () => albumTracks(node)));
        target = updateProfileElement(target, CB);
        document.querySelectorAll('.album.name')
        .forEach(node => node.addEventListener('click', () => {
          var name = node.innerHTML;
          document.getElementById('artistSearch').value = name;
          getResults(name, true);
        }));
      }
    });
  }
};

export var relatedArtists = e => {
  e.preventDefault();
  const CLASS_NAME = 'relatedArtistsContainer';
  const CB = relatedArtists;
  var target = e.target;
  var parent = target.parentNode;
  var next = target.nextSibling;

  if(next && next.classList && Array.from(next.classList).indexOf(CLASS_NAME) > -1) {
    renderProfileElement(target, CLASS_NAME)
    target = updateProfileElement(target, CB);
  } else {
    getArtistData('related-artists', parent.getAttribute('data-id')).then(data => {
      if(data) {
        var content = '';
        data.artists.forEach(({name, followers: {total}, images: [,,image], id}) => content += `
          <div class="relatedArtist">
            <div>
              <img src="${ 
                image ? //check for image url, insert placeholder if absent
                  image.url 
                  : './content/No_image_available.svg'
              }" class="relatedArtistImg">
            </div>
            <div class="relatedArtistProfileContainer" data-id="${id}" data-name="${name}">
              <span class="relatedArtistProfile name">${name}</span>
              <span class="relatedArtistProfile followers">${ //format follower total
                total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              } followers</span>
            </div>
          </div>
        `);
        renderProfileElement(target, CLASS_NAME, content); //TODO: related artists: display picture and name. On click, should populate search input field and  search.
        target = updateProfileElement(target, CB);
        addSearchListeners('.relatedArtistProfile.name');
      }
    });
  }
};