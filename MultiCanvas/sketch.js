let hudCanvas;
let gridCanvas;

let canvas0 = function(p){
  p.setup = function(){
    p.createDiv();
    gridCanvas = p.createCanvas(720, 405);
    gridCanvas.id("hudCanvas");

  }

  p.draw = function(){
    // frameRate(10);
    // p.background(0);
    p.fill(100, 220, 255);
    p.grid();
    p.noStroke();
    p.ellipse(p.width/2, p.height/2, 40, 40);
    // console.log(expressions);

  }

  p.grid = function(){
    for(let i = 0; i <= p.width; i += 30){
      for(let j = 0; j <= p.height; j+= 30){
        p.stroke(0, 255, 0);
        p.strokeWeight(1);
        p.line(i, 0, i, p.height);
        p.line(0, j, p.width, j);
      }
    }
  }
}

let myp5 = new p5(canvas0, 'hudCanvas');

let canvas1 = function(p){
  p.setup = function(){
    p.createDiv();
    gridCanvas = p.createCanvas(720, 405);
    gridCanvas.id("gridCanvas");

  }

  p.draw = function(){
    // frameRate(10);
    // p.background(0);
    p.fill(100, 220, 255);
    p.grid();
    p.noStroke();
    p.ellipse(p.width/2, p.height/2, 40, 40);
    // console.log(expressions);

  }

  p.grid = function(){
    for(let i = 0; i <= p.width; i += 30){
      for(let j = 0; j <= p.height; j+= 30){
        p.stroke(0, 255, 0);
        p.strokeWeight(1);
        p.line(i, 0, i, p.height);
        p.line(0, j, p.width, j);
      }
    }
  }
}

let myp52 = new p5(canvas1, 'gridCanvas');


function changeBG(){
  myp5.background(myp5.random(255));
  myp52.background(myp52.random(255));
}

setInterval(changeBG, 1000);
