export let posOfmine = [];
export const generateBoard = (rows, cols, mineCount) => {
    posOfmine = [];
    const board = Array.from({ length: rows }, (_, row) => Array.from({ length: cols }, (_, col) => ({
        isMine: false,
        isOpen: false,
        row: row,
        col: col,
        neighborMines: 0,
        openedMine: false,
        isflagged: false,
    })));
    let placed = 0;
    while (placed < mineCount) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (!board[r][c].isMine) {
            board[r][c].isMine = true;
            posOfmine.push([r, c]);
            placed++;
        }
    }
    const move = [-1, 0, 1];
    for (let mine of posOfmine) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!(i === 1 && j === 1)) {
                    const nr = mine[0] + move[i], nc = mine[1] + move[j];
                    if (0 <= nr && nr < rows && 0 <= nc && nc < cols) {
                        board[nr][nc].neighborMines++;
                    }
                }
            }
        }
    }
    return board;
};
