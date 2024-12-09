import React, { useEffect, useState } from 'react'
import './GamePlay.css'

const GamePlay = () => {


  const [board, setBoard] = useState(
    [
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", 2, ""],
      ["", "", "", ""],
    ]
  );


  const generateRandomTiles = (board) => {

    const emptyCells = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "") {
          emptyCells.push([i, j])
        }
      }
    }

    if(emptyCells.length === 0) return;


    let selectRandomTile = Math.floor(Math.random() * emptyCells.length);
    let rowIndex = emptyCells[selectRandomTile][0];
    let columnIndex = emptyCells[selectRandomTile][1];

    const newBoard = board.map((row, rIndex) =>
      rIndex === rowIndex
        ? row.map((cell, cIndex) => (cIndex === columnIndex ? 2 : cell))
        : row
    );
 
    setBoard(newBoard);
  }

  const moveUp = (board) => {
    const newBoard = [...board];

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

    setBoard(newBoard);
    // generateRandomTiles(board);
  }

  const moveDown = (board) => {
    const newBoard = [...board];

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

    setBoard(newBoard);
    // generateRandomTiles(board);
  }

  const moveRight = (board) => {
    const newBoard = [...board];

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

    setBoard(newBoard);
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

    setBoard(newBoard);
  }

  // useEffect(() => {
  //   generateRandomTiles(board);
  // }, [])



  // const handleKeyDown = (event) => {
  //   console.log("aa", event.key)
  //   if (event.key === 'ArrowRight') {
  //     setAnimation(true);
  //   }
  // }

  // const anim = animation ? "animation" : "";
  // const classes = `container ${anim}`

  // const number = Array.from({ length: 16 }, (_, i) => i + 1); // 1'den 16'ya kadar numaralar

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

  return (
    // <div onKeyDown={handleKeyDown} tabIndex={0} className={classes}>GamePlay</div>
    <div>

    <div className='gameBoard' onClick={() => { generateRandomTiles(board) }}>
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