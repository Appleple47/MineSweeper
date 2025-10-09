import React, { useState } from "react";
import type { Board } from "../types/types";
import { generateBoard } from "../utils/board";
import { Cell } from "./Cell";

export const size = 10;
export const numberOfMine = 20;

export const BoardComponent: React.FC = () => {
    const [board, setBoard] = useState<Board>(() => generateBoard(size, size, numberOfMine));

    const handleClick = (r: number, c: number) => {
        const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
        newBoard[r][c].isOpen = true;
        
        if (newBoard[r][c].neighborMines === 0 && !newBoard[r][c].isMine) {
            chainOpen(newBoard, newBoard[r][c]);
        }
        
        setBoard(newBoard);
    };
    return (
        <div style={{ 
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
        }}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 50px)` }}>
                {board.map((row, r) =>
                    row.map((cell, c) => (
                        <Cell 
                            key={`${r}-${c}`}
                            cell={cell} 
                            onClick={() => handleClick(r, c)} 
                        />
                    ))
                )}
            </div>
        </div>
    );
    // return (
    //     <div style={{
    //         position: "absolute",
    //         display: "grid",
    //         gridTemplateColumns: `repeat(${size}, 50px)`,
    //         top: "15%",
    //         left: "15%",            
    //     }}>
    //         {board.map((row, r) =>
    //             row.map((cell, c) => (
    //                 <Cell 
    //                     key={`${r}-${c}`}
    //                     cell={cell} 
    //                     board={board}
    //                     onClick={() => handleClick(r, c)} 
    //                 />
    //             ))
    //         )}
    //     </div>
    // );
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
                if(board[nr][nc].neighborMines === 0) {
                    chainOpen(board, board[nr][nc]);
                }
            }
        }
    }
}