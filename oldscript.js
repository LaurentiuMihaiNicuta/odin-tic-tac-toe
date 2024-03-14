const table = document.getElementById('table');






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
        if (board[row][col] === 'X' || board[row][col] === 'O') {
            console.log("Illegal move");
            return false;
        }
    
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[row][col] = symbol;
        board = newBoard;
        render();
        console.log("Legal move");
        return true;
    };

    render();

    return { getBoard, render, changeSymbol , isEmptyCell };
}


function gameControler(){
    
    const board = gameBoard();
    const player1  = createPlayer('X');
    const player2 = createPlayer('O');

    const winConditions = [
        [[0, 0], [0, 1], [0, 2]], // Linii
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]], // Coloane
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]], // Diagonale
        [[0, 2], [1, 1], [2, 0]]
    ];

  
    let activePlayer = player1;


   

    const switchPlayer = () =>  {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    const makeMove = (row, col) => {
        if (!board.isEmptyCell) {
            console.log("The game is done");
            return;
        }

        if (board.changeSymbol(activePlayer.symbol, row, col)) {
            if (checkWinConditions(activePlayer.symbol)) {
                console.log(`${activePlayer.symbol} is a winner!`);
               
            } else {
                switchPlayer();
            }
        }
    };

    const checkWinConditions = (symbol) => {
        for (let condition of winConditions) {
            let win = true;
            for (let [row, col] of condition) {
                if (board.getBoard()[row][col] !== symbol) {
                    win = false;
                    break;
                }
            }
            if (win) {
                return true;
            }
        }
        return false;
    };

    return { makeMove };
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