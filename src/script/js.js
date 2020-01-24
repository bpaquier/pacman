const $board = document.querySelector('.board');
const $pacman = document.querySelector('.pacman');
const $score = document.querySelector('.score');

let nextPosition;
let ghostNextDirection;
let collisionWithWalls = false;
let ghostcollisionWithWalls = false;
let ghostCanMove = true;
let gameTemplate;
let ghostTemplate;
let score = 0;

let pacmanPosition = {};
let pacmanNextPosition = {};
let exitPosition = {};
let ghostPosition = {};
let ghostNextPosition = {};

let allWallsPosition = [];
let allCoinsPositions = [];

// playboard. 0===coins / 1===wall / 2===exit / 3===PACMAN / 4===Ghosts

let firstLevel = [
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 1, 4, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let secondLevel = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let gameBoard = firstLevel;

function game() {
  placeElements();
  setGhostDirection();
  gameTemplate = setInterval(step, 100);
  function step() {
    placePacman();
    movePacman();
  }

  ghostTemplate = setInterval(function() {
    setGhostNextPosition(ghostNextDirection);
    moveGhost();
  }, 50);
}

window.addEventListener('load', game);

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

  allWallsPosition.push(pieceOfWallPosition);
  $walls.style.gridRow = pieceOfWallPosition.y;
  $walls.style.gridColumn = pieceOfWallPosition.x;
}

function createCoin(row, column) {
  const $coin = document.createElement('div');
  $coin.classList.add('coin');
  $board.appendChild($coin);

  let coinPosition = {};
  coinPosition.x = column;
  coinPosition.y = row;
  coinPosition.element = $coin;

  allCoinsPositions.push(coinPosition);
  $coin.style.gridRow = coinPosition.y;
  $coin.style.gridColumn = coinPosition.x;
}

function createExit(row, column) {
  const $exit = document.createElement('div');
  $exit.classList.add('exit');
  $board.appendChild($exit);

  exitPosition.x = column;
  exitPosition.y = row;

  $exit.style.gridRow = exitPosition.y;
  $exit.style.gridColumn = exitPosition.x;
}

const $ghost = document.createElement('div');
function createGhost(row, column) {
  $ghost.classList.add('ghost');
  $board.appendChild($ghost);

  ghostPosition.x = column;
  ghostPosition.y = row;

  $ghost.style.gridRow = ghostPosition.y;
  $ghost.style.gridColumn = ghostPosition.x;
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
      } else if (gameBoard[i][j] === 4) {
        createGhost(y, x);
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
  pacmanExit();
  elementsHitWalls();
  pacmanGetCoins();
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

function elementsHitWalls() {
  allWallsPosition.forEach(function(wall) {
    if (pacmanNextPosition.x === wall.x && pacmanNextPosition.y === wall.y) {
      collisionWithWalls = true;
    }
  });
}

function pacmanExit() {
  if (
    pacmanPosition.x === exitPosition.x &&
    pacmanPosition.y === exitPosition.y
  ) {
    reset();
  }
}

function pacmanGetCoins() {
  allCoinsPositions.forEach(function(coin) {
    if (pacmanPosition.x === coin.x && pacmanPosition.y === coin.y) {
      let index = allCoinsPositions.indexOf(coin);
      allCoinsPositions.splice(index, 1);
      coin.element.remove();
      score++;
      $score.innerHTML = 'Score : ' + score;
    }
  });
}

// Ghost Mouv

function setGhostNextPosition(direction) {
  switch (direction) {
    case 'up':
      ghostNextPosition.x = ghostPosition.x;
      ghostNextPosition.y = ghostPosition.y - 1;
      break;
    case 'down':
      ghostNextPosition.x = ghostPosition.x;
      ghostNextPosition.y = ghostPosition.y + 1;
      break;
    case 'left':
      ghostNextPosition.x = ghostPosition.x - 1;
      ghostNextPosition.y = ghostPosition.y;
      break;
    case 'right':
      ghostNextPosition.x = ghostPosition.x + 1;
      ghostNextPosition.y = ghostPosition.y;
      break;
  }
  ghostcollisionWithWalls = false;
}

function setGhostDirection() {
  let randomnumber;
  randomnumber = Math.floor(Math.random() * 4);
  switch (randomnumber) {
    case 0:
      ghostNextDirection = 'up';
      break;
    case 1:
      ghostNextDirection = 'down';
      break;
    case 2:
      ghostNextDirection = 'right';
      break;
    case 3:
      ghostNextDirection = 'left';
      break;
  }
}

function moveGhost() {
  ghostIsOutOfBoard();
  ghostHitWalls();
  if (ghostcollisionWithWalls) {
    setGhostDirection();
  } else {
    console.log('okk');
    switch (ghostNextDirection) {
      case 'up':
        ghostPosition.y--;
        setGhostNextPosition(ghostNextDirection);
        break;
      case 'down':
        ghostPosition.y++;
        setGhostNextPosition(ghostNextDirection);
        break;
      case 'left':
        ghostPosition.x--;
        setGhostNextPosition(ghostNextDirection);
        break;
      case 'right':
        ghostPosition.x++;
        setGhostNextPosition(ghostNextDirection);
        break;
    }
    $ghost.style.gridRow = ghostPosition.y;
    $ghost.style.gridColumn = ghostPosition.x;
  }
}

function ghostHitWalls() {
  allWallsPosition.forEach(function(wall) {
    if (ghostNextPosition.x === wall.x && ghostNextPosition.y === wall.y) {
      ghostcollisionWithWalls = true;
    }
  });
}
function ghostIsOutOfBoard() {
  if (
    ghostNextPosition.y < 1 ||
    ghostNextPosition.y > 12 ||
    ghostNextPosition.x < 1 ||
    ghostNextPosition.x > 24
  ) {
    ghostcollisionWithWalls = true;
  }
}
// reset function

function reset() {
  clearInterval(gameTemplate);
  deleteAllCoins();
  deleteAllWalls();
  document.querySelector('.exit').remove();
  nextPosition = '';
  if (gameBoard === firstLevel) {
    gameBoard = secondLevel;
  } else if (gameBoard === secondLevel) {
    gameBoard = firstLevel;
  }
  game();
}

function deleteAllCoins() {
  document.querySelectorAll('.coin').forEach(function(coin) {
    coin.remove();
  });
  allCoinsPositions = [];
}

function deleteAllWalls() {
  document.querySelectorAll('.walls').forEach(function(wall) {
    wall.remove();
  });
  allWallsPosition = [];
}
