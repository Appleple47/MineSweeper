import { UserName } from "../App";
import type { Cell as CellType} from "../types/types";
import { size, numberOfMine, chainedblock, startTime} from "./Board";
export let openedblock = 0;
export let gameovered = false;
export let timeTaken = 0;

type Props = {
    cell: CellType;
    cellSize: number;
    onClick: () => void;
};

const getCellText = (cell: CellType): string => {
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
        if(!gameovered){
            onClick();
            if(cell.isMine && openedblock > 0){
                cell.isOpen=true;
                alert("💣 Game Over!");
                gameovered = true;
            }
            if(!cell.isOpen){
                openedblock++;
                cell.isOpen = true;
                if(chainedblock + openedblock + numberOfMine === size * size){
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

