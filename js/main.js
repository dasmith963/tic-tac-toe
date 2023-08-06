const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
}

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  return { getBoard };
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