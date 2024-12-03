import React, { useEffect, useState } from 'react'
import './GamePlay.css'

const GamePlay = () => {

  // const [animation, setAnimation] = useState(false);

  const [board, setBoard] = useState(
    [
      ["", 8, 2, ""],
      [2, "", "", ""],
      [4, 2, "", ""],
      [8, 2, "", ""],
    ]
  );

  console.log("board", board)

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

  const moveDown = (board) => {
    const newBoard = [...board];

    const boardLength = board.length;

    for (let i =  boardLength- 1; i>=0; i--) {
      for (let j = boardLength -1 ; j >= 0; j--) {

        // her hücre boşsa hiçbir şey yapma
        if(board[i][j] === ""){ 
        console.log("ilk -->  i: ", i, "  j:", j, " -> " )

          continue;
        }
        const a = board[i][j];


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

          // eski hücreleri sıfırla
          // board[i][j] = "";
          // board[previous][j] = "";
        }

        console.log("normal -->  i: ", i, "  j:", j, " -> " , multipleTile )



        if(i === boardLength - 1){
          console.log("buraya girdi  mi: ", i, "  j:", j, " -> " , multipleTile )
          board[i][j] = multipleTile;
        }
        else {
          // önünde dolu hücre bulana kadar ilerle
          let next=i;
          while (next < boardLength - 1 && board[next + 1][j] === "") {
            next++;
            
          }
          console.log("next -->  i: ", next, "  j:", j, " -> " , multipleTile )

          
          board[next][j] = multipleTile;
        }

        
      }
    }

    setBoard(newBoard);
  }


  const moveRight = (board) => {
    const newBoard = [...board];

    const boardLength = board.length;

    for (let i = 0; i >= 0; i--) {
      for (let j = boardLength -1 ; j >= 0; j--) {

        if(board[i][j] === ""){
          continue;
        }

        console.log("j", j)
        console.log("şu anki i,j değeri", newBoard[i][j])
       

        let tempJ = j;
        while (tempJ >= 0) {
          tempJ--;



          if(tempJ < 0) {

            let forwardJ = j+1;
            while (forwardJ < boardLength - 1 && newBoard[i][forwardJ] == "") {
              forwardJ++;
            }
            console.log("aaaaaaaaaaaaaaaaaaaaa", newBoard[i][forwardJ], " --- ", forwardJ)
            newBoard[i][forwardJ] = newBoard[i][j];
            newBoard[i][j] = "" 
            
            break;
          }

          if (board[i][tempJ] === "") continue;
          

          let multipleTile = board[i][tempJ] * board[i][j];
          // console.log("j", j , " - board",boardLength)


          if (j + 1 === boardLength) {
            newBoard[i][j] = multipleTile;
            newBoard[i][tempJ] = "";
            console.log("a")

          }
          else {
            console.log("b")

            let forwardJ = j+1;
            while (forwardJ < boardLength - 1 && newBoard[i][forwardJ] == "") {
                forwardJ++;
            }
            newBoard[i][forwardJ] = multipleTile;
            newBoard[i][j] = "";
            newBoard[i][tempJ] = "";
          }
          
          break;
        }

        // console.log("b ", i , "", j)
        // console.log("b ", board[i][j], " 1")

        // let temJForward = j;
        // while (board[i][tempJ] == "")
        // {
        //   temJForward++;
        // }
        // board[i][temJForward] = board[i][j];

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
      <button onClick={()=>{moveRight(board)}}>moveRight</button>
      <button onClick={()=>{moveDown(board)}}>moveDown</button>
    </div>
  )
}

export default GamePlay