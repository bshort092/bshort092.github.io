Keisha Gates    keisha.gates@aggiemail.usu.edu   A02071489

Aaron Lafitte                    aaronjlafitte@gmail.com   A01852530

Brandon Short                    bshort092@gmail.com   A02193680

_Project Repository:_ https://github.com/KeishaGates/DataVisFinalProj

**What Movies Were They In?**

**1.** _Overview and Motivation._

We chose to show visualizations with movie data because we all enjoy movies and wanted to expand on the data to see things like how actors are connected through the movies they have performed in. Since we all watch a lot of movies, we wanted our visualization to show connections and relationships among actors, movies, revenue, reviews, etc, so that we could get an idea of what other movies might be interesting to us based on the movies we have seen. This visualization could help us understand how movies obtain their success.

**2.** _Related Work._
*Anything that inspired you, such as a paper, a web site, visualizations we discussed in class, etc.*

We went over a Les Miserables example in class that showed a node-link diagram connecting each character to one another. We liked the initial idea of being able to show connections between two data points and this seemed like a great fit for some movie data sets that we were also looking at. After some discussion, we thought it would be interesting to take this example one step further and filter down between two actors using a node-link diagram.
<img src="https://cdn.discordapp.com/attachments/638494334785683467/647623888997449738/unknown.png" alt="alt text" width="400">

**3.** _Questions._
*What questions are you trying to answer? How did these questions evolve over the course of the project? What new questions did you consider in the course of your analysis?*

Primary Questions:
- What genres/movies has a specified actor been invovled with?
- What connections exist between actors?
- What were the revenues of movies an actor was involved with?
- What recommendations can we get from finding these connections?
- Are there patterns between actors and genres?
- Can we also do this node-link diagram for directors?
- How hard would it be to show 3 actors in a diagram like this and would it be readable?
- What are some ways that we can clean the node-link diagram to make it easier to understand?

How These Questions evolved

Our questions are now focused mainly around the actor specified by the user. We want to answer questions relating to the work an actor has done, its related movies' information, and the relationship between an actor and the movie's success (budget vs revenue). We eventually want to add directors as well to learn similar information. With this information, a user can search for their favorite actor/director, and discover the movies they have been involved in based on their history in a node link diagram.

New Questions to consider:

- What is the relationship between two actors with respect to the movies each were in and each movie's revenue?
- Whats the longest path we can find between two actors?
- Is there an algorithm for giving recommendations to users based off the connections between actors?
- How would the diagram change if we started at looking at connections between actors and directors rather than actors and actors?
- What are some ways that we can make the node-link diagram easier to read and understand?
- Whats the best way to connect all of our visuals together?

**4.** _Data._
*Source, scraping method, cleanup, etc.*

~~Data is obtained from IMDB through Kaggle at: https://www.kaggle.com/rounakbanik/the-movies-dataset#movies\_metadata.csv~~

**5.** _Exploratory Data Analysis._
*What visualizations did you use to initially look at your data? What insights did you gain? How did these insights inform your design?*

Visualizations used to look at data:

Insights gained:

How insights inform the design:

By combining the dataset from its original layout in separate csv's into a single array of objects allowed us to grab the information we needed for any visualization in a direct way.

~~The original dataset is 900 MB with several columns that don&#39;t play a role in our visualization, therefore, we will need to remove unused columns. The rest of the data will be used in the visualization through filtering and aggregation. We will initially load the csv file into javascript objects that we will filter based on the user&#39;s settings.~~

**6.** _Design evolution._
*What are the different visualizations you considered? Justify the design decisions you made using the perceptual and design principles you learned in the course. Did you deviate from your proposal?*

Visualizations considered:

- line chart
- bar chart
- search bar
- node-link diagram
- bar chart
- brushing years

Justification of design decisions (using perceptual and design principles learned from class):

Our main visualisations will be a node-link diagram showing the connections between actors, genres, and movies, but it will also show a path between two individuals using connection. Node-Link diagram is a great way to display connection because of the nature of the data structure. We will be color coding several aspects of the diagram:
- Actor 1 will be a red circular node
- Actor 2 will be a blue circular node
- Geres will be a teal color node and we are dabbling with the idea of making it a seperate shape to encode that it is itself a different category relative to actors and genres. 
- Movies are currently a green node and we are also dabbling with the idea of making these a different shape as well. This would be redundant encoding, but it would definitely get the point across. 
- We plan on having a glowing highlighted path between the actors connecting the link lines, genres, and movies.

Deviations from proposal:

Our focus definitely shifted off of the information that is associated directly to movies (revenue, budget, etc) and more to the connections between the people behind the movies. We want to not only be able to see the connections, but the underlying information that's found in the connection, such as an algorithm for recommending movies based off actor/director preference or difference in growth between actors that were in the same movie. 


**7.** _Implementation_
*Describe the intent and functionality of the interactive visualizations you implemented. Provide clear and well-referenced images showing the key design and interaction elements.*


- Search bar

Due to the nature of our data, having a search bar is a necessity. We wanted to be able to query any actor or director and have list of recommended results populate underneath the search (because names are hard to spell). We parsed our data and scraped all names and ids so that we can have a slimmed down data structure for looking up these names. We also wanted to have a search bar that would instantly update every time you typed anything new into it, so that you wouldn't need to completely spell out names to find who you are looking for. After a name is selected, there is small highlighted box with their name and the option to remove them afterward. Also when the name is selected, that information is passed into the node-link diagram to draw the connections and gather the remaining data.
<img src="https://cdn.discordapp.com/attachments/638494334785683467/647635485598154753/unknown.png" alt="alt text" width="500">


- Node-link diagrams

The node-link diagram is meant to show the user the movies and genres from a specified actor's history. After the user has searched and seleted an actor, that actor will be placed in the center node of the force directed node-link diagram. From the actor's node will be nodes of each genre of movie the actor performed in. From the genre nodes, movie nodes will be made that can link to more than one genre. If the user hovers the mouse over the actor, the actor node and its connecting genre nodes will be on the only highlighted nodes. Similarly if a genre node is highlighted, the connecting actor and the movies it pertains to will be highlighted. When a movie is hovered over, the movie itself and it's corresponding genres will be highlighted. The following images demonstrate this interactivity of the node-link diagram with the actor Tom Hanks, Genre Family, and Movie Toy Story 2.


Node-Link Diagram            |  Hover Over Actor Node
:-------------------------:|:-------------------------:
<img src="https://cdn.discordapp.com/attachments/638494334785683467/647502081665531914/Screen_Shot_2019-11-21_at_8.23.04_PM.png" alt="alt text" width="300"> | <img src="https://cdn.discordapp.com/attachments/638494334785683467/647502085348392961/Screen_Shot_2019-11-21_at_8.23.17_PM.png" alt="alt text" width="300"> 

Hover Over Genre Node           |  Hover Over Movie Node
:-------------------------:|:-------------------------:
<img src="https://cdn.discordapp.com/attachments/638494334785683467/647502103245488138/Screen_Shot_2019-11-21_at_8.23.53_PM.png" alt="alt text" width="300"> | <img src="https://cdn.discordapp.com/attachments/638494334785683467/647502092537298984/Screen_Shot_2019-11-21_at_8.23.31_PM.png" alt="alt text" width="300">

Additionally, the user can drag the nodes around, but once user releases their hold on the node, it will reshape back to a shortest path among nodes for each link. This way, the links will always be fixing themselves to have the shortest length possible for the lines between each set of nodes.

- List

Additional information is provided in a list format about a specific movie in an actor's history. Located within the node-link diagram, a user can select the movie in question and the movie list will update to the right of the screen. Information like the title, tagline, overview, revenue, budget, genres, and cast is provided. While looking through the cast list of the selected movie, if the user wants to find the acting history of a different actor, they can select the actor from the list and this will populate the node-link diagram with the new actor as the middle node. The following image displays a continuation of the node-link diagram's example for choosing Toy Story 2 under the Family genre under the actor Tom Hanks, where the user's cursor is hovering over the actor Tom Hanks in the cast list.

<img src="https://cdn.discordapp.com/attachments/638494334785683467/647502106349273088/Screen_Shot_2019-11-22_at_12.03.01_AM.png" alt="alt text" width="500">


- Line charts



- Bar charts




**8.** _Evaluation._
*What did you learn about the data by using your visualizations? How did you answer your questions? How well does your visualization work, and how could you further improve it?*

What we learned:

We learned that it was really useful to combine the separated dataset into one array of objects because it allowed us to easily access the information we needed for all the visualizations created thusfar. 

How we answered our questions:

We were able to answer the question of what genres and movies were included in a specific actor's history by using the node-link diagram. We were able to see connections to other actors by recreating the node-link diagram from the original actor to the actor's other cast member after the new actor selection was made from the movie info list.

Status of current visualization:

Core elements were prototyped with working functionality.

Improvements:

Be able to incorporate searching for a director or actor with director option acting as the same as the actor option. Update the search to include one or two actors to find the complete history of one actor or to see the correlation between two actors. Implement different types of line charts for the specified actor relating to their movie's revenue, budget, scoring, etc.
