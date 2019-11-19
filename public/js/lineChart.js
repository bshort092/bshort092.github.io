/** Class implementing the lineChart view. */
class LineChart {
    /**
     * Creates a lineChart Object
     */
    constructor(movieData) {
        this.movieData = movieData;
    }
    //need to add up all the revenue for the years for the line chart

    update(property) {
        let data = [];

        let justYears = [];

        this.movieData.forEach(movie => {

            data.push({
                year: parseInt(movie.release_date.year),
                property: movie[property]
            })
            justYears.push(parseInt(movie.release_date.year))
        });

        data.sort((a, b) => (a.year > b.year) ? 1 : -1)

        let min = parseInt(data[0].year);
        let max = parseInt(data[data.length - 1].year);

        let maxProperty = 0;

        data.forEach(movie => {
            if (parseInt(movie.property) > maxProperty) maxProperty = parseInt(movie.property);
        })

        // console.log(min)
        // console.log(max)
        //   console.log(data)

        let xaxisHeight = 10;
        let yaxisWidth = 100;

        let xAxisData = justYears.sort().slice();
        xAxisData.splice(justYears.length-1, 1) //picked up a NaN somewhere
        let xscale = d3.scaleBand()
            .domain(xAxisData)
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
    }
}

