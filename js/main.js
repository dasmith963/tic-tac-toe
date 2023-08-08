const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
}

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const addMarker = (index, marker) => {
    if (board[index] === "") return board[index] = marker;
  }

  const clear = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  }

  const getBoard = () => board;

  return { addMarker, clear, getBoard };
})();

const gameController = (() => {
  const playerOne = player("Player One", "X");
  const playerTwo = player("Player Two", "O");
  const board = gameBoard.getBoard();
  let activePlayer = playerOne;
  let isGameOver = false;
  let result = "";
  let winner = "";

  const switchActivePlayer = () => {
    activePlayer =
      activePlayer === playerOne ? playerTwo : playerOne;
  }

  const playRound = (index) => {
    gameBoard.addMarker(index, activePlayer.getMarker());
    switchActivePlayer();
    checkGameOver();
  }

  const getWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i <= 7; i++) {
      const winCondition = winConditions[i];
      let a = board[winCondition[0]];
      let b = board[winCondition[1]];
      let c = board[winCondition[2]];

      if (a === "" || b === "" || c === "") continue;
      if (a === b && b === c) {
        isGameOver = true;
        return a;
      }
    }
  }

  const checkGameOver = () => {
    const boardFull = board.every(index => index !== "");
    winner = getWinner();

    if (isGameOver && winner === "X") {
      return result = playerOne.getName() + " wins!";
    }
    else if (isGameOver && winner === "O") {
      return result = playerTwo.getName() + " wins!";
    }
    else if (boardFull) {
      return result = "It's a Draw!";
    }
  }

  const reset = () => {
    activePlayer = playerOne;
    isGameOver = false;
    result = "";
    winner = "";
  }

  const getActivePlayer = () => activePlayer;

  const getResult = () => result;

  return { playRound, reset, getActivePlayer, getResult };
})();

const displayController = (() => {
  const boardEl = document.querySelector(".board");
  const cells = document.querySelectorAll(".cell");
  const gameStatus = document.querySelector(".game-status");
  const resetBtn = document.querySelector(".reset-btn");

  const updateDisplay = () => {
    const board = gameBoard.getBoard();
    cells.forEach((cell, index) => cell.textContent = board[index]);
    updateGameStatus();
  }

  const updateGameStatus = () => {
    const result = gameController.getResult();
    const activePlayer = gameController.getActivePlayer();

    if (result !== "") {
      gameStatus.textContent = result;
    } else {
      gameStatus.textContent = `It's ${activePlayer.getName()}'s turn`;
    }
  }

  const renderMarker = (e) => {
    if (e.target.textContent !== "") return;
    const index = e.target.dataset.id;
    gameController.playRound(index);
    updateDisplay();
  }

  const startNewGame = () => {
    gameBoard.clear();
    gameController.reset();
    updateDisplay();
  }

  boardEl.addEventListener("click", renderMarker);
  resetBtn.addEventListener("click", startNewGame);

  updateDisplay();
})();
