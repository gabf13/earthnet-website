---
layout: default
---

# Observational Study
Now that we have quantified what we believe are the main confounding factors in actors job assigment, we want to understand the merit of an actor in joining the rich-get-richer circle and its impact on the movie rating, therefore we carry out an observational study to **limit the effect of the confounders**. Actors are matched through **propensity score matching**, namely their probability of being part of the treatment group, based on observed covariates. The treatment group is defined by the most successful actors, while the control group by the rest of the actors' population.

According to the **Pareto principle**, the **threshold between the number of appearances that dominate and the long tail of the power law distribution is defined by the 80/20 rule**. Basically, 20% of the people detain the most number of appearances. Therefore, the splitting of the dataset will be carried out based on the 80th percentile of the distribution, more representative than the mean or the median when considering skewed distributions.

The 80th percentile is identified with **8 career appearances**.

<p align="center">
    <img width="1000" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208967865-0c3cbf49-88c2-46d0-afe0-bdfe733acf18.png">

**Multiple factors can influence the job assigment in the movie industry**. The following observed covariates are taken into account for the observational study and for the matching process targeted to only consider the actors with similar propensity scores:

- **Gender**;
- **Main genre**, defined as the genre of the most movies where actors starred in. The affinity of actors towards specific genres may affect their probability of getting successful (e.g., affinity of Adam Sandler with Comedy movies);
- **Director**, defined as the director who directed the most movies where actors starred in. Directors tend to have preferences towards specific actors and hire them again for roles in their movies (e.g., Quentin Tarantino with Brad Pitt or Samuel L. Jackson).
    
*Birth year* is not considered in the confounders because highly correlated with appearances.

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

Given the extremely large number of directors, a **kernel density estimate (KDE) plot results more interesting to have a sense of the coefficients distribution**, together with their median. It is shown how the median of the log odds is lower than zero, meaning that the majority of the directors negatively influence the log odds ratio of being part of the treatment group.

<p align="center">
    <img width="600" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208999329-e916ecf9-d424-430e-a62d-3500b51e9bd6.png">

The balanced dataset contains **20688 actors** of movies in the US region.

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

To clarify, Animation genre refers to movies where actors give their voice to characters, while Music genre refers to movies about music or musicians (e.g., The Bohemian Rapsody).

### And the directors?

The **KDE plots below show that the matching thinnered the weight of the directors in the appearances**. There seems to be still a few directors that are more present than the others in the matched sample.

<p align="center">
    <img width="500" alt="correlation" src="https://user-images.githubusercontent.com/114060781/208878420-e088c3bd-e3ce-4a33-9a0c-56f2a2339944.png">

## Actors' impact on ratings
    
After having assessed the **validity of the matching process on the observed covariates**, we proceed to explore the **influence of being part of the rich-get-richer group on the average movie ratings in actors' careers**.

**A linear regression shows a positive significant impact of coming from the treatment group on the average movie ratings**, both before and after the matching process. However, **its influence is way lower in the balanced dataset**. Indeed, **being part of the rich-get-richer circle increases the average ratings by only 0.087**, **compared to the 0.322 of before (27% less)**. It is true that successful actors influence the average movie ratings, but in a quantitatively low amount, as shown from the conducted analysis.

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
    
The characterization of actors' impact on movie ratings was based on the **average ratings along their career**. This means that the **entire cast of actors in a movie benefits from the same rating**. This implies that there may be some actors that **'piggyback' on other more successful actors, increasing the career movie rating average without being extremely impactful**.
   
* First of all, **this possible confounder is limited by the fact that we defined as successful actors the ones with a high productivity, and NOT with high movie ratings**, and we proved the significant positive correlation between the treatment group (high productivity) and the movie ratings. Therefore, **even if some 'one-hit wonder' actors have a very high average movie rating, this is not the general trend of the dataset**.
    
* The rating are normalized on the number of given votes by IMDb users (the larger the number of votes, the higher the weight on the movie rating). This contributes to decrease the average ratings of niche actors who starred in unknown movies or less rated ones.

* Moreover, the **IMDb dataset of the US region is sufficiently large**. Indeed, even if an actor with high number of appearances raised his average ratings at the expenses of other actors in one movie, the **large amount of present data points contributes to perform a correction over his/her career**.
    
* To investigate the limitations of this approach, the following section aims to build up a network of actors and movies to identify co-acting trends (how often actors star together with other actors) with the goal of identifying the 'piggybacking' ones.
    
