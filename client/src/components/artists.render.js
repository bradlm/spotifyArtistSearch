export var renderArtists = artists => artists.forEach(({name, genres, followers: {total}, images: [,image], id}) => 
    document.getElementById('resultsContainer').innerHTML += `
      <div class="artist">
        <div>
          <img src="${ 
            image ? //check for image url, insert placeholder if absent
              image.url 
              : './content/No_image_available.svg'
          }" class="artistImg">
        </div>
        <div class="artistProfileContainer" data-id="${id}" data-name="${name}">
            <span class="artistProfile name"><a href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Ddigital-music&field-keywords=${name.replace(/\b\s+\b/g, '+').replace(' ', '')}" title="Discover ${name} on Amazon.com">${name}</a></span>
            <ul class="artistProfile genres">${
              genres && genres.length ? //check for genre list, then format it
                genres.reduce((str, next, i) => `${str}${i && i < genres.length ? ', ' : ''}<li class="artistProfile genre">${next.replace(/\b\w/g, c => c.toUpperCase())}</li>`
                , '')
                : 'No listed genres.'}</ul>
            <span class="artistProfile followers">${ //format follower total
              total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            } followers</span>
          <span class="artistProfile topTracks">+ Top Tracks</span>
          <span class="artistProfile albums">+ Albums</span>
          <span class="artistProfile relatedArtists">+ Related Artists</span>
        </div>
      </div>
  `);