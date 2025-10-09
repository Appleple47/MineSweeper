import React from "react";
import type { Board } from "../types/types";
import { generateBoard } from "../utils/board";
import {Cell} from "./Cell";
export const size = 15;
export const numberOfMine = 2;
// Math.floor(size * size / 10);
export let chainedblock = 0;
export let firstblock = false;
export let startTime = 0;

interface Props {
    board: Board;
    setBoard: React.Dispatch<React.SetStateAction<Board>>;
}

const screenSize = Math.min(window.innerWidth, window.innerHeight);
const cellSize = Math.floor(screenSize / size) * 0.65;

export const BoardComponent: React.FC<Props> = ({ board, setBoard }) => {
    startTime = Date.now();

    const handleClick = (r: number, c: number) => {
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
            gridTemplateColumns: `repeat(${size}, ${cellSize+6}px)`,
            gap: 0,
            paddingBottom: "50px",
        }}>
            {board.map((row, r) =>
                row.map((cell, c) => (
                    <Cell 
                        key={`${r}-${c}`}
                        cell={cell} 
                        cellSize={cellSize}
                        onClick={() => handleClick(r, c)} 
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
                board[nr][nc].isOpen = true;
                chainedblock++;
                if(board[nr][nc].neighborMines === 0) {
                    chainOpen(board, board[nr][nc]);
                }
            }
        }
    }
}

