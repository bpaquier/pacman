const $board = document.querySelector('.board');
const $pacman = document.querySelector('.pacman');

let nextPosition;
let collisionWithWalls = false;

let pacmanPosition = {};
let pacmanNextPosition = {};
let wallPosition = [];

// playboard. 0===coins / 1===wall / 2===exit / 3===PACMAN

let gameBoard = [
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
  placeElements();
  setInterval(step, 100);
  function step() {
    movePacman();
    placePacman();
  }
})();

window.addEventListener('keydown', function(e) {
  switch (e.key) {
    case 'ArrowUp':
      nextPosition = 'up';
      $pacman.className = 'pacman going-up';
      setPacmanNextPosition(nextPosition);
      collisionWithWalls = false;
      break;
    case 'ArrowDown':
      nextPosition = 'down';
      $pacman.className = 'pacman going-down';
      setPacmanNextPosition(nextPosition);
      collisionWithWalls = false;
      break;
    case 'ArrowRight':
      nextPosition = 'right';
      $pacman.className = 'pacman';
      setPacmanNextPosition(nextPosition);
      collisionWithWalls = false;
      break;
    case 'ArrowLeft':
      nextPosition = 'left';
      $pacman.className = 'pacman going-left';
      setPacmanNextPosition(nextPosition);
      collisionWithWalls = false;
      break;
  }
});

//create items

function createWall(row, column) {
  const $walls = document.createElement('div');
  $walls.classList.add('walls');
  $board.appendChild($walls);

  let pieceOfWallPosition = {};
  pieceOfWallPosition.x = column;
  pieceOfWallPosition.y = row;
  wallPosition.push(pieceOfWallPosition);

  $walls.style.gridRow = pieceOfWallPosition.y;
  $walls.style.gridColumn = pieceOfWallPosition.x;
}

function createCoin(row, column) {
  const $coin = document.createElement('div');
  $coin.classList.add('coin');
  $board.appendChild($coin);

  $coin.style.gridRow = row;
  $coin.style.gridColumn = column;
}

function createExit(row, column) {
  const $exit = document.createElement('div');
  $exit.classList.add('exit');
  $board.appendChild($exit);

  $exit.style.gridRow = row;
  $exit.style.gridColumn = column;
}

// place differents elements in the playboard

function placePacman() {
  $pacman.style.gridRow = pacmanPosition.y;
  $pacman.style.gridColumn = pacmanPosition.x;
}

function placeElements() {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      let y = i + 1;
      let x = j + 1;
      if (gameBoard[i][j] === 0) {
        createCoin(y, x);
      } else if (gameBoard[i][j] === 1) {
        createWall(y, x);
      } else if (gameBoard[i][j] === 2) {
        createExit(y, x);
      } else if (gameBoard[i][j] === 3) {
        pacmanPosition.x = x;
        pacmanPosition.y = y;
        placePacman();
      }
    }
  }
}

// pacman moves

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

function movePacman() {
  pacManHitWall();
  if (!collisionWithWalls) {
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
}

// pacman collisions

function pacManHitWall() {
  wallPosition.forEach(function(wall) {
    if (pacmanNextPosition.x === wall.x && pacmanNextPosition.y === wall.y) {
      collisionWithWalls = true;
    }
  });
}
