let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

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
  this.ctx.arc(x, y, r, start, end, direction);
  this.ctx.strokeStyle = 'blue';
  this.ctx.stroke();

  return this;
};

let drawer = new Drawer(ctx);

drawer
  .arc(250, 250, 150, 0, Math.PI * 3 / 2, true)
  .line(250, 250, 20, 20)
  .line(250, 250, 240, 40);
