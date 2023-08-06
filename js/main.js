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
  const playerOne = ("Player One", "X");
  const playerTwo = ("Player Two", "O");
})();

const displayController = (() => {
  const cells = document.querySelectorAll(".cell");

  const updateDisplay = () => {
    const board = gameBoard.getBoard();
    cells.forEach((cell, index) => cell.textContent = board[index]);
  }

  updateDisplay();
})();