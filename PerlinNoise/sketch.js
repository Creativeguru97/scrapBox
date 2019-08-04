let canvas;

let gynoid;
let mountain;

let aurora;
let stars;
let wave;


function preload(){
  // gynoid = loadModel("gynoid/gynoid2.obj");
  // mountain = loadModel("mountain/mountain.obj");
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.id("canvas");
  perspective(PI / 3.0, width / height, 1, 70000);
  wave = new Wave(windowWidth/40);
  aurora = new Aurora(-3000, 8000, 10000, -60000, 1000, 0, 15000, 300, 7500);
  stars = new Stars();
  colorMode(HSB);
}

// Resize the canvas every time window size changed.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw(){
  // orbitControl(4, 4);
  background(0);
  // stars.show();
  wave.showWave(0.01);
}
