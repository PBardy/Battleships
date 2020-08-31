# Battleships

## Description

### What is Battleships?

Battleships is two player strategic guessing game. Each player begins with a 10x10 coordinate grid representing their area of the ocean, and they place different types of ships either horizontally or vertically in non-overlapping positions on their grid. 

Once placed, players take turns to guess a coordinate on their opponent's grid. If one of the opponent's ships occupies the targetted grid coordinate then the opponent confirms this by saying 'hit'. If no ships were affected they confirm this by saying 'miss'. Additionally, if all grid tiles occupied by one of their ships have been hit then they confirm this by saying 'you've sunk my ...' and they type of ship which has been sunk.

### How to win/lose

The game is won when all of your opponent's battleships have been sunk. Conversely, the game is lost when all of your ships have been sunk.

### Types of ship

The types of ships vary depending upon which version of the game is played, but this version uses only one of the following:

* Aircraft Carrier - 5 grid tiles in length
* Battleship - 4 grid tiles in length
* Cruiser - 3 grid tiles in length
* Frigate - 3 grid tiles in length
* Destroyer - 2 grid tiles in length

## Installation

Clone this repository and run the index.html file through a local webserver, or play the game online at <a href="https://pbardy.000webhostapp.com/project/battleships/src/">https://pbardy.000webhostapp.com/project/battleships/src/</a>

## Roadmap

Features to implement:

* Random CPU spawning
* Advanced enemy torpedo firing
* How to play screen

Future improvements:

* Mobile accessibility