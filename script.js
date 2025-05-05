const Gameboard = (rows = 3, cols = 3) => {
  const board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;

  const placeToken = (row, column, player) => {
    if (board[row][column].getValue() === "-") {
      board[row][column].addToken(player);
    } else {
      console.log(`That square has been played`);
    }
  };

  const renderBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);

    return boardWithCellValues;
  };

  
  return {getBoard, placeToken, renderBoard};
};



function Cell() {
  let value = "-";
  const addToken = (player) => {
    value = player.token;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

const Player = (name, token) => {
    return {name, token}
}




const gameControl = () => {
  const gameboard = Gameboard(3, 3); //get the board
  const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "0");

  const playerArray = [player1, player2]; // establish the players in an array
  let activePlayer =  playerArray[0]; // active player is the first player

 

  //If player1 is active, swap the active player to player2
  const switchPlayers = () => {
    if (activePlayer === playerArray[0]) {
      activePlayer = playerArray[1];
    } else {
      activePlayer = playerArray[0];
    }
    gameboard.renderBoard(); //Put the board on the screen

    console.log(
      `${activePlayer.name}'s turn. Place your '${activePlayer.token}'`
    ); //Tell the player it's their turn
    return activePlayer;
  };

  const getActivePlayer = () => activePlayer

  const playRound = (row, col) => {
    const currentPlayer = getActivePlayer();
    gameboard.placeToken(row, col, currentPlayer)
  }

  const gameOver = () => {

    const board = gameboard.renderBoard()
    
    const cols = () => {
      let columnArray = []
      let r=0
      for (let c=0; c< board[r].length; c++){
        let arr = []
      
        
      for (let r= 0; r<board.length; r++){
    
      arr.push(board[r][c])
    
       
      }columnArray.push(arr)}
     
      return columnArray
    }
    
    const diagonals = () => {
      let diagonalArray =[]
      let mainDiagonal = []
      let antiDiagonal = []
     
     
      for (let d=0; d<board.length; d++){
       
       mainDiagonal.push(board[d][d]);
       antiDiagonal.push(board[d][board.length-1-d])
      
    
       
      
      }
      diagonalArray.push(mainDiagonal, antiDiagonal)
      return diagonalArray
      
      }
    
      const rows = () => board
    
      const allLines = [...rows(), ...cols(), ...diagonals()]
      console.log(allLines)

   
      if (allLines.some( (arr) => arr.every((value) => value === player1.token || value === player2.token))) {
        console.log(`${getActivePlayer().token} wins. Well done ${getActivePlayer().name}!`)
      }

  }

  //    gameboard.renderBoard();//Put the board on the screen
  //     console.log(`${activePlayer.name}'s turn. Place your '${activePlayer.token}'`)//Tell the player it's their turn
 

  return {gameboard, getActivePlayer, gameOver, switchPlayers, playRound};

  //player puts token on board - selects row and column (how does the player do this?)

  //If the space is free, the token goes into that cell
};

// const gameRound1 = (() => {
    
//    const control = gameControl();
//    const screen = screenControl();
//    screen.renderDivs();
//    screen.playMessage();
//    screen.clickListener();
//    control.gameOver();
   
   

   
  
   

//   })();


// const gameRound2 = () => {
//     const control = gameControl();
//     control.gameOver();
//     control.switchPlayers();
//     gameRound1();

// }

const screenControl = (() => {
const control = gameControl();
const boardDiv = document.querySelector(".board")
const messageScreen = document.getElementById("messages");
const playMessage = () => `${control.getActivePlayer().name}'s turn. Place your ${control.getActivePlayer().token}.`
  messageScreen.textContent= playMessage();
const board = control.gameboard

  
const renderDivs = (() => {
  
for (let i = 0; i<board.getBoard().length; i++){
  let divRow = document.createElement("div")
  divRow.setAttribute("class","row")
  boardDiv.appendChild(divRow)
  for (let j = 0;j<board.getBoard()[i].length;j++){

    
    let divCell = document.createElement("div");
    divCell.setAttribute("class","cell")
    divCell.setAttribute(`id`, `c${i}${j}`)
    divCell.setAttribute('row', `${i}`)
    divCell.setAttribute(`col`, `${j}`)
  divRow.appendChild(divCell);
  
}
}

const clickListener = (() => {
const gridCells = document.querySelectorAll(".cell")
 gridCells.forEach((cell) =>{
  cell.addEventListener("click", () => {
    control.playRound(cell.getAttribute("row"), cell.getAttribute("col"))
    cell.textContent = `${control.getActivePlayer().token}`
    control.switchPlayers();
    console.log(`Active player is ${control.getActivePlayer().name}`)
    messageScreen.textContent=playMessage();
   
    
  })
 })
})();

})()
return {control, boardDiv, board, renderDivs}
})()