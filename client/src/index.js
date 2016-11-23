'use strict'
import {browserCompatibility} from './utilities/utils';
import {initialize} from './components/defaults.render';
import {getResults} from './components/artists.controller'


/****Initial Event Listeners****/

document.addEventListener('DOMContentLoaded', function() {

  browserCompatibility(this);

  initialize();
  
  var artistSearch = document.getElementById('artistSearch');

  //create new search on each change to search input
  artistSearch.addEventListener('input', e => getResults(e.target.value, true));

  //create new search on each change to limit selection
  document.getElementById('limit').addEventListener('change', () => 
    getResults(artistSearch.value, true))
});