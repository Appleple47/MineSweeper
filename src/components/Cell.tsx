import type {Board, Cell as CellType} from "../types/types";
import { size, numberOfMine, chainedblock} from "./Board";

export let openedblock = 0;
export let gameovered = false;
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
        if(cell.isMine && openedblock > 0){
            cell.isOpen=true;
            alert("💣 Game Over!");
        }
        if(!cell.isOpen){
            openedblock++;
            cell.isOpen = true;
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
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {getCellText(cell)}
        </button>
    );
};