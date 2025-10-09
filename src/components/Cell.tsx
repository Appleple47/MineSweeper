import React from "react";
import type {Board, Cell as CellType} from "../types/types";

type Props = {
    cell: CellType;
    board: Board;
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


export const Cell: React.FC<Props> = ({ cell, onClick }) => {
    const handleClick = () => {
        onClick();
        if(cell.isMine){
            cell.isOpen=true;
            alert("💣 Game Over!");
        }
    };
    return (
        <button
        onClick={handleClick}
        style={{
            width: 50,
            height: 50,
            border: "1px solid #666",
            background: cell.isOpen ? "#ddd" : "#999",
        }}
        >
            {getCellText(cell)}
        </button>
    );
};