/*Snake Game*/

const UP = {x: 0, y: -1};

const BACKGROUND_COLOR = "#222222";
const SNAKE_COLOR = "#27B318";
const FOOD_COLOR =  "#ff0000";

function drawCell(cell, color) {
  $(cell.element).css('background-color',color)
}



async function gameLoop(game) {

  var snake = createInitialSnake(game);

  while (true) {
    snake.move();
    await sleep(500);
  }
}


$(document).ready(function () {

  var game = getGameArea();

  gameLoop(game);
});

function getGameArea() {

  var numSquares = 50;

  var gameArea = document.getElementById("game-area");

  var square_size = gameArea.offsetWidth / numSquares;

  var maxX = numSquares;

  var maxY = Math.floor(gameArea.offsetHeight / square_size) + 1;

  var rowClass = { width: "100%", height: square_size + "px" };
  var cellClass = { width: "2%", height: "100%", float: "left"};

  var cells = [];

  for (let y = 0; y < maxY; y++) {

    var row = $("<div/>", {
      id: "r" + y,
    }).css(rowClass);

    row.appendTo(gameArea);

    var cellsRow = [];

    cells.push(cellsRow);

    for (let x = 0; x < maxX; x++) {

      var cellElement = $("<div/>", {
        id: "c" + x + ":" + y,
      });

      cellElement.css(cellClass).appendTo(row);

      cellsRow.push({x: x, y: y, element: cellElement});
    }
  }


  return {cells: cells,
          maxX: maxX,
          maxY: maxY,
          getCell(x,y){
           return this.cells[y][x];
          }};
}




function createInitialSnake(game) {

  var initialCell = game.getCell(Math.floor(Math.random() * game.maxX), Math.floor(Math.random() * game.maxY));

  var snake =  {
    head: initialCell,
    tail: initialCell,
    cells: [initialCell],
    direction: UP,

    //move the snake
    move() {
      this.cells.unshift(game.getCell(this.head.x + this.direction.x, this.head.y + this.direction.y));

      this.head = this.cells[0];
      this.tail = this.cells[this.cells.length - 1];

      drawCell(this.cells.pop(), BACKGROUND_COLOR);
      drawCell(this.head, SNAKE_COLOR);
    },
  };

  return snake;
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
