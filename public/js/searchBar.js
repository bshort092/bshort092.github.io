class SearchBar {
  // Adding the search bar with all of its attributes
  constructor(nodeDiagram) {

    d3.csv("data/people.csv").then(peopleInfo => {
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
          .data(peopleInfo)
          .enter()
          .filter(function (d) {
            let res = d.name.toLowerCase().includes(e.target.value.toLowerCase())
            if (res) count += 1
            return res && count <= 4
          })
          .append('li')
          .text(d => d.name)
          .on('click', selectSearch)
          ;
      }

      let searchResultsAreShown = false;
      var searchResults = searchBarContainer.append('div').attr('id', 'search-results')

      selectSearch({ name: "Tom Hanks", id: 31 })
      function selectBarClick() {
        if (!searchResultsAreShown) {
          let count = 0;
          searchResults.selectAll('li')
            .data(peopleInfo)
            .enter()
            .filter(d => { count += 1; return count <= 4 })
            .append('li')
            .text(d => d.name)
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
          .text("X " + select.name)
          ;

        nodeDiagram.update(select.name, parseInt(select.id));
      }
    });
  }
}