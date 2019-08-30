let
  canvas = document.querySelector('canvas'),
  width = canvas.width,
  height = canvas.height,
  ctx = canvas.getContext('2d');

function Drawer (context) {
  this.ctx = context;
}

function random(start, stop, isFloat = false) {
  let result = Math.random() * (( stop - start ) + 1) + start;

  return isFloat ? result : Math.floor(result);
}

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

Drawer.prototype.circle = function (x, y, r) {
  this.ctx.beginPath();
  this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
  this.ctx.strokeStyle = 'blue';
  this.ctx.stroke();

  return this;
};

let drawer = new Drawer(ctx);

for (let i = 0; i < 10; i++) {
  drawer.circle(random(0, width), random(0, height), random(10, 20));
}
