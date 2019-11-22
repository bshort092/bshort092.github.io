// Adding the search bar with all of its attributes
let searchContainer = d3.selectAll("#search-bar-container");
let searchBarContainer = searchContainer.select("#search-bar");

searchBarContainer.append('input')
  .attr('id', 'search')
  .attr('type', 'text')
  .attr('spellcheck', 'false')
  .attr('autocomplete', 'off')
  .attr('autocapitalize', 'off')
  .attr('display', 'block')
  .attr('width', '100%')
  ;

let searchBar = d3.selectAll('#search');
searchBar.on('click', selectBarClick)

document.querySelector("#search").addEventListener('input', updateValue);

function updateValue(e) {
  console.log(e.target.value);
}

let data = ["Kevin Bacon", "Johnny Depp", "Reese Witherspoon"]
let searchResultsAreShown = false;
var searchResults = searchBarContainer.append('div');

function selectBarClick() {
  if (!searchResultsAreShown) {
    searchResults.attr('id', 'search-results')
      .selectAll('li')
      .data(data)
      .enter()
      .append('li')
      .html(String)
      .on('click', selectSearch)
      ;
    searchResultsAreShown = true;
  }
}

function selectSearch(select) {
  searchResults.selectAll('li')
    .remove()
    ;
  searchResultsAreShown = false;
}

