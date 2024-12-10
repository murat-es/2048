import './App.css';
import GameInfo from './components/GameInfo/GameInfo';
import GamePlay from './components/GamePlay/GamePlay';
import React, { useEffect, useState } from 'react';

function App() {
  const [board, setBoard] = useState(
    [
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
    ]
  );

  const generateRandomTiles = (board, randomCount) => {

    const emptyCells = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "") {
          emptyCells.push([i, j])
        }
      }
    }

    if(emptyCells.length === 0) return;

    let newBoard=[...board]
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

  useEffect(()=>{
    const randomCountAtTheBeginning = 2;
    generateRandomTiles(board, randomCountAtTheBeginning);
  }, [])

  return (
    <div className="App" >
      <div className="gameContainer">
      <GameInfo generateRandomTiles={generateRandomTiles} />
      <GamePlay board={board} setBoard={setBoard}/>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
