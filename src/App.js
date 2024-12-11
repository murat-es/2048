import './App.css';
import GameInfo from './components/GameInfo/GameInfo';
import GamePlay from './components/GamePlay/GamePlay';
import React, { useEffect, useState } from 'react';

function App() {

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [board, setBoard] = useState(
    [
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
    ]
  );

  useEffect(() => {

    let bestScoreStorage = localStorage.getItem("bestScore");
    console.log("high", bestScoreStorage)

    if (!bestScoreStorage) {
      localStorage.setItem("bestScore", bestScore.toString());
    }
    else {
      setBestScore(parseInt(bestScoreStorage))
    }

    const randomCountAtTheBeginning = 2;
    generateRandomTiles(board, randomCountAtTheBeginning);
  }, [])

  const generateRandomTiles = (board, randomCount) => {

    const emptyCells = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "") {
          emptyCells.push([i, j])
        }
      }
    }

    if (emptyCells.length === 0) return;

    let newBoard = [...board]
    for (let index = 0; index < randomCount; index++) {


      let selectRandomTile = Math.floor(Math.random() * emptyCells.length);
      let rowIndex = emptyCells[selectRandomTile][0];
      let columnIndex = emptyCells[selectRandomTile][1];

      newBoard = newBoard.map((row, rIndex) =>
        rIndex === rowIndex
          ? row.map((cell, cIndex) => (cIndex === columnIndex ? 2 : cell))
          : row
      );

    }
    setBoard(newBoard);
  }



  return (
    <div className="App" >
      <div className="gameContainer">
        <GameInfo score={score} setScore={setScore} bestScore={bestScore} generateRandomTiles={generateRandomTiles} />
        <GamePlay board={board} score={score} setScore={setScore} bestScore={bestScore} setBestScore={setBestScore} generateRandomTiles={generateRandomTiles} />
      </div>
    </div>
  );
}

export default App;
