import { useState } from 'react';
import './App.css';
import { BoardComponent } from './components/Board';
import { generateBoard } from './utils/board';
import type { Board } from './types/types';
import { numberOfMine, size } from './components/Board';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState<Board>(() => generateBoard(size, size, numberOfMine));

  if (!gameStarted) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "5rem",
      }}>
        <h1 style={{
          fontSize: "4rem",
          color: "black",
          margin: 0,
        }}>
          💣Mine Sweeper
        </h1>
        <button
          onClick={() => setGameStarted(true)}
          style={{
            fontSize: "1.5rem",
            padding: "1rem 3rem",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "transform 0.2s",
            background: "#667eea",
            color: "white",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          START GAME
        </button>
      </div>
    );
  }

  return (
    <div style={{
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      gap: "1rem",
      color: "black",
    }}>
      <h1>Mine Sweeper ⛏️</h1>

      <BoardComponent board={board} setBoard={setBoard} />

      <button
        onClick={() => setBoard(generateBoard(size, size, numberOfMine))}
        style={{
          fontSize: "1.5rem",
          padding: "1rem 2rem",
          cursor: "pointer",
          background: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        RESTART
      </button>
    </div>
  );
}
export default App