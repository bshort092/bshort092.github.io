Keisha Gates    keisha.gates@aggiemail.usu.edu   A02071489

Aaron Lafitte                    aaronjlafitte@gmail.com   A01852530

Brandon Short                    bshort092@gmail.com   A02193680

_Project Repository:_ https://github.com/KeishaGates/DataVisFinalProj

**What Movies Were They In?**

**1.** _Overview and Motivation._

We chose to show visualizations with movie data because we all enjoy movies and wanted to expand on the data to see things like how actors are connected through the movies they have performed in. Since we all watch a lot of movies, we wanted our visualization to show connections and relationships among actors, movies, revenue, reviews, etc, so that we could get an idea of what other movies might be interesting to us based on the movies we have seen. This visualization could help us understand how movies obtain their success.

**2.** _Related Work._
*Anything that inspired you, such as a paper, a web site, visualizations we discussed in class, etc.*

**3.** _Questions._
*What questions are you trying to answer? How did these questions evolve over the course of the project? What new questions did you consider in the course of your analysis?*

Primary Questions:

*The following questions need to be updated* 

- What genres/movies has a specified actor been invovled with?
- What connections exist between actors?
- Do the critic reviews relate to the amount of revenue a movie makes?
- What were the revenues of movies an actor was involved with?
- What year made the most movies?
- In each year which movie made the most revenue?
- Is there a relationship between budget and revenue?
- Is there a relationship between budget and critic reviews?
- Which year made the most movies of a specified genre?
- Does the runtime relate to anything (budget/revenue/score)?
- Does the release date affect the success of a movie?

How These Questions evolved

Our questions are now focused mainly around the actor specified by the user. We want to answer questions relating to the work an actor has done, its related movies' information, and the relationship between an actor and the movie's success (budget vs revenue). We eventually want to add directors as well to learn similar information. With this information, a user can search for their favorite actor/director, and discover the movies they have been involved in based on their history in a node link diagram.

New Questions to consider:

-

**4.** _Data._
*Source, scraping method, cleanup, etc.*

~~Data is obtained from IMDB through Kaggle at: https://www.kaggle.com/rounakbanik/the-movies-dataset#movies\_metadata.csv~~

**5.** _Exploratory Data Analysis._
*What visualizations did you use to initially look at your data? What insights did you gain? How did these insights inform your design?*

Visualizations used to look at data:

Insights gained:

How insights inform the design:

~~The original dataset is 900 MB with several columns that don&#39;t play a role in our visualization, therefore, we will need to remove unused columns. The rest of the data will be used in the visualization through filtering and aggregation. We will initially load the csv file into javascript objects that we will filter based on the user&#39;s settings.~~

**6.** _Design evolution._
*What are the different visualizations you considered? Justify the design decisions you made using the perceptual and design principles you learned in the course. Did you deviate from your proposal?*

Visualizations considered:

Justification of design decisions (using perceptual and design principles learned from class):

Deviations from proposal:


**7.** _Implementation_
*Describe the intent and functionality of the interactive visualizations you implemented. Provide clear and well-referenced images showing the key design and interaction elements.*

- Interactivity
- Search bar
- Filtering based on actor
- Node-link diagrams
- Line charts
- Bar charts


**8.** _Evaluation._
*What did you learn about the data by using your visualizations? How did you answer your questions? How well does your visualization work, and how could you further improve it?*

What we learned:

How we answered our questions:

Status of current visualization:

Improvements:
