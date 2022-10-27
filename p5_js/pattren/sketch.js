/*
 * @name Animation
 * @description The circle moves.
 */
// Where is the circle
let x, y;
let canvas
let points = []
let timecount = 0
let option = {
  range: 600,
  offset: -300,
  point_number: 50,
  length: 5,
  point_size: 10,
  speed: 100,
  refresh: true,
  colors: {
    color1: [174, 19, 109],
    color2: [206, 255, 43],
    color3: [28, 177, 255],
    background: [0, 0, 0]
  }
}
option.particle = function () {
  option.range = 600
  option.offset = -300
  gui.updateDisplay();
}
option.circle = function () {
  option.range = 90
  option.offset = 160
  gui.updateDisplay();
}
option.save = function () {
  saveCanvas(canvas, 'x06lan_p5.js', 'png');
}

const gui = new dat.GUI()
let controls = gui.addFolder("Controls")
controls.open()

const colors = controls.addFolder("color")
colors.addColor(option.colors, "color1")
colors.addColor(option.colors, "color2")
colors.addColor(option.colors, "color3")
colors.addColor(option.colors, "background")
colors.open()

let par = controls.addFolder("parameter")
par.add(option, "point_number", 0, 100, 1)
par.add(option, "range", 1, 600, 0.1)
par.add(option, "offset", -400, 400, 0.1)
par.add(option, "point_size", 1, 100, 0.1)
par.add(option, "length", 1, 100, 1)
par.add(option, "speed", 1, 250, 1)
par.add(option, "refresh")


par.open()

let preset = controls.addFolder("preset")
preset.add(option, "circle")
preset.add(option, "particle")
preset.open()
controls.add(option, "save")





let point_line = function (inx, iny) {
  let point = {}
  point.path = []
  point.pos = { x: inx, y: iny }
  point.as = { x: 0, y: 0 }
  point.length = 40
  point.color = color(174, 19, 109);
  point.setcolor = function (setcolor) {
    point.color = setcolor
  }


  point.moveto = function (x, y) {
    point.path.unshift(point.pos)
    if (point.path.length > point.length) point.path.splice(-1, 1)

    point.pos = { x: x, y: y }
    if (point.pos.y > height)
      point.pos.y = 0;
    if (point.pos.y < 0)
      point.pos.y = height - 1;
    if (point.pos.x > width)
      point.pos.x = 0;
    if (point.pos.x < 0)
      point.pos.x = width - 1;

  }
  point.draw = function () {
    let length = Math.min(point.length, point.path.length)
    for (var i = 1; i < length; i++) {
      noStroke();
      let op = 140 * ((length - i) / length);
      point.color.setAlpha(op);
      fill(point.color);
      strokeWeight(option.point_size * op / 140);
      stroke(point.color)
      let pos = point.path[i]
      let lastpos = point.path[i - 1]
      line(pos.x, pos.y, lastpos.x, lastpos.y)

    }
    // fill(point.color);
    // ellipse(point.pos.x, point.pos.y, option.point_size, option.point_size);
  }

  return point

}
function initpoint(point, id) {
  if (id % 3 == 1) point.setcolor(color(option.colors.color1))
  else if (id % 3 == 2) point.setcolor(color(option.colors.color2))
  else if (id % 3 == 0) point.setcolor(color(option.colors.color3))

}

// let point
function setup() {
  canvas = createCanvas(window.innerWidth - 10, window.innerHeight - 21);
  // Starts in the middle
  x = width / 2;
  y = height / 2;
  for (var i = 0; i < option.point_number; i++) {
    points[i] = point_line(x, y)
    points[i].pos.x = x
    points[i].pos.y = y
    initpoint(points[i], i)

    points[i].draw()
  }


}



function draw() {

  if (option.refresh) {
    background(color(option.colors.background));
    for (let i = 0; i < option.point_number; i++) {
      if (points[i] == undefined) {
        points[i] = point_line(0, 0)
        initpoint(points[i], i)

      }
      point = points[i]
      point.length = option.length
      // console.log(point)
      angle = i / points.length * Math.PI * 2
      speed = option.speed / 100

      dx = Math.cos(angle) * speed
      dy = Math.sin(angle) * speed
      point.moveto(point.pos.x + dx, point.pos.y + dy)
      point.draw()


    }

  } else {
  }
  timecount += option.speed / 10000
}

