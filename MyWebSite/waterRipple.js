let waterRippleCanvas;

let elementMode;
let displayMode;

let sphericalWave;
let wave;
const waveCols = 45;
const waveRows = 22;

const sphericalWaveCols = 50;
const sphericalWaveRows = 25;

const damping = 0.9;

let bubbleSound;
let dropsound = [];

function preload(){
  bubbleSound = loadSound("sounds/bubble.mp3");
  for(let i = 0; i < 7; i++){
    dropsound[i] = loadSound("sounds/water/drop"+i+".mp3");
  }
}

function setup(){
  waterRippleCanvas = createCanvas(windowWidth, windowHeight-80, WEBGL);
  waterRippleCanvas.id("waterRippleCanvas");

  createDiv();
  elementMode = createSelect();
  elementMode.option("Plane");
  elementMode.option("Spherical");
  elementMode.class("Selector");

  createDiv();
  displayMode = createSelect();
  displayMode.option("Line mode");
  displayMode.option("Point mode");
  displayMode.class("Selector");

  wave = new Wave(windowWidth/40, waveCols, waveRows, damping);
  sphericalWave = new SphericalWave(20, sphericalWaveCols, sphericalWaveRows, damping);
  colorMode(HSB);
}

// Resize the canvas every time window size changed.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw(){
  clear();

  if(elementMode.value() == "Plane"){
    wave.showWave(0.01);
  }else if(elementMode.value() == "Spherical"){
    rotateX(-PI*20/39);
    rotateZ(PI*20/39);
    sphericalWave.showWave(0.01);
  }

}

function mouseDragged(){
  if(elementMode.value() == "Spherical"){

    if(mouseX > windowWidth/2-250 && mouseX < windowWidth/2+250){
      if(mouseY > windowHeight/2-250 && mouseY < windowHeight/2+250){
        let rippleX = floor(map(mouseX, windowWidth/2+250, windowWidth/2-250, sphericalWaveCols*3/4, sphericalWaveCols/4));
        let rippleZ = floor(map(mouseY, windowHeight/2+250, windowHeight/2-250, 0, sphericalWaveRows));
        sphericalWave.previousWaveAdd[rippleX][rippleZ] = -50;

        // let soundZ = map(mouseY, windowHeight*2/3, windowHeight, 0.06, 0.3);
        index = int(random(0, 6));
        dropsound[index].playMode('sustain');
        dropsound[index].setVolume(0.05);
        dropsound[index].play();
      }
    }

  }else if (elementMode.value() == "Plane") {

    if(mouseY > windowHeight*2/3){
      let rippleX = floor(map(mouseX, 0, windowWidth, 0, waveCols));
      let rippleZ = floor(map(mouseY, windowHeight*2/3, windowHeight, waveRows/2-10, waveRows/2+10));
      wave.previousWaveAdd[rippleX][rippleZ] = 100;

      let soundZ = map(mouseY, windowHeight*2/3, windowHeight, 0.03, 0.15);
      index = int(random(0, 6));
      dropsound[index].playMode('sustain');
      dropsound[index].setVolume(soundZ);
      dropsound[index].play();
    }

  }
}

function mousePressed(){
  if(elementMode.value() == "Spherical"){

    if(mouseX > windowWidth/2-250 && mouseX < windowWidth/2+250){
      if(mouseY > windowHeight/2-250 && mouseY < windowHeight/2+250){
        let rippleX = floor(map(mouseX, windowWidth/2+250, windowWidth/2-250, sphericalWaveCols*3/4, sphericalWaveCols/4));
        let rippleZ = floor(map(mouseY, windowHeight/2+250, windowHeight/2-250, 0, sphericalWaveRows));
        sphericalWave.previousWaveAdd[rippleX][rippleZ] = -150;

        // let soundZ = map(mouseY, windowHeight*2/3, windowHeight, 0.06, 0.3);
        index = int(random(0, 6));
        dropsound[index].playMode('sustain');
        dropsound[index].setVolume(0.06);
        dropsound[index].play();
      }
    }

  }else if (elementMode.value() == "Plane") {

    if(mouseY > windowHeight*2/3){
      let rippleX = floor(map(mouseX, 0, windowWidth, 0, waveCols));
      let rippleZ = floor(map(mouseY, windowHeight*2/3, windowHeight, waveRows/2-10, waveRows/2+10));
      wave.previousWaveAdd[rippleX][rippleZ] = 300;

      let soundZ = map(mouseY, windowHeight*2/3, windowHeight, 0.06, 0.3);
      index = int(random(0, 6));
      dropsound[index].playMode('sustain');
      dropsound[index].setVolume(soundZ);
      dropsound[index].play();
    }

  }
}
