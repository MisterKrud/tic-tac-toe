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

    console.log(`Cell value: '${cell.getValue()}'`);
    if (cell.getValue() === "-") {
      cell.addToken(player);
    } else {
      console.log(`That square has been played`);
      return false;
    }
  };

  const renderBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    // console.log(boardWithCellValues);

    return boardWithCellValues;
  };

  const resetBoard = () => {
    board.forEach((row) => row.forEach((cell) => cell.reset()));
  };

  return { getBoard, placeToken, renderBoard, resetBoard };
};

function Cell() {
  let value = "-";
  const addToken = (player) => {
    value = player.token;
  };

  const getValue = () => value;
  const reset = () => (value = "-");

  return { addToken, getValue, reset };
};

const Player = (name, token) => {
  let score = 0;

  return { name, token, score };
};

const gameControl = () => {
  console.log("gameControl() invoked");
  let gameIsOver = null;
  
  const gameboard = Gameboard(3, 3); //get the board
  console.log(gameboard);
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "0");

  const playerArray = [player1, player2]; // establish the players in an array
  let activePlayer = playerArray[0]; // active player is the first player

  //If player1 is active, swap the active player to player2
  const switchPlayers = () => {
    // if (playerArray = []){
    //   return
    // } else
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
  // const removePlayers = () => playerArray.splice(0);
  const getActivePlayer = () => activePlayer;

  const playRound = (row, col) => {
    const currentPlayer = getActivePlayer();
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
     gameIsOver = true
    }
    return gameWon;
  };

  let winningRow
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

    const xIndex = allLines.findIndex((arr) => arr.every((value) => value === player1.token))
    const oIndex = allLines.findIndex((arr) => arr.every((value) => value === player2.token))

    
   
    
    if (xIndex !=-1){
      winningRow = xIndex;
    } else if (oIndex != -1){
      winningRow = oIndex
    } else {
      console.log('Continue')
    }
   
    
  
    
    if (winningRow >= 0 && winningRow <=2){
      console.log(`winningRow is 1-3: ${winningRow+1}`)

    } else 
    if (winningRow >= 3 && winningRow <=5){
      console.log(`winningRow is 4-6: ${winningRow+1}`)
      
      }  else
      if (winningRow >= 6 && winningRow <=7){
        console.log(`winningRow is 7-8: ${winningRow+1}`)
       
      }

      const getWinningLine = () => allLines[winningRow] 
      console.log(`From the gameOver function: ${getWinningLine()}`)
     
    if (
      allLines.some((arr) => arr.every((value) => value === player1.token)) ||
      allLines.some((arr) => arr.every((value) => value === player2.token))
    ) {
      console.log(allLines);
      return true;
    } else {
      return false;
    }
   
  };
  const getWinningRow = () => winningRow;
  return {
    gameboard,
    getActivePlayer,
    gameOver,
    switchPlayers,
    playRound,
   getWinningRow,
  //  removePlayers,
    player1,
    player2,
  };
};

const screenControl = (() => {
  const control = gameControl();
  let gameIsOver = false;
  const boardDiv = document.querySelector(".board");
  const messageScreen = document.getElementById("messages");
  const enterName = document.querySelector("dialog");

  const playerNameSubmitButton = document.getElementById("name-submit");
  const playerOneDetails = document.getElementById("player-one");
  const playerOneScore = document.getElementById("p1-score");
  const playerTwoScore = document.getElementById("p2-score");
  const playerTwoDetails = document.getElementById("player-two");
  const controlsDiv = document.querySelector(".controls");
  const player1Button = document.createElement("button");
  player1Button.setAttribute("id", "player1-name");
  player1Button.setAttribute("class", "playerNameUpdateButton");
  const player2Button = document.createElement("button");
  player2Button.setAttribute("id", "player2-name");
  player2Button.setAttribute("class", "playerNameUpdateButton");

  playerOneDetails.innerHTML = `<p>${control.player1.name}: ${control.player1.token}</p>`;
  playerOneScore.innerHTML = `<p>Score: ${control.player1.score}</p>`;
  playerOneScore.appendChild(player1Button);
  player1Button.textContent = "Enter name";

  playerTwoDetails.innerHTML = `<p>${control.player2.name}: ${control.player2.token}`;
  playerTwoScore.innerHTML = `<p>Score: ${control.player2.score}</p>`;
  playerTwoScore.appendChild(player2Button);
  player2Button.textContent = "Enter name";
  const board = control.gameboard;
  const playAgain = document.createElement("button");
  playAgain.textContent = "Play Again";
  const resetScore = document.createElement("button");
  resetScore.textContent = "Reset";
  const playerButtons = document.querySelectorAll(".playerNameUpdateButton");


  

  let editingPlayer;
  const enterPlayerName = (() => {
    playerButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.getAttribute("id") === "player1-name") {
          editingPlayer = "player1";
        } else if (button.getAttribute("id") === "player2-name") {
          editingPlayer = "player2";
        }
        enterName.showModal();
      });
    });
  })();

  const submitName = (() => {
    playerNameSubmitButton.addEventListener("click", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("player-name");
      let playerName = nameInput.value;

      if (editingPlayer === "player1") {
        control.player1.name = playerName;
        playerOneDetails.innerHTML = `<p>${control.player1.name}: ${control.player1.token}</p>`;
      } else if (editingPlayer === "player2") {
        control.player2.name = playerName;
        playerTwoDetails.innerHTML = `<p>${control.player2.name}: ${control.player2.token}</p>`;
      }
      nameInput.value = "";

      enterName.close();
      messageScreen.textContent = playMessage();
    });
  })();

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
  })();

  const gridCells = document.querySelectorAll(".cell");

  const playMessage = () =>
    `${control.getActivePlayer().name}'s turn. Place your ${
      control.getActivePlayer().token
    }.`;
  const winningMessage = () =>
    `${control.getActivePlayer().name} wins!`
    
  messageScreen.textContent = playMessage();

  const gameWon = () => {
    
    messageScreen.innerHTML = winningMessage();
    playerOneScore.innerHTML = `<p>Score: ${control.player1.score}</p>`;
    playerTwoScore.innerHTML = `<p>Score: ${control.player2.score}</p>`;
    console.log(control.getActivePlayer());
    console.log(control.getActivePlayer().score);
    messageScreen.addEventListener("click", () => {});
    control.player1.token = '';
    control.player2.token = '';
   

   
  };

  const clickListener = (() => {
    gridCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        // if (gameIsOver) return
        // const gameIsWon = control.gameOver()
        const row = cell.getAttribute("row");
        const col = cell.getAttribute("col");
        const currentPlayer = control.getActivePlayer();

        if (control.gameboard.getBoard()[row][col].getValue() != "-") {
          console.log("From Listener: Square already played");
          return;
        } else {
          const gameIsWon = control.playRound(row, col, currentPlayer);
          cell.innerHTML = `<p>${currentPlayer.token}</p>`;
          if (currentPlayer.token === "X") {
            cell.setAttribute("class", "token-x");
          } else if (currentPlayer.token === "0") {
            cell.setAttribute("class", "token-0");
          }

          console.log(`Active player is ${control.getActivePlayer().name}`);

          if (gameIsWon) {
            
            gameIsOver = true;
            gameWon();
            
            const winnerRow = control.getWinningRow();

            

            console.log(`winnerRow: ${winnerRow}`)

            controlsDiv.appendChild(playAgain);
            controlsDiv.appendChild(resetScore);
            
            playAgain.addEventListener("click", nextRound);

            resetScore.addEventListener("click", () => {
              control.player1.score = 0;
              control.player2.score = 0;
              playerOneScore.innerHTML = `<p>Score: ${control.player1.score}</p>`;
              playerTwoScore.innerHTML = `<p>Score: ${control.player2.score}</p>`;
              nextRound();
              
            });

            //
          } else {
            messageScreen.textContent = playMessage();
          }
        }
      });
    });
    const nextRound = () => {
      control.gameboard.resetBoard();
      const cells = document.querySelectorAll(".cell");

      gridCells.forEach((cell) => {
        cell.textContent = "";
        cell.setAttribute("class", "cell");
        // cell.setAttribute("style", "border: blue 1px solid")
      });
      playAgain.remove();
      resetScore.remove();
      messageScreen.textContent = playMessage();
      playerOneScore.appendChild(player1Button);
      playerTwoScore.appendChild(player2Button);
    };
  })();

  // return {  boardDiv, board, renderDivs};
})();
