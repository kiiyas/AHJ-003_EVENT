export default class Game {
  constructor(sizeValue) {
    this.cells = [];
    this.size = sizeValue;
    this.position = null;
    this.count = 0;
    this.misses = 0;
    this.goblinInterval = null;
  }

  buildGameBoard() {
    // строим площадку
    const boardField = document.getElementsByClassName('game-container');
    const gameBoard = document.createElement('div');
    gameBoard.className = 'game';
    boardField[0].insertAdjacentElement('afterBegin', gameBoard);
    for (let i = 0; i < this.size ** 2; i += 1) {
      gameBoard.innerHTML += '<div class="game-cell"></div>';
    }
    // TODO динамическое определение площади игрового поля
    // добавляем клик
    const cells = document.getElementsByClassName('game-cell');
    const activeCells = document.getElementsByClassName('active');
    const countField = document.getElementById('count');
    const missesField = document.getElementById('misses');
    gameBoard.addEventListener('click', (event) => {
      if (event.target === activeCells[0]) {
        activeCells[0].classList.remove('active');
        this.count += 1;
        countField.innerHTML = this.count;
      } else {
        this.misses += 1;
        missesField.innerHTML = this.misses;
      }
    });
    // запускаем гоблина
    this.goblin(activeCells, cells, boardField, gameBoard);
  }

  goblin(activeCells, cells, boardField, gameBoard) {
    this.goblinInterval = setInterval(() => {
      this.moveing(activeCells, cells, boardField, gameBoard);
    }, 1000);
  }

  moveing(activeCells, cells, boardField, gameBoard) {
    if (this.misses < 5) {
      this.position = this.getRandom();
      if (activeCells[0]) {
        activeCells[0].classList.remove('active');
      }
      cells[this.position].classList.add('active');
    } else {
      this.finishGame(boardField, gameBoard);
    }
  }

  getRandom() {
    const index = Math.floor(Math.random() * this.size ** 2);
    if (index === this.position) {
      return this.getRandom();
    }
    return index;
  }

  finishGame(boardField, gameBoard) {
    clearInterval(this.goblinInterval);
    const general = document.getElementsByClassName('general');
    const message = document.createElement('div');
    message.classList.add('message');
    message.textContent = 'Fatality.. Press ENTER for the next game!';
    general[0].insertAdjacentElement('afterBegin', message);
    //
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.misses = 0;
        this.count = 0;
        general[0].removeChild(message);
        boardField[0].removeChild(gameBoard);
        this.buildGameBoard();
      }
    });
  }

  start() {
    this.buildGameBoard();
  }
}
