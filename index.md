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

