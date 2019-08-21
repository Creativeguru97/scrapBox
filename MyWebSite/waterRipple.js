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


//---------- Plane wave class-----------
class Wave{
  constructor(scl, cols, rows, damping){
    this.waveParticles = [];
    this.cols = cols;
    this.rows = rows;
    this.scl = scl;
    this.xAdd = 0.01;
    this.xOffset = 0;
    this.danping = damping;

    this.previousWaveAdd = [];
    for(let x = 0; x < this.cols; x++){
      this.previousWaveAdd[x] = [];
      for(let z = 0; z < this.rows; z++){
        this.previousWaveAdd[x][z] = 0;
      }
    }

    this.currentWaveAdd = [];
    for(let x = 0; x < this.cols; x++){
      this.currentWaveAdd[x] = [];
      for(let z = 0; z < this.rows; z++){
        this.currentWaveAdd[x][z] = 0;
      }
    }
  }

  showWave(){
    this.xAdd += 0.01;
    this.xOffset = this.xAdd;

    for(let x = 0; x < this.cols; x += 1){

      this.waveParticles[x] = [];
      this.zOffset = 0;

      //--- This is the ripple effects!!! ---
      for(let z = 0; z < this.rows; z += 1){

        if(x>1 && x<this.cols-1 && z>1 && z<this.rows-1){
          this.currentWaveAdd[x][z] = (
          (
            this.previousWaveAdd[x-1][z]
            +this.previousWaveAdd[x+1][z]
            +this.previousWaveAdd[x][z-1]
            +this.previousWaveAdd[x][z+1]
          )/2 - this.currentWaveAdd[x][z]
          );
        }else{
          this.currentWaveAdd[x][z] = 0;
        }

        this.currentWaveAdd[x][z] = this.currentWaveAdd[x][z] * this.danping;
        //------------------------------------

        this.particle = createVector();
        this.particle.x = x*this.scl - this.cols*this.scl/2;

        //--- Wave ---
        let noiseVal = noise(this.zOffset, this.xOffset);
        //------------
        this.particle.y = 150+map(noiseVal, 0, 1, -15, 15)+this.currentWaveAdd[x][z];
        this.particle.z = 350+z*this.scl -this.rows*this.scl/2;
        this.waveParticles[x][z] = this.particle;
        this.zOffset += 0.1;
      }
      this.xOffset += 0.1;
    }

    if(displayMode.value() == "Line mode"){
      this.lineMode();
    }else if(displayMode.value() == "Point mode"){
      this.pointMode();
    }

    let temp = [];
    temp = this.previousWaveAdd;
    this.previousWaveAdd = this.currentWaveAdd;
    this.currentWaveAdd = temp;
  }

  //Make separate ripple function for just in case;
  // ripple(){
  //
  //   for(let x = 1; x < this.cols-1; x++){
  //     for(let z = 1; z < this.rows-1; z++){
  //
  //       this.currentWaveAdd[x][z] = (
  //         (
  //         this.previousWaveAdd[x-1][z]
  //         +this.previousWaveAdd[x+1][z]
  //         +this.previousWaveAdd[x][z-1]
  //         +this.previousWaveAdd[x][z+1]
  //         )/2 - this.currentWaveAdd[x][z]
  //       );
  //
  //       this.currentWaveAdd[x][z] = this.currentWaveAdd[x][z] * this.danping;
  //       return(this.currentWaveAdd[x][z]);
  //     }
  //   }
  //
  //   let temp = [];
  //   temp = this.previousWaveAdd;
  //   this.previousWaveAdd = this.currentWaveAdd;
  //   this.currentWaveAdd = temp;
  //
  // }


  pointMode(){
    for(let i = 1; i < this.cols-1; i++){
      for(let j = 1; j < this.rows-1; j++){
        let hue = map(i+j+noise(this.zOffset, this.xOffset)*50, 0, this.cols+this.rows+50, 140, 350);
        let brightness = map(j, 0, this.rows, 0, 255);
        let weight = map(this.waveParticles[i][j].y, 140, 160, 15, 1);

        stroke(hue, 255, brightness);
        strokeWeight(weight);
        point(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
      }
    }
  }

  lineMode(){
    for(let i = 1; i < this.cols-1; i+=1){
      for(let j = 1; j < this.rows-1; j+=1){
        let hue = map(i+j+noise(this.zOffset, this.xOffset)*50, 0, this.cols+this.rows+50, 140, 350);
        let brightness = map(j, 0, this.rows, 0, 255);
        // let weight = map(this.waveParticles[i][j].y, 80, 220, 15, 0);

        stroke(hue, 255, brightness);
        strokeWeight(1);
        beginShape(LINES);
          vertex(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
          vertex(this.waveParticles[i+1][j].x, this.waveParticles[i+1][j].y, this.waveParticles[i+1][j].z);
          vertex(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
          vertex(this.waveParticles[i][j+1].x, this.waveParticles[i][j+1].y, this.waveParticles[i][j+1].z);
        endShape();
      }
    }
  }


}


//---------- Spherical wave class ----------
class SphericalWave{
  constructor(scl, cols, rows, damping){
    this.waveParticles = [];
    this.cols = cols;
    this.rows = rows;
    this.scl = scl;
    this.xAdd = 0.01;
    this.xOffset = 0;
    this.danping = damping;

    this.previousWaveAdd = [];
    for(let i = 0; i < this.cols; i++){
      this.previousWaveAdd[i] = [];
      for(let j = 0; j < this.rows; j++){
        this.previousWaveAdd[i][j] = 0;
      }
    }

    this.currentWaveAdd = [];
    for(let i = 0; i < this.cols; i++){
      this.currentWaveAdd[i] = [];
      for(let j = 0; j < this.rows; j++){
        this.currentWaveAdd[i][j] = 0;
      }
    }
  }

  showWave(){
    this.xAdd += 0.02;
    this.xOffset = this.xAdd;

    for(let i = 0; i < this.cols; i += 1){

      this.waveParticles[i] = [];
      this.zOffset = 0;

      //--- This is the ripple effects!!! ---
      for(let j = 0; j < this.rows+1; j += 1){

        if(i>1 && i<this.cols-1 && j>1 && j<this.rows-1){
          this.currentWaveAdd[i][j] = (
          (
            this.previousWaveAdd[i-1][j]
            +this.previousWaveAdd[i+1][j]
            +this.previousWaveAdd[i][j-1]
            +this.previousWaveAdd[i][j+1]
          )/2 - this.currentWaveAdd[i][j]
          );
        }else{
          this.currentWaveAdd[i][j] = 0;
        }

        this.currentWaveAdd[i][j] = this.currentWaveAdd[i][j] * this.danping;
        //------------------------------------

        //--- Wave ---
        let noiseVal = noise(this.zOffset, this.xOffset);
        //------------

        this.particle = createVector();

        let r = 250+map(noiseVal, 0, 1, -15, 15)+this.currentWaveAdd[i][j];
        this.particle.x = r * sin(j*PI/this.rows)*cos(i*TWO_PI/this.cols);
        this.particle.y = r * sin(j*PI/this.rows)*sin(i*TWO_PI/this.cols);
        this.particle.z = r * cos(j*PI/this.rows);

        this.waveParticles[i][j] = this.particle;
        this.zOffset += 0.1;
      }
      this.xOffset += 0.1;
    }

    if(displayMode.value() == "Line mode"){
      this.lineMode();
    }else if(displayMode.value() == "Point mode"){
      this.pointMode();
    }

    let temp = [];
    temp = this.previousWaveAdd;
    this.previousWaveAdd = this.currentWaveAdd;
    this.currentWaveAdd = temp;
  }


  pointMode(){
    for(let i = this.cols/5; i < this.cols*4/5; i++){
      for(let j = 1; j < this.rows; j++){
        let hue = map(j+noise(this.zOffset, this.xOffset)*20, 0, this.rows+20, 150, 300);
        let brightness = map(this.waveParticles[i][j].x, -250, 30, 255, 0);
        let weight = map(this.waveParticles[i][j].x, -250, 20, 12, 6);

        stroke(hue, 255, brightness);
        strokeWeight(weight);
        point(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
      }
    }
  }

  lineMode(){
    for(let i = this.cols/5; i < this.cols*4/5; i+=1){
      for(let j = 0; j < this.rows; j+=1){
        let hue = map(j+noise(this.zOffset, this.xOffset)*20, 0, this.rows+20, 150, 300);
        let brightness = map(this.waveParticles[i][j].x, -250, 20, 255, 0);
        let weight = map(this.waveParticles[i][j].y, 80, 220, 15, 0);
        stroke(hue, 255, brightness);
        strokeWeight(1);

        if(i == this.cols-1){
          beginShape(LINES);
            vertex(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
            vertex(this.waveParticles[0][j].x, this.waveParticles[0][j].y, this.waveParticles[0][j].z);
            vertex(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
            vertex(this.waveParticles[i][j+1].x, this.waveParticles[i][j+1].y, this.waveParticles[i][j+1].z);
          endShape();
        }else{
          beginShape(LINES);
            vertex(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
            vertex(this.waveParticles[i+1][j].x, this.waveParticles[i+1][j].y, this.waveParticles[i+1][j].z);
            vertex(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
            vertex(this.waveParticles[i][j+1].x, this.waveParticles[i][j+1].y, this.waveParticles[i][j+1].z);
          endShape();
        }
      }
    }
  }
}
