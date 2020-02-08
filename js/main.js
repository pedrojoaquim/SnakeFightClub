
const UP = {x: 0, y: -1};
const DOWN = {x: 0, y: 1};
const LEFT = {x: -1, y: 0};
const RIGHT = {x: 1, y: 0};

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

const A_KEY = 65;
const D_KEY = 68;
const W_KEY = 87;
const S_KEY = 83;

const KEYS = [{up: UP_KEY, down: DOWN_KEY, left: LEFT_KEY, right: RIGHT_KEY},
              {up: W_KEY, down: S_KEY, left: A_KEY, right: D_KEY}];

$(document).ready(function(){


  document.addEventListener("keydown", changeSnakeDirection, false);

  let game = new Game();


  gameLoop(game);

  function changeSnakeDirection(event) {

    for (let i = 0; i < KEYS.length; i++) {
      switch(event.keyCode) {
        case KEYS[i].left:
          game.snakes[i].changeDirection(LEFT);
          break;
        case KEYS[i].right:
          game.snakes[i].changeDirection(RIGHT);
          break;
        case KEYS[i].up:
          game.snakes[i].changeDirection(UP);
          break;
        case KEYS[i].down:
          game.snakes[i].changeDirection(DOWN);
          break;
        default:
      }
    }
  }
});

function cell(x, y) {
  return {x: x, y: y};
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function gameLoop(game) {

  var timer = startTimer();

  while (!game.play()){
    await sleep(50);
  }

  stopTimer(timer);

  let winner =  game.snakes.filter(s => !s.dead).length > 0 ?  "SNAKE " + game.snakes.filter(s => !s.dead)[0].id : "DRAW";
  let color = game.snakes.filter(s => !s.dead).length > 0 ? game.snakes.filter(s => !s.dead)[0].color() : "white";

  document.getElementById("winner-label").innerText = winner;
  $("#winner-label" ).css("color",  color);

}

function startTimer() {
  const hoursLabel = document.getElementById("hours");
  const minutesLabel = document.getElementById("minutes");
  const secondsLabel = document.getElementById("seconds");
  var totalSeconds = 0;

  return setInterval(setTime, 1000);

  function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    hoursLabel.innerHTML = pad(parseInt(totalSeconds / 3600));
  }

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
}

function stopTimer(timer) {
  clearInterval(timer);
}

