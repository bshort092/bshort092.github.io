/** Class implementing the lineChart view. */
class LineChart {
    /**
     * Creates a lineChart Object
     */
    constructor(movieData) {
        this.movieData = movieData;
    }

    update(property) {
        let data = [];

        let years = [];
        //need to add up all the revenue for the years for the line chart

        this.movieData.forEach(movie => {
            years.push(parseInt(movie.release_date.year))
        });

        //remove duplicate years
        let uniq = [...new Set(years)];
        years = Array.from(uniq);

        let maxProperty = 0;
        let sortedYears = years.sort().slice();
        sortedYears.splice(sortedYears.length - 2, 2) //picked up a NaN somewhere
        //for each year, get the total revenue
        sortedYears.forEach(year => {
            let propertySum = 0;
            this.movieData.forEach(movie => {
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
            .range([0, 1200 - yaxisWidth])
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
            // .transition()
            // .duration(1000)
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
            .selectAll('path')
            .data(data)
            ;

        updateLine.enter()
            .append('path')
            .merge(updateLine)
            .attr('transform', 'translate(106.5, 8)')
            .attr('d', lineGen(data))
            .attr('stroke', 'green')
            .attr('stroke-width', 1.5)
            .attr('fill', 'none');
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

