



function UI(){
    const playAgainBtn = document.getElementById('playAgain');
    const output = document.getElementById('output');
    const tableBoard = document.getElementById('board');
    const boardData = gameBoard().getBoard(); // luam doar matricea din gameBoard , nu creat un obiect de tipul gameBoard
    

    function renderTable(){

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
                
                isCellEmpty = false;

                }else {

                    // css styling ceva cu border-rosu care dispare
                    tableCell.classList.add('red-border');
                    setTimeout(function(){
                    tableCell.classList.remove('red-border')
                    }, 1000);
                    
                }

                })
                
                tableCell.addEventListener('mouseenter',function(){
                    tableCell.style.background = '#596e79';
                })

                tableCell.addEventListener('mouseleave',function(){
                    tableCell.style.background = '#303c42';
                })


                })

                

                
                
        })

        // facem in functia renderTable updatarea array-ului original si a UI in sine + iscellEmpty 
        // daca voiam sa o facem in gameController trebuia sa mai cream o matrice si sa updatam cumva
        // indexul atunci cand facem o miscare , asa e asociat fiecare click cu indexul respectiv
      
    }

    playAgainBtn.addEventListener('click', function(){
        if(game.getGameStatus()){
            
           game.resetGameController();
        }else {
            
        }
    })

    playAgainBtn.style.display = "none";

    const resetTheUI = () => {
        tableBoard.innerHTML = " ";
        renderTable();
        playAgainBtn.style.display = " none";
        output.textContent = ' ';

    }

    const getNewTable = () => boardData;



    return { renderTable , getNewTable , resetTheUI, output , playAgainBtn} // am folosit Table pt UI si board pt partea de schelete 
}

function gameBoard() {
    // scheletele board-ului sa il numesc asa 
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


function createPlayer(sign,color) { 

    const getSign = () => sign ;
    const getColor = () => color;
    return { getSign , getColor };

}


function gameControler(){

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
        


    const gameUI = UI();
    gameUI.renderTable();

    const playerOne = createPlayer('X','#f76b8a');
    const playerTwo = createPlayer('O','#fcfefe');

    let gameOVER = false; // responsabila de state-ul jocului
    let gamesCounter = 0;

    let activePlayer = playerOne;
    let gameTable = gameUI.getNewTable(); // luam tabla
    
    


    const switchPlayer = () => {

        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;

    }



    const checkWinConditions = (sign) => {
        for (let condition of winConditions) {
            let win = true; // presupunem ca ea este true initial
    
            for (let [row, col] of condition) {
                if (gameTable[row][col] !== sign) {
                    win = false; // daca gasim macar una cu sign diferit
                    break;
                }
            }
    
            if (win || gamesCounter === 9 ) {
                
                
                gameOVER = true;
                gameUI.playAgainBtn.style.display = 'block';

                if(gamesCounter < 9){// distingem afisarea castigatorului in functie de daca a catigat
                                    //cineva sau nu
                    gameUI.output.textContent = "The winner is : " + sign;
                }else{
                    gameUI.output.textContent = "Nobody won!";
                }

                return true;
            }

        }
        
        return false;
    };


    const makeMove = (arrayCell,arrayIndex, displayValue) => {
            gamesCounter = gamesCounter + 1;
        //row[element] element fiind indexul array-ului , iar row este ales in functie de div-ul apasat
        //folosim varianta asta ptca asa modifica si matricea boardData declarata in functia UI 
            if(gameOVER === false){


                arrayCell[arrayIndex] = activePlayer.getSign();
                displayValue.textContent = activePlayer.getSign();
                displayValue.style.color = activePlayer.getColor();
                checkWinConditions(activePlayer.getSign());
                switchPlayer();

                
               
            }

            else if(gameOVER === true){
                
            }
           
            
        
    }

    const resetGameController= () => {
         gameOVER = false;
         activePlayer = playerOne;
         gamesCounter = 0;
         for (let i = 0; i < gameTable.length; i++) {
            for (let j = 0; j < gameTable[i].length; j++) {
                gameTable[i][j] = j; 
            }
        }

        gameUI.resetTheUI();
        console.log(gameTable);


    }


    const getGameStatus = () => gameOVER;

    return { makeMove , resetGameController, getGameStatus  }
}


const game = gameControler()

   
 
