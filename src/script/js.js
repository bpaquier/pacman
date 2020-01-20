let $pacman = document.querySelector('.pacman');

let nextPosition;

let pacmanPosition = { x: 1, y: 1 };

(function game() {
  listenKey();
  setInterval(step, 200);
  function step() {
    movePacman();
  }
})();

function listenKey() {
  window.addEventListener('keydown', function(e) {
    switch (e.key) {
      case 'ArrowUp':
        nextPosition = 'up';
        $pacman.className = 'pacman going-up';
        break;
      case 'ArrowDown':
        nextPosition = 'down';
        $pacman.className = 'pacman going-down';
        break;
      case 'ArrowRight':
        nextPosition = 'right';
        $pacman.className = 'pacman';
        break;
      case 'ArrowLeft':
        nextPosition = 'left';
        $pacman.className = 'pacman going-left';
        break;
    }
  });
}

function movePacman() {
  switch (nextPosition) {
    case 'up':
      if (pacmanPosition.y > 0) {
        pacmanPosition.y--;
      }
      break;
    case 'down':
      if (pacmanPosition.y < 20) {
        pacmanPosition.y++;
      }
      break;
    case 'left':
      if (pacmanPosition.x > 0) {
        pacmanPosition.x--;
      }
      break;
    case 'right':
      if (pacmanPosition.x < 20) {
        pacmanPosition.x++;
      }
      break;
  }
  $pacman.style.gridRow = pacmanPosition.y;
  $pacman.style.gridColumn = pacmanPosition.x;
}
