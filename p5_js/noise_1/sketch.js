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
  noise_scale: 60,
  max_angle: 2,
  step:30,
  speed: 70,
  point_number: 400,
  point_size: 5,
  length: 5,
  opacity: 140,
  refresh: false,
  colors: {
    color1: [7, 153, 242],
    color2: [88, 101, 242],
    color3: [255, 255, 255],
    background: [0, 0, 0]
  }
}

option.save = function () {
  saveCanvas(canvas, 'x06lan_p5.js', 'png');
}
option.noise= function () {
  option.noise_scale=100;
  option.max_angle=2;
  option.step=50;
  gui.updateDisplay();
}
option.circuit_board= function () {
  option.noise_scale=100;
  option.max_angle=2;
  option.step=8;
  gui.updateDisplay();
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
par.add(option, "point_number", 0, 1000, 1)
par.add(option, "noise_scale", 1, 100, 1)
par.add(option, "max_angle", 0.1, 4, 0.1)
par.add(option, "step", 2, 50, 1)
par.add(option, "opacity", 0, 255, 1)
par.add(option, "speed", 0, 500, 1)
par.add(option, "point_size", 1, 20, 0.1)
par.add(option, "length", 1, 100, 1)
par.add(option, "refresh")

let preset=controls.addFolder("preset") 
preset.add(option,"noise")
preset.add(option,"circuit_board")
preset.open()
controls.add(option, "save")


par.open()





let point_line = function (inx, iny) {
  let point = {}
  point.path = []
  point.pos = { x: inx, y: iny }
  point.path_long = 40
  point.op_max = 140
  point.color = color(174, 19, 109);
  point.setcolor = function (setcolor) {
    point.color = setcolor
  }
  point.moveto = function (x, y) {
    point.path.unshift(point.pos)
    if (point.path.length > point.path_long) point.path.splice(-1, 1)

    point.pos = { x: x, y: y }
    if (point.pos.y > height) {
      // point.pos.x=point.
      point.pos.y = 0;
    }

  }
  point.draw = function () {
    for (var i = point.path.length - 1; i >= 0; i--) {
      noStroke();
      let op = point.op_max * ((point.path_long - i) / point.path_long)
      point.color.setAlpha(op);
      fill(point.color);
      let pos = point.path[i]
      ellipse(pos.x, pos.y, option.point_size, option.point_size);

    }


  }
  return point

}
// let point
function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  background(color(option.colors.background));

  // Starts in the middle
  x = width / 2;
  y = height / 2;
  // point=point_line(x,y)
  for (var i = 0; i < option.point_number; i++) {
    points[i] = point_line(width * Math.random(), height * Math.random())

    if (i % 3 == 1) points[i].setcolor(color(option.colors.color1))
    else if (i % 3 == 2) points[i].setcolor(color(option.colors.color2))
    else if (i % 3 == 0) points[i].setcolor(color(option.colors.color3))
  }

}


function draw() {
  if (option.refresh) background(color(option.colors.background));
  if (option.point_number > points.length) {
    for (let i = points.length; i < option.point_number; i++) {
      points[i] = point_line(width * Math.random(), height * Math.random())
      
    }

  }else {
    for (let i = option.point_number; i < points.length; i++) {
      points.splice(i,1)      
    }

  }

  for (var i = 0; i < points.length; i++) {
    let point_point = points[i]

    let newx, newy;

    if (i % 3 == 1) points[i].setcolor(color(option.colors.color1))
    else if (i % 3 == 2) points[i].setcolor(color(option.colors.color2))
    else if (i % 3 == 0) points[i].setcolor(color(option.colors.color3))

    point_point.op_max = option.opacity

    point_point.path_long = option.length

    //最重要的地方
    let angle = option.max_angle * Math.PI * floor(noise(point_point.pos.x * option.noise_scale / 10000, point_point.pos.y * option.noise_scale / 10000)*option.step)/option.step;
    
    newx = option.speed / 100 * Math.cos(angle) + point_point.pos.x
    newy = option.speed / 100 * Math.sin(angle) + point_point.pos.y
    if (newx > width || newx < 0) {
      newx = width * Math.random()
      newy = height * Math.random()
    }
    else if (newy > height || newy < 0) {
      newx = width * Math.random()
      newy = height * Math.random()

    }
    point_point.moveto(newx, newy)
    point_point.draw()
  }
}

