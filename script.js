function gameBoard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows ; i++){
        board[i] =[];
        for(let j = 0 ; j < columns ; j ++){
            board[i][j] = j;
            
        }
    }

    const getBoard = () => board;
    const render = () => console.log(board);
    const changeSymbol = (symbol,row,col) => board[row][col] = symbol ; render();

    return { getBoard , render ,  changeSymbol} 

}



function gameControler(){
    const board = gameBoard();

    const laur  = createPlayer('x');
    const kemi = createPlayer('0');

}


function createPlayer(symbol){
    const getSymbol = () => symbol ;

    return { symbol , getSymbol , };
}


