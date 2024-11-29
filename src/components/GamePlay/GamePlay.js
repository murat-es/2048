import React, { useEffect, useState } from 'react'
import './GamePlay.css'

const GamePlay = () => {

  // const [animation, setAnimation] = useState(false);

  const [board, setBoard] = useState(
    [
      ["1", "2", "3", "4"],
      ["", "6", "", "8"],
      ["", "", "11", "12"],
      ["13", "14", "15", "16"],
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

    console.log("empty", emptyCells)


    let selectRandomTile = Math.floor(Math.random() * emptyCells.length);
    let rowIndex = emptyCells[selectRandomTile][0];
    let columnIndex = emptyCells[selectRandomTile][1];

    let newBoard = board;
    newBoard[rowIndex][columnIndex] = "2";

    console.log("yeni board", newBoard)

    setBoard(newBoard);


  }

  useEffect(() => {
  }, [])

  console.log("board", board)


  // const handleKeyDown = (event) => {
  //   console.log("aa", event.key)
  //   if (event.key === 'ArrowRight') {
  //     setAnimation(true);
  //   }
  // }

  // const anim = animation ? "animation" : "";
  // const classes = `container ${anim}`

  // const number = Array.from({ length: 16 }, (_, i) => i + 1); // 1'den 16'ya kadar numaralar



  return (
    // <div onKeyDown={handleKeyDown} tabIndex={0} className={classes}>GamePlay</div>
    <div className='gameBoard' onClick={() => { generateRandomTiles(board) }}>
      {board.map((number, i) => {
        console.log("number", number);

        return (
          <div key={i} className='row'>
            {
              number.map((item, index) => (
                <div key={index} className='grid-item'>
                  {item}
                </div>
              ))
            }
          </div>
        )
      }
      )}
    </div>
  )
}

export default GamePlay