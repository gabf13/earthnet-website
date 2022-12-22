---
layout: default
---

# Studied Confounders

In order to study the effects of an actor's career average grade on his ability to join the "rich-get-richer" acting loop, we have hypothesized **3 main confounders**: the gender of actor's starring movie, the behind the scenes contributors (such as the director) to a movie and the gender of the actor. 

### The Confounder of Movie Genres

>We can see from the following bar plot the average imdb score per movie genre: that certain genres have higher average movie ratings than others.

<p align="center">
<img width="800" alt="correlation" src="https://user-images.githubusercontent.com/95367976/209044730-35509e21-214c-4aa5-aca8-2e701b795e23.png">


Moreover, we know that genres co-occur with each other, rarely does a movie have a single genre tag. (infact nana percent do). We can further explore these connections in between these genres by plotting the network of co-occurences between genres. How we have proceeded to do so is by creating a bipartite graph between actors and the 28 available genres and projecting it onto the genres. The obtained graph, plotted below is an unweighted undirected
graph of co-occurences between genres, an edge between 2 genres signifies one same actor has starred in both genres therefore making a link between them.

As we can see from the graph, almost every genre is interconnected with every other genre. And from an actor's perspective acting we can see that the actor's in our IMDB dataset cover almost all of the combinations of genres that would connect different genres. This fact coupled with our initial genre-imdb grade disparity motivates Genres as a confounder in our study of an actor's success (proactivity).
    
<p align="center">
<img width="800" alt="correlation" src="[https://user-images.githubusercontent.com/114060781/208997033-07e3cffe-5161-4379-8e02-ed5de6da456a.png](https://user-images.githubusercontent.com/95367976/209044824-743a2912-c058-4e08-834e-2ee5206c2e76.png)">

To further illustrate the following point above we have manually computed the bipartite graph projection in order to obtain a similar graph with weighted edges. These weighted edges also have a minimum weight value thresh hold in order to be added as edges between 2 genres. The way we have manually computed this bipartite project is by computing the different combinations of genre tuples one actor has over the list of all the genres he or she has acted in their career. This new network graph allows us to see not only which genres are interconnected but the strength of those interconnections are. (How frequent do they co-occur in actor careers).

For a weight thresh hold of 50 thousand co-occurences, We obtain the following: 
    
<p align="center">
 <img width="800" alt="correlation" src="[https://user-images.githubusercontent.com/114060781/208997033-07e3cffe-5161-4379-8e02-ed5de6da456a.png](https://user-images.githubusercontent.com/95367976/209044843-c3818f44-cfda-4c12-b550-9f9c2585cb3f.png)">


As we decrease the weight thresh hold for adding edges, we see that there are more interconnections between diverse genres and as we augment this threshhold we see that these interconnections are only pertinent and converge on the Drama genre (highest degree node). 
These network observations on the genre co-occurences could lead one to believe that being in a Drama genre movie is an important covariate & confounder for study of actors. However, we cannot conclude this or the reasoning that getting into drama will be a rich connected hub that will let you branch into different genres but we can see it as the most versatile genre tag movies in our dataset have.

In fact, we have a time order problem, analogous to the homophily vs influence debate on obesity, where, from an actor's point of view, we dont know if getting into Drama lets you branch out to different genres or getting into almost any film genre forces you into drama movies at some point in actor careers.

The following bar plots are from obtained from the networking:

<p align="center">
 <img width="800" alt="correlation" src="[https://user-images.githubusercontent.com/114060781/208997033-07e3cffe-5161-4379-8e02-ed5de6da456a.pn](https://user-images.githubusercontent.com/95367976/209044867-1cef4b91-b475-426b-bbf4-8910b52a08fb.png)">

### The Confounder of Directors

Another confounder we looked at is the director's of a movie, it is no secret that starring in a Quentin Tarantino or Stanley Kubrick movie bodes well for a actor's career IMDB grades. Directors are therefore a driving force and a direct confounder in proving the star system. We can see this from the following plot showing the different IMDB grade averages for every director, sorted by this average:

<p align="center">
 <img width="800" alt="correlation" src="[https://user-images.githubusercontent.com/114060781/208997033-07e3cffe-5161-4379-8e02-ed5de6da456a.png](https://user-images.githubusercontent.com/95367976/209044885-14631c82-f739-445c-a4a5-cb4703529c58.png)">

The data IMDB has provided on directors is quite rich & complex, as part of data exploration & to further understand the director's choice as a confounder, we have built a similar network to our previous genre co-occurences network but this time showing the director's that share similar casts of actors. This has been built by computing the edge list of the bipartite graph between actors & directors and then projecting it onto directors. Once again this is a weighted graph with a weight thresh hold for adding an edge between directors and we have set this threshhold to the average number of actors per cast. We have run this on the top directors sorted by the product of number of movies & highest imdb grades. (which could be quantified as the most active & grade performing directors):

<p align="center">
<img width="800" alt="correlation" src="[https://user-images.githubusercontent.com/114060781/208997033-07e3cffe-5161-4379-8e02-ed5de6da456a.png](https://user-images.githubusercontent.com/95367976/209045071-321dfa17-152b-4229-947b-e4a2f7cc1ce0.png)">

 <p align="center">
 <img width="800" alt="correlation" src="[https://user-images.githubusercontent.com/114060781/208997033-07e3cffe-5161-4379-8e02-ed5de6da456a.png](https://user-images.githubusercontent.com/95367976/209045133-a52bc634-e6c4-45cb-a437-a496be560af7.png)">


> We can see here that there are many directors such as Stanley Kubrick that have relatively (edge size) little to no connections with other directors in terms of shared actors when it comes to this network of directors. Same with Quentin Tarantino. This could be due to different time periods or perhaps an observable phenomenon which is the director-actor relationship and a director's cast retainment rate. 
> We can define such a retainment rate as the as the rate of repeated actors per movie: $$\dfrac{number \: of \: repeated \: actors}{number \: of \: movies}$$

<p align="center">
<img width="800" alt="correlation" src="https://user-images.githubusercontent.com/95367976/209045148-95d60ee7-5e3f-4811-bfce-f55b5abb61de.png">

>Finally, having computed this retainment rate, we can see that this actor director relationship is common practice and is intuitive as you are betting on your good horses by rehiring the same actors. This affinity for a director to reuse the same actors in multiple movies further illustrates how intricitely connected an actor and director's imdb grade sucess may be, it is clear therefore that the directors of the movie an actor is in is a direct confounder in the Star System, where top/star actors impact IMDB grades.

### The Confounder of Gender

Lastly, it is fair to assume that gender can play an important role in actors job assigment. **The percentage of actresses in the dataset is 39%**. From the distribution of the appearances below, and from the bar plots showing the average appearances by gender in relation to their average movie ratings, **there seems to be a systematic difference between genders**, even if their average career movie ratings are similar.

<p align="center">
    <img width="800" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208968368-e153250e-06d7-4b6b-9550-f55f3739f4d1.png">

<p align="center">
    <img width="800" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208997033-07e3cffe-5161-4379-8e02-ed5de6da456a.png">

To verify if the difference is statistically significant, we perform a **Mann-Whitney U test on two distributions** and **we find that they are significantly different**, given the p-values lower than 0.05.
  
|                     | Statistic | p-value |
| ------------------- | --------- | ------- |
| Mann-Whitney U test | 534502483.0 | 0.001   |
