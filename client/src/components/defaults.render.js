const SEARCH_MIN = 10;
const SEARCH_MAX = 50;
const SEARCH_INCREMENT = 10;
const SEARCH_DEFAULT = 10;
const TARGET_DIV_ID = 'App';
const MAX_INPUT_LENGTH = 200;

export var initialize = () => document
.getElementById(TARGET_DIV_ID).innerHTML += `
    <div id="bgDiv"></div>
      <div id="topContainer" class="flexContainer">
        <div id="searchContainer" class="flexContainer">
          <input id="artistSearch" class="search flexContainer"  type="text" placeholder="Search Artists" maxlength="${MAX_INPUT_LENGTH}">
          <span>Items Per Page:
            <select id="limit" class="dropdown">
            ${(() => {
              var content = '';
              for(var i = SEARCH_MIN; i <= SEARCH_MAX; i += SEARCH_INCREMENT) {
                content += `<option${ 
                  i === SEARCH_DEFAULT ? 
                    ' selected="selected"'
                    : ''
                }>${i}</option>`
              }
              return content;
            })()}
            </select>
          </span>
        </div>
        <div id="resultsContainer" class="flexContainer"></div>
        <div id="endDiv" class="flexContainer"></div>
      </div>

  `;