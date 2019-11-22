// class to show the movie data for the selected movie from the node link diagram
class MovieInfo {
    constructor(movieData) {
        // grab the movie data
        this.movies = movieData;

        this.spanMovieList= d3.select("#movieInfoList").classed("sideBar", true);
    }
    // update function to change the info given in the movie info screen
    update(movieName, nodeDiagram) {
        // find the move that matches the title
        let foundMovie = this.movies.find(function(movie) {
            return movie.title == movieName;
        });

        if (foundMovie) {
            // remove previous movie info
            d3.selectAll('.movieInfoText').remove();

            // add movie info
            let movieInfo = this.spanMovieList.select('#movieInfo');
            movieInfo.append('h2').text(foundMovie.title).attr('class', 'movieInfoText');
            movieInfo.append('h4').text(foundMovie.tagline).attr('class', 'movieInfoText');
            movieInfo.append('p').text(foundMovie.overview).attr('class', 'movieInfoText');
            movieInfo.append('div').text("Released: " + foundMovie.release_date.month + "/" + foundMovie.release_date.day + "/" + foundMovie.release_date.year).attr('class', 'movieInfoText');
            movieInfo.append('div').text("Run Time: " + foundMovie.runtime + " minutes").attr('class', 'movieInfoText');
            movieInfo.append('div').text("Budget:   " + "$" + foundMovie.budget).attr('class', 'movieInfoText');
            movieInfo.append('div').text("Revenue: " + "$" + foundMovie.revenue).attr('class', 'movieInfoText');
            movieInfo.append('div').text("Voting Rating: " + foundMovie.vote_average).attr('class', 'movieInfoText');
            movieInfo.append('div').text("Popularity: " + foundMovie.popularity).attr('class', 'movieInfoText');
            movieInfo.append('p').text("Genres: ").attr('class', 'movieInfoText');
            for (let i = 0; i < foundMovie.genres.length; i++) {
                movieInfo.append('li').text(foundMovie.genres[i].name).attr('class', 'movieInfoText');
            }
            movieInfo.append('h4').text("Cast: ").attr('class', 'movieInfoText');
            for (let i = 0; i < foundMovie.cast.length; i++) {
                movieInfo
                    .append('li')
                    .text(foundMovie.cast[i].name + "  \"" + foundMovie.cast[i].character + "\"")
                    .attr('class', 'movieInfoText')
                    .on('click', (d) =>
                        nodeDiagram.update(foundMovie.cast[i].name, foundMovie.cast[i].id)
                    )
                    .style('color', '#bd0000')
                    .on('mouseover', function (d) {
                        d3.select(this).style("cursor", "pointer").style('text-decoration', 'underline');
                    })
                    .on('mouseout', function (d) {
                        d3.select(this).style("cursor", "default").style('text-decoration', 'none');
                    })
                ;
            }
        }
    }
}