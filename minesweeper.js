document.addEventListener('DOMContentLoaded', startGame)
// To create game cells
function cellMaker (row, col, isMine, isMarked, hidden) {
  let cell = {
    row,
    col,
    isMine,
    isMarked,
    hidden,
  };
  return cell;
};


// To create the game board
function boardMaker (num) {
  let board = {};
  let cells = [];
  let min = 0;
  let max = 6;

    for (let row = 0; row < num; row++) { //Creates rows
      for (let col = 0; col < num; col++) { // Creates columns
  
        let mine = Math.floor(Math.random() * (max - min) + min); //To generate a radnum
        
        if (mine >= 5) { //if rannum is > 3, place mine
          cells.push(cellMaker(row, col, true, false, true)) //PLACES MINES
          mine--;
        } else { // otherwise no mine
          cells.push(cellMaker(row, col, false, false, true)) //CELLS WITH NO MINES
        }
      }
    }
    board.cells = cells;
    return board;
}

let board = boardMaker(5);



let endGame = false;
let gameWon = false;


// To start the game
function startGame () {
  // Don't remove this function call: it makes the game work!  

    let gameBoard = board.cells;
    document.getElementById("timer").innerHTML = ` 0:0`


    for(let i = 0; i < gameBoard.length; i++) {
      gameBoard[i].surroundingMines = countSurroundingMines(gameBoard[i])
    }
    document.addEventListener("click", checkForWin)
    document.addEventListener("contextmenu", checkForWin)
    document.addEventListener("click", startTimer)
    document.addEventListener("contextmenu", startTimer)

    
    lib.initBoard()
}


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  let gameBoard = board.cells;

  for(let i = 0; i < gameBoard.length; i++) {
    if (board.cells[i].isMine && board.cells[i].isMarked !== true) {
      return;
    } else if (board.cells[i].hidden === true && board.cells[i].isMine !== true) {
      return;
    } 
  }
  winTrack();
  
  endGame = true;
  gameWon = true;
  return lib.displayMessage('YOU WIN!') 
}


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//console.log(surrounding)
  
  let count = 0;

  for(let i = 0; i < surrounding.length; i++) {
    // console.log(surrounding[i].isMine)
    if(surrounding[i].isMine === true) {
      count++;
    } 
  }
  // console.log(count)
  return count;
}



 // TIMING SECTION
let startTime = null;
let timeStopped = null;
let timeElapsed;
let fastest = '0:00:000';
let second = '1:00:000'
let third = '2:00:000'

function startTimer () {
    if (startTime === null) {
      startTime = new Date()
    }
    let timerStart = setInterval(function() {
    let currentTime = new Date ()
    let timeElapsed = new Date(currentTime - startTime)
    let min = timeElapsed.getUTCMinutes()
    let sec = timeElapsed.getUTCSeconds()
    let ms = timeElapsed.getUTCMilliseconds();
    document.getElementById("timer").innerHTML = ` ${min}:${sec}:${ms}`
  
    if (endGame === true){
        clearInterval(timerStart);
    }

    if (!gameWon) {
      return
    } else if (gameWon) {
      timeStopped = ` ${min}:${sec}:${ms}` 
    }

    if (fastest === '0:00:000') {
        fastest = timeStopped
        // console.log(fastest + ' new fastest added')
        document.getElementById("lasttime").innerHTML = fastest   
        document.getElementById("first").innerHTML = fastest 
        return  

    } else if (timeStopped < fastest) {
        fastest = timeStopped
        // console.log(fastest + ' has been changed to new timeStopped')
        document.getElementById("lasttime").innerHTML = fastest
        document.getElementById("first").innerHTML = fastest
        return

    } else if (timeStopped > fastest && timeStopped < third) {
        second = timeStopped
        document.getElementById("second").innerHTML = second
        console.log('second')
        return

    } else if (timeStopped > second && timeStopped < third) {
        third = timeStopped
        document.getElementById("third").innerHTML = third
        console.log('third')
        return

    } else {
      return
    }

  







  }, 10) 
}

function resetTimer () {
  startTime = null;
  timerStopped = null;
  document.getElementById("timer").innerHTML = ` 00:00:00`
}


// RESET BUTTON HERE
function resetGame () {
  win.pause();
  loss.pause();
  removeListeners();
  let resetGame = document.getElementById('board');
  resetGame.innerHTML = "";
  resetTimer();
  endGame = false;
  gameWon = false;
  board = boardMaker(5)
  startGame();
}




//Sound SECTION
function winTrack() {
  let win = document.getElementById("win");
  win.play();
}

function lossTrack() {
  let loss = document.getElementById("loss");
  loss.play();
}