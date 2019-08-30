/*
* Инициализация canvas
* */
let
  canvas = document.querySelector('canvas'),
  width = canvas.width,
  height = canvas.height,
  ctx = canvas.getContext('2d');

/*
* Helpers
* */
function random(start, stop, isFloat = false) {
  let result = Math.random() * (( stop - start ) + 1) + start;

  return isFloat ? result : Math.floor(result);
}

// Верхняя граница диапозона не включается
function randomNegative(endOfRange, isFloat = false) {
  let result = ( Math.random() - 0.5 ) * 2 * endOfRange;

  return isFloat ? result : Math.floor(result);
}

function Drawer (context) {
  this.ctx = context;
}

/*
* Drawer Class
* */
Drawer.prototype.line = function (x1, y1, x2, y2) {
  this.ctx.beginPath();
  this.ctx.moveTo(x1, y1);
  this.ctx.lineTo(x2, y2);
  this.ctx.strokeStyle = 'blue';
  this.ctx.stroke();

  return this;
};

Drawer.prototype.arc = function (x, y, r, start, end, direction) {
  this.ctx.beginPath();
  this.ctx.arc(x, y, r, start, end, direction);
  this.ctx.strokeStyle = 'blue';
  this.ctx.stroke();

  return this;
};

Drawer.prototype.clear = function () {
  this.ctx.clearRect(0, 0, width, height);

  return this;
};

/*
* Circle Class
* */

function Circle (
  context,
  x = random(50, 450),
  y = random(50, 450),
  r = 50,
  dx = randomNegative(5, true),
  dy = randomNegative(5, true)
) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.ctx = context;
}

Circle.prototype.draw = function () {
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
  this.ctx.strokeStyle = 'blue';
  this.ctx.stroke();

  return this;
};

Circle.prototype.update = function () {
  // Отскакивание от краев canvas по оси x
  if (this.x + this.r > width || this.x - this.r < 0) {
    this.dx = -this.dx;
  }

  // Отскакивание от краев canvas по оси y
  if (this.y + this.r > height || this.y - this.r < 0) {
    this.dy = -this.dy;
  }

  // Изменение координат в соответствии со значением скорости
  this.x += this.dx;
  this.y += this.dy;

  return this;
};

/*
* Work area
* */
let drawer = new Drawer(ctx);
let circle = new Circle(ctx);

// Главный цикл: кадр анимации вызывает функцию
// requestAnimationFrame, а она планирует вызов фукнции
// кадра анимации в тот момент, когда перерисовывается экран
// благодаря чему обеспечивается синхронизация
function animationStep () {
  requestAnimationFrame(animationStep);

  drawer.clear();

  circle
    .update()
    .draw();
}

animationStep();
