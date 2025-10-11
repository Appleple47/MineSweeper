import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './App.css';
import { generateBoard } from './utils/board';
import { numberOfMine, size, BoardComponent, resetBoardState } from './components/Board';
import { gameovered, resetCellState } from "./components/Cell";
export let UserName = ' ';
function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [board, setBoard] = useState(() => generateBoard(size, size, numberOfMine));
    const [username, setUsername] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [start, setStart] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const startGame = () => {
        if (username.trim() !== '') {
            UserName = username;
            setStart(Date.now());
            setElapsedTime(0);
            setGameStarted(true);
        }
        else {
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
    };
    useEffect(() => {
        if (!gameStarted)
            return;
        const timer = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - start) / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }, [gameStarted, start]);
    if (!gameStarted) {
        return (_jsxs("div", { style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                gap: "5rem",
            }, children: [_jsx("h1", { style: {
                        fontSize: "4rem",
                        color: "black",
                        margin: 0,
                    }, children: "\uD83D\uDCA3Mine Sweeper" }), _jsx("div", { style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                    }, children: _jsx("input", { type: "text", placeholder: "Enter your username", value: username, onChange: (e) => setUsername(e.target.value), style: {
                            fontSize: "1.2rem",
                            padding: "0.8rem 1rem",
                            borderRadius: "8px",
                            border: "2px solid #667eea",
                            width: "300px",
                            textAlign: "left",
                        } }) }), _jsx("button", { onClick: startGame, style: {
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
                    }, onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.05)", onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)", children: "START GAME" })] }));
    }
    if (gameovered) {
        return (_jsxs("div", { style: {
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                gap: "1rem",
                color: "black",
            }, children: [_jsx("h1", { children: "Mine Sweeper \u26CF\uFE0F" }), _jsx(BoardComponent, { board: board, setBoard: setBoard }), _jsx("button", { onClick: restartGame, style: {
                        fontSize: "1.5rem",
                        padding: "1rem 2rem",
                        cursor: "pointer",
                        background: "#667eea",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        transition: "transform 0.2s",
                    }, onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.05)", onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)", children: "RETURN" })] }));
    }
    return (_jsxs("div", { style: {
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            gap: "1rem",
            color: "black",
        }, children: [_jsx("h1", { children: "Mine Sweeper \u26CF\uFE0F" }), _jsxs("h2", { children: ["\uD83D\uDC64 ", username] }), _jsxs("h2", { children: ["\u23F0Time: ", elapsedTime] }), _jsx(BoardComponent, { board: board, setBoard: setBoard }), _jsx("button", { onClick: () => {
                    setBoard(generateBoard(size, size, numberOfMine));
                    setStart(Date.now());
                    setElapsedTime(0);
                }, style: {
                    fontSize: "1.5rem",
                    padding: "1rem 2rem",
                    cursor: "pointer",
                    background: "#667eea",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s",
                }, onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.05)", onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)", children: "RESTART" })] }));
}
export default App;
