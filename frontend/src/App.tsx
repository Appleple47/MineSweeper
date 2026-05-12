import { useEffect, useState } from 'react';
import './App.css';
import { generateBoard } from './utils/board';
import type { Board } from './types/types';
import { numberOfMine, size, BoardComponent, resetBoardState } from './components/Board';
import { resetCellState } from "./components/Cell";
export let UserName = ' ';


function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState<Board>(() => generateBoard(size, size, numberOfMine));
  const [username, setUsername] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [start, setStart] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [flaggingMode, setFlaggingMode] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const startGame = () => {
    if (username.trim() !== '') {
      UserName = username;
      setStart(Date.now());
      setElapsedTime(0);
      setGameStarted(true);
      setFlaggingMode(false);
    } else {
      alert('名前を入力してください。\nInput your username.');
    }
  };

  const restartGame = () => {
    resetCellState();
    resetBoardState();
    setBoard(generateBoard(size, size, numberOfMine));
    setStart(Date.now());
    setElapsedTime(0);
    setIsGameOver(false);
    setFlaggingMode(false);
    setGameKey(k => k + 1);
  };

  useEffect(() => {
    if (!gameStarted) return;
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, start]);

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

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              fontSize: "1.2rem",
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              border: "2px solid #667eea",
              width: "300px",
              textAlign: "left",
            }}
          />
        </div>
        <button
          onClick={startGame}
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
  if (isGameOver) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        gap: "1rem",
        color: "black",
      }}>
        <h1>Mine Sweeper ⛏️</h1>
        <BoardComponent
          key={gameKey}
          board={board}
          setBoard={setBoard}
          flaggingMode={false}
          onGameOver={() => setIsGameOver(true)}
          onGameClear={() => setIsGameOver(true)}
        />
        <button
          onClick={restartGame}
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

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      gap: "1rem",
      color: "black",
    }}>
      <h1>Mine Sweeper ⛏️</h1>
      <h2>👤 {username}</h2>
      <h2>⏰Time: {elapsedTime}</h2>
      <BoardComponent
        key={gameKey}
        board={board}
        setBoard={setBoard}
        flaggingMode={flaggingMode}
        onGameOver={() => setIsGameOver(true)}
        onGameClear={() => setIsGameOver(true)}
      />
      <div style={{
          display: "flex",
          justifyContent: "space-between",
          width: "min(400px, 90vw)",
          marginTop: "20px",
        }}>
        <button
          onClick={restartGame}
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
        <button
          onClick={() => setFlaggingMode(f => !f)}
          style={{
            fontSize: "1.5rem",
            padding: "1rem 2rem",
            cursor: "pointer",
            background: flaggingMode ? '#e91e63' : '#a0aec0',
            color: "white",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          {flaggingMode ? "🚩: ON" : " 🚩: OFF"}
        </button>
      </div>
    </div>
  );
}
export default App