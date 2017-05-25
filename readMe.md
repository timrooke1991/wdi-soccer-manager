![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)
 
# Project 0 - Soccer Manager
 
## Setup
 
Project is available at:
 
- [https://dry-garden-10776.herokuapp.com/](https://dry-garden-10776.herokuapp.com/)
 
## Description
 
This project was to build a JavaScript browser game, I chose to build a basic football management simulation game. The allows players to chose from a list of teams, select their starting line-ups and watch the game unfold. Players can make substitutions and edit formations mid-match in effort to change the outcome of the match in their club's favour. 
 
## Technologies used
 
The list of the software and languages used in the project, for example:
 
- HTML 5
- SCSS
- JavaScript ES6
- jQuery 3.10
- Gulp
- NPM
- Git & github
 
## Challenges faced
 
The biggest challenge of the game was the substitution functionality. I used a player.playing boolean to keep track of players that were on/off the pitch at any one time. Players who received an injury or red card would have their player.playing value set to false. Initially, I tried to use this attribute for substitutions as well. However, this didn't work.
 
To deal with substitutions effectively and communicate the different states of the players (red card, injured, substituted) reliance on a single boolean wasn't sufficient. Therefore, I added an additional key-value pair to every player, which kept track of their status during the game (red card, injured, subbed-on, subbed-off). The additional data that this key provided allowed the game to handle substitutions, red cards and injuries much more effectively. 
 
## Rounding it off
 
Improvements that I would like to make to the project in the future would be:
 
- Adding a extra-time and penalties feature
- Improvement to the UI, particularly team selection
- Add additional data attribute to the player objects, e.g. heading, tackling, passing, which could determine a team's likelihood to score from a freekick or create chances
- Display average values (e.g. attack, defence) across teams, so that users can see how teams compare to to one another. 
