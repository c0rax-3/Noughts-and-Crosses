### Noughts and Crosses

**Entities:**

- Player
has fields name, marker
- Board
has fields cells (which is a 2D array of 3x3 cells - these will be identified by two integers as coordinates)
has methods 
  placeMarker, which inserts a marker into one of the cells
  checkEndCondition, which determines a win or draw condition based on the cells
  isOccupied, which determines whether the cell at the given coords is full
  reset, which clears the cells and resets the game
- Marker
has fields symbol
- Game
has fields turnPlayer, isEnded

**Gameplay**

There needs to be a turn system, so that we can identify which marker should be used when placing the next marker on the board. This should alternate after every marker is placed.

There needs to be a system to refuse a placement on an occupied cell.

The game needs to stop when any of the end conditions are met, and it should report the result. It should not accept new markers after this point.

The game should be resettable, including the board, and the players, and the turns once it has ended.