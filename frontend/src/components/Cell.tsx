import React from "react";
import type { Board, Cell as CellType} from "../types/types";
import { posOfmine } from "../utils/board";

type Props = {
    cell: CellType;
    cellSize: number;
    onClick: (newBoard?: Board) => void;
    board: Board;
    hasClickedOnce: boolean;
    onManualOpen: () => void;
    onGameOver: () => void;
    isGameActive: boolean;
    flaggingMode: boolean;
};

const getCellText = (cell: CellType): string => {
    let display = "";
    if(cell.isOpen){
        if(cell.isMine){
            display = cell.openedMine ? "💥" : "💣";
        }else if(cell.neighborMines > 0) {
            display = cell.neighborMines.toString();
        }
    }else if(cell.isflagged){
        display = "🚩";
    }else{
        display = "";
    }
    return display;
};

export const Cell: React.FC<Props> = ({ cell, cellSize, onClick, board, hasClickedOnce, onManualOpen, onGameOver, isGameActive, flaggingMode}) => {
    const handleClick = () => {
        if(!isGameActive) return;
        if(flaggingMode){
            const newBoard = board.map((row) => row.map((c) => ({ ...c })));
            newBoard[cell.row][cell.col].isflagged = !newBoard[cell.row][cell.col].isflagged;
            onClick(newBoard);
            return;
        }
        if(cell.isOpen) return;
        if(cell.isflagged) return;
        if(cell.isMine && hasClickedOnce){
            const newBoard = board.map((row) => row.map((c) => ({ ...c })));
            newBoard[cell.row][cell.col].openedMine = true;
            for(const mine of posOfmine){
                newBoard[mine[0]][mine[1]].isOpen = true;
            }
            onClick(newBoard);
            onGameOver();
            setTimeout(() => alert("💣 Game Over!"), 100);
            return;
        }
        onClick();
        if(!cell.isOpen){
            onManualOpen();
        }
    }
    return (
        <button
            onClick={handleClick}
            style={{
                width: cellSize,
                height: cellSize,
                padding: 0,
                margin: 0,
                border: "1px solid black",
                background: cell.isOpen ? "#ddd" : "#999",
                fontSize: `${cellSize * 0.5}px`,
                justifyContent: "center",
                alignItems: "center",
                cursor: isGameActive ? "pointer" : "default",
            }}
        >
            {getCellText(cell)}
        </button>
    );
};
