---
layout: default
---

# The Star System


## Authors:
Nawar Allabban, Isaac Battles, Gabriele Furlan, Louis-Alexandre Leger

## Abstract:

Successful actors are able to make a living out of their acting career, and even if this seems normal for any other job, in the movie industry, a huge part of the actors' population are 'one-hit wonders', actors that starred only once and did not manage to make their career take off. A minority of actors, instead, detains most of the assigned jobs,and this generates a natural power law in actors' movie appearances. The goal of the data story is to show the path we have covered to get a sense of the confounding factors in movie job assignment and in what proportion successful actors impact the movie ratings.

## Research questions
### Which are the possible confounders to be tackled in assessing the characteristics of successful actors?
* What defines the success of an actor?
* How are movie ratings and successful actors related between each other?
* How are networks of actors formed and do acting pairs show disparity in their success metrics?

## Additional Datasets:
1. [IMDb dataset](https://datasets.imdbws.com/): dataset with IMDb movie ratings as an additional metric for the measurement of movie success. We use:
    -  'name.basics.tsv.gz' to get the list of actors and movies they starred in;
    -  'title.basics.tsv' to get the genres associated to each movie;
    -  'title.ratings.tsv' to obtain the ratings and the number of votes for each movie;
    -  'title.akas.tsv.gz' to extract the regions associated with each movie;
    -  'title.crew.tsv.gz' to get the names of the directors and their respective movies.

## Methods:

1. **Data pre-processing:**
This part consisted in the clean up and merging of the data sets mentioned above into a single working dataframe for the analysis. This is particularly relevant due to the large amount of NaN values in the movie metadata and character metadata files of the CMU database, and to reduce the size of the massive IMDb database and make it suited to our interests and scopes. The output csv files FILE NAMES contain FILE CONTENT

2. **Data exploration and evaluation of interesting trends:**
The available data are explored to identify patterns, trends, and relationships in the data, and to understand the overall structure and distribution of the data. Specifically, we used methods such as:

- Descriptive statistics: calculating basic statistics (e.g., median, mean, quantiles variance) to get a sense of the size and spread of the data;
- Visualization: plots that can help identify trends (e.g., histograms, bar plots, scatter plots);
- Data transformation: scaling, aggregation or filtering.

<p align="center">
    <img width="800" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208996972-f1f62b9c-f3d2-454c-bb6b-c406f7052bb4.png">

3. **Analysis and identification of possible confounding factors:**
In movie job assignment there could possibly be many confounders that influence the probability of actors to become successful and to better impact the movie ratings. This section is dedicated to higlight what we believe are the main confounders and discuss how they may affect the success of an actor. The main influencing factors considered are:
- **Actors gender**, due to possible disparities and biases in the job assignment;
- **Movie genres**, due to the affinity of actors for specific genres (have you ever tought about Adam Sandler being perfectly suited for comedy or Anthony Hopkins to play the role of a villain?);
- **Movie directors**, due to directors' preferences for specific actors (e.g., Quentin Tarantino for Brad Pitt or Samuel L. Jackson).

4. **Observational study:**
An observational study is conducted to try to quantify the effect that such confounders have on actors becoming successful and joining the 'rich-get-richer' circle, and on the impact that these actors have on the movie ratings. Propensity score matching is used to generate a balanced dataset (with perfect match on gender) of actors, where the treatment group are 'successful actors', namely the ones who star the most and are part of the circle. An analysis on the quality of the matching is performed, to understand how the matching process has affected the characteristics of the subjects in the study. This helps identifying the limitations of the study.

<p align="center">
    <img width="800" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208999090-1d7485d2-9904-4f97-af5c-bb05d386575e.png">

5. **Piggybacking actors:**
Going a step further with the study, we aim to tackle the fact that actors in the same movie cast benefit from the same movie ratings, even if they are less impactful in the movie. To do this, we compare career average ratings of casts of actors aiming to identify if one is 'piggybacking' on the other.

## Timeline
**Week 9:** Submission of milestone 2 and finishing the preliminary analysis of the data along with tests of the methods mentioned above on a small sample from the databases;

**Week 10:** Expansion of the analysis to the complete dataset of actors;

**Week 11:** Discuss the main counfounders in actors job assignment and start building up the observational study;

**Week 12:** Conduct the observational study and start a draft of the data story;

**Week 13:** Analyze the results of the investigation and argue about its possible limits;

**Week 14:** Carry out 'piggybacking' actors study, refine data story and submit it.

## Organization Within the Team:
The tasks of the project were mainly divided as shown below.
     
| Team Member | Task |
| --- | ----------- |
| Nawar Allabban | Analysis on co-acting and 'piggybacking' actors |
| Isaac Battles | Data cleaning and pre-processing, Building the website |
| Gabriele Furlan | Observational study, Impact regression |
| Louis-Alexandre Leger | Detailed analysis of confounding factors in actors job assignment |
    
    
Acknowledgment to our tutor Martin Josifoski for the precious advice.
