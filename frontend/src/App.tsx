import { useState } from 'react';
import './App.css';
import { BoardComponent } from './components/Board';
import { generateBoard } from './utils/board';
import type { Board } from './types/types';
import { numberOfMine, size } from './components/Board';
import { gameovered } from "./components/Cell";
export let UserName = ' ';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState<Board>(() => generateBoard(size, size, numberOfMine));
  const [username, setUsername] = useState('');
  const startGame = () => {
    if (username.trim() !== '') {
      UserName = username;
      setGameStarted(true);
    } else {
      alert('ユーザー名を入力してください。');
    }
  };

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
  if(gameovered){
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
          onClick={() => location.reload() }
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
          RETURN
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
      <h1>{username}</h1>
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