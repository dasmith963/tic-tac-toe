const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
}

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
})();