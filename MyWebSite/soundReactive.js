//I use Firefox since p5.AudioIn is not supported on Safari and iOS.
let canvas;
let button;// Toggle Microphone's ON and OFF
let elementMode;//Normal or Spiral?
let displayMode;//LineMode or PointMode?
let buttonDisplay;

let headLine1;
let headLine2;
let headLine3;

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
let gynoid;
let record;

function preload(){
  skull = loadJSON("soundReactive_jsondata/skull.json");//This tells us the skull's every vertices in the obj file.
  headphone = loadJSON("soundReactive_jsondata/headphone.json");
  gynoid = loadJSON("soundReactive_jsondata/gynoid.json");
  record = loadJSON("soundReactive_jsondata/record.json");
}


function setup(){
  canvas = createCanvas(900, 900, WEBGL);
  canvas.id("SoundReactiveCanvas");

  angleMode(DEGREES);

  microphone = new p5.AudioIn(print("Unknown error occured"));
  // fft = new p5.FFT(0.5, resolution);//For linear

  // fft = new p5.FFT(0.5, 256);
  sphere = new Sphere();
  element1 = new Element(skull, 0, 0, 0, 100, -100, 100);
  element2 = new Element(headphone, 0, 0, 0, 80, -80, 80);
  element3 = new Element(gynoid, -3, -3, 3, 150, -150, 150);
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
  elementMode.option("Gynoid");
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

  headLine3 = createP("----- On sphere elements -----");
  headLine3.class("Display");

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

  headLine1 = createP("----- On line mode -----");
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

  headLine2 = createP("----- On point mode -----");
  headLine2.class("Display");

  flashes = createCheckbox("Flashes", false);
  flashes.changed(pointModeFlashes);
  flashes.class("CheckBox");

  lasers = createCheckbox("Laser", false);
  lasers.changed(pointModeLaser);
  lasers.class("CheckBox");

  pointWeightDisplay = createDiv();
  pointWeightDisplay.class("Display");
  pointWeightDisplay.id("sliderMargin");
  pointWeightSlider = createSlider(0, 10, 0, 1);
  pointWeightSlider.class("Slider");
  //--- A lot of parameter relevant stuff ---
}

function windowResized() {
  //On css file, the canvas element is setted as top:80px; and left 300px;
  if(windowWidth < 300+900 && windowHeight < 900+80){
    resizeCanvas(windowWidth-300, windowHeight-80);
  }
}

function draw(){
  clear();//Make the canvas background transparent, because it's looking good.
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
  }else if(elementMode.value() == "Gynoid"){
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



//---------- Sphere element class ----------
class Sphere{
  constructor(){
    this.particles = [];
    this.animateValue = 0;
    this.density;
    this.density2;
    this.percentages;
  }

  showSphere(vol){
    rotateX(60);
      this.percentages = map(percentageSlider.value(), 0, 100, 0, 180);

      if(elementMode.value() == "Spiral Sphere"){
        for(let i = 0; i < this.percentages; i += 0.5){
          offset = offset + offsetSlider.value();
          let r = map(vol, 0, 1, windowHeight/5, windowHeight/3);
          let particle = new Particle();
          if(vol == 0){

            //For people who're not familiar with Spherical coordinates
            //Spherical coordinates to Catesian coordinates
            // 0 <= theta <= two PI, 0 <= phi <= PI
            //x = r * sin(phi) * cos(theta)
            //y = r * sin(phi) * sin(theta)
            //z = r * cos(phi)

            //More about Spherical coordinates : http://tutorial.math.lamar.edu/Classes/CalcIII/SphericalCoords.aspx

            particle.position.x = r * sin(i* (transformSlider.value()+this.animateValue) )*cos(i*densitySlider.value());
            particle.position.y = r * sin(i* (transformSlider.value()+this.animateValue) )*sin(i*densitySlider.value());
            particle.position.z = r * cos(i* (transformSlider2.value()+this.animateValue) );
          }else{
            particle.position.x = (r + noise(offset)*vol*100) * sin(i* (transformSlider.value()+this.animateValue) )*cos(i*densitySlider.value());
            particle.position.y = (r + noise(offset)*vol*100) * sin(i* (transformSlider.value()+this.animateValue) )*sin(i*densitySlider.value());
            particle.position.z = (r + noise(offset)*vol*100) * cos(i* (transformSlider2.value()+this.animateValue) );
          }

          this.particles.push(particle);

        }
      }

      if(elementMode.value() == "Normal Sphere"){
        this.density = map(densitySlider.value(), 0, 32, 45, 12);
        this.density2 = map(densitySlider.value(), 0, 32, 2, 12);
        for(let i = 0; i < 360; i += this.density2){//For theta
          for(let j = 10; j < this.percentages; j += this.density){//For phi

            offset = offset + offsetSlider.value();
            let r = map(vol, 0, 1, windowHeight/5, windowHeight/3);

            let particle = new Particle();
            if(vol == 0){
              //Spherical coordinate to Catesian coordinate
              particle.position.x = r * sin(j* (transformSlider.value()+this.animateValue) )*cos(i);
              particle.position.y = r * sin(j* (transformSlider.value()+this.animateValue) )*sin(i);
              particle.position.z = r * cos(j* (transformSlider2.value()+this.animateValue) );
            }else{
              particle.position.x = (r + noise(offset)*vol*100) * sin(j* (transformSlider.value()+this.animateValue) )*cos(i);
              particle.position.y = (r + noise(offset)*vol*100) * sin(j* (transformSlider.value()+this.animateValue) )*sin(i);
              particle.position.z = (r + noise(offset)*vol*100) * cos(j* (transformSlider2.value()+this.animateValue) );
            }

            this.particles.push(particle);
          }
        }
      }


        //LineMode
      if(displayMode.value() == "Line mode"){
        for(let i = 0; i < this.particles.length; i++){
          let hue = map(i, 0, this.particles.length, 0, 64);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(0.6 + vol*lineWeightSlider.value());
          line(
            this.particles[i].position.x,
            this.particles[i].position.y,
            this.particles[i].position.z,
            this.particles[i].position.x * (1.03+vol*lengthSlider.value()),
            this.particles[i].position.y * (1.03+vol*lengthSlider.value()),
            this.particles[i].position.z * (1.03+vol*lengthSlider.value())
          );
        }
      }

      //PointMode
      if(displayMode.value() == "Point mode"){
        for(let i = 0; i < this.particles.length; i++){
          let hue = map(i, 0, this.particles.length, 0, 64);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(3.5 + pointWeightSlider.value());
          point(
            this.particles[i].position.x,
            this.particles[i].position.y,
            this.particles[i].position.z
          );
        }
      }


      if(displayMode.value() == "Point mode"){
        if(doesFlashes == true){
          this.flashes();
        }

        if(doesShowLasers == true){
          this.laser();
        }
      }

    this.particles.splice(0, this.particles.length);//Erase all particle at each frame
  }

  animation(){
    if(isAnimated == true){
      this.animateValue += 0.01;
    }else if(isAnimated == false){
      this.animateValue = 0.0;
    }
  }

  rotation(vol, rotateAngle){
    rotateY(rotateAngle);
  }

  flashes(){
    if(this.particles.length > 10){
      if(elementMode.value() == "Normal Sphere" || elementMode.value() == "Spiral Sphere"){
        let xS2, yS2, zS2, xE2, yE2, zE2;
          for(let i = 0; i < 3; i++){
          let luckyNumber2 = floor(random(this.particles.length));
            xS2 = this.particles[luckyNumber2].position.x;
            yS2 = this.particles[luckyNumber2].position.y;
            zS2 = this.particles[luckyNumber2].position.z;
            strokeWeight(14+pointWeightSlider.value()*2);
            point(xS2, yS2, zS2);
          }
      }
    }
  }

  laser(){
    strokeWeight(1);
    if(this.particles.length > 0){
      let luckyNumber = floor(random(0, this.particles.length - 1));

      let xS, yS, zS, xE, yE, zE;
      if((luckyNumber+1)%36 == 0){
        xS = this.particles[luckyNumber].position.x;
        yS = this.particles[luckyNumber].position.y;
        zS = this.particles[luckyNumber].position.z;
        xE = this.particles[(luckyNumber+1)-36].position.x;
        yE = this.particles[(luckyNumber+1)-36].position.y;
        zE = this.particles[(luckyNumber+1)-36].position.z;
        line(xS, yS, zS, xE, yE, zE);
      }else if(luckyNumber == 0){

      }else{
        xS = this.particles[luckyNumber].position.x;
        yS = this.particles[luckyNumber].position.y;
        zS = this.particles[luckyNumber].position.z;
        xE = this.particles[luckyNumber+1].position.x;
        yE = this.particles[luckyNumber+1].position.y;
        zE = this.particles[luckyNumber+1].position.z;
        line(xS, yS, zS, xE, yE, zE);
      }
    }
  }

}



//---------- 3D model elements class ----------
class Element{
  constructor(modelName, dX, dY, dZ, modelSizeX, modelSizeY, modelSizeZ){

    this.particles = [];
    //Copy all 3d coordinate from JSON
    for(let i = 0; i < modelName.coordinate.length; i++){
      let particle = new Particle();
      particle.position.x = (modelName.coordinate[i].x + dX) * modelSizeX;
      particle.position.y = (modelName.coordinate[i].y + dY) * modelSizeY;
      particle.position.z = (modelName.coordinate[i].z + dZ) * modelSizeZ;

      this.particles.push(particle);
    }

    this.density;
    this.percentages;
    this.pLength = this.particles.length;
    this.cLength;
  }

  showModel(vol){
      this.density = int(map(densitySlider.value(), 0, 32, 4, 1));
      this.percentages = map(percentageSlider.value(), 0, 100, 0, this.particles.length);

      if(displayMode.value() == "Line mode"){
        for(let i = 0; i < this.percentages; i += this.density){
          offset = offset + offsetSlider.value();
          let hue = map(i, 0, this.percentages, 0, 128);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(0.6 + vol*lineWeightSlider.value());

          if(vol == 0){
            line(
              this.particles[i].position.x,
              this.particles[i].position.y,
              this.particles[i].position.z,
              this.particles[i].position.x * 1.03,
              this.particles[i].position.y * 1.03,
              this.particles[i].position.z * 1.03
            );
          }else{
            line(
              this.particles[i].position.x * (1+noise(offset)*vol),
              this.particles[i].position.y * (1+noise(offset)*vol),
              this.particles[i].position.z * (1+noise(offset)*vol),
              this.particles[i].position.x * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value()),
              this.particles[i].position.y * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value()),
              this.particles[i].position.z * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value())
            );
          }
        }
      }

      if(displayMode.value() == "Point mode"){
        for(let i = 0; i < this.percentages; i += this.density){
          offset = offset + offsetSlider.value();
          let hue = map(i, 0, this.percentages, 0, 128);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(3.5 + pointWeightSlider.value());
          if(vol == 0){
            point(
              this.particles[i].position.x,
              this.particles[i].position.y,
              this.particles[i].position.z
            );
          }else{
            point(
              this.particles[i].position.x * (1+noise(offset)*vol),
              this.particles[i].position.y * (1+noise(offset)*vol),
              this.particles[i].position.z * (1+noise(offset)*vol)
            );
          }
        }
      }

      if(displayMode.value() == "Point mode"){
        if(doesFlashes == true){
          this.flashes();
        }

        if(doesShowLasers == true){
          if(elementMode.value() == "Skull"){
            this.skullLaser(vol);
          }else if(elementMode.value() == "Headphone"){
            this.headphoneLaser(vol);
          }else if(elementMode.value() == "Gynoid"){
            this.gynoidLaser(vol);
          }else if(elementMode.value() == "Record"){
            this.recordLaser(vol);
          }
        }
      }
    }

  animation(){
    if(isAnimated == true){
      this.animateValue += 0.01;
    }else if(isAnimated == false){
      this.animateValue = 0.0;
    }
  }

  flashes(){
    if(this.percentages > 10){
      let xS2, yS2, zS2, xE2, yE2, zE2;
      for(let i = 0; i < 3; i++){
      let luckyNumber2 = floor(random(this.percentages));
        xS2 = this.particles[luckyNumber2].position.x;
        yS2 = this.particles[luckyNumber2].position.y;
        zS2 = this.particles[luckyNumber2].position.z;
        strokeWeight(14+pointWeightSlider.value()*2);
        point(xS2, yS2, zS2);
      }
    }
  }

  skullLaser(){
    strokeWeight(1);
    if(this.percentages > 730){
      for(let i = 0; i < 2; i++){
      let luckyNumberLE = floor(random(718, 730));//Left eyes vertices indecies
      let luckyNumberLE2 = floor(random(718, 730));

      let xSL, ySL, zSL, xEL, yEL, zEL;
        xSL = this.particles[luckyNumberLE].position.x;
        ySL = this.particles[luckyNumberLE].position.y;
        zSL = this.particles[luckyNumberLE].position.z;
        xEL = this.particles[luckyNumberLE2].position.x;
        yEL = this.particles[luckyNumberLE2].position.y;
        zEL = this.particles[luckyNumberLE2].position.z;
        line(xSL, ySL, zSL, xEL, yEL, zEL);

        let luckyNumberRE = floor(random(323, 335));//Right eyes vertices indecies
        let luckyNumberRE2 = floor(random(323, 335));

        let xSR, ySR, zSR, xER, yER, zER;
          xSR = this.particles[luckyNumberRE].position.x;
          ySR = this.particles[luckyNumberRE].position.y;
          zSR = this.particles[luckyNumberRE].position.z;
          xER = this.particles[luckyNumberRE2].position.x;
          yER = this.particles[luckyNumberRE2].position.y;
          zER = this.particles[luckyNumberRE2].position.z;
          line(xSR, ySR, zSR, xER, yER, zER);
      }
    }
  }

  headphoneLaser(){
    strokeWeight(1);
    if(this.percentages > 352){
      let luckyNumberL = floor(random(329, 352));//Left Ear vertices indecies
      let luckyNumberL2 = floor(random(329, 352));
      let luckyNumberR = floor(random(96, 119));//Right Ear vertices indecies
      let luckyNumberR2 = floor(random(96, 119));

      let xSL, ySL, zSL, xEL, yEL, zEL;
      xSL = this.particles[luckyNumberL].position.x;
      ySL = this.particles[luckyNumberL].position.y;
      zSL = this.particles[luckyNumberL].position.z;
      xEL = this.particles[luckyNumberL2].position.x;
      yEL = this.particles[luckyNumberL2].position.y;
      zEL = this.particles[luckyNumberL2].position.z;

      let xSR, ySR, zSR, xER, yER, zER;
      xSR = this.particles[luckyNumberR].position.x;
      ySR = this.particles[luckyNumberR].position.y;
      zSR = this.particles[luckyNumberR].position.z;
      xER = this.particles[luckyNumberR2].position.x;
      yER = this.particles[luckyNumberR2].position.y;
      zER = this.particles[luckyNumberR2].position.z;

      line(xSR, ySR, zSR, xEL, yEL, zEL);
    }
  }

  gynoidLaser(){
    strokeWeight(1);
    this.cLength = this.percentages;

    if((this.cLength - this.pLength) != 0 && this.cLength > 16){
        for(let i = 0; i < 8; i++){
          let xSL, ySL, zSL;
          xSL = this.particles[floor(this.percentages) - (1+i)].position.x;
          ySL = this.particles[floor(this.percentages) - (1+i)].position.y;
          zSL = this.particles[floor(this.percentages) - (1+i)].position.z;
          line(xSL, ySL, zSL, 0, 1200, 0);
        }
        this.pLength = this.percentages;
    }

    if(this.percentages > 239){
      let luckyNumberLA = floor(random(232, 239));//Left arm
      let xSL, ySL, zSL;
      xSL = this.particles[luckyNumberLA].position.x;
      ySL = this.particles[luckyNumberLA].position.y;
      zSL = this.particles[luckyNumberLA].position.z;
      line(xSL, ySL, zSL, 0, 1200, 0);

      if(this.percentages > 494){
        let luckyNumberLL = floor(random(485, 494));//Left leg
        let xSLL, ySLL, zSLL;
        xSLL = this.particles[luckyNumberLL].position.x;
        ySLL = this.particles[luckyNumberLL].position.y;
        zSLL = this.particles[luckyNumberLL].position.z;
        line(xSLL, ySLL, zSLL, 0, 1200, 0);

        if(this.percentages > 863){
          let luckyNumberRA = floor(random(855, 863));//Right arm
          let xSR, ySR, zSR;
          xSR = this.particles[luckyNumberRA].position.x;
          ySR = this.particles[luckyNumberRA].position.y;
          zSR = this.particles[luckyNumberRA].position.z;
          line(xSR, ySR, zSR, 0, 1200, 0);

          if(this.percentages > 1143){
            let luckyNumberRL = floor(random(1135, 1143));//Right leg
            let xSRL, ySRL, zSRL;
            xSRL = this.particles[luckyNumberRL].position.x;
            ySRL = this.particles[luckyNumberRL].position.y;
            zSRL = this.particles[luckyNumberRL].position.z;
            line(xSRL, ySRL, zSRL, 0, 1200, 0);


          }
        }
      }
    }
  }

  recordLaser(){
    strokeWeight(1);
    for(let i = 0; i < 2; i++){
      if(this.percentages > 72){
        let luckyNumber1 = floor(random(22, 72));//Left Ear vertices indecies
        let luckyNumber2 = luckyNumber1 - 1;

        let xSL, ySL, zSL, xEL, yEL, zEL;
        xSL = this.particles[luckyNumber1].position.x;
        ySL = this.particles[luckyNumber1].position.y;
        zSL = this.particles[luckyNumber1].position.z;
        xEL = this.particles[luckyNumber2].position.x;
        yEL = this.particles[luckyNumber2].position.y;
        zEL = this.particles[luckyNumber2].position.z;

        line(xSL, ySL, zSL, xEL, yEL, zEL);
      }
    }
  }


}


//I made this class for in case add various behavior at each particle in future.
class Particle{

  constructor(){
    this.position = createVector();
    // this.velocity = p5.Vector.random3D();
  }
}
