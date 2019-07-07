//I use Chrome since p5.AudioIn is not supported on Safari and iOS.
let song;
let button;
let amp;
let fft;
const widthX = 512;//Must be power of 2
const resolution = 64;
const w = widthX / resolution;
let offset = 0.0;
let particle;
let rotateAngle = 0.0;

function preload(){
  // song = loadSound("Konac - Away.mp3");
  // song = loadSound("bensound-popdance.mp3");
  song = loadSound("bensound-romantic.mp3");
}

function setup(){
  createCanvas(widthX, widthX, WEBGL);
  angleMode(DEGREES);

  button  =createButton("play");
  button.mousePressed(togglePlaying);
  amp = new p5.Amplitude(0.5);
  fft = new p5.FFT(0.5, resolution);//For linear
  // fft = new p5.FFT(0.5, 256);
  particle = new Particle();
}

function draw(){
  background(0);
  let vol = amp.getLevel();
  let spectrum = fft.analyze();

  rotateAngle += 0.2;
  particle.show(vol, rotateAngle);
}


function togglePlaying(){
  if(!song.isPlaying()){
    song.loop();
    button.html("pause");
  }else{
    song.pause();
    button.html("play");
  }
}
