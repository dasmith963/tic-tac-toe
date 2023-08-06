const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
}

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
})();

const gameController = (() => {
  const playerOne = ("Player One", "X");
  const playerTwo = ("Player Two", "O");
})();