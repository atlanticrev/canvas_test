/*
* Инициализация canvas
* */
let
  canvas = document.querySelector('canvas'),
  width = canvas.width,
  height = canvas.height,
  ctx = canvas.getContext('2d');

  mouse = {
    x: undefined,
    y: undefined
  };

  // St Cristobal palette
  colors = [
    '#c19160',
    '#37324f',
    '#6697c3',
    '#ffd00d',
    '#fb8b00'
  ];
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
Drawer.prototype.clear = function () {
  this.ctx.clearRect(0, 0, width, height);

  return this;
};

// Drawer.prototype.line = function (x1, y1, x2, y2) {
//   this.ctx.beginPath();
//   this.ctx.moveTo(x1, y1);
//   this.ctx.lineTo(x2, y2);
//   this.ctx.strokeStyle = 'blue';
//   this.ctx.stroke();
//
//   return this;
// };

// Drawer.prototype.arc = function (x, y, r, start, end, direction) {
//   this.ctx.beginPath();
//   this.ctx.arc(x, y, r, start, end, direction);
//   this.ctx.strokeStyle = 'blue';
//   this.ctx.stroke();
//
//   return this;
// };


/*
* Circle Class
* */
function Circle (
  context,
  x = random(50, 450),
  y = random(50, 450),
  r = random(5, 20),
  dx = randomNegative(5, true),
  dy = randomNegative(5, true),
  color
) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.initialRadius = this.r;
  this.dx = dx;
  this.dy = dy;
  this.color = colors[random(0, colors.length)];
  // this.initialVelocityX = dx;
  // this.initialVelocityY = dy;
  this.ctx = context;
}

Circle.prototype.draw = function () {
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
  this.ctx.strokeStyle = 'black';
  this.ctx.stroke();
  this.ctx.fillStyle = this.color;
  this.ctx.fill();

  return this;
};

Circle.prototype.update = function () {
  // Отскакивание от краев canvas по оси x
  if (this.x + this.r > width || this.x - this.r < 0) {
    // Изменение скорости (ускорение)
    // this.dx *= 1.05;
    this.dx = -this.dx;
  }

  // Отскакивание от краев canvas по оси y
  if (this.y + this.r > height || this.y - this.r < 0) {
    // Изменение скорости (ускорение)
    // this.dy *= 1.05;
    this.dy = -this.dy;
  }

  // Изменение координат в соответствии со значением скорости
  this.x += this.dx;
  this.y += this.dy;

  /*
  * Interactivity
  * */

  // Измерение расстояния от центра окружности
  // до текущего положения указателя мыши
  // Увеличиваем круги в области и до заданных размеров
  let
    maximumRadius = this.initialRadius * 3,
    areaRadius = this.r;

  if ( Math.hypot( mouse.x - this.x, mouse.y - this.y ) < areaRadius
    && this.r <= maximumRadius) {
    this.r += 1;
  } else if ( this.r > this.initialRadius ) {
    this.r -= 1;
  }

  return this;
};


/*
* Work area
* */
// Создание окружностей
let circles = [];

for ( let i = 0; i < 1; i++ ) {
  circles.push(new Circle(ctx, width / 2, height / 2, 50, 0, 5));
}

window.addEventListener('mousemove', function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

let drawer = new Drawer(ctx);

// Главный цикл: кадр анимации вызывает функцию
// requestAnimationFrame, а она планирует вызов фукнции
// кадра анимации в тот момент, когда перерисовывается экран
// благодаря чему обеспечивается синхронизация
function animationStep () {
  requestAnimationFrame(animationStep);

  drawer.clear();

  circles.forEach(circle =>
    circle
      .update()
      .draw()
  );
}

animationStep();
