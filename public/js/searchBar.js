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
  searchResults.selectAll('li')
    .remove()
    .exit()
    ;
  let count = 0;
  searchResults.selectAll('li')
    .data(data)
    .enter()
    .filter(function (d) {
      let res = d.toLowerCase().includes(e.target.value.toLowerCase())
      if (res) count += 1
      return res && count <= 4
    })
    .append('li')
    .html(String)
    .on('click', selectSearch)
    ;
}

let data = ["Kevin Bacon", "Johnny Depp", "Reese Witherspoon", "Tom Cruise", "Tom Willis", "Tom Skeeba", "Tom Stone", "Tom Tim"]
let searchResultsAreShown = false;
var searchResults = searchBarContainer.append('div').attr('id', 'search-results')

function selectBarClick() {
  if (!searchResultsAreShown) {
    let count = 0;
    searchResults.selectAll('li')
      .data(data)
      .enter()
      .filter(d => { count += 1; return count <= 4 })
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

