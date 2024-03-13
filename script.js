


function UI(){

    const tableBoard = document.getElementById('board');


    function renderTable(){

        const boardData = gameBoard().getBoard();
        
        boardData.forEach(row =>{
            // trecem prin cele 3 arrayuri si cream cate un row pt fiecare
    
            const tableRow = document.createElement('div');
            tableBoard.appendChild(tableRow);
    
            row.forEach(element =>{
            // pentru fiecare array iterat cream 3 div-uri 
    
            const tableCell = document.createElement('div');
         
            tableRow.appendChild(tableCell);

            let isCellEmpty = true;

            tableCell.addEventListener('click',function(){
              if(isCellEmpty){

              game.makeMove(row,element,tableCell);
              console.log(boardData);
              isCellEmpty = false;
                
              }else {
                console.log('illegal move')
              }

            })
            
            })
                
        })
    
    
    }


    return { renderTable }
}

function gameBoard() {
    const rows=3;
    const columns = 3;
    let board = [];


    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns ; j++){
            board[i][j] = j
        }
    }

    const getBoard = () => board;
    const renderBoard = () => console.log(board);

    return { getBoard , renderBoard}
}


function createPlayer(sign) { 

    const getSign = () => sign ;

    return { getSign ,};

}


function gameControler(){

    const gameUI = UI();
    gameUI.renderTable();

    const playerOne = createPlayer('X');
    const playerTwo = createPlayer('O');

    let activePlayer = playerOne;


    const switchPlayer = () => {

        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;

    }


    const makeMove = (arrayCell,arrayIndex, displayValue) => {

        //row[element] element fiind indexul array-ului , iar row este ales in functie de div-ul apasat
        //folosim varianta asta ptca asa modifica si matricea boardData declarata in functia UI 

        arrayCell[arrayIndex] = activePlayer.getSign();
        displayValue.textContent = activePlayer.getSign();
        switchPlayer();

    }

    return { makeMove }
}


const game = gameControler()

   
 
