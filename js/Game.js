const NUM_HORIZONTAL_SQUARES = 50;
const CANVAS_BACKGROUND_COLOUR="black";
const SNAKE_COLOUR1="green";
const SNAKE_COLOUR2="yellow";
const FOOD_COLOUR="red";

class Game{

  constructor() {
    let canvasContainer = document.getElementById("game-area");
    this.canvas = document.getElementById("game-canvas");

    this.squareSize = canvasContainer.offsetWidth / NUM_HORIZONTAL_SQUARES;

    this.canvas.width  = canvasContainer.offsetWidth;
    this.canvas.height = Math.floor(canvasContainer.offsetHeight / this.squareSize) * this.squareSize;

    this.maxX = Math.round(this.canvas.width / this.squareSize) - 1;
    this.maxY = Math.round(this.canvas.height / this.squareSize) - 1;

    console.log("max x = "+ this.maxX);
    console.log("max y = "+ this.maxY);

    this.snakes = [new Snake(1, 0, 0, RIGHT, this.maxX, this.maxY, SNAKE_COLOUR1),
                   new Snake(2, this.maxX, this.maxY, LEFT, this.maxX, this.maxY, SNAKE_COLOUR2)];


    this.food = this.createFood();

    this.draw();
  }

  draw(){
    let context = this.canvas.getContext("2d");
    context.fillStyle = CANVAS_BACKGROUND_COLOUR;
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //draw food
    context.fillStyle = FOOD_COLOUR;
    context.fillRect(this.food.x * this.squareSize, this.food.y * this.squareSize, this.squareSize, this.squareSize);

    //draw snakes
    this.snakes.forEach(s => {
      context.fillStyle = s.color();
      s.cells().forEach(c => {

        context.fillRect(c.x * this.squareSize, c.y * this.squareSize, this.squareSize, this.squareSize)
      })
    });
  }

  play() {

    for (let i = 0; i < this.snakes.length; i++) {

      let s = this.snakes[i];

      s.move();

      if (s.head().x === this.food.x &&
        s.head().y === this.food.y) {

        s.grow();
        this.food = this.createFood();
      }

      if(this.isDead(s)){
        break;
      }

    }

    this.draw();

    return this.snakes.filter( s => s.dead).length > 0;
  }

  getHeight(){
    return this.canvas.height;
  }

  getWidth(){
    return this.canvas.width;
  }

  isDead(snake){

    let head = snake.head();

    for (let i = 0; i < this.snakes.length; i++) {
      for (let j = 0; j < this.snakes[i].cells().length; j++) {

        let currentCell = this.snakes[i].cells()[j];

        if(head !== currentCell && currentCell.x === head.x && currentCell.y === head.y){
          snake.die();

          if(this.snakes[i].head() === currentCell){
            this.snakes[i].die();
          }

          return true;
        }
      }
    }


    return false;
  }

  createFood() {

    let setOfPos = new Set();

    for (let i = 0; i < this.getWidth() / this.squareSize; i++) {
      for (let j = 0; j < this.getHeight() / this.squareSize; j++) {
        setOfPos.add(i + ":" + j);
      }
    }

    this.snakes.forEach(s => s.cells().forEach( c => setOfPos.delete(c.x + ":" + c.y)));

    let keys = Array.from(setOfPos.keys());
    let pos = keys[Math.floor(Math.random() * keys.length)];

    return cell(Number(pos.split(":")[0]), Number(pos.split(":")[1]))
  }
}
