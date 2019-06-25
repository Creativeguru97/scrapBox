let walls = [];
let particle;

const sceneW = 400;
const sceneH = 400;
let sliderFOV;

function setup(){
  createCanvas(800, 400);

  for(let i = 0; i < 5; i++){
    let x1 = random(sceneW);
    let y1 = random(sceneH);
    let x2 = random(sceneW);
    let y2 = random(sceneH);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }

  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(0, 0, 0, sceneH));
  walls.push(new Boundary(0, sceneH, sceneW, sceneH));
  particle = new Particle();
  sliderFOV = createSlider(0, 180, 30, 1);
  sliderFOV.input(FOV);
}

// function keyTyped(){
//   if(key == "w"){
//     particle.move(1);
//   }else if(key == "s"){
//     particle.move(-1);
//   }
// }

function FOV(){
  particle.updateFov(sliderFOV.value());
}

function draw(){

  if(keyIsDown(LEFT_ARROW)){
    particle.rotate(-0.01);
  }else if(keyIsDown(RIGHT_ARROW)){
    particle.rotate(0.01);
  }else if(keyIsDown(UP_ARROW)){
    particle.move(1);
  }else if(keyIsDown(DOWN_ARROW)){
    particle.move(-1);
  }

  background(0);
  for(let wall of walls){//Enhanced Loop
    wall.show();
  }
  // particle.show();
  // particle.look(walls);
  // particle.update(mouseX, mouseY);

  const scene = particle.look(walls);
  const w = sceneW / scene.length;

  push();
  translate(sceneW, 0);
  for(i = 0; i < scene.length; i++){
    const sq = scene[i] * scene[i];
    const wSq = sceneW * sceneW;
    const b = map(sq, 0, wSq, sceneH, 0);
    const h = map(scene[i], 0, sceneH * sqrt(2), sceneH * sqrt(2), 0);
    noStroke();
    fill(0, b, 0);
    rectMode(CENTER);
    rect(i*w + w/2, sceneH/2, w, h);
  }
  pop();
}
