let canvas;
let gynoid;
let mountain;
let rotationValueY = 0;
let addRotationY;
let rotationValueX = 0;

let model0;
let model1;
let wave;
let dropsound = [];
let ambientSound;
let bubbleSound;

let onlyOnetime = 0;
let index;

let solor;
let cameraY;

let aurora;
let stars;

let time = 0;
const sTime = 0;


function preload(){
  gynoid = loadModel("gynoid/gynoid2.obj");
  mountain = loadModel("mountain/mountain.obj");
  ambientSound = loadSound("sound/after-death-world.mp3");
  bubbleSound = loadSound("sound/bubble.mp3");
  for(let i = 0; i < 7; i++){
    dropsound[i] = loadSound("sound/water/drop"+i+".mp3");
  }
  solor = loadImage("lights/light2.png");
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.id("canvas");
  perspective(PI / 3.0, width / height, 1, 70000);
  wave = new Wave();
  model0 = new Model();
  model1 = new Model();
  aurora = new Aurora(-3000, 8000, 10000, -60000, 1000, 0, 15000, 300, 7500);
  stars = new Stars();
}

// Resize the canvas every time window size changed.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw(){
  perspective(PI / 3.0, width / height, 1, 50000);
  // orbitControl(4, 4);//Mouse control
  background(15);

  cameraY = map(mouseY, 0, height, -1200, 0);
  camera(0, -200, (height/2.0) / tan(PI*30.0 / 180.0), 0, cameraY, 0, 0, 1, 0);

  // rotationValueX = map(mouseY, 0, height, PI/3, -PI/2);
  rotateX(rotationValueX+PI);
  addRotationY = map(mouseX, 0, width, 0.02, -0.02);
  rotationValueY += addRotationY;
  rotateY(rotationValueY+PI);

  push();
  colorMode(HSB);
  stars.show();
  pop();

  push();
    rotateY(-PI/8);
    colorMode(HSB);
    // aurora.show();
  pop();

  //Show white solor
  push();
    imageMode(CENTER);
    translate(3000, 500, 12000);
    rotateY(PI/7);
    image(solor, 0, 0, 6400*1.5, 3556*1.5);
  pop();


  //Show mountain
  push();
    rotateY(-PI*2.6/4);
    directionalLight(255, 255, 255, 0, -1, 0);
    model1.show(mountain, 0, -1200, 0, 3000, 0, "specular");
  pop();

  //Show woman
  pointLight(255, 255, 255, 0, 0, -1000);
  // pointLight(0, 255, 255, 0, 0, -1000);
  // pointLight(255, 0, 255, 0, 0, -1000);
  model0.show(gynoid, 0, -30, 0, 1.2, 0.002, "specular");

  //Show wave surface
  ambientMaterial(0, 0, 0, 255);
  wave.showWave(0.00007);

  time ++;
}

function mousePressed(){

  if(onlyOnetime == 0){
    ambientSound.setVolume(0.008);
    // ambientSound.loop();
    bubbleSound.setVolume(0.9);
    bubbleSound.loop();
  }
  onlyOnetime++;

  if(time > 30){
    index = int(random(0, 6));
    dropsound[index].setVolume(random(0.2, 0.5));
    dropsound[index].play();
  }
  time = sTime;
}
