// credit: https://bl.ocks.org/mapio/53fed7d84cd1812d6a6639ed7aa83868

// class to create and update the node link diagram for a specified actor
class NodeDiagram {

    constructor(movieData, movieInfo) {
        // grab the movie data
        this.movies = movieData;

        // instance of the class MovieInfo
        this.movieInfo = movieInfo;

        // width of the node link diagram
        this.width = screen.width;

        // height of the node link diagram
        this.height = 800;

        // set the domain of the min through max color options
        let domain = [1,2,3,4,5];
        // set the range of colors for the nodes
        let range = ["#bd0000", "#707070", "#9871b0",
            "#707070", "#0298de"];
            // "#00b82b", "#00b2b8"];
        // set the range of colors for the text
        let textRange = ["#ffffff", "#edbbbb", "#e9dff0",
            "#bbdded", "#ffffff"];
        // color scale for the nodes in the node link diagram
        this.color = d3.scaleQuantile()
            .domain(domain)
            .range(range);
        this.textColor = d3.scaleQuantile()
            .domain(domain)
            .range(textRange);

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
    // check if an object is already inside the array
    containsLink(array, obj) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].source == obj.source && array[i].target == obj.target) {
                return true;
            }
        }
        return false;
    }

    addGenreLink(i, actor, group) {
        for (let k = 0; k < this.movies[i].genres.length; k++) {
            let genreName = this.movies[i].genres[k].name;
            if (group === 4) {
                genreName += '.';
            }
            let genreNode = {id: genreName, group: group};
            // check if the genre has already been added to the actor info array
            if (!this.containsObject(this.actorInfo.nodes, genreNode)) {
                // add the genre node
                this.actorInfo.nodes.unshift(genreNode);
                // add the genre to actor link
                this.actorInfo.links.unshift({
                    source: genreName,
                    target: actor
                });
            }
            let genreLink = {
                source: this.movies[i].title,
                target: genreName
            };
            if (!this.containsLink(this.actorInfo.links, genreLink)) {
                // add the movie to genre link
                this.actorInfo.links.push(genreLink);
            }
        }
    }

    checkSameMovie(actor_id, otherActor_id, i) {
        let sameMovieActors = [];
        // iterate through each cast member of the movie
        for (let j = 0; j < this.movies[i].cast.length; j++) {
            // check if selected actor is in the cast of the movie
            if (this.movies[i].cast[j].id === actor_id) {
                sameMovieActors.push(actor_id)
            }
            // check if selected other actor is in the cast of the movie
            if (this.movies[i].cast[j].id === otherActor_id) {
                sameMovieActors.push(otherActor_id)
            }
        }
        return sameMovieActors;
    }

    // updateTwo(actor, actor_id, otherActor, otherActor_id) {
    //     this.actorInfo = {
    //         'nodes': [],
    //         'links': []
    //     };
    //
    //     // iterate through each movie
    //     for (let i = 0; i < this.movies.length; i++) {
    //         let sameMovieActors = this.checkSameMovie(actor_id, otherActor_id, i);
    //         if (sameMovieActors.length > 1)
    //         {
    //             this.addGenreLink(i, actor, 2);
    //             this.addGenreLink(i, otherActor, 4);
    //
    //             // add the movie node
    //             let movieNode = {id: this.movies[i].title, group: 3};
    //             this.actorInfo.nodes.push(movieNode);
    //         }
    //     }
    //     // add the actor node
    //     this.actorInfo.nodes.unshift({id: actor, group: 1});
    //     this.actorInfo.nodes.unshift({id: otherActor, group: 5});
    //
    //     this.restructureNodes();
    // }

    findOtherActor(otherActor, otherActor_id, currentMovieList, round, checkedActors, checkedMovies) {
        if (round === 5) {
            return false;
        }

        let newMovieList = [];

        for (let i = 0; i < currentMovieList.length; i++) {
            for (let j = 0; j < currentMovieList[i].cast.length; j++) {
                let found = false;
                for (let k = 0; k < this.movies.length; k++) {
                    // iterate through each cast member of the movie
                    if (this.movies[k].title !== currentMovieList[i].title) {
                    // if (!checkedMovies.includes(this.movies[k].title)) {

                        for (let l = 0; l < this.movies[k].cast.length; l++) {
                            if (!checkedActors.includes(this.movies[k].cast[l].name)) {
                                if (this.movies[k].cast[l].id === currentMovieList[i].cast[j].id &&
                                    this.movies[k].cast[l].id === otherActor_id) {
                                    this.actorInfo.links.unshift({
                                        source: this.movies[k].title,
                                        target: otherActor
                                    });
                                    this.actorInfo.nodes.push({
                                        id: this.movies[k].title,
                                        group: 3
                                    });
                                    checkedActors.push(otherActor);
                                    // checkedMovies.push(this.movies[k].title);
                                    found = true;
                                }
                                // check if selected actor is in the cast of the movie
                                else if (this.movies[k].cast[l].id === currentMovieList[i].cast[j].id) {
                                    checkedActors.push(otherActor);
                                    // checkedMovies.push(this.movies[k].title);
                                    newMovieList.push(this.movies[k]);
                                    // iterate through the genres the movie pertains to
                                    this.actorInfo.links.unshift({
                                        source: this.movies[k].title,
                                        target: currentMovieList[i].title
                                    });
                                    // add the movie node
                                    this.actorInfo.nodes.push({
                                        id: this.movies[k].title,
                                        group: 3
                                    });
                                }
                            }
                        }
                    }
                }
                if (found) {
                    return true;
                }
            }
        }
        // this.findOtherActor(otherActor, otherActor_id, newMovieList, round++, checkedActors, checkedMovies);
    }

    updateTwo(actor, actor_id, otherActor, otherActor_id) {
        this.actorInfo = {
            'nodes': [],
            'links': []
        };

        let currentMovies = [];
        let checkedActors = [];
        checkedActors.push(actor);
        let checkedMovies = [];

        // iterate through each movie
        for (let i = 0; i < this.movies.length; i++) {
            // iterate through each cast member of the movie
            for (let j = 0; j < this.movies[i].cast.length; j++) {
                // check if selected actor is in the cast of the movie
                if (this.movies[i].cast[j].id === actor_id) {
                    currentMovies.push(this.movies[i]);
                    checkedMovies.push(this.movies[i].title);
                    // iterate through the genres the movie pertains to
                    this.actorInfo.links.unshift({
                        source: this.movies[i].title,
                        target: actor
                    });
                    // add the movie node
                    this.actorInfo.nodes.push({
                        id: this.movies[i].title,
                        group: 3
                    });
                    break;
                }
            }
        }
        // add the actor node


        let result = this.findOtherActor(otherActor, otherActor_id, currentMovies, 1, checkedActors, currentMovies);
        this.actorInfo.nodes.unshift({id: actor, group: 1});
        this.actorInfo.nodes.unshift({id: otherActor, group: 5});


        this.restructureNodes();
    }

    // update the node link diagram to reflect the selected actor
    update(actor, actor_id) {

        this.actorInfo = {
            'nodes': [],
            'links': []
        };

        // iterate through each movie
        for (let i = 0; i < this.movies.length; i++) {
            // iterate through each cast member of the movie
            for (let j = 0; j < this.movies[i].cast.length; j++) {
                // check if selected actor is in the cast of the movie
                if (this.movies[i].cast[j].id === actor_id) {
                    // iterate through the genres the movie pertains to
                    this.addGenreLink(i, actor, 2);
                    // add the movie node
                    this.actorInfo.nodes.push({
                        id: this.movies[i].title,
                        group: 3
                    });
                    break;
                }
            }
        }
        // add the actor node
        this.actorInfo.nodes.unshift({id: actor, group: 1});
        this.restructureNodes();
    }
    restructureNodes() {

        // adjacency list to find what nodes are next to other nodes
        this.adjlist = [];

        // label list to find both forwards and backwards directions of the nodes
        this.label = {
            'nodes': [],
            'links': []
        };

        // go through the actor infos and duplicate the nodes to have a link to and from
        this.actorInfo.nodes.forEach((d, i) => {
            this.label.nodes.push({ node: d });
            this.label.nodes.push({ node: d });
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
            this.labelNode.each(function (d, i) {
                if (i % 2 == 0) {
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
            .force("center", d3.forceCenter(this.width / 3.5, this.height / 2))
            .force("x", d3.forceX(this.width / 3.5).strength(1))
            .force("y", d3.forceY(this.height / 2).strength(1))
            .force("link", d3.forceLink(this.actorInfo.links).id((d) => {
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
            .attr("class", 'nodeSpace');

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
            .attr("r", d => {
                if (d.group === 1 || d.group === 5) {
                    return "18"
                }
                if (d.group === 2 || d.group === 4) {
                    return "14"
                }
                else {
                    return "12"
                }
            })
            .attr("fill", (d) => {
                return this.color(d.group);
            })
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .style("cursor", d => {
                if (d.group === 3) {
                    return "pointer";
                }
                else {
                    return "default";
                }
            });


        // fill in the adjaceny list for which nodes are connected in the format 1-1, 1-2, etc
        this.actorInfo.links.forEach((d) => {
            this.adjlist[d.source.index + "-" + d.target.index] = true;
            this.adjlist[d.target.index + "-" + d.source.index] = true;
        });

        // add labels to the nodes
        this.labelNode = this.container.append("g").attr("class", "labelNodes")
            .selectAll("text")
            .data(this.label.nodes)
            .enter()
            .append("text")
            .text((d, i) => {
                return i % 2 == 0 ? "" : d.node.id;
            })
            .style("fill", d => {
                return this.textColor(d.node.group);
            })
            .style("font-size", d => {
                if (d.node.group === 1 || d.node.group === 5) {
                    return "18"
                }
                if (d.node.group === 2 || d.node.group === 4) {
                    return "14"
                }
                else {
                    return "12"
                }
            })
            .style("font-weight", d => {
                if (d.node.group === 3) {
                    return "bold";
                }
                else {
                    return "normal";
                }
            }); // to prevent mouseover/drag capture

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
                return neighbors(index, o.node.index) ? "block" : "none";
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

        this.node.on("click", (d) =>
            this.movieInfo.update(d.id, this)
        );

        // d3 function for the nodes for when a drag has started, in progress, or has ended
        this.node.call(
            d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );
    }

}