//I use Chrome since p5.AudioIn is not supported on Safari and iOS.
let song;
let button;
let offset = 0.0;
let sphere;
let rotateAngle = 0.0;
let widthX = 700;

let sensitiveness;
let microphone;

function setup(){
  createCanvas(widthX, widthX, WEBGL);
  angleMode(DEGREES);

  // button  =createButton("play");
  // button.mousePressed(togglePlaying);
  microphone = new p5.AudioIn(print("Unknown error occured"));
  microphone.start();
  sensitiveness = createSlider(0.05, 1, 0.5, 0.05);//(min, max, default, increment)
  sphere = new Sphere();
}

function draw(){
  background(0);
  let vol = microphone.getLevel()*5;

  rotateAngle += 0.2;
  sphere.show(vol, rotateAngle);
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
