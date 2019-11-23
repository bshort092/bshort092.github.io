d3.csv("data/tmdb_5000_movies.csv").then(movieInfo => {
  let movies = [];
  let credits = [];
  movies = movieInfo.slice();
  movieInfo.forEach(movie => {
    //these were all stringified JSON arrays. Parsed them into js object arrays
    movie.genres = JSON.parse(movie.genres);
    movie.keywords = JSON.parse(movie.keywords);
    movie.production_companies = JSON.parse(movie.production_companies);
    movie.production_countries = JSON.parse(movie.production_countries);
    movie.spoken_languages = JSON.parse(movie.spoken_languages);

    let ymd = movie.release_date.split("-");
    movie.release_date = {
      year: ymd[0],
      month: ymd[1],
      day: ymd[2]
    }
  });

  d3.csv("data/tmdb_5000_credits.csv").then(creditInfo => {
    credits = creditInfo.slice();
    creditInfo.forEach(credit => {
      //these were stringified JSON arrays. Parsed them into js object arrays
      credit.cast = JSON.parse(credit.cast);
      credit.crew = JSON.parse(credit.crew);
    });
    //sorting so indices line up
    movies.sort((a, b) => (a.id > b.id) ? 1 : -1);
    credits.sort((a, b) => (a.movie_id > b.movie_id) ? 1 : -1);

    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id === credits[i].movie_id) {
        movies[i].cast = credits[i].cast;
        movies[i].crew = credits[i].crew;
      }
      else {
        console.log(`ERROR merging csv files: ${id} != ${movie_id}`);
      }
    }
    console.log(movies);
    let lineChart = new LineChart(movies);
    lineChart.update('revenue');


    let movieInfo = new MovieInfo(movies);
    let nodeDiagram = new NodeDiagram(movies, movieInfo);
    let searchBar = new SearchBar(nodeDiagram);
  });
});

//something that might be useful for changing data in line chart
// function chooseProperty() {
//   let selection = document.getElementById('dataset').value;

//   barChart.updateBarChart(selection);
// }

