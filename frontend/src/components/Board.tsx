import React, { useRef, useState } from "react";
import type { Board } from "../types/types";
import { generateBoard } from "../utils/board";
import {Cell} from "./Cell";

export const size = 15;
export const numberOfMine = Math.floor(size * size / 10);
export let chainedblock = 0;
export let firstblock = false;
export function resetBoardState() {
    chainedblock = 0;
    firstblock = false;
}

interface Props {
    board: Board;
    setBoard: React.Dispatch<React.SetStateAction<Board>>;
}

const calculateCellSize = () => {
    const containerSize = Math.min(window.innerWidth, 500);
    const safePadding = 30;
    return Math.floor((containerSize - safePadding) / size);
};

const initialCellSize = calculateCellSize();

export const BoardComponent: React.FC<Props> = ({ board, setBoard }) => {  // ← 修正
    const [isGameActive, setIsGameActive] = useState(true);
    const startTimeRef = useRef<number>(0);

    const handleGameClear = () => {
        setIsGameActive(false);
    };
    const handleGameOver = () => {
        setIsGameActive(false);
    };
    const [currentCellSize, setCurrentCellSize] = useState(initialCellSize);
    const handleClick = (r: number, c: number) => {
        if (!isGameActive) return;
        if (!firstblock) {
            let newBoard: Board;
            while (true) {
                newBoard = generateBoard(size, size, numberOfMine);
                if (!newBoard[r][c].isMine){
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
        }else{
            const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
            newBoard[r][c].isOpen = true;
            if (newBoard[r][c].neighborMines === 0 && !newBoard[r][c].isMine) {
                chainOpen(newBoard, newBoard[r][c]);
            }
            setBoard(newBoard);
        }
    };
    return (
        <div style={{
            display: "grid",
            justifyContent: "center", 
            alignContent: "center",

            gridTemplateColumns: `repeat(${size}, ${currentCellSize+5}px)`, 
            paddingBottom: "50px",
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
                        startTime={startTimeRef.current}
                        onClick={(newBoard) => {
                            if (newBoard) {
                                setBoard(newBoard);
                            } else {
                                handleClick(r, c);
                            }
                        }}
                        onGameClear={handleGameClear}
                        onGameOver={handleGameOver} 
                    />
                ))
            )}
        </div>
    );
};


function chainOpen(board: Board, cell: Board[0][0]): void {
    const move = [-1, 0, 1];
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(i === 1 && j === 1){
                continue;
            }
            const nr = cell.row + move[i], nc = cell.col + move[j];
            if(0 <= nr && nr < board.length && 0 <= nc && nc < board[0].length 
                && !board[nr][nc].isMine && !board[nr][nc].isOpen){
                chainedblock++;
                board[nr][nc].isOpen = true;
                if(board[nr][nc].neighborMines === 0) {
                    chainOpen(board, board[nr][nc]);
                }
            }
        }
    }
}