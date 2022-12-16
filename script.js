const Player = (sign) => {

    const getSign = () => {
        return sign;
    }

    return {getSign};
};


const gameBoard = (() => {
    const board = new Array(9).fill("");

    const setCell = (index, sign) => {
        board[index] = sign;
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
            if (e.target.textContent) return;
            gameController.play(e.target.dataset.index);
            renderBoard();
        });
    });

})();


const gameController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

    let round = 0;

    const play = (index) => {
        const curSign = getCurSign();
        console.log(checkWin())
        gameBoard.setCell(index, curSign);

        round++
    };

    const checkWin = () => {
        return winCombinations.some((combination) => {
            combination.every((index) => {
                gameBoard.getBoard()[index] === getCurSign();
            });
        });
    };

    const getCurSign = () => {
        return round % 2 === 0 ? player1.getSign() : player2.getSign();
    };

    return {play};
})();
