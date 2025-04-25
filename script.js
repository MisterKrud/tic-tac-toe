const Gameboard = (rows, cols) => {

    const getRows = () => rows;
    const getCols = () => cols;
    const board = [getRows(), getCols()];

    return {board};

    }
            
const gameboard = Gameboard(3,3)

const Player = (name)  => {
    let turns = 0;
    let players = [];
    
    if (!players[0]){
        const playerNum = 1
        const token = "X"
        return {name, turns, playerNum, token}

    } else if (!players[1]) {
        const playerNum = 2
        const token = "0"
        return {name, turns, playerNum, token}
    } else if (players[1]) {
        console.log("Maximum players has been reached")
    }

    
    
    

const Gameplay = () => {

}

}

    
    

    
 