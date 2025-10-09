import type { Board } from "../types/types";

export const generateBoard = (rows: number, cols: number, mineCount: number): Board => {
    const board: Board = Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => ({
            isMine: false,
            isOpen: false,
            row: row,
            col: col,
            neighborMines: 0,
        }))
    );

    let placed = 0;
    while(placed < mineCount){
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if(!board[r][c].isMine){
            board[r][c].isMine = true;
            placed++;
        }
    }

    const move = [-1, 0, 1];
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            if(board[r][c].isMine){
                continue;
            }
            let count = 0;
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(i === 1 && j === 1){
                        continue;
                    }
                    const nr = r + move[i], nc = c + move[j];
                    if(0 <= nr&& nr < rows && 0 <= nc && nc < cols && board[nr][nc].isMine){
                        count++;
                    }
                }
            }
            board[r][c].neighborMines = count;
        }
    }
    return board; 
};

