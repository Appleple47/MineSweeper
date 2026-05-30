export type Cell = {
    isMine: boolean;
    isOpen: boolean;
    row: number;
    col: number;
    neighborMines: number;
    openedMine: boolean;
    isflagged: boolean;
};
export type Board = Cell[][];
