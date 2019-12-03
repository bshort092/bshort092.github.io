/** Class implementing the lineChart view. */
class LineChart {
    /**
     * Creates a lineChart Object
     */
    constructor(movieData) {

        let lineDiv = d3.select("#line-chart").classed("content", true);
        this.margin = { top: 30, right: 20, bottom: 30, left: 50 };
        //Gets access to the div element created for this chart and legend element from HTML
        let svgBounds = lineDiv.node().getBoundingClientRect();
        this.svgWidth = svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = this.svgWidth / 2;
        let legendHeight = 150;

        let lineSvg = d3.select("#line-chart-svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)

        this.movieData = movieData;
    }



    // check if an object is already inside the array
    containsId(array, id) {
        let returnBool = false;
        array.forEach(item => {
            if (item.id === id) returnBool = true;
        })
        return returnBool;
    }

    update(property, actor_id) {

        this.person1 = actor_id;
        this.person2 = null;

        let data = [];
        let years = [];
        let actorMovies = [];

        this.movieData.forEach(movie => {
            if (this.containsId(movie.cast, actor_id)) actorMovies.push(movie);
        })

        actorMovies.forEach(movie => {
            years.push(parseInt(movie.release_date.year))
        });

        console.log(actorMovies)
        console.log(years)

        //remove duplicate years
        let uniq = [...new Set(years)];
        years = Array.from(uniq);

        let maxProperty = 0;
        let sortedYears = years.sort().slice();
        // sortedYears.splice(sortedYears.length - 2, 2) //picked up a NaN somewhere
        //for each year, get the total revenue
        sortedYears.forEach(year => {
            let propertySum = 0;
            actorMovies.forEach(movie => {
                if (movie.release_date.year == year) propertySum += parseInt(movie[property]);
            });

            //find max
            if (propertySum > maxProperty) maxProperty = propertySum;

            data.push({
                year: year,
                property: propertySum
            });
        });

        // console.log(min)
        // console.log(max)
        console.log(data)

        let xaxisHeight = 10;
        let yaxisWidth = 100;

        let xscale = d3.scaleBand()
            .domain(sortedYears)
            .range([0, this.svgWidth - yaxisWidth])
            ;

        console.log(maxProperty)
        let height = 280;
        let yscale = d3.scaleLinear()
            .domain([0, maxProperty])
            .range([height, 0])
            ;

        let xaxis = d3.axisBottom(xscale)
            .tickFormat((d, i) => d)
            ;

        let yaxis = d3.axisLeft(yscale)
            .tickFormat((d, i) => d)
            ;

        d3.select('#xAxis')
            .attr('transform', `translate(${yaxisWidth}, 290)`)
            .call(xaxis)
            .selectAll('text')
            .attr('transform', `rotate(-90), translate(-20, -13)`)
            ;

        d3.select('#yAxis')
            .transition()
            .duration(1000)
            .attr('transform', `translate(${yaxisWidth}, 10)`)
            .call(yaxis)
            ;


        var lineGen = d3.line()
            .x(function (d) {
                return xscale(d.year);
            })
            .y(function (d) {
                return yscale(d.property);
            });

        d3.select("#lines").selectAll('.line-2').remove();

        let updateLine = d3.select("#lines")
            .selectAll('path')
            .data(data)
            ;

        updateLine.enter()
            .append('path')
            .merge(updateLine)
            .transition()
            .duration(1000)
            .attr('transform', 'translate(116, 8)')
            .attr('d', lineGen(data))
            .attr('stroke', '#bd0000')
            .attr('stroke-width', 1.5)
            .attr('fill', 'none')
            ;

        // let update = d3.select("#lines")
        //     .selectAll('circle')
        //     .data(data)
        //     ;

        // update.enter()
        //     .append('circle')
        //     .merge(update)
        //     .attr('r', 4)
        //     .attr('transform', 'translate(106.5, 289), scale(1, -1)')
        //     .attr("cy", d => {
        //         return d.property / maxProperty * 285
        //     })
        //     .attr("cx", (d, i) => {
        //         return (i * 12.35) //1200 is size of svg
        //     })
        //     .attr("fill", "red")
        //     ;
    }

    update2(property, actor_id, actor_id_2) {

        this.person1 = actor_id;
        this.person2 = actor_id_2;

        let data = [];
        let data2 = [];
        let years = [];
        let years2 = [];
        let actorMovies = [];
        let actorMovies2 = [];

        this.movieData.forEach(movie => {
            if (this.containsId(movie.cast, actor_id)) actorMovies.push(movie);
        })
        this.movieData.forEach(movie => {
            if (this.containsId(movie.cast, actor_id_2)) actorMovies2.push(movie);
        })

        actorMovies.forEach(movie => {
            years.push(parseInt(movie.release_date.year))
        });

        actorMovies2.forEach(movie => {
            years2.push(parseInt(movie.release_date.year))
        });

        console.log(actorMovies)
        console.log(years)

        console.log(actorMovies2)
        console.log(years2)

        //remove duplicate years
        let uniq = [...new Set(years)];
        years = Array.from(uniq);

        //remove duplicate years
        let uniq2 = [...new Set(years2)];
        years2 = Array.from(uniq2);

        let maxProperty = 0;
        let sortedYears = years.sort().slice();
        // sortedYears.splice(sortedYears.length - 2, 2) //picked up a NaN somewhere
        //for each year, get the total revenue
        sortedYears.forEach(year => {
            let propertySum = 0;
            actorMovies.forEach(movie => {
                if (movie.release_date.year == year) propertySum += parseInt(movie[property]);
            });

            //find max
            if (propertySum > maxProperty) maxProperty = propertySum;

            data.push({
                year: year,
                property: propertySum
            });
        });

        let maxProperty2 = 0;
        let sortedYears2 = years2.sort().slice();
        // sortedYears.splice(sortedYears.length - 2, 2) //picked up a NaN somewhere
        //for each year, get the total revenue
        sortedYears2.forEach(year => {
            let propertySum2 = 0;
            actorMovies2.forEach(movie => {
                if (movie.release_date.year == year) propertySum2 += parseInt(movie[property]);
            });

            //find max
            if (propertySum2 > maxProperty2) maxProperty2 = propertySum2;

            data2.push({
                year: year,
                property: propertySum2
            });
        });

        let totalYears = years.concat(years2).sort().slice();

        let xaxisHeight = 10;
        let yaxisWidth = 100;

        let xscale = d3.scaleBand()
            .domain(totalYears)
            .range([0, this.svgWidth - yaxisWidth])
            ;

        console.log(maxProperty)
        let height = 280;
        let yscale = d3.scaleLinear()
            .domain([0, Math.max(maxProperty, maxProperty2)])
            .range([height, 0])
            ;

        let xaxis = d3.axisBottom(xscale)
            .tickFormat((d, i) => d)
            ;

        let yaxis = d3.axisLeft(yscale)
            .tickFormat((d, i) => d)
            ;

        d3.select('#xAxis')
            .attr('transform', `translate(${yaxisWidth}, 290)`)
            .call(xaxis)
            .selectAll('text')
            .attr('transform', `rotate(-90), translate(-20, -13)`)
            ;

        d3.select('#yAxis')
            .transition()
            .duration(1000)
            .attr('transform', `translate(${yaxisWidth}, 10)`)
            .call(yaxis)
            ;


        var lineGen = d3.line()
            .x(function (d) {
                return xscale(d.year);
            })
            .y(function (d) {
                return yscale(d.property);
            });

        let updateLine = d3.select("#lines")
            .selectAll('.line-1')
            .data(data)
            ;

        updateLine.enter()
            .append('path')
            .attr('class', 'line-1')
            .merge(updateLine)
            .transition()
            .duration(1000)
            .attr('transform', 'translate(116, 8)')
            .attr('d', lineGen(data))
            .attr('stroke', '#bd0000')
            .attr('stroke-width', 1.5)
            .attr('fill', 'none')
            ;

        let updateLine2 = d3.select("#lines")
            .selectAll('.line-2')
            .data(data2)
            ;

        updateLine2.enter()
            .append('path')
            .attr('class', 'line-2')
            .merge(updateLine2)
            .transition()
            .duration(1000)
            .attr('transform', 'translate(116, 8)')
            .attr('d', lineGen(data2))
            .attr('stroke', '#0298de')
            .attr('stroke-width', 1.5)
            .attr('fill', 'none')
            ;

        // let update = d3.select("#lines")
        //     .selectAll('circle')
        //     .data(data)
        //     ;

        // update.enter()
        //     .append('circle')
        //     .merge(update)
        //     .attr('r', 4)
        //     .attr('transform', 'translate(106.5, 289), scale(1, -1)')
        //     .attr("cy", d => {
        //         return d.property / maxProperty * 285
        //     })
        //     .attr("cx", (d, i) => {
        //         return (i * 12.35) //1200 is size of svg
        //     })
        //     .attr("fill", "red")
        //     ;

    }
}

