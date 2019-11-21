// Adding the search bar with all of its attributes


d3.selectAll("#search-bar-container")
  .select("#search-bar")
  .append('input')
  .attr('id', 'search-bar')
  .attr('type', 'text')
  .attr('spellcheck', 'false')
  .attr('autocomplete', 'off')
  .attr('autocapitalize', 'off')
  .attr('display', 'block')
  .attr('width', '100%')
  ;