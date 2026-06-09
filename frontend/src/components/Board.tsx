import React, { useCallback, useRef, useState } from "react";
import type { Board } from "../types/types";
import { generateBoard } from "../utils/board";
import { Cell } from "./Cell";

export const size = 15;
export const numberOfMine = Math.floor(size * size / 10);

const API_BASE_URL = "https://1r2mypgiag.execute-api.ap-southeast-2.amazonaws.com/prod";

interface Props {
    board: Board;
    setBoard: React.Dispatch<React.SetStateAction<Board>>;
    flaggingMode: boolean;
    onGameOver: () => void;
    onGameClear: () => void;
    userName: string;
}

const calculateCellSize = () => {
    const containerSize = Math.min(window.innerWidth, 500);
    const safePadding = 30;
    return Math.floor((containerSize - safePadding) / size);
};

const initialCellSize = calculateCellSize();

export const BoardComponent: React.FC<Props> = ({ board, setBoard, flaggingMode, onGameOver, onGameClear, userName }) => {
    const [isGameActive, setIsGameActive] = useState(true);
    const [hasClickedOnce, setHasClickedOnce] = useState(false);
    const startTimeRef = useRef<number>(0);
    const chainedblockRef = useRef(0);
    const openedblockRef = useRef(0);

    const handleGameOver = () => {
        setIsGameActive(false);
        onGameOver();
    };

    const handleManualOpen = useCallback(() => {
        openedblockRef.current++;
        if (chainedblockRef.current + openedblockRef.current + numberOfMine >= size * size) {
            const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
            setIsGameActive(false);
            onGameClear();
            alert("🎊 Game Clear!\n in " + timeTaken + " seconds!");
            fetch(`${API_BASE_URL}/scores`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    player_name: userName,
                    time_taken: timeTaken,
                    blocks: (size * size),
                }),
            })
            .then(res => res.json())
            .catch(err => console.error('API Error:', err));
        }
    }, [onGameClear, userName]);

    const currentCellSize = initialCellSize;
    const handleClick = (r: number, c: number) => {
        if (!isGameActive) return;
        if (!hasClickedOnce) {
            let newBoard: Board;
            do {
                newBoard = generateBoard(size, size, numberOfMine);
            } while (newBoard[r][c].isMine || newBoard[r][c].neighborMines !== 0);
            newBoard[r][c].isOpen = true;
            setHasClickedOnce(true);
            startTimeRef.current = Date.now();
            chainedblockRef.current += chainOpen(newBoard, newBoard[r][c]);
            setBoard(newBoard);
        } else {
            const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
            newBoard[r][c].isOpen = true;
            if (newBoard[r][c].neighborMines === 0 && !newBoard[r][c].isMine) {
                chainedblockRef.current += chainOpen(newBoard, newBoard[r][c]);
            }
            setBoard(newBoard);
        }
    };
    return (
        <div style={{
            display: "grid",
            justifyContent: "center",
            alignContent: "center",
            gridTemplateColumns: `repeat(${size}, ${currentCellSize}px)`,
            gridTemplateRows: `repeat(${size}, ${currentCellSize}px)`,

            gap: "1px",
            background: "black",
            border: "1px solid black",
            width: `${currentCellSize * size + (size - 1)}px`,
            borderRadius: "8px",
        }}>
            {board.map((row, r) =>
                row.map((cell, c) => (
                    <Cell
                        key={`${r}-${c}`}
                        cell={cell}
                        cellSize={currentCellSize}
                        board={board}
                        hasClickedOnce={hasClickedOnce}
                        onClick={(newBoard) => {
                            if (newBoard) {
                                setBoard(newBoard);
                            } else {
                                handleClick(r, c);
                            }
                        }}
                        onGameOver={handleGameOver}
                        isGameActive={isGameActive}
                        flaggingMode={flaggingMode}
                        onManualOpen={handleManualOpen}
                    />
                ))
            )}
        </div>
    );
};

function chainOpen(board: Board, cell: Board[0][0]): number {
    let count = 0;
    const move = [-1, 0, 1];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i === 1 && j === 1) continue;
            const nr = cell.row + move[i], nc = cell.col + move[j];
            if (0 <= nr && nr < board.length && 0 <= nc && nc < board[0].length
                && !board[nr][nc].isMine && !board[nr][nc].isOpen) {
                board[nr][nc].isOpen = true;
                count++;
                if (board[nr][nc].neighborMines === 0) {
                    count += chainOpen(board, board[nr][nc]);
                }
            }
        }
    }
    return count;
}
