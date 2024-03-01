

function gameBoard() {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = j;
        }
    }

    let isEmptyCell = true;


    const getBoard = () => board;
    const render = () => console.log(board);

    const changeSymbol = (symbol, row, col) => {
        if(board[row][col] < 3 ){


        isEmptyCell  = true; 

        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[row][col] = symbol;
        board = newBoard;
        render();
        console.log("Mutare legala")
        }else {

        isEmptyCell = false;
        console.log("Mutare ilegala")

        }

    };

    return { getBoard, render, changeSymbol , isEmptyCell };
}


function gameControler(){
    
    const board = gameBoard();
    const player1  = createPlayer('X');
    const player2 = createPlayer('O');


    let emptyCell = board.isEmptyCell;
    let activePlayer = player1;

// OLD FUNCTION  - RESPOSABILITY FOR THE STATUS OF THE TURN ( NOW WE DONT NEED IT)
//  const makeMove = (player,row,col) =>{
//      if(player.status){
//          console.log( " este randul lui " + player.symbol )
//           board.changeSymbol(player.symbol,row,col)
            

//          if(emptyCell){

//             changeTurn();
//         }

         
            
//       }else if(!player.status){
//            console.log( " nu este randul lui" + player.symbol )
//        }
//    }
    
//    const changeTurn = () => {
//        player1.status = !player1.status
//        player2.status = !player2.status
//    }
   

    const switchPlayer = () =>  {
        if(activePlayer == player1){
            activePlayer = player2;
        }else if(activePlayer == player2){
            activePlayer = player1;
        }
    }

    const makeMove = (row,col) => {
        
            board.changeSymbol(activePlayer.symbol,row,col);
            switchPlayer();

        
    }


   return { makeMove }
    
    
    
}
 



const game = gameControler();






function createPlayer(symbol){
    const getSymbol = () => symbol ;

    return { symbol , getSymbol};
}


// OLD CODE - TEST ZONE

//function createTestPlayer(symbol, name ){
    
//    return {symbol , name}

//}
//let array = [1, 2, 3, 4, 5, 6, 7, 9];

//let laur = createTestPlayer('x', 'laur');
//let kemi = createTestPlayer('O', 'kemi');

//let activePlayer = laur;

//function switchplayer() {
//    if (activePlayer == laur) {
//        activePlayer = kemi;
//    } else if (activePlayer == kemi) {
//        activePlayer = laur;
//    }
//}



//function makeTestMove(index) {
//    array[index] = activePlayer.symbol;
//    console.log(array);
//    switchplayer();
//    console.log(activePlayer);
//}

//makeTestMove(1);
//makeTestMove(2);
//makeTestMove(3);


//function makeMove(player){
//        if(player.status){
//            console.log(player.name + " a facut mutarea")
//            changeTurn();
//        }else if(!player.status){
//            console.log(player.name + " nu facut mutarea")
//            
//        }
//        
//}

//function changeTurn(){
//       laur.status = !laur.status
//        kemi.status = !kemi.status
//}



//const laur = createTestPlayer('laur',true);
//const kemi = createTestPlayer('kemi',false);



