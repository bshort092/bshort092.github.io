Keisha Gates    keisha.gates@aggiemail.usu.edu   A02071489

Aaron Lafitte                    aaronjlafitte@gmail.com   A01852530

Brandon Short                    bshort092@gmail.com   A02193680

_Project Repository:_ https://github.com/KeishaGates/DataVisFinalProj

**Movie Data &quot;I love you 3000&quot;**

**1.** _Background and Motivation._

We chose to show visualizations with movie data because we all enjoy movies and wanted to expand on the data to see things like how actors are connected through the movies they have performed in. Since we all watch a lot of movies, we wanted our visualization to show connections and relationships among actors, movies, revenue, reviews, etc, so that we could get an idea of what other movies might be interesting to us based on the movies we have seen. This visualization could help us understand how movies obtain their success.

**2.** _Project Objectives._

Primary Questions:

- What connections exist between actors/directors?
- Do the critic reviews relate to the amount of revenue a movie makes?
- What year made the most movies?
- In each year which movie made the most revenue?
- Is there a relationship between budget and revenue?
- Is there a relationship between budget and critic reviews?
- Which year made the most movies of a specified genre?
- Does the runtime relate to anything (budget/revenue/score)?
- Does the release date affect the success of a movie?

Want to Learn:

- We want to learn about the relationships among the movie data
- To be able to find any similarities or patterns between found connections
- We want to find the recommendations the user can get from the relationships found
- Actor history in detail based on relationships found in visualization
- How external views can affect the success of the movie (reviews of critics or audience)

Benefits:

- To be able to see the correlations between categories like budget vs revenue to see if a movie is more successful with a bigger budget or not.
- Find good recommendations based on information learned
- Benefits those who like to see trends within the movie data

**3.** _Data._

Data is obtained from IMDB through Kaggle at:

https://www.kaggle.com/rounakbanik/the-movies-dataset#movies\_metadata.csv

**4.** _Data Processing._

The original dataset is 900 MB with several columns that don&#39;t play a role in our visualization, therefore, we will need to remove unused columns. The rest of the data will be used in the visualization through filtering and aggregation. We will initially load the csv file into javascript objects that we will filter based on the user&#39;s settings.

**5.** _Visualization Design._

- How to display data ideas:

To find relationships between two quantitative attributes, (like budget vs revenue) we will use line charts. To find the total amount of categorical attributes, we will use bar charts. If the user wants to find a relationship between the actor of choice to another actor, or to find out more about what genres/movies an actor has been in, a node-link diagram will be used.

- Prototype 1: Given a list of years, brush over as many years as you want to see the list of movies within those years.

Justification: Brushing adds user interaction. It is also important to see details about specific movies.

 ![alt text](https://cdn.discordapp.com/attachments/638494334785683467/642529866885103636/unknown.png)

- Prototype 2: Find a relationship between two movies through actors and movies.

Justification: Connections between movies could be important to the user, so we wanted to add a way to see those connections. Similar to the 7 degrees of Kevin Bacon idea.

![alt text](https://cdn.discordapp.com/attachments/638494334785683467/642528107617845259/unknown.png)

- Prototype 3: Given a list of years, brush over as many years as you want to show a line chart of the number of movies released in those years.

Justification: Brushing adds user interaction. It is also important to see some of the trends contained in the movie data.

![alt text](https://cdn.discordapp.com/attachments/638494334785683467/642531711254790165/unknown.png)

- Final Prototype: Use a node-link diagram to show the actor and actor relationship tree. Once a movie is selected, a list of information about the movie and its actors are presented.

Justification: This uses the node link idea, user interactivity, and shows specific movie details. This viz is presented in a clean and easy to understand format.

![alt text](https://cdn.discordapp.com/attachments/638494334785683467/642526452679704581/unknown.png)

**6.** _Must-Have Features._

- Brushing over years to a list based on filtered criteria
- Interactivity
- Filtering by genre
- Obtaining and using enough movie data
- Elaborate, yet simple design
- Filtering based on actor
- Bar charts
- Line charts
- Node-link diagrams
- Relationship diagrams/charts for filtered data
- Search bar

**7.** _Optional Features._

- Brushing over any attribute
- Filtering based on actor and director
- Radial charts
- Stream graphs
- Animation

**8.** _Project Schedule._

 Week 1: Design/Prototype

- Aaron: Meet to create design/delegate future work
- Brandon: Meet to create design/delegate future work
- Keisha: Meet to create design/delegate future work

 Week 2: Begin Implementation with a starting layout

- Aaron: Implement a vis
- Brandon: Implement a vis
- Keisha: Implement a vis

 Week 3: Implementation

- Aaron: Implement a vis
- Brandon: Implement a vis
- Keisha: Implement a vis

 Week 4: Finalize and wrap up

- Aaron: Refactor and finalize visualizations
- Brandon: Refactor and finalize visualizations
- Keisha: Refactor and finalize visualizations
