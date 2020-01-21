let $pacman = document.querySelector('.pacman');

let nextPosition;
let collision = false;

let pacmanPosition = { x: 1, y: 1 };
let pacmanNextPosition = {};
let wallPosition = [];

let gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

(function game() {
  placePacman();
  createWalls();
  createCoins();
  setInterval(step, 100);
  function step() {
    movePacman();
  }
})();

function createWalls() {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] === 1) {
        createWall(i + 1, j + 1);
      }
    }
  }
}

function createCoins() {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] === 0) {
        createCoin(i + 1, j + 1);
      }
    }
  }
}

window.addEventListener('keydown', function(e) {
  switch (e.key) {
    case 'ArrowUp':
      nextPosition = 'up';
      $pacman.className = 'pacman going-up';
      setPacmanNextPosition(nextPosition);
      collision = false;
      break;
    case 'ArrowDown':
      nextPosition = 'down';
      $pacman.className = 'pacman going-down';
      setPacmanNextPosition(nextPosition);
      collision = false;
      break;
    case 'ArrowRight':
      nextPosition = 'right';
      $pacman.className = 'pacman';
      setPacmanNextPosition(nextPosition);
      collision = false;
      break;
    case 'ArrowLeft':
      nextPosition = 'left';
      $pacman.className = 'pacman going-left';
      setPacmanNextPosition(nextPosition);
      collision = false;
      break;
  }
});

function placePacman() {
  $pacman.style.gridRow = pacmanPosition.y;
  $pacman.style.gridColumn = pacmanPosition.x;
}

function setPacmanNextPosition(direction) {
  switch (direction) {
    case 'up':
      pacmanNextPosition.x = pacmanPosition.x;
      pacmanNextPosition.y = pacmanPosition.y - 1;
      break;
    case 'down':
      pacmanNextPosition.x = pacmanPosition.x;
      pacmanNextPosition.y = pacmanPosition.y + 1;
      break;
    case 'left':
      pacmanNextPosition.x = pacmanPosition.x - 1;
      pacmanNextPosition.y = pacmanPosition.y;
      break;
    case 'right':
      pacmanNextPosition.x = pacmanPosition.x + 1;
      pacmanNextPosition.y = pacmanPosition.y;
      break;
  }
}

function createWall(row, column) {
  const $walls = document.createElement('div');
  $walls.classList.add('walls');
  document.querySelector('.board').appendChild($walls);

  let pieceOfWallPosition = {};
  pieceOfWallPosition.x = column;
  pieceOfWallPosition.y = row;
  wallPosition.push(pieceOfWallPosition);

  $walls.style.gridRow = pieceOfWallPosition.y;
  $walls.style.gridColumn = pieceOfWallPosition.x;
}

function createCoin(row, colum) {
  const $coin = document.createElement('div');
  $coin.classList.add('coin');
  document.querySelector('.board').appendChild($coin);
}

function movePacman() {
  pacManHitWall();
  if (!collision) {
    switch (nextPosition) {
      case 'up':
        if (pacmanPosition.y > 1) {
          pacmanPosition.y--;
          setPacmanNextPosition(nextPosition);
        }
        break;
      case 'down':
        if (pacmanPosition.y < 12) {
          pacmanPosition.y++;
          setPacmanNextPosition(nextPosition);
        }
        break;
      case 'left':
        if (pacmanPosition.x > 1) {
          pacmanPosition.x--;
          setPacmanNextPosition(nextPosition);
        }
        break;
      case 'right':
        if (pacmanPosition.x < 24) {
          pacmanPosition.x++;
          setPacmanNextPosition(nextPosition);
        }
        break;
    }
  }
  placePacman();
}

function pacManHitWall() {
  wallPosition.forEach(function(wall) {
    if (pacmanNextPosition.x === wall.x && pacmanNextPosition.y === wall.y) {
      collision = true;
      console.log(collision);
      console.log(wall.x);
      console.log(wall.y);
    }
  });
}

// empecher les positions et next positions a 0 et 12 et 25//
