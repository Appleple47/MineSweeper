export type Cell = {
    isMine: boolean;
    isOpen: boolean;
    row: number;
    col: number;
    neighborMines: number;
};

export type Board = Cell[][];