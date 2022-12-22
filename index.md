---
layout: default
---

# The Star System
Data story realized by:

* **Nawar Allabban**
* **Isaac Battles**
* **Gabriele Furlan**
* **Louis-Alexandre Leger**

<a name="intro"></a>
# Introduction

**Have you ever watched a movie because an actor was starring in it?** It is no secret that good actors lead to good movies. This phenomenon is also known as the **star system** and was started in Hollywood in the 1920s with the goal of exploiting the image of actors to promote movies and generate publicity. Our project aims at investigating the factors that make the star system. In other words, investigate the factors that make successful actors impact the ratings of movies by identifying covariates & the confounders hidden in the process and quantfiying their impact on the star system. Firstly, let's define a few things:

### What makes an actor successful?
**Successful actors are able to make a living out of their acting career**, and even if this seems normal for any other job, in the movie industry, **a huge part of the actors' population are 'one-hit wonders'**, actors that have starred only once and did not manage to make their career take off. By extension, we see that a minority of the actors, detains most of the roles & jobs, **generating a natural power law in actors' movie appearances**.
**How do these different categories of actors impact the ratings of the movies they star in? What are the possible confounders playing a role in the mechanism?** For the plan of our project, at first the possible confounders are discussed and analyzed in detail, to understand the mechanisms at the basis of actors' job assigment and to have an idea of which factors are to be attributed to the merit of the actor and which ones to external influences. Afterwards, **an observational study is carried out in order to limit these confounders** from affecting an actor's ability to join the 'richer' circle of actors and to **verify if such actors positively impact movie ratings**. Put simply, how well the star system is verified once the confounders & covariates are limited. Lastly, we discuss the effects of a more complex confounder which has its basis in co-acting and analyze how it affects the star system (the effect that top actors have on the movie ratings).

### Research questions
#### Which are the possible confounders to be tackled in assessing the characteristics of successful actors?
* What defines the success of an actor?
* How are movie ratings and successful actors related between each other?
* How are networks of actors formed and do acting pairs show disparity in their success metrics?
* Are some actor's IMDB grades benefitting from acting with high profile actors?
    
<a name="imdb"></a>
# What is IMDb?
    
To give a bit of context on the available data and which ones we used to develop our data story, we provide some background about the used dataset. It is worth mentioning that our initial bases was the CMU dataset, that we decided to expand to the **IMDb dataset**, because it makes the study more effective and representative, given the way larger amount of data. The Internet Movie Database (IMDb) is a dataset containing information about movie titles, release dates, actors, ratings etc., founded in 1990 and then transferred to the Web in 1993. **The dataset contains more than 10 million titles from all over the world** and it is often used in research and development projects related to data analysis, machine learning, and natural language processing, as it provides a large and comprehensive set of data that can be used to train and test algorithms. **The focus of the present analysis is the region of the United States**, namely we are considering movies released in the US.

<p align="center">
    <img width="500" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208890026-b873784d-425e-4230-ad7c-0231325bf9f2.png">

Specifically, IMDb is divided into sub-sets of data, each containing different information about the movie industry, and linkable one to the other through predefined ids. The sub-sets we used are: **'title.akas.tsv.gz'** containing movie titles and regions of release, **'name.basics.tsv.gz'** containing the list of actors and the respective movies they starred in, **'title.crew.tsv.gz'** with the names of the directors for each movie, **'title.ratings.tsv.gz'** with the list of movies ratings and number of votes, and **'title.basics.tsv.gz'**, containing the genres of the movies. All the cited datasets were cleaned and merged to extract the features of interest for the analysis.

<a name="rgr"></a>
# Rich-get-Richer Mechanism

In this section we analyze the distributions of significant parameters to assess actor success and we give a possible explanation for such behaviors. It is indeed interesting to qualitatively understand **why actors' success can be influenced by external factors** and not only by the quality of the actors' work.

We observed that the distribution of actors' careers number of movie appearances is strongly skewed. It is interesting to notice that it follows a **power law, given that is linear in the logarithmic domain**. Moreover, the **typical exponential tail** in the semilogarithmic y domain is visually observable.

<p align="center">
    <img width="1000" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208879305-cb497776-4761-412d-90c8-c0cfd9058e5a.png">

To statistically prove that the distribution follows a power law we perform a **Kolmogorov-Smirnov test on the tail of the distribution**. The results are here shown. Given the **p-values larger than 0.05** we cannot reject the null hypothesis that the distribution is exponential.
<table style="margin: 0 auto;">

| Dataset   | KS test  | p-value |
| --------- | -------- | ------- |
| Overall   | 0.32     | 0.11    |

An explanation for the **onset of a power law** can be given. Just as normal distributions arise from many independent random decisions averaging out, **power laws can arise from the feedback introduced by correlated decisions across a population** [1]. 
    
**Successful actors keep starring with other successful actors**, making them even more successful and naturally generating a power law in actors' productivity, namely the number of appearances in movies. **Most of the movies are generated by a minority of actors**. Around **20% of the actors make 80% of the movies**. Given the large amount of data considered (IMDb movies in the US region), the dataset can be considered to be **representative for the actors' population** (it involves 66457 actors and 97962 movies after the data cleaning).
    
This mechanism makes it difficult to quantify the impact of actors on movies, because of the **large amount of possible confounders** that influence the probability of an actor joining this 'rich-get-richer' loop. **What are these possible confounders?**
    
<p align="center">
    <img width="400" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208617248-3a234fd8-33de-4a23-ae99-93d394858034.png">
    

[1] D. Easley and J. Kleinberg, Networks, Crowds, and Markets: Reasoning about a Highly Connected World, Cambridge University Press, 2010.

<a name="conf"></a>
# Confounding factors

In order to study the effects of an actor's career average grade on his ability to join the "rich-get-richer" acting loop, we have hypothesized **3 main confounders**: the gender of actor's starring movie, the behind the scenes contributors (such as the director) to a movie and the gender of the actor. 

### Movie Genres bias

>We can see from the following bar plot the average imdb score per movie genre: that certain genres have higher average movie ratings than others.

<p align="center">
<img width="800" alt="correlation" src="https://user-images.githubusercontent.com/95367976/209044730-35509e21-214c-4aa5-aca8-2e701b795e23.png">


Moreover, we know that genres co-occur with each other, **rarely a movie does have a single genre tag**. We can further explore these connections in between these genres by **plotting the network of co-occurences between genres**. How we have proceeded to do so is **by creating a bipartite graph between actors and the 28 available genres and projecting it onto the genres**. The obtained graph, plotted below is an unweighted undirected graph of co-occurences between genres, where an edge between 2 genres signifies that one same actor has starred in both genres and therefore makes a link between them.

As we can see from the graph, **almost every genre is interconnected with every other genre**. And from an actor's perspective we can see that actors in the IMDb dataset cover almost all of the combinations of genres. This fact coupled with our initial genre-IMDb grade disparity **motivates genres as possible confounding factors in the study of actor's success** (productivity).
    
<p align="center">
<img width="800" alt="correlation" src="https://user-images.githubusercontent.com/95367976/209044824-743a2912-c058-4e08-834e-2ee5206c2e76.png">

To further illustrate the following point above, we have manually computed the bipartite graph projection in order to obtain a similar graph with weighted edges. **The displayed edges have a minimum weight value threshold (50 thousand co-occurrences) in order to be added as edges between 2 genres**, since the low weight edges are out of the scope of this plote and would contribute to make the visualization heavier. The way we have manually computed the bipartite projection is by computing the different combinations of genre tuples that one actor has over the list of all the genres he/she has acted in their career. **This new network graph allows us to see not only which genres are interconnected but what the strength of those interconnections is** (how frequent they do co-occur in actor careers).

For a weight threshold of 50 thousand co-occurences, we obtain the following: 
    
<p align="center">
 <img width="800" alt="correlation" src="https://user-images.githubusercontent.com/95367976/209044843-c3818f44-cfda-4c12-b550-9f9c2585cb3f.png">


As we decrease the weight threshold for adding edges, **we see that there are more interconnections between diverse genres** and as we augment this threshhold we see that these interconnections are only pertinent and converge on the **Drama genre** (highest degree node). 
These network observations on the genre co-occurences could lead one to believe that being in a Drama genre movie is an important covariate and confounder for the study of actors. However, **we cannot conclude this or the reasoning that getting into drama will be a rich connected hub** that will let you branch into different genres but **we can see it as the most versatile genre tag in movies** that our dataset has.

In fact, we have a time order problem, **analogous to the homophily vs influence debate on obesity**, where, from an actor's point of view, it is not clear if getting into Drama will allow him to explore different genres or getting into almost any film genre will force him into drama movies at some point in his career.

The following bar plots are from obtained from the networking:

<p align="center">
 <img width="700" alt="correlation" src="https://user-images.githubusercontent.com/95367976/209044867-1cef4b91-b475-426b-bbf4-8910b52a08fb.png">

### Directors preferences

Another factor we looked at is the director's of a movie, it is no secret that starring in a Quentin Tarantino or Stanley Kubrick movie bodes well for an actor's career IMDb grades. **Directors are therefore a driving force and a direct confounder in proving the star system**. We can see this from the following plot showing the different IMDb grade averages for every director, sorted by this average:

<p align="center">
 <img width="500" alt="correlation" src="https://user-images.githubusercontent.com/95367976/209044885-14631c82-f739-445c-a4a5-cb4703529c58.png">

The data IMDb has provided on directors is quite rich and complex, to further understand the director's choice of actors as a confounder, **we have built a network similar to our previous genre co-occurences network**. However, this time around it is showing the directors that share similar casts of actors. This has been built by computing the edge list of the bipartite graph between actors and directors, and then projecting it onto directors. Once again this is a weighted graph with a weight threshold for adding an edge between directors and this threshold has been set to 3 shared actors for visualization purposes. Because of the large number of directors in the dataset, **we have run this on an arbitrary list of the top 25 directors sorted by the product of their number of movies and highest IMDb grades** (which could be quantified as the most active and grade performing directors):

<p align="center">
<img width="800" alt="correlation" src="https://user-images.githubusercontent.com/95367976/209045071-321dfa17-152b-4229-947b-e4a2f7cc1ce0.png">

<p align="center">
<img width="700" alt="correlation" src="https://user-images.githubusercontent.com/95367976/209045133-a52bc634-e6c4-45cb-a437-a496be560af7.png">


> We can see here that there are many directors such as Stanley Kubrick that have relatively (edge size) little to no connections with other directors in terms of shared actors. Same with Quentin Tarantino. **This could be due to different time periods of movie production** or perhaps an observable phenomenon which is the director-actor relationship that develops and a director's likelihood to hire the same actors. 
> The latter can be defined as the **retainment rate (RR)** of directors, which is the ratio between repeated actors and the number of movies:

<p align="center">
<img width="446" alt="RRlatex" src="https://user-images.githubusercontent.com/95367976/209060805-172671ee-a856-4a3a-ad46-0be43f9fa7f0.png">
    

<img width="600" alt="correlation" src="https://user-images.githubusercontent.com/95367976/209045148-95d60ee7-5e3f-4811-bfce-f55b5abb61de.png">

> Finally, having computed the retainment rate, **we can see that this actor director relationship is common practice** (64% of directors with more than 1 movie). This affinity for a director to re-hire the same actors in multiple movies further illustrates how intricately connected an actor and his director's IMDb grade sucess may be. It is clear, therefore, that **the directors of the movie an actor stars in can be a direct confounder in the Star System**, where top/star actors impact IMDB ratings.

### Gender inequalities

Lastly, it is also fair to assume that gender can play an important role in actors job assigment. **The percentage of actresses in the dataset is 39%**. From the distribution of the appearances below, and from the bar plots showing the average appearances by gender in relation to their average movie ratings, **there seems to be a systematic difference between genders**, even if their average career movie ratings are similar.

<p align="center">
    <img width="800" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208968368-e153250e-06d7-4b6b-9550-f55f3739f4d1.png">

<p align="center">
    <img width="800" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208997033-07e3cffe-5161-4379-8e02-ed5de6da456a.png">

To verify if the difference is statistically significant, we perform a **Mann-Whitney U test on two distributions** and **we find that they are significantly different**, given the p-values lower than 0.05.
  
|                     | Statistic | p-value |
| ------------------- | --------- | ------- |
| Mann-Whitney U test | 534502483 | 0.001   |

<a name="obs"></a>    
# Observational Study

Now that we have qualitatively analyzed what we believe are the main confounding factors in actors role assigment, we want to understand the merit of an actor in being in the rich-get-richer circle and its impact on the movie rating. Therefore we carry out an observational study to **limit the effect of the confounders**. Actors are matched through **propensity score matching**, namely their probability of being part of the treatment group, based on observed covariates. **The treatment group is defined as the most successful actors, while the control group by the rest of the actors' population**.

According to the **Pareto principle**, the **threshold between the number of appearances that dominate and the long tail of the power law distribution is defined by the 80/20 rule**. Basically, 20% of the people detain the most number of appearances. Given that the appearances follow a power law, the splitting of the dataset into treatment and control will be carried out based on the 80th percentile of the distribution, which is more representative than the mean or the median when considering skewed distributions.

The 80th percentile is equal to **8 career appearances**.

<p align="center">
    <img width="1000" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208967865-0c3cbf49-88c2-46d0-afe0-bdfe733acf18.png">

**Multiple factors can influence the job assigment in the movie industry**. The following observed covariates are taken into account for the observational study and for the matching process. This is done to only consider actors with similar propensity scores:

- **Gender**;
- **Main genre**, defined as the genre that an actor plays in the most. The affinity of actors towards specific genres may affect their probability of getting successful (e.g., affinity of Adam Sandler with Comedy movies);
- **Director**, defined as the director who directs most of the actor's movies. Directors tend to have preferences towards specific actors and hire them again for roles in their movies (e.g., Quentin Tarantino with Brad Pitt or Samuel L. Jackson).
    
*Birth year* is not considered in the confounders because it is highly correlated with appearances.

To further balance the dataset, a **perfect matching is done on gender**. An example of the resulting propensity scores is displayed below.

| actor            | propensity_score |
|------------------|------------------|
| Fred_Astaire     | 0.920518         |
| Lauren_Bacall    | 0.400036         |
| Brigitte_Bardot  | 0.693610         |
| John_Belushi     | 0.476343         |
| Ingrid_Bergman   | 0.746998         |

The resulting coefficients of the logistic regression are associated with each director and genre, given that they were used as features for the extraction of the propensity scores. This values indicate the **log odds ratio of such genre or director of being in the treatment group**. It is visible how movie genres can positively or negatively affect such odds. In this case, **Drama** has the maximum positive influence, while **Documentary** has the maximum negative influence.
    

<p align="center">
    <img width="600" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208549582-dbf1d87f-830a-46ab-adf6-e3749cc9f682.png">

Given the extremely large number of directors, a **kernel density estimate (KDE) plot is more interesting to have a sense of the coefficients distribution**, coupled with their median. It is shown how the median of the log odds is lower than zero, meaning that the majority of the directors negatively influence the log odds ratio of being part of the treatment group.

<p align="center">
    <img width="600" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208999329-e916ecf9-d424-430e-a62d-3500b51e9bd6.png">

After the propensity matching, the balanced dataset contains **20688 actors** of movies in the US region.

## Analysis on balanced dataset

We study the parameters used for the matching on the balanced dataset, in order to **understand how the matching process has affected the characteristics of the subjects in the study**. This can help to **identify any potential biases or limitations of the matching process**, and can inform the interpretation of the results of the study.

We examine the **distribution of the confounding variables in the matched sample**, to see if the matching process has successfully balanced the groups on these variables. We also want to **compare the matched sample to the original, unbalanced sample**, to see how the matching process has affected the sample size and the distribution of the variables of interest.

### How do the genders compare?
**The gender bias seems to play a systematic role in the assigment of movies to actors** in the IMDb dataset for the US region, because of the difference in movie appearances, visible from the bar plots (with 95% confidence intervals). 
    
The label *is_post* in the legend indicates if the data refer to the dataset post treatment or not.

<p align="center">
    <img width="1000" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208849364-4650fbc0-d38d-4fff-843f-d2f97f5034ee.png">

By performing once again a **Mann-Whitney U test**, it is possible to compare the gender distributions before and after the matching, it is observed that the distributions pass from being significantly different to being non significantly different, given the changes in p-values. This means that **the dataset is now balanced in terms of gender**.
    
| Parameter |        | MWU test  | p-value      |
|-----------|------------|--------------|------------|
| Appearances | Pre-matching |534502483 | 0.00103992  |
|            | Post-matching | 50831142.5 | 0.345691401 |

It is worth mentioning that the percentage of actresses in the original dataset and in the balanced one are almost the same, **39% and 38%** respectively, making it a meaningful comparison in terms of proportions.
    
A **linear regression** is implemented to further verify the non-statistical significance of the gender difference. The p-values are larger than 0.05.
    
<p align="center">
    <img width="650" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208533470-4dcac31e-f196-460f-ab77-0f0575b8da2c.png">
      
### What about the genres?
It is also interesting to show the **difference between genres and appearances before and after the matching process** and **how they are distributed in the balanced dataset**. As visible from the bar plots, **in the original dataset there is a large gap in average appearances between the different genres**. However, **in the balanced dataset the gap is significantly reduced** and the total number of genres decreased, together with the standard deviation of each genre. The overall variance pre- and post-matching is **6.07 and 2.03**, respectively.

<p align="center">
    <img width="1000" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208628990-6aaee2f6-7af7-46fd-9965-db89c2fce705.png">

To clarify, the Animation genre refers to movies where actors give their voice to characters, while the Music genre refers to movies about music or musicians (e.g., The Bohemian Rapsody).

### And the directors?

The **KDE plots below show that the matching thinnered the weight of the directors in the appearances**. There seems to be still a few directors that are more present than the others in the matched sample.

<p align="center">
    <img width="500" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208878420-e088c3bd-e3ce-4a33-9a0c-56f2a2339944.png">

## Actors' impact on ratings
    
After having assessed the **validity of the matching process on the observed covariates**, we proceed to explore the **influence of being part of the rich-get-richer group (treatment) on the average movie ratings in actors' careers**.

**A linear regression shows a positive significant impact of coming from the treatment group on the average movie ratings**, both before and after the matching process. However, **its influence is way lower in the balanced dataset**. Indeed, **being part of the successful actors increases the average ratings by only 0.087**, **compared to the 0.322 of before (73% less)**. It is true that successful actors influence the average movie ratings, but in a quantitatively lower amount, as shown from the conducted analysis. It must be clarified that **the goal is to identify patterns or trends in the correlations between variables, and not the exact values**, given the possible limitations of our study. Therefore, **a linear regression suffices to accomplish this**, even if the considered relationship is not strongly linear.

| Parameter                   |               | Coefficient | p-value | Confidence intervals |
| --------------------------- | ------------- | ----------- | ------- | -------------------- |
| Intercept (average ratings) | Pre-matching  | 2.241       | 0       | \[2.233,2.248\]      |
|                             | Post-matching | 2.401       | 0       | \[2.385,2.417\]      |
| Treatment                   | Pre-matching  | 0.322       | 0       | \[0.305,0.340\]      |
|                             | Post-matching | 0.087       | 0       | \[0.062,0.112\]      |
    
From the KDE plots below, it visible how the **densities of the average ratings get closer in the matched sample**, with an increase in the overlap between the two areas below the curves.
    
<p align="center">
    <img width="800" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208878489-ec58545a-1a2b-4444-b883-90c13dec9155.png">


# But wait a second!!!

<p align="center">
    <img width="300" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208680400-9910ea33-ccf9-45a1-bb9c-daaa19a6066e.png">
    
The characterization of actors' impact on movie ratings was based on the **average ratings along their career**. This means that an **entire cast of actors in a movie benefits from the same rating**. The Star System indicates that the movies' success is linked to the 'stardom' of the actors involved. This implies that some actors may benefit from co-acting with other more successful actors, increasing the career movie rating averages without being extremely impactful**.
   
* First of all, **this possible confounder is limited by the fact that we defined as successful actors the ones with a high productivity, and NOT with high movie ratings**, and we proved the significant positive correlation between the treatment group (high productivity) and the movie ratings. Therefore, **even if some 'one-hit wonder' actors have very high average movie ratings, this is not the general trend of the dataset**.
    
* The ratings are normalized on the number of given votes by IMDb users (the larger the number of votes, the higher the weight on the movie rating). This contributes to decrease the average ratings of niche actors who starred in unknown movies or less voted ones.

* Moreover, the **IMDb dataset of the US region is sufficiently large**. Indeed, even if an actor with high number of appearances raised his average ratings at the expenses of other actors in one movie, the **large amount of present data points contributes to perform a correction over his/her career**.
    
* To investigate the limitations of this approach, the following section aims to highlight co-acting trends (how often actors star together with other actors) with the goal of identifying the **'piggybacking'** ones.

<a name="pb"></a>  
# Piggybacking actors

### In the control group
We would like to **observe trends in the amount of actors which career average rating is increased by other more successful actors who co-starred with them**. This can give us an idea of the limitations of the study and the assumptions taken.
    
**We first focus on the control group**, and we try to understand **how many of these actors have an impactful rating because they co-starred with other successful actors (high appearances)**. To do this, we compute the number of movies where each actor from the control group starred with at least one actor from the treatment group, and we define a **piggybacking percentage (PP)**:

<p align="center">
    <img width="300" alt="correlation" src="https://user-images.githubusercontent.com/114060781/209059962-da403a2f-122d-40d2-8e2e-f5e81f1e9b50.png">

As a reminder, this is based on the assumption that successful actors are actors who manage to join the rich-get-richer circle and keep starring.
    
It is interesting to see that **the percentage of control actors who starred at least once with treatment actors is 88%**. Therefore, **most of the less successful actors seems to raise their rating impact because of others actors' success**. Meanwhile, **the percentage of control actors who only starred with treatment actors during their career is 49%**. To check if these 'piggybacking actors' have a statistically significant difference in career ratings with the 'non-piggybacking' ones, **we perform a Mann-Whitney U test on the two distributions**.

The results show that **the difference is indeed significant**.
    
|                     | Statistic | p-value |
| ------------------- | --------- | ------- |
| Mann-Whitney U test | 8115381 | 0  |

### In the treatment group
**Looking at potential 'piggybackers' in the treatment part of the balanced dataset could also be of interest**. To do this, an **actor-movie bipartite network was constructed and projected onto the actors**. Each actor was then assigned a pair, based on who they are the most connected to (in terms of appearances). This led to **4069 actor pairs**. Within these pairs, we computed their **average career grade in the movies where they did NOT act together**. This is defined as their solo career average rating.
    
Further analysis was done by performing a Mann-Whitney U statistical test **between the distributions of the solo career ratings of the actors, within the pair**, to verify if there is a statistically significant difference. Given that we are performing multiple hypothesis testing, the **significance threshold is adjusted using the Bonferroni correction**:
    
<p align="center">
    <img width="100" alt="correlation" src = "https://user-images.githubusercontent.com/114060781/209107180-23e2e997-91dd-4671-9a17-da3307218a49.png">
    
with *alpha_c* being the corrected threshold, and *N* the number of simultaneously conducted tests.

**Pairs with resulting p-value lower than a significance level can be assumed to contain someone who is 'piggybacking'**, since the null hypothesis that they share the same distribution is rejected. The 'piggybacker' would then be named the actor with the lower solo average rating. **This leads to the identification of 93 piggybackers, corresponding to 1.16% of the treatment group**. The following **Manhattan plot** provides a visualization of the pairs and the differences in their solo career ratings. The y axis shows the negative log of the p-values; **the data points above the significance level are the supposed pairs with 'piggybacking' actors**.
    
<p align="center">
    <img width="1000" alt="correlation" src = "https://user-images.githubusercontent.com/95367976/209082989-4ef0ddf3-1837-4e03-a36f-b12cf7fb7098.png">

<a name="conclusion"></a> 
# Conclusion

In this study, we focused on assessing what are the potential confounders related with actors success and their impact on movie ratings. After having qualitatively defined the rich-get-richer mechanism and having explored the significant actors' observed covariates, possible confounders are identified and discussed. This lead to an observational study aiming to identify patterns and trends in actors' job assignment. The results show that gender, directors and genres 'help' successful actors impact the ratings of a movie. This is assessed due to the decrease in correlation from the original dataset to the balanced dataset. Indeed, we have performed a propensity score matching that limits previously mentioned covariates and concluded that the influence of being part of the successful circle of actors (coming from the defined treatment group) and IMDb ratings is reduced when the influence of the confounders is limited. Basically, a less pronounced Star System is observed when after performing the matching. 
    
Eventually, to further assess the potential limitations of our analysis, we developed a strategy to address the confounder of actors impact on movies being boosted by other more successful actors. This phenomenon, that we have dubbed as "Piggybacking", we aimed to quantify the the amount of such actors in the overall population of actors. Between less successful actors, the percentage of piggybacking actors ranges between 49% and 88%, depending on the entity of the boost that they receive, while for more successful actors (treatment), the percentage proved to be extremely low and equal to 1.16%.
    
##Outlook and future directions
Given the possible limitations of the study, and the impossibility to actually account for all the unobserved covariates, the authors advice for further investigation and refinement of the methodology used. Specifically:
    - increasing the number of features used for the propensity score matching could improve the quality of the matching;
    - estending the study to the overall population of actors, instead of the US movie region, could lead to more precise and significant results;
    - a deeper analysis on the threshold for the split between successful and less-successful actors can help better quantify the entity of the piggybacking actors;
    - other methods, other than linear regression, could be investigated to strenghten the validity of the obtain results, especially when investigating correlations between variables that are is a nonlinear relationship between each other, or that would allow to include other features, such as birthdate and deal with possible multicollinearity.
