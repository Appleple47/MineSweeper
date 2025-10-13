import React from "react";
import { UserName, flaggingmode } from "../App";
import type { Board, Cell as CellType} from "../types/types";
import { size, numberOfMine, chainedblock} from "./Board";
import { posOfmine } from "../utils/board";
export let openedblock = 0;
export let gameovered = false;
const API_BASE_URL = "https://1r2mypgiag.execute-api.ap-southeast-2.amazonaws.com/prod";

type Props = {
    cell: CellType;
    cellSize: number;
    onClick: (newBoard?: Board) => void;
    board: Board;
    startTime: number;
    onGameClear: () => void;
    onGameOver: () => void;
};

export function resetCellState() {
    openedblock = 0;
    gameovered = false;
}

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
export const Cell: React.FC<Props> = ({ cell, cellSize, onClick, board, startTime, onGameClear, onGameOver}) => {
    const handleClick = () => {
        if(gameovered) return;
        if(flaggingmode){
            cell.isflagged = !cell.isflagged;
        }else{
            if(cell.isflagged) return;
            if(!gameovered){
                onClick();
                if(cell.isMine && openedblock > 0){
                    const newBoard = board.map((row) => row.map((c) => ({ ...c })));
                    newBoard[cell.row][cell.col].openedMine = true;
                    for(const mine of posOfmine){
                        newBoard[mine[0]][mine[1]].isOpen = true;
                    }
                    gameovered = true;
                    onClick(newBoard);
                    onGameOver();
                    setTimeout(() => alert("💣 Game Over!"), 100);
                    return;
                }
                if(!cell.isOpen){
                    openedblock++;
                    cell.isOpen = true;
                    if(!(chainedblock + openedblock + numberOfMine < size * size)){
                        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
                        gameovered = true;
                        onGameClear();
                        alert("🎊 Game Clear!\n in "+ timeTaken+" seconds!");
                        fetch(`${API_BASE_URL}/scores`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                player_name: UserName,
                                time_taken: timeTaken,
                                blocks: (size * size),
                            }),
                        })
                        .then(res => res.json())
                        .then(data => console.log('Score API response:', data))
                        .catch(err => console.error('API Error:', err));
                    }
                }
            }
            // console.log("o: "+ openedblock);
            // console.log("c: "+ chainedblock);
            // console.log("n: "+ numberOfMine);
        };
    }
    return (
        <button
            onClick={handleClick}
            style={{
                width: cellSize,
                height: cellSize, 
                border: "1px solid #666",
                background: cell.isOpen ? "#ddd" : "#999",
                fontSize: `${cellSize * 0.5}px`,
                justifyContent: "center",
                alignItems: "center",
                cursor: gameovered ? "default" : "pointer",
            }}
        >
            {getCellText(cell)}
        </button>
    );
};