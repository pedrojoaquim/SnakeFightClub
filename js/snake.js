

class Snake{

  constructor(id, x, y, dir, maxX, maxY, color) {
    this.id = id;
    this.snakeCells = [cell(x, y)];
    this.direction = dir;
    this.growNextMove = false;
    this.maxX = maxX;
    this.maxY = maxY;
    this.snakeColor = color;
    this.queuedDirection = [];
    this.dead = false;
  }

  grow(){
    this.growNextMove = true;
  }

  move(){

    let newX = this.snakeCells[0].x + this.direction.x;
    let newY = this.snakeCells[0].y + this.direction.y;

    if(newX > this.maxX){
      newX = 0;
    }
    else if (newX < 0){
      newX = this.maxX;
    }
    else if (newY > this.maxY){
      newY = 0;
    }
    else if (newY < 0){
      newY = this.maxY;
    }

    this.snakeCells.unshift(cell(newX, newY));

    if(this.growNextMove){
      this.growNextMove = false;
    }
    else {
      this.snakeCells.pop();
    }

    if(this.queuedDirection.length > 0){
      this.direction = this.queuedDirection.pop();
    }

    /*

    if(this.id === 1){
      console.log("MY POS: X = " + newX + " ; " + " Y = " + newY)
    }*/
  }

  color(){
    return this.snakeColor;
  }

  cells(){
    return this.snakeCells;
  }

  head(){
    return this.snakeCells[0];
  }

  die(){
    this.dead = true;
  }

  changeDirection(dir) {
    let lastDirection = this.queuedDirection.length === 0 ? this.direction : this.queuedDirection[this.queuedDirection.length - 1];

    if(this.snakeCells.length === 1 || lastDirection.x + dir.x !== 0 || lastDirection.y + dir.y !== 0){
      this.queuedDirection.unshift(dir);
    }
  }


}
