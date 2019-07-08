//I use Chrome since p5.AudioIn is not supported on Safari and iOS.
let song;
let button;
let amp;
const widthX = 700;//Must be power of 2 if I use p5.FFT()
const resolution = 64;
const w = widthX / resolution;
let offset = 0.0;
let sphere;
let rotateAngle = 0.0;


function preload(){
  song = loadSound("Konac - Away.mp3");
  // song = loadSound("bensound-popdance.mp3");
  // song = loadSound("bensound-romantic.mp3");
  // song = loadSound("Daniel_Shiffman - This_Dot_(prod._Kristian_Pedersen).wav");
}

function setup(){
  createCanvas(widthX, widthX, WEBGL);
  angleMode(DEGREES);

  button = createButton("play");
  button.mousePressed(togglePlaying);

  amp = new p5.Amplitude(0.5);
  // fft = new p5.FFT(0.5, resolution);//For linear

  // fft = new p5.FFT(0.5, 256);
  sphere = new Sphere();
}

function draw(){
  background(0);

  let vol = amp.getLevel();
  rotateAngle += 0.2;
  // let speed = map(vol, 0, 1, 0, 4);
  // rotateAngle += (0.2 + speed);
  sphere.rotation(vol, rotateAngle);
  sphere.show(vol);
  // sphere.networkOfPoint(vol)
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
