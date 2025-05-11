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
    
   
    const cell = board[row][column];
    
    console.log(`Cell value: '${cell.getValue()}'`)
    if (cell.getValue() === "-") {
      cell.addToken(player);
    } else {
      console.log(`That square has been played`);
      return false
  };
  }

    
  const renderBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    // console.log(boardWithCellValues);

    return boardWithCellValues;
  };

  return { getBoard, placeToken, renderBoard };
}

function Cell() {
  let value = "-";
  const addToken = (player) => {
    value = player.token;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

const Player = (name, token) => {
   let score = 0

  return { name, token, score};
};

const gameControl = () => {
  console.log("gameControl() invoked");
  const gameboard = Gameboard(3, 3); //get the board
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "0");

  const playerArray = [player1, player2]; // establish the players in an array
  let activePlayer = playerArray[0]; // active player is the first player

  //If player1 is active, swap the active player to player2
  const switchPlayers = () => {
    if (activePlayer === playerArray[0]) {
      activePlayer = playerArray[1];
    } else {
      activePlayer = playerArray[0];
    }
    // gameboard.renderBoard(); //Put the board in the consolein

    console.log(
      `${activePlayer.name}'s turn. Place your '${activePlayer.token}'`
    ); //Tell the player it's their turn
    return activePlayer;
  };

  const getActivePlayer = () => activePlayer;

  const playRound = (row, col) => {
    const currentPlayer = getActivePlayer()
    // console.log(`STARTING ROUND`)

    // console.log(`ACTIVE PLAYER: ${getActivePlayer().name}`)

    gameboard.placeToken(row, col, currentPlayer);

    const gameWon = gameOver();
    if (!gameWon) {
      // console.log(`NO WINNER - SWITCHING PLAYERS`)

      switchPlayers();
      // console.log(`CURRENT PLAYER: ${getActivePlayer().name}`)
    } else {
     currentPlayer.score++;

     
    }
    return gameWon
  };

  const gameOver = () => {
    
    const board = gameboard.renderBoard();

    const cols = () => {
      let columnArray = [];
      let r = 0;
      for (let c = 0; c < board[r].length; c++) {
        let arr = [];

        for (let r = 0; r < board.length; r++) {
          arr.push(board[r][c]);
        }
        columnArray.push(arr);
      }

      return columnArray;
    };

    const diagonals = () => {
      let diagonalArray = [];
      let mainDiagonal = [];
      let antiDiagonal = [];

      for (let d = 0; d < board.length; d++) {
        mainDiagonal.push(board[d][d]);
        antiDiagonal.push(board[d][board.length - 1 - d]);
      }
      diagonalArray.push(mainDiagonal, antiDiagonal);
      return diagonalArray;
    };

    const rows = () => board;

    const allLines = [...rows(), ...cols(), ...diagonals()];
    console.log(allLines);

    if (
      allLines.some((arr) => arr.every((value) => value === player1.token)) ||
      allLines.some((arr) => arr.every((value) => value === player2.token))
    ) {
      return true;
    } else {
      return false;
    }
  };

 

  return { gameboard, getActivePlayer, gameOver, switchPlayers, playRound, player1, player2 };

  
};



const screenControl = (() => {
  const control = gameControl();
  let gameIsOver = false
  const boardDiv = document.querySelector(".board");
  const messageScreen = document.getElementById("messages");
  const playerOneDetails = document.getElementById("player-one");
  const playerOneScore = document.getElementById("p1-score")
  const playerTwoScore = document.getElementById("p2-score")
  const playerTwoDetails = document.getElementById("player-two");

 
  playerOneDetails.innerHTML = `<p>${control.player1.name}: '${control.player1.token}'</p>`
  playerOneScore.innerHTML = `<p>Score: ${control.player1.score}</p>`
  playerTwoDetails.innerHTML = `<p>${control.player2.name}: '${control.player2.token}'`;
  playerTwoScore.innerHTML = `<p>Score: ${control.player2.score}</p>`
  const board = control.gameboard;
  const renderDivs = (() => {
    
    for (let i = 0; i < board.getBoard().length; i++) {
      let divRow = document.createElement("div");
      divRow.setAttribute("class", "row");
      boardDiv.appendChild(divRow);
      for (let j = 0; j < board.getBoard()[i].length; j++) {
        let divCell = document.createElement("div");
        divCell.setAttribute("class", "cell");
        divCell.setAttribute(`id`, `c${i}${j}`);
        divCell.setAttribute("row", `${i}`);
        divCell.setAttribute(`col`, `${j}`);
        divRow.appendChild(divCell);
      }
    }
  }
)()
 

  const playMessage = () =>
    `${control.getActivePlayer().name}'s turn. Place your ${
      control.getActivePlayer().token
    }.`;
  const winningMessage = () =>
    `${control.getActivePlayer().token} wins. Well done ${
      control.getActivePlayer().name
    }! <br/> Click here to play again.`;
  messageScreen.textContent = playMessage();
  

  

    const gameWon = () => {
      messageScreen.innerHTML = winningMessage();
       playerOneScore.innerHTML = `<p>Score: ${control.player1.score}</p>`
       playerTwoScore.innerHTML = `<p>Score: ${control.player2.score}</p>`
console.log(control.getActivePlayer())
console.log(control.getActivePlayer().score)
      messageScreen.addEventListener("click", () => {
       
             
             
      });
    }
 

    const clickListener = (() => {
     
      const gridCells = document.querySelectorAll(".cell");
      gridCells.forEach((cell) => {
        cell.addEventListener("click", () => {
          if (gameIsOver) return
          // const gameIsWon = control.gameOver()
          const row = cell.getAttribute("row");
          const col = cell.getAttribute("col")
        const currentPlayer = control.getActivePlayer()
        

         if (control.gameboard.getBoard()[row][col].getValue() != "-"){
          console.log('From Listener: Square already played')
          return
         } else {
          const gameIsWon = control.playRound(row, col, currentPlayer);
          cell.innerHTML = `<p>${currentPlayer.token}</p>`;
          if (currentPlayer.token === 'X') {
            cell.setAttribute("class", "token-x")
          } else if (currentPlayer.token === '0') {
            cell.setAttribute("class", "token-0")
          }
          
         
          
         
          console.log(`Active player is ${control.getActivePlayer().name}`);

          if (gameIsWon) {
          
            gameIsOver = true
            gameWon()
        
            
            

          
          } else {
            messageScreen.textContent = playMessage();
          }
        }});
      });
    })();
  
  // return {  boardDiv, board, renderDivs};

  })()