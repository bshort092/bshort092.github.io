class SearchBar {
  // Adding the search bar with all of its attributes
  constructor(nodeDiagram, lineChart) {
    nodeDiagram.subscribe(this)
    this.nodeDiagram = nodeDiagram;
    this.lineChart = lineChart;
    var self = this
    d3.csv("data/people.csv").then(peopleInfo => {
      let searchContainer = d3.selectAll("#search-bar-container");
      let searchBarContainerOne = searchContainer.select("#search-bar-one");
      let searchBarContainerTwo = searchContainer.select("#search-bar-two");

      searchBarContainerOne.append('input')
        .attr('id', 'searchOne')
        .attr('type', 'text')
        .attr('spellcheck', 'false')
        .attr('autocomplete', 'off')
        .attr('autocapitalize', 'off')
        .attr('display', 'block')
        .attr('width', '100%')
        ;

      searchBarContainerTwo.append('input')
        .attr('id', 'searchTwo')
        .attr('type', 'text')
        .attr('spellcheck', 'false')
        .attr('autocomplete', 'off')
        .attr('autocapitalize', 'off')
        .attr('display', 'block')
        .attr('width', '100%')
        ;

      let searchBarOne = d3.selectAll('#searchOne');
      searchBarOne.on('click', selectBarOneClick);

      let searchBarTwo = d3.selectAll('#searchTwo');
      searchBarTwo.on('click', selectBarTwoClick)

      document.querySelector("#searchOne").addEventListener('input', updateValueOne);
      document.querySelector("#searchTwo").addEventListener('input', updateValueTwo);


      function updateValueOne(e) {
        searchResultsOne.selectAll('li')
          .remove()
          .exit()
          ;
        let count = 0;
        searchResultsOne.selectAll('li')
          .data(peopleInfo)
          .enter()
          .filter(function (d) {
            let res = d.name.toLowerCase().includes(e.target.value.toLowerCase())
            if (res) count += 1
            return res && count <= 4
          })
          .append('li')
          .text(d => d.name)
          .on('click', selectSearchOne)
          ;
      }

      function updateValueTwo(e) {
        searchResultsTwo.selectAll('li')
          .remove()
          .exit()
          ;
        let count = 0;
        searchResultsTwo.selectAll('li')
          .data(peopleInfo)
          .enter()
          .filter(function (d) {
            let res = d.name.toLowerCase().includes(e.target.value.toLowerCase())
            if (res) count += 1
            return res && count <= 4
          })
          .append('li')
          .text(d => d.name)
          .on('click', selectSearchTwo)
          ;
      }

      let searchResultsAreShownOne = false;
      this.searchResultsAreShownOne = searchResultsAreShownOne;
      let searchResultsOne = searchBarContainerOne.append('div').attr('class', 'search-results').attr('id', 'firstPerson')
      let searchResultsAreShownTwo = false;
      this.searchResultsAreShownTwo = searchResultsAreShownTwo;
      let searchResultsTwo = searchBarContainerTwo.append('div').attr('class', 'search-results')

      let personOne = { name: "Tom Hanks", id: 31 };
      let personTwo = { name: "Jodi Benson", id: 63978 };
      this.personOne = personOne;
      this.personTwo = personTwo;

      selectSearchOne(this.personOne);
      selectSearchTwo(this.personTwo);

      function selectBarOneClick() {
        if (!searchResultsAreShownOne) {
          let count = 0;
          searchResultsOne.selectAll('li')
            .data(peopleInfo)
            .enter()
            .filter(d => { count += 1; return count <= 4 })
            .append('li')
            .text(d => d.name)
            .on('click', selectSearchOne)
            ;
          searchResultsAreShownOne = true;
        }
      }

      function selectBarTwoClick() {
        if (!searchResultsAreShownTwo) {
          let count = 0;
          searchResultsTwo.selectAll('li')
            .data(peopleInfo)
            .enter()
            .filter(d => { count += 1; return count <= 4 })
            .append('li')
            .text(d => d.name)
            .on('click', selectSearchTwo)
            ;
          searchResultsAreShownTwo = true;
        }
      }

      document.onclick = function (e) {
        if (e.target.id !== 'searchOne' && searchResultsAreShownOne) {
          searchResultsOne.selectAll('li')
            .remove()
            ;
          searchResultsAreShownOne = false;
        }

        if (e.target.id !== 'searchTwo' && searchResultsAreShownTwo) {
          searchResultsTwo.selectAll('li')
            .remove()
            ;
          searchResultsAreShownTwo = false;
        }
      };

      function selectSearchOne(select) {
        searchResultsAreShownOne = false;
        d3.select('#searchOne')
          .property('value', "");
        ;
        searchResultsOne.selectAll('li')
          .remove()
          ;
        d3.select('#selected-one')
          .select('h2')
          .remove()
          ;
        let sel = d3.select('#selected-one')
          ;

        sel.append('h2')
          .attr('id', 'selectedPersonOne')
          .text(select.name)
          ;

        self.personOne = select;
        if (self.personTwo != null) {
          nodeDiagram.updateTwo(self.personOne.name, parseInt(self.personOne.id), self.personTwo.name, parseInt(self.personTwo.id));
          lineChart.update2(document.getElementById('dataset').value, parseInt(self.personOne.id), parseInt(self.personTwo.id))
        } else {
          nodeDiagram.update(self.personOne.name, parseInt(self.personOne.id));
          lineChart.update(document.getElementById('dataset').value, parseInt(self.personOne.id))
        }
      }

      function selectSearchTwo(select) {
        searchResultsAreShownTwo = false;
        d3.select('#searchTwo')
          .property('value', "");
        ;
        searchResultsTwo.selectAll('li')
          .remove()
          ;

        let sel = d3.select('#selected-two');
        sel.select('#selectedPersonTwo')
          .remove()
          ;
        let inner = sel.append('div')
          .attr('id', 'selectedPersonTwo')
          ;

        inner.append('span')
          .text(select.name)
          ;

        inner.append('span')
          .attr('id', 'xbutton')
          .text("X")
          .on('click', xButtonClick)
          ;
        self.personTwo = select;
        nodeDiagram.updateTwo(self.personOne.name, parseInt(self.personOne.id), self.personTwo.name, parseInt(self.personTwo.id));
        lineChart.update2(document.getElementById('dataset').value, parseInt(self.personOne.id), parseInt(self.personTwo.id));
      }

      function xButtonClick() {
        let sel = d3.select('#selected-two');
        sel.select('#selectedPersonTwo')
          .remove()
          ;
        self.personTwo = null;
        nodeDiagram.update(self.personOne.name, parseInt(self.personOne.id))
        lineChart.update(document.getElementById('dataset').value, parseInt(self.personOne.id))
      }
    });
  }

  updateActor(name, id) {
    this.personOne = { name: name, id: id }
    let sel = d3.select('#selected-two');
    sel.select('#selectedPersonTwo')
      .remove()
      ;
    d3.select('#selected-one')
      .select('h2')
      .remove()
      ;
    let sel1 = d3.select('#selected-one')
      ;
    sel1.append('h2')
      .attr('id', 'selectedPersonOne')
      .text(name)
      ;
    this.personTwo = null;
    this.lineChart.update(document.getElementById('dataset').value, parseInt(this.personOne.id))
  }
}