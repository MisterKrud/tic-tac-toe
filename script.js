const Gameboard = (rows = 3, cols = 3) => {
  const board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;

  const placeToken = (column, row, player) => {
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

  const getStringFromBoard = () => {
    const board = renderBoard().flat().join("");

    return board;
  };

  return { getBoard, placeToken, renderBoard, getStringFromBoard };
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

   const playRound = (row, cell)=> gameboard(row, cell)

  return { name, token, playRound };
};



const gameControl = (() => {
  const gameboard = () => Gameboard(3, 3); //get the board
  const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "0");

  const playerArray = [player1, player2]; // establish the players in an array
  let activePlayer = () => playerArray[1]; // active player is the first player

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

 

  const gameOver = () => {
    
    const winnerX =() => [/XXX....../g,/...XXX.../,/......XXX/g, /X..X..X../g, /.X..X..X/g,/..X..X..X/g,/X...X.X../g,/..X.X...X/g]
    const winner0 = () => [/000....../g,/...000.../,/......000/g, /0..0..0../g, /.0..0..0/g,/..0..0..0/g,/0...0.0../g,/..0.0...0/g]

    if(winnerX.includes(gameboard.getStringFromBoard())) {
        console.log(`${player1.name} wins!`)
        
    } else if (winner0.includes(gameboard.getStringFromBoard())) {
        console.log(`${player2.name} wins`)
        
    } else console.log('Next round')
        
    return {winnerX, winner0}

  }

  //    gameboard.renderBoard();//Put the board on the screen
  //     console.log(`${activePlayer.name}'s turn. Place your '${activePlayer.token}'`)//Tell the player it's their turn
  const gameRound = () => {
    
    activePlayer.playRound
    gameboard.renderBoard;
    

    switchPlayers();
  };

  return {gameboard, activePlayer, gameOver, gameRound};

  //player puts token on board - selects row and column (how does the player do this?)

  //If the space is free, the token goes into that cell
})();
