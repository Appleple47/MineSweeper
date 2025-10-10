import React from "react";
import { UserName } from "../App";
import type { Board, Cell as CellType} from "../types/types";
import { size, numberOfMine, chainedblock, startTime} from "./Board";
import { posOfmine } from "../utils/board";
export let openedblock = 0;
export let gameovered = false;
export let timeTaken = 0;

type Props = {
    cell: CellType;
    cellSize: number;
    onClick: (newBoard?: Board) => void;
    board: Board;
};

const getCellText = (cell: CellType): string => {
    let display = "";
    if(cell.isOpen){
        if(cell.isMine){
            display = cell.openedMine ? "💥" : "💣";
        }else if(cell.neighborMines > 0) {
            display = cell.neighborMines.toString();
        }
    }else if(cell.isFlagged){
        display = "🚩";
    }else{
        display = "";
    }
    return display;
};
export const Cell: React.FC<Props> = ({ cell, cellSize, onClick, board}) => {
    const handleClick = () => {
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
                setTimeout(() => alert("💣 Game Over!"), 100);
            }
            if(!cell.isOpen){
                openedblock++;
                cell.isOpen = true;
                if(!(chainedblock + openedblock + numberOfMine < size * size)){
                    timeTaken = Math.floor((Date.now() - startTime)/1000);
                    alert("🎊 Game Clear!\n in "+ timeTaken+" seconds!");
                    fetch('http://localhost:3000/api/score', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            player_name: UserName,
                            time_taken: timeTaken,
                        }),
                    })
                    .then(res => res.json())
                    .then(data => console.log('Score API response:', data))
                    .catch(err => console.error('API Error:', err));
                }
            }
        }
        console.log("o: "+ openedblock);
        console.log("c: "+ chainedblock);
        console.log("n: "+ numberOfMine);
    };
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
            }}
        >
            {getCellText(cell)}
        </button>
    );
};