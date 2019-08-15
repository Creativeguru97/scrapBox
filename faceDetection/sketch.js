let canvas;
const widthX = 800;

let pointWeightSlider, pointWeightDisplay;

let skull;
let noid;
let headphone;
let record;

let element1;
let element2;

function preload(){
  skull = loadJSON("skull.json");
  noid = loadJSON("noid.json");
  headphone = loadJSON("headphone.json");
  record = loadJSON("record.json");
}

function setup(){
  canvas = createCanvas(widthX, widthX, WEBGL);
  canvas.class("canvas");

  element1 = new Element(skull);
  element2 = new Element(headphone);

  pointWeightDisplay = createDiv();
  pointWeightDisplay.class("Display");
  pointWeightDisplay.id("pointsliderMargin");
  pointWeightSlider = createSlider(0, 10, 0, 1);
  pointWeightSlider.class("Slider");
}

function draw(){
  // background(30);
  clear();
  orbitControl(4, 4);

  colorMode(HSB);
  stroke(170, 255, 255);
  element1.showModel(0, 752);

  pointWeightDisplay.html("Point thickness: " + pointWeightSlider.value());

}

function keyTyped() {
  if(key === "s"){
    element1.showVertexNum();
  }
}
