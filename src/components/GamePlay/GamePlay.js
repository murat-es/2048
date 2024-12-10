import React, { useEffect } from 'react'
import './GamePlay.css'

const GamePlay = ({board, generateRandomTiles}) => {

  const randomCellCountOnEveryMove = 1;

  const moveUp = (board) => {

    const boardLength = board.length;

    for (let i = 0; i < boardLength; i++) {
      for (let j = boardLength -1 ; j >= 0; j--) {

        // eğer hücre boşsa hiçbir şey yapma
        if(board[i][j] === ""){ 
          continue;
        }


        let multipleTile = 0;
        if (i === boardLength - 1) { // boardın ilk hücresi ise kendi değerini al
          multipleTile = board[i][j];
          board[i][j] = "";
        }
        else { // eğer gerisindeki hücre(ler)de bir değer varsa ikisinin çarpımını al
          
          let previous = i + 1;
          while (previous < boardLength - 1 && board[previous][j] === "") {
            previous++;
          }

          if(board[previous][j] === "") {
            multipleTile = board[i][j];
            board[i][j] = "";
          }
          else {

            if(board[i][j] === board[previous][j]){
              multipleTile = board[i][j] * 2;
              board[i][j] = "";
              board[previous][j] = "";

            }
            else{ 
              multipleTile = board[i][j];
              board[i][j] = "";
            }
          }

        }




        if(i === 0){
            board[i][j] = multipleTile;
        }
        else {
          // önünde dolu hücre bulana kadar ilerle
          let next=i;
          while (next > 0 && board[next - 1][j] === "") {
            next--;
            
          }
          
          board[next][j] = multipleTile;
        }

        
      }
    }

    generateRandomTiles(board, randomCellCountOnEveryMove);

  }

  const moveDown = (board) => {

    const boardLength = board.length;

    for (let i =  boardLength- 1; i>=0; i--) {
      for (let j = boardLength -1 ; j >= 0; j--) {

        // eğer hücre boşsa hiçbir şey yapma
        if(board[i][j] === ""){ 
          continue;
        }


        let multipleTile = 0;
        if (i === 0) { // boardın ilk hücresi ise kendi değerini al
          multipleTile = board[i][j];
          board[i][j] = "";
        }
        else { // eğer gerisindeki hücre(ler)de bir değer varsa ikisinin çarpımını al
          
          let previous = i - 1;
          while (previous > 0 && board[previous][j] === "") {
            previous--;
          }

          if(board[previous][j] === "") {
            multipleTile = board[i][j];
            board[i][j] = "";
          }
          else {
            if(board[i][j] === board[previous][j]){
              multipleTile = board[i][j] * 2;
              board[previous][j] = "";

            }
            else{ 
              multipleTile = board[i][j];
              board[i][j] = "";
            }
          }

        }




        if(i === boardLength - 1){
            board[i][j] = multipleTile;
        }
        else {
          // önünde dolu hücre bulana kadar ilerle
          let next=i;
          while (next < boardLength - 1 && board[next + 1][j] === "") {
            next++;
            
          }
          
          board[next][j] = multipleTile;
        }

        
      }
    }

    generateRandomTiles(board, randomCellCountOnEveryMove);

  }

  const moveRight = (board) => {

    const boardLength = board.length;

    for (let i = 0; i < boardLength; i++) {
      for (let j = boardLength - 1 ; j >= 0; j--) {

        // eğer hücre boşsa hiçbir şey yapma
        if(board[i][j] === ""){ 
          continue;
        }
        


        let multipleTile = 0;
        if (j === 0) { // boardın son hücresi ise kendi değerini al
          multipleTile = board[i][j];
          board[i][j] = "";
        }

        else { // eğer gerisindeki hücre(ler)de bir değer varsa ikisinin çarpımını al
          
          let previous = j - 1;
          while (previous > 0 && board[i][previous] === "") {
            previous--;
          }

          if(board[i][previous] === "") { // dolu hücre bulamamışsa kendisini ata
            multipleTile = board[i][j];
            board[i][j] = "";
          }
          else { // dolu hücre varsa çarpımını al

            if(board[i][j] === board[i][previous]){
              multipleTile = board[i][j] * 2;
              board[i][previous] = "";
              board[i][j] = "";
            }
            else{ 
              multipleTile = board[i][j];
              board[i][j] = "";
            }
          }

        }




        if(j === boardLength - 1){ // eğer hareket yönündeki ilk hücre ise
            board[i][j] = multipleTile;
        }
        else {
          // önünde dolu hücre bulana kadar ilerle
          let next=j;
          while (next < boardLength - 1 && board[i][next+1] === "") {
            next++;
            
          }
          
          board[i][next] = multipleTile;
        }

      }
    }

    generateRandomTiles(board, randomCellCountOnEveryMove);

  }


  const moveLeft = (board) => {
    const newBoard = [...board];

    const boardLength = board.length;

    for (let i = 0; i < boardLength; i++) {
      for (let j = 0 ; j < boardLength; j++) {

        // eğer hücre boşsa hiçbir şey yapma
        if(board[i][j] === ""){ 
          continue;
        }


        let multipleTile = 0;
        if (j === boardLength - 1) { // boardın son hücresi ise kendi değerini al
          multipleTile = board[i][j];
          board[i][j] = "";
        }

        else { // eğer gerisindeki hücre(ler)de bir değer varsa ikisinin çarpımını al
          
          let previous = j + 1;
          while (previous < boardLength && board[i][previous] === "") {
            previous++;
          }

          if(board[i][previous] === "") { // dolu hücre bulamamışsa kendisini ata
            multipleTile = board[i][j];
            board[i][j] = "";
          }
          else { // dolu hücre varsa çarpımını al

            if(board[i][j] === board[i][previous]){
              multipleTile = board[i][j] * 2;
              board[i][previous] = "";
              board[i][j] = "";
            }
            else{ 
              multipleTile = board[i][j];
              board[i][j] = "";
            }
          }

        }




        if(j === 0){
            board[i][j] = multipleTile;
        }
        else {
          // önünde dolu hücre bulana kadar ilerle
          let next=j;
          while (next > 0 && board[i][next-1] === "") {
            next--;
            
          }
          
          board[i][next] = multipleTile;
        }

      }
    }

    generateRandomTiles(board, randomCellCountOnEveryMove);

  }


  const handleCellColor = (number) => {
    let classes = "grid-item"
    if(number === 2) {
      return classes + " cell2"
    }
    if(number === 4) {
      return classes + " cell4"
    }
    if(number === 8) {
      return classes + " cell8"
    }
    if(number === 16) {
      return classes + " cell16"
    }
    if(number === 32) {
      return classes + " cell32"
    }
    if(number === 64) {
      return classes + " cell64"
    }
    if(number === 128) {
      return classes + " cell128"
    }
    if(number === 256) {
      return classes + " cell256"
    }
    else {
      return classes
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      moveUp(board)
    } else if (event.key === "ArrowDown") {
      moveDown(board)
    } else if (event.key === "ArrowLeft") {
      moveLeft(board)
    } else if (event.key === "ArrowRight") {
      moveRight(board)
    }
  };


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);


    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [board]); 



  return (
    <div>

    <div className='gameBoard'>
      {board.map((number, i) => {
        
        return (
          <div key={i} className='row'>
            {
              number.map((item, index) => (
                <div key={index} className={handleCellColor(item)}>
                  {item}
                </div>
              ))
            }
          </div>
        )
      }
    )}
    </div>
      <button onClick={()=>{moveLeft(board)}}>moveLeft</button>
      <button onClick={()=>{moveRight(board)}}>moveRight</button>
      <button onClick={()=>{moveUp(board)}}>moveUp</button>
      <button onClick={()=>{moveDown(board)}}>moveDown</button>
    </div>
  )
}

export default GamePlay