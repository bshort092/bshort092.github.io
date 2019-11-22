// credit: https://bl.ocks.org/mapio/53fed7d84cd1812d6a6639ed7aa83868

class NodeDiagram {

    constructor (movieData, creditData) {
        // grab the movie data
        this.movies = movieData;
        // grab the credits of each movie data
        this.credits = creditData;

        this.width = 1000;
        this.height = 600;
        this.color = d3.scaleOrdinal(d3.schemeAccent);

        this.label;
        this.adjlist;
        this.labelLayout;
        this.graphLayout;
        this.svg;
        this.container;
        this.link;
        this.node;
        this.labelNode;
        this.actorInfo;
    }

    containsObject(array, obj) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == obj.id && array[i].group == obj.group) {
                return true;
            }
        }
        return false;
    }

    update(actor, actor_id) {

        this.actorInfo = {
            'nodes': [],
            'links': []
        };

        for (let i = 0; i < this.movies.length; i++)
        {
            for (let j = 0; j < this.movies[i].cast.length; j++)
            {
                if (this.movies[i].cast[j].id === actor_id)
                {
                    for (let k = 0; k < this.movies[i].genres.length; k++)
                    {
                        let genreNode = {id: this.movies[i].genres[k].name, group: 2};
                        if (!this.containsObject(this.actorInfo.nodes, genreNode))
                        {
                            this.actorInfo.nodes.unshift(genreNode);
                            this.actorInfo.links.unshift({
                                source: this.movies[i].genres[k].name,
                                target: actor,
                                value: 1});
                        }
                        this.actorInfo.links.push({
                            source: this.movies[i].title,
                            target: this.movies[i].genres[k].name,
                            value: 1});
                    }
                    this.actorInfo.nodes.push({
                        id: this.movies[i].title,
                        group: 3});
                    break;
                }
            }
        }
        this.actorInfo.nodes.unshift({id: actor, group: 1});

        this.adjlist = [];
        this.label = {
            'nodes': [],
            'links': []
        };
        this.actorInfo.nodes.forEach((d, i) => {
            this.label.nodes.push({node: d});
            this.label.nodes.push({node: d});
            this.label.links.push({
                source: i * 2,
                target: i * 2 + 1
            });
        });

        this.labelLayout = d3.forceSimulation(this.label.nodes)
            .force("charge", d3.forceManyBody().strength(-50))
            .force("link", d3.forceLink(this.label.links).distance(0).strength(2));

        let ticked = () => {
            this.node.call(updateNode);
            this.link.call(updateLink);

            this.labelLayout.alphaTarget(0.3).restart();
            this.labelNode.each(function(d, i) {
                if(i % 2 == 0) {
                    d.x = d.node.x;
                    d.y = d.node.y;
                } else {
                    let b = this.getBBox();

                    let diffX = d.x - d.node.x;
                    let diffY = d.y - d.node.y;

                    let dist = Math.sqrt(diffX * diffX + diffY * diffY);

                    let shiftX = b.width * (diffX - dist) / (dist * 2);
                    shiftX = Math.max(-b.width, Math.min(0, shiftX));
                    let shiftY = 16;
                    this.setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
                }
            });
            this.labelNode.call(updateNode);

        };

        this.graphLayout = d3.forceSimulation(this.actorInfo.nodes)
            .force("charge", d3.forceManyBody().strength(-3000))
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))
            .force("x", d3.forceX(this.width / 2).strength(1))
            .force("y", d3.forceY(this.height / 2).strength(1))
            .force("link", d3.forceLink(this.actorInfo.links).id( (d) => {
                return d.id;
            }).distance(50).strength(1))
            .on("tick", ticked);

        this.svg = d3.select("#node-diagram").attr("width", this.width).attr("height", this.height);
        this.container = this.svg.append("g");

        this.svg.call(
            d3.zoom()
                .scaleExtent([.1, 4])
                .on("zoom", () => {
                    this.container.attr("transform", d3.event.transform);
                })
        );

        this.link = this.container.append("g").attr("class", "links")
            .selectAll("line")
            .data(this.actorInfo.links)
            .enter()
            .append("line")
            .attr("stroke", "#aaa")
            .attr("stroke-width", "1px");

        this.node = this.container.append("g").attr("class", "nodes")
            .selectAll("g")
            .data(this.actorInfo.nodes)
            .enter()
            .append("circle")
            .attr("r", 12)
            .attr("fill", (d) => {
                return this.color(d.group);
            });

        this.actorInfo.links.forEach( (d) => {
            this.adjlist[d.source.index + "-" + d.target.index] = true;
            this.adjlist[d.target.index + "-" + d.source.index] = true;
        });

        this.labelNode = this.container.append("g").attr("class", "labelNodes")
            .selectAll("text")
            .data(this.label.nodes)
            .enter()
            .append("text")
            .text( (d, i) => {
                return i % 2 == 0 ? "" : d.node.id;
            })
            .style("fill", "#000000")
            .style("font-family", "Arial")
            .style("font-weight", "bold")
            .style("font-size", 10)
            .style("pointer-events", "none"); // to prevent mouseover/drag capture

        let neighbors = (a, b) => {
            return a == b || this.adjlist[a + "-" + b];
        };



        let fixna = (x) => {
            if (isFinite(x)) return x;
            return 0;
        };

        let focus = (d) => {
            let index = d3.select(d3.event.target).datum().index;
            this.node.style("opacity", (o) => {
                return neighbors(index, o.index) ? 1 : 0.3;
            });
            this.labelNode.attr("display", (o) => {
                return neighbors(index, o.node.index) ? "block": "none";
            });
            this.link.style("opacity", (o) => {
                return o.source.index == index || o.target.index == index ? 1 : 0.3;
            });
        };

        let unfocus = () => {
            this.labelNode.attr("display", "block");
            this.node.style("opacity", 1);
            this.link.style("opacity", 1);
        };

        let updateLink = (link) => {
            link.attr("x1", (d) => { return fixna(d.source.x); })
                .attr("y1", (d) => { return fixna(d.source.y); })
                .attr("x2", (d) => { return fixna(d.target.x); })
                .attr("y2", (d) => { return fixna(d.target.y); });
        };

        let updateNode = (node) => {
            node.attr("transform", (d) => {
                return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
            });
        };

        let dragstarted = (d) => {
            d3.event.sourceEvent.stopPropagation();
            if (!d3.event.active) this.graphLayout.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        };

        let dragged = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        };

        let dragended = (d) => {
            if (!d3.event.active) this.graphLayout.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        };



        this.node.on("mouseover", focus).on("mouseout", unfocus);

        this.node.call(
            d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );

        this.node.on("mouseover", focus).on("mouseout", unfocus);


    }


}