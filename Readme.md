<h1>Red Beards Lost Treasure</h1>

<a href="https://scottshep86.github.io/red-beards-lost-treasure-game/">Red Beards Lost Treasure</a>
<h2>Description</h2>

<p>Red Beards Lost Treasure is a game where the player has to avoid skeletons and crabs horizontally whilst collecting coins to fill up your tresure chest. All obstacles appear from the left of the screen and move to your character on the right side of the screen. You have beat the game when you have collected enough coins to fill up the treasure chest or you lose the game if the skeletons or crabs manage to get you.</p>

<h2>MVP (DOM - CANVAS)</h2>
<ul>
<li>My game has a character (pirate) that moves vertically</li>
<li>Different objects appear randomly from the left of the screen</li>
<li>Being hit by two of the objects (skeletons or crabs) will end the game</li>
<li>Collecting one type of Object (coins) in order to fill the "treasure chest" will end the game</li>
</ul>

<h2>Backlog</h2>
<ul>
<li>switch between characters</li>
<li>add a tresure chest</li>
<li>add music to the game</li>
</ul>

<h2>Data Structure</h2>

<h3>Different Classes<h3>
<ul>
<li>class Stone - constructor(), move(), draw() - Background Element</li>
<li>class Skeleton - constructor(), move(), draw(), checkCollison() - negative Obstacle</li>
<li>class Crab - constructor(), move(), draw(), checkCollison() - negative Obstacle</li>
<li>class Coin - constructor(), move(), draw(), checkCollison() - positive Obstacle</li>
</ul>

<h3>Canvas</h3>
<ul>
<li>drawBackground()</li>
<li>drawLarsPirate()</li>
<li>drawScore()</li>
<li>animate()</li>
</ul>

<h3>Different Functions</h3>
<ul>
<li>startGame()</li>
<li>restartGame()</li>
<li>musicStart()</li>
<li>musicStop()</li>
</ul>

<h3>Different Event Listeners</h3>
<ul>
<li>keydown and keyup - moving my character</li>
<li>keydown and keyup - adding and removing Easter Eggs</li>
<li>click - restart the game</li>
<li>click - start the music on Landing Screen</li>
</ul>

<h2>States y States Transitions</h2>
<h4>Definition of the different states and their transition (transition functions)</h4>
<ul>
<li>Landing Screen</li>
<li>Game Screen</li>
<li>Game Over Screen</li>
<li>Game Won Screen</li>
</ul>

<h2>Links</h2>
<ul>
<li><a href="https://trello.com/b/cDM8GUmZ/red-beards-lost-treasure">Trello</a></li>
<li><a href="https://docs.google.com/presentation/d/1SD_IBXZHC17O8OY-yZWWG2E--oaukD3O1ldDMSs1RSQ/edit#slide=id.g22d3e184c02_0_98">Presentation slides</a></li>
<li><a href="https://github.com/ScottShep86/red-beards-lost-treasure-game">Github repository Link</a></li>
<li><a href="https://scottshep86.github.io/red-beards-lost-treasure-game/">Link to Red Beards Lost Treasure</a></li>
</ul>