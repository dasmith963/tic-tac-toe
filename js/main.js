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

  const getBoard = () => board;

  return { addMarker, getBoard };
})();

const gameController = (() => {
  const playerOne = player("Player One", "X");
  const playerTwo = player("Player Two", "O");
  let activePlayer = playerOne;
  let isGameOver = false;

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
    const board = gameBoard.getBoard();
    const boardFull = board.every(index => index !== "");
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
      if (boardFull) return isGameOver = true;
      if (a === b && b === c) {
        isGameOver = true;
        return a;
      }
    }
  }

  const checkGameOver = () => {
    let winner = getWinner();

    if (isGameOver && winner === "X") {
      console.log(playerOne.getName() + " Wins");
    }
    else if (isGameOver && winner === "O") {
      console.log(playerTwo.getName() + " Wins");
    }
    else if (isGameOver) {
      console.log("It's a tie!!");
    }
  }

  return { playRound };
})();

const displayController = (() => {
  const boardEl = document.querySelector(".board");
  const cells = document.querySelectorAll(".cell");

  const updateDisplay = () => {
    const board = gameBoard.getBoard();
    cells.forEach((cell, index) => cell.textContent = board[index]);
  }

  const renderMarker = (e) => {
    if (e.target.textContent !== "") return;
    const index = e.target.dataset.id;
    gameController.playRound(index);
    updateDisplay();
  }

  boardEl.addEventListener("click", renderMarker);

  updateDisplay();
})();