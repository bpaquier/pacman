let $pacman = document.querySelector('.pacman');

let nextPosition;
let collision = false;

let pacmanPosition = { x: 1, y: 1 };
let pacmanNextPosition = {};
let wallPosition = [];

let gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

(function game() {
  placePacman();
  createWalls();
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

window.addEventListener('keydown', function(e) {
  console.log(pacmanNextPosition);
  switch (e.key) {
    case 'ArrowUp':
      nextPosition = 'up';
      $pacman.className = 'pacman going-up';
      pacmanNextPosition.x = pacmanPosition.x;
      pacmanNextPosition.y = pacmanPosition.y - 1;
      collision = false;
      break;
    case 'ArrowDown':
      nextPosition = 'down';
      $pacman.className = 'pacman going-down';
      pacmanNextPosition.x = pacmanPosition.x;
      pacmanNextPosition.y = pacmanPosition.y + 1;
      collision = false;
      break;
    case 'ArrowRight':
      nextPosition = 'right';
      $pacman.className = 'pacman';
      pacmanNextPosition.x = pacmanPosition.x + 1;
      pacmanNextPosition.y = pacmanPosition.y;
      collision = false;
      break;
    case 'ArrowLeft':
      nextPosition = 'left';
      $pacman.className = 'pacman going-left';
      pacmanNextPosition.x = pacmanPosition.x - 1;
      pacmanNextPosition.y = pacmanPosition.y;
      collision = false;
      break;
  }
});

function placePacman() {
  $pacman.style.gridRow = pacmanPosition.y;
  $pacman.style.gridColumn = pacmanPosition.x;
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

function movePacman() {
  pacManHitWall();
  let nextDirection;
  if (!collision) {
    nextDirection = nextPosition;
  }
  switch (nextDirection) {
    case 'up':
      if (pacmanPosition.y > 0) {
        pacmanPosition.y--;
        pacmanNextPosition.x = pacmanPosition.x;
        pacmanNextPosition.y = pacmanPosition.y - 1;
      }
      break;
    case 'down':
      if (pacmanPosition.y < 12) {
        pacmanPosition.y++;
        pacmanNextPosition.x = pacmanPosition.x;
        pacmanNextPosition.y = pacmanPosition.y + 1;
      }
      break;
    case 'left':
      if (pacmanPosition.x > 0) {
        pacmanPosition.x--;
        pacmanNextPosition.x = pacmanPosition.x - 1;
        pacmanNextPosition.y = pacmanPosition.y;
      }
      break;
    case 'right':
      if (pacmanPosition.x < 24) {
        pacmanPosition.x++;
        pacmanNextPosition.x = pacmanPosition.x + 1;
        pacmanNextPosition.y = pacmanPosition.y;
      }
      break;
  }
  placePacman();
}

function pacManHitWall() {
  wallPosition.forEach(function(wall) {
    if (pacmanNextPosition.x === wall.x && pacmanNextPosition.y === wall.y) {
      collision = true;
    }
  });
}
