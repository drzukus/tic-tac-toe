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
    const winMsg = document.querySelector(".win-msg");
    const restartBtn = document.querySelector(".restart-btn");

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

    const displayWin = (sign) => {
        winMsg.textContent = `Congratulations! ${sign == "X" ? "Player 1" : "Player 2"} is the winner!`
    };

    const displayTie = () => {
        winMsg.textContent = "It's a tie!";
    };

    restartBtn.addEventListener("click", () => {
        gameBoard.reset();
        renderBoard();
        winMsg.textContent = "";
        gameController.playReset();
    });

    return {displayWin, displayTie}
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
    let over = false;

    const play = (index) => {
        if (over) return

        gameBoard.setCell(index, getCurSign());

        if (checkWin()) {
            over = true;
            displayController.displayWin(getCurSign());
            return;
        };

        round++

        if (round == 9) {
            over = true;
            displayController.displayTie();
            return;
        };
    };

    const checkWin = () => {
        return winCombinations.some((combination) => 
            combination.every((index) => 
                gameBoard.getBoard()[index] === getCurSign()
            )
        );
    };

    const getCurSign = () => {
        return round % 2 === 0 ? player1.getSign() : player2.getSign();
    };

    const playReset = () => {
        over = false;
        round = 0;
    };

    return {play, playReset};
})();