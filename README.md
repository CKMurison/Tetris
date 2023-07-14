# Tetris Battle
Tetris Battle is a tetris inspired game where 2 players take turns moving pieces around a common board, and get rewarded for completing lines by interfering with their opponents board.
It was built as part of a final engineering project at Makers Academy software development course, with the aim of simulating a real life working environment and improving our test-driven development skills.

## Learning objectives
* Learn to work and communicate effectively as part of a team to build a new project from scratch.
* Learn to break down projects into tasks and assign them to pairs.
* Learn to use agile ceremonies to organise our work and improve our processes.
* Learn to use the developer workflow to plan, implement and peer-review features.

## Setup
```zsh
# Install dependencies
npm install

# Run the bundler.
npm run build

# Game can now be ran by opening index.html in your browser, or running
npm run open
# In the terminal

# To get details on test coverage:
npm run test
```

## Built with
#### Main languages used:
* JavaScript
  * Object-Oriented lanugage used for to handle majority of our game logic
* HTML/CSS
  * Markup language used for projects designed to be displayed in the web browser
#### JavaScript packages:
* esbuild
  * API bundler used to bundle all files in the project to be processed by the web faster
#### Testing environment:
* Jest
  * JavaScript testing framework.

## Testing coverage
* [Link to test coverage](diagrams-and-schemas/testCoverage.png)
* Test coverage currently stands at over 90% for statements, functions and lines covered
* Audio and animations have only been tested visually by running the game, as jest is currently unable to test for those objects correctly, which is bringing down the overall test coverage.

## Design documents and changes
* Original table design
  * [Link to table design](diagrams-and-schemas/Class%20Model.png)
  * One of the changes to design that came up throughout the project was a need to implement movement from the inside of the Game class, as opposed to using the Tetromino class. This was done for the purposes of meeting our development deadlines, and will be refactored in the future.
  * The grid is also currently hardcoded into the Game class for the same reasons, but as our functionality expands we predict a need to extract it into its own class.

## Currently known bugs
* The controls are currently not correctly bound to activePlayer, hence both control schemes affect both players
* Tetromino can sometimes disappear if a rotation is triggered on bottom line

## Future developments
#### Which features and changes we would like to implement?
* Changing the powerup system to allow the player to trigger the powerups when convenient, as opposed to having them trigger automatically
* Alternate win conditions like winning upon reaching a certain amount of lines cleared
* Allowing the players to choose the size of the board they will be playing on.
* The next tetromino sent to act more like real Tetris rules, where a random basket is chosen, as opposed to random Tetromino every turn.

## Credits
* [Cameron Bishop](URL "https://github.com/camybish")
* [Cyryl Gotkowicz](URL "https://github.com/CyrylG")
* [Christie Griffiths](URL "https://github.com/ChristieGriffiths")
* [Andrea Ruggieri](URL "https://github.com/aandre6891")
* [Cameron Murison](URL "https://github.com/CKMurison")
* [Aubrey Salmins](URL "https://github.com/aubreysalmins")
* [Michael Szczepanski](URL "https://github.com/michael-szczepanski")
* [Link to project repository](URL "https://github.com/CKMurison/Tetris/")
* Project created as part of the [Makers Academy](URL "https://makers.tech/") software development course