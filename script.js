const Gameboard = (rows, cols) => {

    const getRows = () => rows;
    const getCols = () => cols;
    let row = 64
    let col = 1

    const board = [];
    
    for (let i=0; i<getRows(); i++) {
       
        board[i]=[];
        row++
       
        for (let j=0; j<getCols(); j++){
            board[i][j]= String.fromCharCode(row)+col
           if(col=board[i].length){col++}else{col=1}
            
        }
    }

    console.log(board[0][1])
    return board;
    }
            
const gameboard = (() =>{
 
 return Gameboard(3,3)
})()


const Player = (name, token)  => {
    
    return {name, token}


    // let players = [];
    // let turns = 0;
    
   
    // if (!players[0]){
    //     const playerNum = 1
    //     const token = "X"
        
    //     return {name, turns, playerNum, token}
    // } else if (!players[1]) {
    //     const playerNum = 2
    //     const token = "0"
    //     let turns = 0;
    //     return {name, turns, playerNum, token}
    // } else if (players[1]) {
    //     console.log("Maximum players has been reached")

    // }
    
    }


    
    

const Gameplay = (() => {

    const player1 =  Player("Player1", "X")
    
    const player2 = Player("Player2", "0")
    
    console.log(`${player1.name} is using ${player1.token}`)
    console.log(`${player2.name} is using ${player2.token}`)
    
})();



function getArrayIndexOfGameCell(){

} 
    

    
 