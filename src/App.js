import './App.css';
import GameInfo from './components/GameInfo/GameInfo';
import GamePlay from './components/GamePlay/GamePlay';
import React, { useEffect, useState } from 'react';

function App() {

  const [isGameOver, setIsGameOver] = useState(false);
  const [newCellIndexList, setNewCellIndexList] = useState([{}]);
  const [playAnimation, setPlayAnimation] = useState(false);

  const getInitialBoard = () => {
    const storedBoard = localStorage.getItem("board");
    return storedBoard
    ? JSON.parse(storedBoard)
    : [
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
    ]; 
  };
  
  const getCurrentScore = () => {
    const currentScoreStorage = localStorage.getItem("currentScore");
    return currentScoreStorage
    ? parseInt(currentScoreStorage): 0; 
  };
  
  const getBestScore = () => {
    const bestScoreStorage = localStorage.getItem("bestScore");
    return bestScoreStorage
    ? parseInt(bestScoreStorage): 0; 
  };
  
  const [board, setBoard] = useState(getInitialBoard);
  const [bestScore, setBestScore] = useState(getBestScore);
  const [score, setScore] = useState(getCurrentScore);

  useEffect(() => {

    const boardStorage = localStorage.getItem("board");
    if(!boardStorage) {
      const randomCountAtTheBeginning = 2;
      generateRandomTiles(board, randomCountAtTheBeginning);
    }
  }, [])

  useEffect(() => {
    let isGameOver = checkIsGameOver(board);
    if(isGameOver) setIsGameOver(isGameOver);

    localStorage.setItem("board", JSON.stringify(board));


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
    let generatedIndex = new Set();
    for (let index = 0; index < randomCount; index++) {

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * emptyCells.length);
      } while (generatedIndex.has(randomIndex));
    
      generatedIndex.add(randomIndex);

      let rowIndex = emptyCells[randomIndex][0];
      let columnIndex = emptyCells[randomIndex][1];

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
    triggerAnimation()
  }

  const triggerAnimation = () => {
    setPlayAnimation(false); 
    setTimeout(() => setPlayAnimation(true), 0);
  };

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
        <GamePlay board={board} score={score} setScore={setScore} bestScore={bestScore} setBestScore={setBestScore} playAnimation={playAnimation }
                  generateRandomTiles={generateRandomTiles} isGameOver={isGameOver} newCellIndexList={newCellIndexList} />
      </div>
    </div>
  );
}

export default App;
