let canvas;
let gynoid;
let rotationValueY = 0;
let addRotationY;
let rotationValueX = 0;

let model0;
let wave;
let dropsound = [];
let ambientSound;
let bubbleSound;

let onlyOnetime = 0;
let index;

let light;

let time = 0;
const sTime = 0;

function preload(){
  gynoid = loadModel("gynoid/gynoidUpper.obj");
  ambientSound = loadSound("sound/after-death-world.mp3");
  bubbleSound = loadSound("sound/bubble.mp3");
  for(let i = 0; i < 7; i++){
    dropsound[i] = loadSound("sound/water/drop"+i+".mp3");
  }
  light = loadImage("lights/light2.png");
}

function setup(){
  canvas = createCanvas(800, 600, WEBGL);
  canvas.id("canvas");
  wave = new Wave();
  model0 = new Model();
}

function draw(){
  // orbitControl(4, 4);//Mouse control
  background(0);
  rotationValueX = map(mouseY, 0, width, -PI/20, -PI/2);
  rotateX(rotationValueX+PI);
  addRotationY = map(mouseX, 0, width, 0.02, -0.02);
  rotationValueY += addRotationY;
  rotateY(rotationValueY+PI);

  push();
    imageMode(CENTER);
    translate(1200, 0, 3500);
    rotateY(PI/6);
    image(light, 0, 0, 3200, 1778);
  pop();

  // lightFalloff(1, 0.0005, 0);
  pointLight(255, 190, 150, 0, 0, -1000);

  model0.show(gynoid, 0, 0, 0, 1.2, 0.002, "specular");

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
