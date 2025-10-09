import React, { useEffect } from "react";
import type {Board, Cell as CellType} from "../types/types";
import { size, numberOfMine, chainedblock } from "./Board";

let openedblock = 0;

type Props = {
    cell: CellType;
    board: Board;
    cellSize: number;
    onClick: () => void;
};


const getCellText = (cell: Cell): string => {
    if(!cell.isOpen){
        return "";
    }
    if(cell.isMine){
        return "💣";
    }
    return cell.neighborMines > 0 ? cell.neighborMines.toString() : "";
};

export const Cell: React.FC<Props> = ({ cell, cellSize, onClick }) => {
    const handleClick = () => {
        onClick();
        if(openedblock === 0 && cell.isMine){
            useEffect(() => {
                setBoard(generateBoard(size, size, numberOfMine));
            }, []); 
        }
        if(cell.isMine){
            cell.isOpen=true;
            alert("💣 Game Over!");
        }
        if(!cell.isOpen){
            openedblock++;
            if(chainedblock + openedblock + numberOfMine === size * size){
                alert("🎊 Game Clear!");
            }
        }
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
            alignItems: "center",

        }}
        >
            {getCellText(cell)}
        </button>
    );
};

function setBoard(arg0: any) {
    throw new Error("Function not implemented.");
}


function generateBoard(size: number, size1: number, numberOfMine: number): any {
    throw new Error("Function not implemented.");
}
