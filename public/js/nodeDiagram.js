// credit: https://bl.ocks.org/mapio/53fed7d84cd1812d6a6639ed7aa83868

// class to create and update the node link diagram for a specified actor
class NodeDiagram {

    constructor (movieData) {
        // grab the movie data
        this.movies = movieData;

        // width of the node link diagram
        this.width = 900;
        // height of the node link diagram
        this.height = 600;

        // set the domain of the min through max color options
        let domain = [1,2,3];
        // set the range of colors for the nodes
        let range = ["#bd0000", "#00b2b8", "#00b82b"];
        // color scale for the nodes in the node link diagram
        this.color = d3.scaleQuantile()
            .domain(domain)
            .range(range);

        // variable to hold the labels
        this.label;
        // variable to hold the adjacent nodes
        this.adjlist;
        // variable to hold the layout of the labels
        this.labelLayout;
        // variable to hold the layout of the node link diagram graph
        this.graphLayout;
        // variable to hold the svg element
        this.svg;
        // variable to hold the svg container element
        this.container;
        // variable to hold the links (to and from)
        this.link;
        // variable to hold the nodes (duplicates included)
        this.node;
        // variable to hold the current node that is focused/unfocused
        this.labelNode;
        // variable to hold the list containing the actor, the genres the actor had acted in, and the movies the actor had acted in
        this.actorInfo;
    }

    // check if an object is already inside the array
    containsObject(array, obj) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == obj.id && array[i].group == obj.group) {
                return true;
            }
        }
        return false;
    }

    // update the node link diagram to reflect the selected actor
    update(actor, actor_id) {

        this.actorInfo = {
            'nodes': [],
            'links': []
        };

        // iterate through each movie
        for (let i = 0; i < this.movies.length; i++)
        {
            // iterate through each cast member of the movie
            for (let j = 0; j < this.movies[i].cast.length; j++)
            {
                // check if selected actor is in the cast of the movie
                if (this.movies[i].cast[j].id === actor_id)
                {
                    // iterate through the genres the movie pertains to
                    for (let k = 0; k < this.movies[i].genres.length; k++)
                    {
                        let genreNode = {id: this.movies[i].genres[k].name, group: 2};
                        // check if the genre has already been added to the actor info array
                        if (!this.containsObject(this.actorInfo.nodes, genreNode))
                        {
                            // add the genre node
                            this.actorInfo.nodes.unshift(genreNode);
                            // add the genre to actor link
                            this.actorInfo.links.unshift({
                                source: this.movies[i].genres[k].name,
                                target: actor,
                                value: 1});
                        }
                        // add the movie to genre link
                        this.actorInfo.links.push({
                            source: this.movies[i].title,
                            target: this.movies[i].genres[k].name,
                            value: 1});
                    }
                    // add the movie node
                    this.actorInfo.nodes.push({
                        id: this.movies[i].title,
                        group: 3});
                    break;
                }
            }
        }
        // add the actor node
        this.actorInfo.nodes.unshift({id: actor, group: 1});

        // adjacency list to find what nodes are next to other nodes
        this.adjlist = [];

        // label list to find both forwards and backwards directions of the nodes
        this.label = {
            'nodes': [],
            'links': []
        };

        // go through the actor infos and duplicate the nodes to have a link to and from
        this.actorInfo.nodes.forEach((d, i) => {
            this.label.nodes.push({node: d});
            this.label.nodes.push({node: d});
            this.label.links.push({
                source: i * 2,
                target: i * 2 + 1
            });
        });

        // set up the layout of the labels
        this.labelLayout = d3.forceSimulation(this.label.nodes)
            .force("charge", d3.forceManyBody().strength(-50))
            .force("link", d3.forceLink(this.label.links).distance(0).strength(2));

        // assign where each node and each link will be placed in the svg
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

        // set up the node link diagram graph layout
        this.graphLayout = d3.forceSimulation(this.actorInfo.nodes)
            .force("charge", d3.forceManyBody().strength(-3000))
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))
            .force("x", d3.forceX(this.width / 2).strength(1))
            .force("y", d3.forceY(this.height / 2).strength(1))
            .force("link", d3.forceLink(this.actorInfo.links).id( (d) => {
                return d.id;
            }).distance(50).strength(1))
            .on("tick", ticked);

        // node link diagram svg
        this.svg = d3.select("#node-diagram")
            .attr("width", this.width)
            .attr("height", this.height);

        // border the svg with a black border
        this.svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", this.height)
            .attr("width", this.width)
            .style("stroke", "black")
            .style("fill", "black")
            .style("stroke-width", 10);

        // add a container element (group) to the svg to then add the node link diagram inside that
        this.container = this.svg.append("g");

        // allow for zooming
        this.svg.call(
            d3.zoom()
                .scaleExtent([.1, 5])
                .on("zoom", () => {
                    this.container.attr("transform", d3.event.transform);
                })
        );

        // add each line from the dataset into the node link diagram with proper styling
        this.link = this.container.append("g").attr("class", "links")
            .selectAll("line")
            .data(this.actorInfo.links)
            .enter()
            .append("line")
            // .attr("stroke", "#aaa")
            .attr("stroke", "#6e6e6e")
            .attr("stroke-width", "1px");

        // add each node from the dataset ino the node link diagram with proper styling
        this.node = this.container.append("g").attr("class", "nodes")
            .selectAll("g")
            .data(this.actorInfo.nodes)
            .enter()
            .append("circle")
            .attr("r", 12)
            .attr("fill", (d) => {
                return this.color(d.group);
            })
            .attr("stroke", "#000")
            .attr("stroke-width", 1);

        // fill in the adjaceny list for which nodes are connected in the format 1-1, 1-2, etc
        this.actorInfo.links.forEach( (d) => {
            this.adjlist[d.source.index + "-" + d.target.index] = true;
            this.adjlist[d.target.index + "-" + d.source.index] = true;
        });

        // add labels to the nodes
        this.labelNode = this.container.append("g").attr("class", "labelNodes")
            .selectAll("text")
            .data(this.label.nodes)
            .enter()
            .append("text")
            .text( (d, i) => {
                return i % 2 == 0 ? "" : d.node.id;
            })
            .style("fill", "#fff")
            .style("font-family", "Arial")
            .style("font-size", 12)
            .style("pointer-events", "none"); // to prevent mouseover/drag capture

        // function to check the neighbors of the node
        let neighbors = (a, b) => {
            return a == b || this.adjlist[a + "-" + b];
        };

        // function to check if the number is finite
        let fixna = (x) => {
            if (isFinite(x)) return x;
            return 0;
        };

        // function called when a node is focused
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

        // function called when a node is no longer focused
        let unfocus = () => {
            this.labelNode.attr("display", "block");
            this.node.style("opacity", 1);
            this.link.style("opacity", 1);
        };

        // function to update the link coordinates
        let updateLink = (link) => {
            link.attr("x1", (d) => { return fixna(d.source.x); })
                .attr("y1", (d) => { return fixna(d.source.y); })
                .attr("x2", (d) => { return fixna(d.target.x); })
                .attr("y2", (d) => { return fixna(d.target.y); });
        };

        // function to update the node coordinates
        let updateNode = (node) => {
            node.attr("transform", (d) => {
                return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
            });
        };

        // function to allow dragging of the nodes
        let dragstarted = (d) => {
            d3.event.sourceEvent.stopPropagation();
            if (!d3.event.active) this.graphLayout.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        };

        // function to update the position of the nodes while dragging
        let dragged = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        };

        // function to update the position of the nodes after dragging
        let dragended = (d) => {
            if (!d3.event.active) this.graphLayout.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        };

        // allow mouse functions for when user is focusing on a node
        this.node.on("mouseover", focus).on("mouseout", unfocus);

        // d3 function for the nodes for when a drag has started, in progress, or has ended
        this.node.call(
            d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );

        // allow mouse functions for when user is focusing on a node
        this.node.on("mouseover", focus).on("mouseout", unfocus);

    }

}