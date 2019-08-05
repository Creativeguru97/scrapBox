//I use Firefox since p5.AudioIn is not supported on Safari and iOS.
let canvas;
let button;// Toggle Microphone's ON and OFF
let elementMode;//Normal or Spiral?
let displayMode;//LineMode or PointMode?
let buttonDisplay;

let microphone;
let isListening = false;

let sphere;
let element1;
let element2;
let element3;
let element4;
let rotateAngle = 0.0;

//--- A lot of parameter relevant stuff ---
let offset = 0.0;
let sensitiveness, offsetSlider, densitySlider, percentageSlider, transformSlider, transformSlider2;
let sensitiveDisplay, offsetDisplay, densityDisplay, percentageDisplay, transformDisplay, transformDisplay2;
let lengthSlider, lineWeightSlider, colorChangeSlider;
let lengthDisplay, lineWeightDisplay, colorChangeDisplay;
let colorChangeSpeed;

let pointWeightSlider, pointWeightDisplay;
let animate;
let isAnimated = false;
let flashes;
let doesFlashes = false;
let lasers;
let doesShowLasers = false;
//--- A lot of parameter relevant stuff ---

let skull;//A freakin cool 3d model sound visualization
let headphone;
let noid;
let record;

function preload(){
  skull = loadJSON("skull.json");//This tells us the skull's every vertices in the obj file.
  headphone = loadJSON("headphone.json");
  noid = loadJSON("noid.json");
  record = loadJSON("record.json");
}


function setup(){
  canvas = createCanvas(windowHeight, windowHeight, WEBGL);
  // canvas.position(300, 0);
  canvas.id("SoundReactiveCanvas");

  angleMode(DEGREES);

  microphone = new p5.AudioIn(print("Unknown error occured"));
  // fft = new p5.FFT(0.5, resolution);//For linear

  // fft = new p5.FFT(0.5, 256);
  sphere = new Sphere();
  element1 = new Element(skull, 0, 0, 0, 100, -100, 100);
  element2 = new Element(headphone, 0, 0, 0, 80, -80, 80);
  element3 = new Element(noid, -3, -3, 3, 150, -150, 150);
  element4 = new Element(record, -3, -4, -2, 100, -100, 100);


  //--- A lot of parameter relevant stuff ---
  buttonDisplay = createDiv();
  buttonDisplay.class("buttonDisplay");
  button = createButton("microphone ON");
  button.mousePressed(togglePlaying);

  createDiv();
  elementMode = createSelect();
  elementMode.option("Normal Sphere");
  elementMode.option("Spiral Sphere");
  elementMode.option("Skull");
  elementMode.option("Headphone");
  elementMode.option("Noid");
  elementMode.option("Record");
  elementMode.class("Selector");
  elementMode.id("sphereModeSelector");

  createDiv();
  displayMode = createSelect();
  displayMode.option("Line mode");
  displayMode.option("Point mode");
  displayMode.class("Selector");
  displayMode.id("LastSelector");

  sensitiveDisplay = createDiv();
  sensitiveDisplay.class("Display");
  sensitiveness = createSlider(1, 20, 10, 0.5);//(min, max, default, increment)
  sensitiveness.class("Slider");

  offsetDisplay = createDiv();
  offsetDisplay.class("Display");
  offsetSlider = createSlider(0, 0.1, 0.02, 0.01);
  offsetSlider.class("Slider");

  densityDisplay = createDiv();
  densityDisplay.class("Display");
  densitySlider = createSlider(1, 32, 28, 0.1);
  densitySlider.class("Slider");

  percentageDisplay = createDiv();
  percentageDisplay.class("Display");
  percentageSlider = createSlider(0, 100, 100, 1);
  percentageSlider.class("Slider");


  animate = createCheckbox("Animate", false);
  animate.changed(animateSphere);
  animate.class("CheckBox");

  transformDisplay = createDiv();
  transformDisplay.class("Display");
  transformSlider = createSlider(1, 35, 1, 0.01);
  transformSlider.class("Slider");
  transformSlider.id("transformSlider");

  transformDisplay2 = createDiv();
  transformDisplay2.class("Display");
  transformSlider2 = createSlider(1, 35, 1, 0.01);
  transformSlider2.class("Slider");
  transformSlider2.id("transformSlider");

  headLine1 = createP("----- Lines ---");
  headLine1.class("Display");


  lengthDisplay = createDiv();
  lengthDisplay.class("Display");
  lengthSlider = createSlider(0.1, 2, 0.1, 0.1);
  lengthSlider.class("Slider");

  lineWeightDisplay = createDiv();
  lineWeightDisplay.class("Display");
  lineWeightSlider = createSlider(0, 10, 0, 1);
  lineWeightSlider.class("Slider");

  colorChangeDisplay = createDiv();
  colorChangeDisplay.class("Display");
  colorChangeSlider = createSlider(1000, 6000, 3000, 500);
  colorChangeSlider.class("Slider");

  headLine2 = createP("----- Points -----");
  headLine2.class("Display");

  flashes = createCheckbox("Flashes", false);
  flashes.changed(pointModeFlashes);
  flashes.class("CheckBox");

  lasers = createCheckbox("Laser", false);
  lasers.changed(pointModeLaser);
  lasers.class("CheckBox");

  pointWeightDisplay = createDiv();
  pointWeightDisplay.class("Display");
  pointWeightDisplay.id("pointsliderMargin");
  pointWeightSlider = createSlider(0, 10, 0, 1);
  pointWeightSlider.class("Slider");
  //--- A lot of parameter relevant stuff ---
}

function draw(){
  clear();//Make the canvas background transparent, because it's cool
  orbitControl(4, 4);//Mouse control
  colorMode(HSB);

  let vol = microphone.getLevel()*sensitiveness.value();
  rotateAngle += 0.2;
  rotateY(rotateAngle);

  if(elementMode.value() == "Normal Sphere" || elementMode.value() == "Spiral Sphere"){
    sphere.showSphere(vol);
    sphere.animation();
  }else if(elementMode.value() == "Skull"){
    element1.showModel(vol);
  }else if(elementMode.value() == "Headphone"){
    element2.showModel(vol);
  }else if(elementMode.value() == "Noid"){
    rotateX(-20);
    element3.showModel(vol);
  }else if(elementMode.value() == "Record"){
    rotateX(0);
    element4.showModel(vol);
  }

  //Display current value of each parameter
  sensitiveDisplay.html("Sensitiveness: " + sensitiveness.value());
  offsetDisplay.html("Noise offset: " + offsetSlider.value());
  densityDisplay.html("Density: " + densitySlider.value());
  percentageDisplay.html(percentageSlider.value()+"%");
  transformDisplay.html("Transform value1: " + transformSlider.value());
  transformDisplay2.html("Transform value2: " + transformSlider2.value());
  lengthDisplay.html("Line length: " + lengthSlider.value());
  lineWeightDisplay.html("Line thickness: " + lineWeightSlider.value());

  colorChangeSpeed = map(colorChangeSlider.value(), 1000, 6000, 6, 1);
  colorChangeDisplay.html("Color change speed: " + colorChangeSpeed);
  pointWeightDisplay.html("Point thickness: " + pointWeightSlider.value());

}

function animateSphere(){
  if(this.checked()){
    isAnimated = true;
  }else{
    isAnimated = false;
  }
}

function pointModeFlashes(){
  if(this.checked()){
    doesFlashes = true;
  }else{
    doesFlashes = false;
  }
}
function pointModeLaser(){
  if(this.checked()){
    doesShowLasers = true;
  }else{
    doesShowLasers = false;
  }
}


function togglePlaying(){
  if(isListening == false){
    microphone.start();
    button.html("microphone OFF");
    isListening = true;
  }else if(isListening == true){
    microphone.stop();
    button.html("microphone ON");
    isListening = false;
  }
}
