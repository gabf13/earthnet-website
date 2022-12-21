---
layout: default
---

# Introduction

**Have you ever watched a movie because an actor was starring in it?** Good actors lead to good movies. The star system has started in Hollywood in the 1920s with the goal of exploiting the image of actors to promote movies and generate publicity. The project, based on the movies released in the US, aims at investigating the factors that make an actor successful and the confounders hidden in the process.

### What makes an actor successful?
**Successful actors are able to make a living out of their acting career**, and even if this seems normal for any other job, in the movie industry, **a huge part of the actors' population are 'one-hit wonders'**, actors that starred only once and did not manage to make their career take off. A minority of the actors, instead, detains most of the assigned jobs, **generating a natural power law in actors' movie appearances**. **How do these different categories of actors impact the ratings of the movies they star in? What are the possible confounders playing a role in the mechanism?** At first, the possible confounders are discussed and analyzed in detail, to understand the mechanisms at the basis of actors' job assigment and to have an idea of which factors are to be attributed to the merit of the actor and which ones to external influences. Afterwards, **an observational study is carried out in order to limit the confounders** affecting this system of joining the 'richer' circle and to **verify if such actors positively impact movie ratings**.

    
### Research questions
#### Which are the possible confounders to be tackled in assessing the characteristics of successful actors?
* What defines the success of an actor?
* How are movie ratings and successful actors related between each other?
* How are networks of actors formed and do acting pairs show disparity in their success metrics?

# What is IMDb?
To give a bit of context on the available data and which ones we used to develop our data story, we provide some background about the used dataset. It is worth mentioning that our initial bases was the CMU dataset, that we decided to expand to the **IMDb dataset**, because it makes the study more effective and representative, given the way larger amount of data. The Internet Movie Database (IMDb) is a dataset containing information about movie titles, release dates, actors, ratings etc., founded in 1990 and then transferred to the Web in 1993. **The dataset contains more than 10 million titles from all over the world** and it is often used in research and development projects related to data analysis, machine learning, and natural language processing, as it provides a large and comprehensive set of data that can be used to train and test algorithms. **The focus of the present analysis is the region of the United States**, namely we are considering movies released in the US.

<p align="center">
    <img width="500" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208890026-b873784d-425e-4230-ad7c-0231325bf9f2.png">

Specifically, IMDb is divided into sub-sets of data, each containing different information about the movie industry, and linkable one to the other through predefined ids. The sub-sets we used are: **'title.akas.tsv.gz'** containing movie titles and regions of release, **'name.basics.tsv.gz'** containing the list of actors and the respective movies they starred in, **'title.crew.tsv.gz'** with the names of the directors for each movie, **'title.ratings.tsv.gz'** with the list of movies ratings and number of votes, and **'title.basics.tsv.gz'**, containing the genres of the movies. All the cited datasets were cleaned and merged to extract the features of interest for the analysis.

# Rich-get-Richer Mechanism

In this section we analyze the distributions of significant parameters to assess actor success and we give a possible explanation for such behaviors. It is indeed interesting to qualitatively understand **why actors' success can be influenced by external factors** and not only by the quality of the actors' work.

We observed that the distribution of actors' careers number of movie appearances is strongly skewed. It is interesting to notice that it follows a **power law, given that is linear in the logarithmic domain**. Moreover, the **typical exponential tail** in the semilogarithmic y domain is visually observable.

<p align="center">
    <img width="1000" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208879305-cb497776-4761-412d-90c8-c0cfd9058e5a.png">

To statistically prove that the distribution follows a power law we perform a **Kolmogorov-Smirnov test on the tail of the distribution**. The results are here shown. Given the **p-values larger than 0.05** we cannot reject the null hypothesis that the distribution is exponential.
   
| Dataset   | KS test  | p-value |
| --------- | -------- | ------- |
| Overall   | 0.32     | 0.11    |

An explanation for the **onset of a power law** can be given. Just as normal distributions arise from many independent random decisions averaging out, **power laws can arise from the feedback introduced by correlated decisions across a population** [1]. 
    
**Successful actors keep starring with other successful actors**, making them even more successful and naturally generating a power law in actors' productivity, namely the number of appearances in movies. **Most of the movies are generated by a minority of actors**. Around **20% of the actors make 80% of the movies**. Given the large amount of data considered (IMDb movies in the US region), the dataset can be considered to be **representative for the actors' population** (it involves 66457 actors and 97962 movies after the data cleaning).
    
This mechanism makes it difficult to quantify the impact of actors on movies, because of the **large amount of possible confounders** that influence the probability of an actor joining this 'rich-get-richer' loop. **What are these possible confounders?**
    
<p align="center">
    <img width="400" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208617248-3a234fd8-33de-4a23-ae99-93d394858034.png">
    

[1] D. Easley and J. Kleinberg, Networks, Crowds, and Markets: Reasoning about a Highly Connected World, Cambridge University Press, 2010.

