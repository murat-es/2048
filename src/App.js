import './App.css';
import GameInfo from './components/GameInfo/GameInfo';
import GamePlay from './components/GamePlay/GamePlay';
import React, { useEffect, useState } from 'react';

function App() {

  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [newCellIndexList, setNewCellIndexList] = useState([{}]);
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

    if (!bestScoreStorage) {
      localStorage.setItem("bestScore", bestScore.toString());
    }
    else {
      setBestScore(parseInt(bestScoreStorage))
    }

    const randomCountAtTheBeginning = 2;
    generateRandomTiles(board, randomCountAtTheBeginning);
  }, [])

  useEffect(() => {
    let isGameOver = checkIsGameOver(board);
    if(isGameOver) setIsGameOver(isGameOver);

  }, [board])

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
    let newCellIndexList = []
    for (let index = 0; index < randomCount; index++) {


      let selectRandomTile = Math.floor(Math.random() * emptyCells.length);
      let rowIndex = emptyCells[selectRandomTile][0];
      let columnIndex = emptyCells[selectRandomTile][1];

      let cellIndex = {i: rowIndex, j: columnIndex}
      newCellIndexList.push(cellIndex);

      newBoard = newBoard.map((row, rIndex) =>
        rIndex === rowIndex
          ? row.map((cell, cIndex) => (cIndex === columnIndex ? 2 : cell))
          : row
      );

    }

    setNewCellIndexList(newCellIndexList);
    setBoard(newBoard);
  }

  const checkIsGameOver = (board) => {
    const boardLength = board.length;

    for (let i = 0; i < boardLength; i++) {
      for (let j = 0; j < boardLength; j++) {
        if(board[i][j] === "") return false; 
        if(i-1 >= 0 && board[i][j] === board[i-1][j]) return false;
        if(j-1 >= 0 && board[i][j] === board[i][j-1]) return false;
        if(i+1 < boardLength && board[i][j] === board[i+1][j]) return false;
        if(j+1 < boardLength && board[i][j] === board[i][j+1]) return false;
      }
    }

    return true;
  }

  return (
    <div className="App" >
      <div className="gameContainer">
        <GameInfo score={score} setScore={setScore} bestScore={bestScore} generateRandomTiles={generateRandomTiles} setIsGameOver={setIsGameOver}/>
        <GamePlay board={board} score={score} setScore={setScore} bestScore={bestScore} setBestScore={setBestScore} 
                  generateRandomTiles={generateRandomTiles} isGameOver={isGameOver} newCellIndexList={newCellIndexList} />
      </div>
    </div>
  );
}

export default App;
