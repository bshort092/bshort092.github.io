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
  searchResults.selectAll('li')
    .remove()
    .exit()
    ;
  searchResults.selectAll('li')
    .data(data)
    .enter()
    .filter(d => d.toLowerCase().includes(e.target.value.toLowerCase()))
    .append('li')
    .html(String)
    .on('click', selectSearch)
    ;
}

let data = ["Kevin Bacon", "Johnny Depp", "Reese Witherspoon"]
let searchResultsAreShown = false;
var searchResults = searchBarContainer.append('div').attr('id', 'search-results')

function selectBarClick() {
  if (!searchResultsAreShown) {
    searchResults.selectAll('li')
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
  searchResultsAreShown = false;
  searchResults.selectAll('li')
    .remove()
    ;
  d3.select('#selected')
    .select('h2')
    .remove()
    ;
  let sel = d3.select('#selected')
    ;

  sel.append('h2')
    .attr('id', 'selectedPerson')
    .text(select)
    ;

}

