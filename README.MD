# Synopsis 

This is a Spotify artist search app, using the Spotify API and Spotify Play Button. 

The deployed app can be found [here][0].

# Getting Started

## Viewing This Readme

Markdown files can be viewed using Github, or in Chrome using [Markdown Preview Plus][1], or any other equivalent extension from the [Chrome store][2]. To view, simply install any such extension and open README.MD in Chrome.

##Hardware Requirements
This application requires a working internet connection. It is compatible with most browsers and screen sizes. 

## Installation

Run `$ npm i && webpack` in the spotifyArtistSearch top folder.

## Setup

### Quick Setup
After installing, the app can be accessed at `client/index.html`

### Full Setup
Run `$ npm start` to run the application. A port can be specified by running `$ PORT={your port here} npm start`, otherwise the application will default to 5000. The application can then be opened by navigating to `localhost:{port}`. 

### Development Setup
When developing with this application, use `$ npm run dev`. To specify a port, see Full Setup above.

# User Guide

## Searching
- A search can be conducted by typing in the artist's name into the input field. 
- One or more genres may also be selected by typing `genre:{your genre}` for single-word genres, or `genre:"{your genre}"` (with double quotes) for genres that are longer than one word.
- The number of results displayed can be set manually using the dropdown menu.
- At the bottom of the page is a more button to display additional results. 

### Viewing Results
- Clicking on an artist or album name will open a new tab containing Amazon.com store results for that artist or album. 
- Clicking on an artist or genre will bring you to a search using that artist or genre.
- Music can be found in `Top Tracks` and the `See Tracks` section of `Albums`.

# Project Information

## Minimum Requirements

- Single page application
- Constrain all your work to onewebpageonly (no constraints on number of files)  
- Implement some artist search functionality
- Display the artist name and image on the page
- Accommodate every UI edge case (varying screen widths, zero data, etc.)
- Populate your data asynchronously using the linked [Spotify API][4]
- No frameworks, libraries OK
- Spotify endpoints probably shouldn't need auth

## Evaluation Criteria

- Usability
- Visual Quality
- Page Structure
- Layout
- Code Organization
- Feature Selection
- Level of Completion


[Links]:_
[0]: https://spotify-artist-search.herokuapp.com/
[1]: https://chrome.google.com/webstore/detail/markdown-preview-plus/febilkbfcbhebfnokafefeacimjdckgl
[2]: https://chrome.google.com/webstore/category/extensions
[3]: https://docs.npmjs.com/getting-started/what-is-npm
[4]: https://developer.spotify.com/web-api/endpoint-reference/