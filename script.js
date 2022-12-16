const Player = (sign) => {

    const getSign = () => {
        return sign;
    }

    return {getSign};
};


const gameBoard = (() => {
    const board = new Array(9).fill("X");

    const setCell = (index, symbol) => {
        board[index] = symbol;
    };

    const getBoard = () => {
        return [...board];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        };
    };

    return {setCell, getBoard, reset};
})();


const displayController = (() => {
    const cells = document.querySelectorAll(".cell");

    const renderBoard = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = gameBoard.getBoard()[i];
        };
    };

    cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            renderBoard()
        })
    })

})();


const gameController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");


})();