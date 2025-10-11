import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { generateBoard } from "../utils/board";
import { Cell } from "./Cell";
export const size = 15;
export const numberOfMine = Math.floor(size * size / 10);
export let chainedblock = 0;
export let firstblock = false;
export function resetBoardState() {
    chainedblock = 0;
    firstblock = false;
}
const screenSize = Math.min(window.innerWidth, window.innerHeight);
const cellSize = Math.floor(screenSize / size) * 0.65;
export const BoardComponent = ({ board, setBoard }) => {
    const [isGameActive, setIsGameActive] = useState(true);
    const startTimeRef = useRef(0);
    const handleGameClear = () => {
        setIsGameActive(false);
    };
    const handleGameOver = () => {
        setIsGameActive(false);
    };
    const handleClick = (r, c) => {
        if (!isGameActive)
            return;
        if (!firstblock) {
            let newBoard;
            while (true) {
                newBoard = generateBoard(size, size, numberOfMine);
                if (!newBoard[r][c].isMine) {
                    break;
                }
            }
            newBoard[r][c].isOpen = true;
            firstblock = true;
            startTimeRef.current = Date.now();
            if (newBoard[r][c].neighborMines === 0) {
                chainOpen(newBoard, newBoard[r][c]);
            }
            setBoard(newBoard);
        }
        else {
            const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
            newBoard[r][c].isOpen = true;
            if (newBoard[r][c].neighborMines === 0 && !newBoard[r][c].isMine) {
                chainOpen(newBoard, newBoard[r][c]);
            }
            setBoard(newBoard);
        }
    };
    return (_jsx("div", { style: {
            display: "grid",
            gridTemplateColumns: `repeat(${size}, ${cellSize + 6}px)`,
            gap: 0,
            paddingBottom: "50px",
        }, children: board.map((row, r) => row.map((cell, c) => (_jsx(Cell, { cell: cell, cellSize: cellSize, board: board, startTime: startTimeRef.current, onClick: (newBoard) => {
                if (newBoard) {
                    setBoard(newBoard);
                }
                else {
                    handleClick(r, c);
                }
            }, onGameClear: handleGameClear, onGameOver: handleGameOver }, `${r}-${c}`)))) }));
};
function chainOpen(board, cell) {
    const move = [-1, 0, 1];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i === 1 && j === 1) {
                continue;
            }
            const nr = cell.row + move[i], nc = cell.col + move[j];
            if (0 <= nr && nr < board.length && 0 <= nc && nc < board[0].length
                && !board[nr][nc].isMine && !board[nr][nc].isOpen) {
                chainedblock++;
                board[nr][nc].isOpen = true;
                if (board[nr][nc].neighborMines === 0) {
                    chainOpen(board, board[nr][nc]);
                }
            }
        }
    }
}
