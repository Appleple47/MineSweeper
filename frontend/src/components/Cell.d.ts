import React from "react";
import type { Board, Cell as CellType } from "../types/types";
export declare let openedblock: number;
export declare let gameovered: boolean;
type Props = {
    cell: CellType;
    cellSize: number;
    onClick: (newBoard?: Board) => void;
    board: Board;
    startTime: number;
    onGameClear: () => void;
    onGameOver: () => void;
};
export declare function resetCellState(): void;
export declare const Cell: React.FC<Props>;
export {};
