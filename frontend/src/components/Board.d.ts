import React from "react";
import type { Board } from "../types/types";
export declare const size = 15;
export declare const numberOfMine: number;
export declare let chainedblock: number;
export declare let firstblock: boolean;
export declare function resetBoardState(): void;
interface Props {
    board: Board;
    setBoard: React.Dispatch<React.SetStateAction<Board>>;
}
export declare const BoardComponent: React.FC<Props>;
export {};
