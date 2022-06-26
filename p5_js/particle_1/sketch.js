/*
 * @name Animation
 * @description The circle moves.
 */
// Where is the circle
let x, y;
let canvas
let points=[]
let timecount=0
let option={
  range:600,
  offset:-300,
  point_number:50,
  length:40,
  point_size:10,
  speed:100,
  refresh:true,
  colors:{
    color1:[174, 19, 109],
    color2:[206, 255, 43],
    color3:[28, 177, 255],
    background:[0,0,0]
  }
}
option.particle=function(){
  option.range=600
  option.offset=-300
  gui.updateDisplay();
}
option.circle=function(){
  option.range=90
  option.offset=160
  gui.updateDisplay();
}
option.save=function(){
  saveCanvas(canvas, 'x06lan_p5.js', 'png');
}

const gui = new dat.GUI()
let controls=gui.addFolder("Controls")
controls.open()

const colors = controls.addFolder("color")
colors.addColor(option.colors,"color1")
colors.addColor(option.colors,"color2")
colors.addColor(option.colors,"color3")
colors.addColor(option.colors,"background")
colors.open()

let par=controls.addFolder("parameter")
par.add(option,"point_number",0,100,1)
par.add(option,"range",1,600,0.1)
par.add(option,"offset",-400,400,0.1)
par.add(option,"point_size",1,100,0.1)
par.add(option,"length",1,100,1)
par.add(option,"speed",1,250,1)
par.add(option,"refresh")


par.open()

let preset=controls.addFolder("preset") 
preset.add(option,"circle")
preset.add(option,"particle")
preset.open()
controls.add(option,"save")





let point_line=function(inx,iny){
  let point={}
  point.path=[]
  point.pos={x:inx,y:iny}
  point.path_long=40
  point.color= color(174, 19, 109);
  point.setcolor=function (setcolor) {
    point.color=setcolor
  }
  point.moveto=function(x,y){
    point.path.unshift(point.pos)
    if (point.path.length>point.path_long) point.path.splice(-1,1)
    
    point.pos={x:x,y:y}
    if (point.pos.y> height){
      // point.pos.x=point.
      point.pos.y=0;
    } 

  }
  point.draw=function()
  {
    for (var i = point.path.length-1; i >=0; i--) {
      noStroke();
      let op =140*((point.path_long-i)/point.path_long)
      point.color.setAlpha(op);
      fill(point.color);
      let pos=point.path[i]
      ellipse(pos.x, pos.y, option.point_size, option.point_size);

    }


  }
  return point

}
// let point
function setup() {
  canvas=createCanvas(window.innerWidth,  window.innerHeight);
  // Starts in the middle
  x = width / 2;
  y = height/2;
  // point=point_line(x,y)
  for (var i = 0; i <option.point_number ; i++) {
    points[i]=point_line(x,y)

    if( i%3==1)points[i].setcolor(color(option.colors.color1))
    else if(i%3==2) points[i].setcolor(color(option.colors.color2))
    else if (i%3==0) points[i].setcolor(color(option.colors.color3))
  }


}


function draw() {
  
  if(option.refresh) {
    background(color(option.colors.background));
    
  }else{
    // option.length=1
    // controls.updateDisplay();
  }
  if(option.point_number>points.length)
  {
  console.log(option.point_number)
    for (var i =points.length; i <option.point_number ; i++) {
      points[i]=point_line(x,y)
  
      if( i%3==1)points[i].setcolor(color(option.colors.color1))
      else if(i%3==2) points[i].setcolor(color(option.colors.color2))
      else if (i%3==0) points[i].setcolor(color(option.colors.color3))
          
    }
  }
  for (var i = 0; i < points.length; i++) {
    let point_point=points[i]
    if (points.length>option.point_number){
      points.splice(i,1)
    }else{
      let newx,newy;
        
      if( i%3==1)points[i].setcolor(color(option.colors.color1))
      else if(i%3==2) points[i].setcolor(color(option.colors.color2))
      else if (i%3==0) points[i].setcolor(color(option.colors.color3))
      point_point.path_long=option.length
      newx=(option.range*noise(timecount+i)+option.offset)*Math.cos(timecount+i)+x
      newy=(option.range*noise(timecount+i)+option.offset)*Math.sin(timecount+i)+y
  
      point_point.moveto(newx,newy )
      point_point.draw()

    }


  }
  timecount+=option.speed/10000
}

