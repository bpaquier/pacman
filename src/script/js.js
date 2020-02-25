const $board = document.querySelector('.board');
const $pacman = document.querySelector('.pacman');
const $pacmanMouth = document.querySelector('.pacman__mouth');
const $score = document.querySelector('.score');

let nextPosition;
let collisionWithWalls = false;
let gameTemplate;
let ghostTemplate;
let score = 0;
let ghostSpeed = 115;
let pacmanSpeed = 100;

let pacmanPosition = {};
let pacmanNextPosition = {};
let exitPosition = {};

let allWallsPosition = [];
let allCoinsPositions = [];
let allGhostInformations = [];

// playboard. 0===coins / 1===wall / 2===exit / 3===PACMAN / 4===Ghosts

let firstLevel = [
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 1, 4, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 4, 0, 1, , 0, 0, 1, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let secondLevel = [
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 4, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2]
];

let gameBoard = secondLevel;

function game() {
  placeElements();
  gameTemplate = setInterval(step, pacmanSpeed);
  function step() {
    placePacman();
    movePacman();
  }
  ghostRandomMove();
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

function createGhost(row, column) {
  const $ghost = document.createElement('div');
  $ghost.classList.add('ghost');
  $board.appendChild($ghost);

  let ghostInformation = {};
  ghostInformation.element = $ghost;
  ghostInformation.positionX = column;
  ghostInformation.positionY = row;
  ghostInformation.nextPositionX = 0;
  ghostInformation.nextPositionY = 0;
  allGhostInformations.push(ghostInformation);

  $ghost.style.gridRow = ghostInformation.positionY;
  $ghost.style.gridColumn = ghostInformation.positionX;
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
      switch (gameBoard[i][j]) {
        case 0:
          createCoin(y, x);
          break;
        case 1:
          createWall(y, x);
          break;
        case 2:
          createExit(y, x);
          break;
        case 3:
          pacmanPosition.x = x;
          pacmanPosition.y = y;
          placePacman();
          break;
        case 4:
          createGhost(y, x);
          break;
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
  setInterval(pacmanMeetAGhost, 10);
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
    changeLevel();
    game();
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

function pacmanMeetAGhost() {
  allGhostInformations.forEach(function(ghost) {
    if (
      pacmanPosition.x === ghost.positionX &&
      pacmanPosition.y === ghost.positionY
    ) {
      deleteAllGhosts();
      pacmanIsDead();
    }
  });
}

// Ghost Mouv

function ghostRandomMove() {
  allGhostInformations.forEach(function(ghost) {
    let ghostNextDirection;
    let ghostcollisionWithWalls = false;

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

    function setGhostNextPosition() {
      switch (ghostNextDirection) {
        case 'up':
          ghost.nextPositionX = ghost.positionX;
          ghost.nextPositionY = ghost.positionY - 1;
          break;
        case 'down':
          ghost.nextPositionX = ghost.positionX;
          ghost.nextPositionY = ghost.positionY + 1;
          break;
        case 'left':
          ghost.nextPositionX = ghost.positionX - 1;
          ghost.nextPositionY = ghost.positionY;
          break;
        case 'right':
          ghost.nextPositionX = ghost.positionX + 1;
          ghost.nextPositionY = ghost.positionY;
          break;
      }
      ghostcollisionWithWalls = false;
    }

    function ghostHitWalls() {
      allWallsPosition.forEach(function(wall) {
        if (ghost.nextPositionX === wall.x && ghost.nextPositionY === wall.y) {
          ghostcollisionWithWalls = true;
        }
      });
    }

    function ghostIsOutOfBoard() {
      if (
        ghost.nextPositionY < 1 ||
        ghost.nextPositionY > 12 ||
        ghost.nextPositionX < 1 ||
        ghost.nextPositionX > 24
      ) {
        ghostcollisionWithWalls = true;
      }
    }

    function moveGhost() {
      ghostIsOutOfBoard();
      ghostHitWalls();
      if (ghostcollisionWithWalls) {
        setGhostDirection();
      } else {
        switch (ghostNextDirection) {
          case 'up':
            ghost.positionY--;
            setGhostNextPosition(ghostNextDirection);
            break;
          case 'down':
            ghost.positionY++;
            setGhostNextPosition(ghostNextDirection);
            break;
          case 'left':
            ghost.positionX--;
            setGhostNextPosition(ghostNextDirection);
            break;
          case 'right':
            ghost.positionX++;
            setGhostNextPosition(ghostNextDirection);
            break;
        }
        ghost.element.style.gridRow = ghost.positionY;
        ghost.element.style.gridColumn = ghost.positionX;
      }
    }

    setGhostDirection();

    ghostTemplate = setInterval(function() {
      setGhostNextPosition(ghostNextDirection);
      moveGhost();
    }, ghostSpeed);
  });
}
// reset function

function reset() {
  clearInterval(gameTemplate);
  clearInterval(ghostTemplate);
  deleteAllCoins();
  deleteAllWalls();
  deleteAllGhosts();
  document.querySelector('.exit').remove();
  nextPosition = '';
}

function pacmanIsDead() {
  $pacmanMouth.classList.remove('is-eating');
  $pacmanMouth.classList.add('is-dead');
  clearInterval(gameTemplate);
  setTimeout(function() {
    $pacman.className = 'board__pacman pacman';
    $pacmanMouth.classList.remove('is-dead');
    $pacmanMouth.classList.add('is-eating');
    gameBoard === secondLevel ? (gameBoard = firstLevel) : '';
    reset();
    game();
  }, 1000);
}

function changeLevel() {
  if (gameBoard === firstLevel) {
    gameBoard = secondLevel;
  } else if (gameBoard === secondLevel) {
    gameBoard = firstLevel;
  }
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

function deleteAllGhosts() {
  document.querySelectorAll('.ghost').forEach(function(ghost) {
    ghost.remove();
  });
  allGhostInformations = [];
}
