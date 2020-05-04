document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
// function board (num1, num2) {
//   let cells = [];
//   for(let i = 0; i < 9; i++) {
//     cells[i] = {          
//       row: num1,
//       col: num2,
//       isMine: true,
//       isMarked: false,
//       hidden: true
//       };


//   }
//     return cells;
// };

// console.log(board(0, 0))
// console.log(board(0, 1))
// console.log(board(0, 2))
// console.log(board(1, 0))
// console.log(board(1, 1))
// console.log(board(1, 2))
// console.log(board(2, 0))
// console.log(board(2, 1))
// console.log(board(2, 2))


var board = {
  cells: [
          {
          row: 0,
          col: 0,
          isMine: true,
          hidden: true
          }, 
          {
          row: 0,
          col: 1,
          isMine: true,
          hidden: true
          }, 
          {
          row: 0,
          col: 2,
          isMine: true,
          hidden: true
          },
          {
          row: 1,
          col: 0,
          isMine: true,
          hidden: true
          },
          {
          row: 1,
          col: 1,
          isMine: false,
          hidden: true
          },
          {
          row: 1,
          col: 2,
          isMine: true,
          hidden: true
          },
          {
          row: 2,
          col: 0,
          isMine: true,
          hidden: true
          },
          {
          row: 2,
          col: 1,
          isMine: true,
          hidden: true
          },
          {
          row: 2,
          col: 2,
          isMine: false,
          hidden: true
          }
         ]
};

function startGame () {
  // Don't remove this function call: it makes the game work!
  for(let i = 0; i < board.cells.length; i++) {
    board.cells.surroundingMines = countSurroundingMines(board.cells[i])
    // console.log(board.cells)
  }




  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)


  lib.initBoard()
}




// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  for(let i = 0; i < board.cells.length; i++) {

    if (board.cells[i].isMine === true && board.cells[i].isMarked === true) {
       console.log('Hello')
       console.log(board.cells[i])
    } else if (board.cells[i].hidden === true) {
       console.log('Step 2222')
       console.log(board.cells[i])
       return
    } else {
    //    console.log('DONE!')
    //    console.log(board.cells[i])
    }
  }
  return lib.displayMessage('YOU WIN!')
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
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
// console.log(surrounding)
  
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

