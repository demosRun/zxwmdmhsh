var imageWidth = 749
var imageHeight = 231
// 粒子持续时间
var findTime = 8
var deviation = 110
var countPointsPerFrame = 4400;

var needUpdata = true
var Particle = {
  create: function (cfg) {
      var particle = Object.create(this);
      particle.x = cfg.x;
      particle.y = cfg.y;
      particle.color = cfg.color;
      particle.finalX = cfg.finalX;
      particle.finalY = cfg.finalY;

      var divider = Math.max(1, parseInt(Math.random() * findTime));
      // console.log(divider)
      particle.vx = (particle.finalX - particle.x) / divider;
      particle.vy = (particle.finalY - particle.y) / divider;
      return particle;
  },
  update: function () {
    if (Math.abs(this.x - this.finalX) < 1 && Math.abs(this.y - this.finalY) < 1) {
      this.x = this.finalX;
      this.y = this.finalY;
      return;
    }
    needUpdata = true
    this.x += this.vx;
    this.y += this.vy;
  },

  draw: function () {
    context.fillStyle = this.color;
    context.fillRect(offsetX + this.x, offsetY + this.y, 1, 1);
  }
};

var pixelsPerLine = imageWidth * 4;
var canvas = document.querySelector("#c1");
var context = canvas.getContext('2d');
canvas.width = imageWidth;
canvas.height = imageHeight;
var offsetX = (canvas.width - imageWidth) / 2;
var offsetY = (canvas.height - imageHeight) / 2;

var tmpCanvas = document.createElement('canvas');
tmpCanvas.width = imageWidth
tmpCanvas.height = imageHeight
var tmpContext = tmpCanvas.getContext('2d');
var img = document.querySelector('.so-2');
tmpContext.drawImage(img, 0, 0, imageWidth, imageHeight);
var data = tmpContext.getImageData(0, 0, imageWidth, imageHeight).data;
var pixels = getPixels(data);

// 从左到右
// pixels.sort(function (p0, p1) {
//   return p0.x - p1.x;
// });

function getPixels (data) {
  console.log(data.length)
    var pixels = [];
    var x = 0, y = 0;
    for (var i = 0; i < data.length; i += 4) {
        x = parseInt(i / 4) % imageWidth;
        y = parseInt(i / pixelsPerLine);
        var opacity = data[i + 3] / 255;
        if (opacity == 0) {
            continue;
        }
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];
        pixels.push({x: x, y: y, color: 'rgba(' + r + ',' + g + ',' + b + ',' + opacity.toFixed(2) + ')'});
    }
    return pixels;
}

function generatePoints (index) {
  var offset = index * countPointsPerFrame;
  for (var i = 0; i < countPointsPerFrame; ++i) {
    var pixel = pixels[offset + i];
    if (!pixel) {
      return;
    }
    var p = Particle.create({
      x: Math.ceil(pixel.x - Math.random() * deviation),
      y: Math.ceil(pixel.y - Math.random() * deviation),
      finalX: pixel.x,
      finalY: pixel.y,
      color: pixel.color
    });
    points.push(p);
  }
}

var points = [];

var index = 0;

function update () {
  generatePoints(index);
  ++index;
  needUpdata = false
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0, len = points.length; i < len; ++i) {
    var point = points[i];
    point.update();
    point.draw();
  }
  if(needUpdata) {
    requestAnimationFrame(update)
  }
}
