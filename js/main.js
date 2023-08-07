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
  const activePlayer = playerOne;

  const playRound = (index) => {
    gameBoard.addMarker(index, activePlayer.getMarker());
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
    const index = e.target.dataset.id;
    gameController.playRound(index);
    updateDisplay();
  }

  boardEl.addEventListener("click", renderMarker);

  updateDisplay();
})();