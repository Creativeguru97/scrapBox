const video = document.getElementById("video");
let detections;

//Emotional states
let expressions;
let neutral;
let happy;
let angry;
let sad;
let disgusted;
let surprised;
let fearful;

let faceAPICanvas;


Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models/"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models/"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models/"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models/")
])

navigator.mediaDevices.getUserMedia({video:{width: 720, height: 405}})
.then(mediaStream => {
  var video = document.querySelector('video');
  video.srcObject = mediaStream;
  // video.onloadedmetadata = function(e) {
  //   video.play();
  // };
})
.catch((err) => { console.log(err.name + ": " + err.message); });

video.addEventListener("play", () => {
  //create face api canvas !
  faceAPICanvas = faceapi.createCanvasFromMedia(video)
  document.body.append(faceAPICanvas);
  const displaySize = {width: video.width, height: video.height}

  faceapi.matchDimensions(faceAPICanvas, displaySize)

  setInterval(async () => {
    detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()

      expressions = detections[0].expressions;
      neutral = detections[0].expressions.neutral;
      happy = detections[0].expressions.happy;
      angry = detections[0].expressions.angry;
      sad = detections[0].expressions.sad;
      disgusted = detections[0].expressions.disgusted;
      surprised = detections[0].expressions.surprised;
      fearful = detections[0].expressions.fearful;

      // console.log(detections[0].expressions);

      //Redraw the canvas
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      //Clear the previous canvas before redraw new frame.
      faceAPICanvas.getContext("2d").clearRect(0, 0, faceAPICanvas.width, faceAPICanvas.height)
      // faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(faceAPICanvas, resizedDetections)
      // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 200)
})


//------- Condortable lovely p5 world -------//
//-------------------------------------------//

let canvas0;
let canvas1;
let hudCanvas;
let gridCanvas;

let button;
let microphone;
let isListening = false;

let raya;

//----- HUD canvas -----
canvas0 = p => {
  p.setup = () => {
    p.createDiv();
    gridCanvas = p.createCanvas(720, 405);
    gridCanvas.id("hudCanvas");

    microphone = new p5.AudioIn(p.print("Unknown error occured"));
    // microphone.start();
    button = p.createButton("microphone ON");
    button.id("button");
    button.mousePressed(p.togglePlaying);
  }

  p.togglePlaying = () => {
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

  p.draw = () => {
    // p.blendMode(p.ADD);

    p.clear();
    p.emotionalStatesHUD(25, 240);
    p.micHUD(630, 380);
  }

  p.emotionalStatesHUD = (x, y) => {
    // p.fill(255, 127);
    // p.rect(x-10, y-30, 155, 185, 8);

    p.noStroke();
    p.fill(120, 210, 255);
    // p.fill(255);
    p.textFont('Helvetica Neue');
    p.textSize(18);
    p.text("Emotional States", x, y-8);
    p.textSize(14);
    if(expressions != undefined){
      p.text("neutral:      "+p.nf(neutral*100, 2, 2)+"%", x, y+20);
      p.text("happy:       "+p.nf(happy*100, 2, 2)+"%", x, y+40);
      p.text("angry:        "+p.nf(angry*100, 2, 2)+"%", x, y+60);
      p.text("sad:           "+p.nf(sad*100, 2, 2)+"%", x, y+80);
      p.text("disgusted: "+p.nf(disgusted*100, 2, 2)+"%", x, y+100);
      p.text("surprised:  "+p.nf(surprised*100, 2, 2)+"%", x, y+120);
      p.text("fearful:       "+p.nf(fearful*100, 2, 2)+"%", x, y+140);
    }else{
      p.text("neutral:   ", x, y+20);
      p.text("happy:     ", x, y+40);
      p.text("angry:     ", x, y+60);
      p.text("sad:       ", x, y+80);
      p.text("disgusted: ", x, y+100);
      p.text("surprised: ", x, y+120);
      p.text("fearful:   ", x, y+140);
    }

  }

  p.micHUD = (x, y) => {
    let audioLevel = p.constrain(microphone.getLevel()*600, 0, 300);
    // p.print(audioLevel);

    p.fill(120, 210, 255, 110);
    p.strokeWeight(2);
    p.stroke(120, 210, 255, 200);
    if(isListening == false){
      p.rect(x, y, 30, -(5+audioLevel));
      p.rect(x+35, y, 30, -(5+audioLevel));
    }else if (isListening == true) {
      p.rect(x, y, 30, -(5+audioLevel+p.random(0, 10)));
      p.rect(x+35, y, 30, -(5+audioLevel+p.random(0, 10)));
    }
  }
}

let myp5 = new p5(canvas0, 'hudCanvas');

let toMouse;
let toUser;
let toVendingMachine;
let toBookShelf;
let isNearByUser = false;
let isAttractedByUser = false;
let time = 0;


//----- Grid canvas -----
canvas1 = p => {
  p.preload = () => {
    // for(let i=0; i < 20; i++){
    //   let walkSound[i] = p.loadSound("1.png");
    // }

  }

  p.setup = () => {
    p.createDiv();
    gridCanvas = p.createCanvas(720, 405);
    gridCanvas.id("gridCanvas");
    raya = new Agent();
    user = new User();
    world = new Matrix();
    p.colorMode(p.HSB, 360, 100, 100, 100);//(Mode, Hue, Saturation, Brightness, Alpha)
  }

//----- This is the place all interactions happen -----//
//-----------------------------------------------------//
  p.draw = () => {
    p.background(31, 52, 97);//apricot
    // p.clear();

    //First we need set environment.
    world.grid();
    world.vendingMachine(p.width*3/4, 20, 100, 40);
    world.bookShelf(10, p.height/3, 20, 120);

    //Next we set user existance.
    user.appear();

    //then we design the agent behavior along with all above.
    raya.appear();
    raya.move();
    raya.turn();
    raya.stop();

    toUser = p.createVector(user.position.x, user.position.y);
    toVendingMachine = p.createVector(world.vendingMachinePos.x, world.vendingMachinePos.y+25);
    toBookShelf = p.createVector(world.bookShelfPos.x+10, world.bookShelfPos.y);

    //move close or run away from user.
    if(happy > neutral){
      let distUser = p5.Vector.sub(raya.position, user.position);
      if(distUser.mag() > 50){
        raya.attracted(toUser, 50);
      }
      isAttractedByUser = true;
      time = 0;

    }else if(angry*100 > 50 || microphone.getLevel()*600 > 200){
      let distUser = p5.Vector.sub(raya.position, user.position);
      if(distUser.mag() < 150){
        raya.leave(toUser, 50);
      }
      isAttractedByUser = false;
    }else{
      isAttractedByUser = false;
    }

    // if(distUser.mag() <= 70){
    //   isNearByUser = true;
    // }else{
    //   isNearByUser = false;
    // }

    //Loop between book shelf and vending machine.
    let seconds = p.millis()/1000;
    if(isAttractedByUser == false && time > 300){
      if (seconds%60 < 45){
        let dist = p5.Vector.sub(raya.position, toBookShelf);
        if(dist.mag() > 45){
          raya.attracted(toBookShelf, 40);
        }else{
          raya.readBook();
        }
      }else if(seconds%60 > 45){
        let dist = p5.Vector.sub(raya.position, toVendingMachine);
        if(dist.mag() > 45){
          raya.attracted(toVendingMachine, 40);
        }
      }
    }

    time++;
    // p.print(p.frameRate());
  }
  //-----------------------------------------------------//
  //----- This is the place all interactions happen -----//


  class Agent{
    constructor(){
      this.position = p.createVector(p.random(40, p.width-20), p.random(50, p.height-20));
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector(0, 0);
      this.maxspeed = 1;
      this.maxforce = 0.025;
    }

    appear(){
      p.fill(0,255,255);//Red in HSB mode
      p.ellipse(this.position.x, this.position.y, 30, 30);
    }

    move(){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.velocity.limit(this.maxspeed);
    }

    //Core movements
    applyForce(force){
      this.acceleration.add(force);
    }

    turn(){
      //Outer walls
      if(this.position.x > p.width-20){
        this.position.x = p.width-20;
        this.velocity.x = this.velocity.x*-1;
        // this.acceleration.x = this.acceleration.x*-1;
      }
      if(this.position.x < 20){
        this.position.x = 20;
        this.velocity.x = this.velocity.x*-1;
        // this.acceleration.x = this.acceleration.x*-1;
      }

      if(this.position.y > p.height-24){
        this.position.y = p.height-24;
        this.velocity.y = this.velocity.y*-1;
        // this.acceleration.y = this.acceleration.y*-1;
      }
      if(this.position.y < 24){
        this.position.y = 24;
        this.velocity.y = this.velocity.y*-1;
        // this.acceleration.y = this.acceleration.y*-1;
      }
    }

    attracted(target, arriveDist){
      let desired = p5.Vector.sub(target, this.position);
      let d = desired.mag();
    // Scale with arbitrary damping within 100 pixels
      if (d < arriveDist+80) {
        let arrivingSpeed = p.map(d, arriveDist, arriveDist+80, 0, this.maxspeed);
        desired.setMag(arrivingSpeed);
      } else {
        desired.setMag(this.maxspeed);
      }

      // Steering = Desired minus Velocity
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);  // Limit to maximum steering force
      this.applyForce(steer);
    }

    stop(){
      //friction simuration.
      let friction = this.velocity.copy();
      friction.mult(-0.02);
      this.applyForce(friction);
    }

    leave(target, redZone){
      let desired = p5.Vector.sub(target, this.position);
      desired.mult(-1);
      desired.setMag(this.maxspeed);

      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);  // Limit to maximum steering force
      this.applyForce(steer);
    }


    //Sound expressions
    walk(){
      
    }
    breathe(){
    }
    largh(){
    }
    sitDown(){
    }
    standUp(){
    }
    wearGlasses(){
    }
    readBook(){
    }
    spillTeaOnBook(){
    }
    annoy(){
    }
  }
  //----- Raya class end -----

  class User{
    constructor(){
      this.position = p.createVector(p.width/2, p.height/2);
    }

    appear(){
      p.fill(255, 0, 255);
      p.ellipse(p.width/2, p.height/2, 40, 40);
    }
  }
  //----- Raya class end -----

  class Matrix{
    constructor(){
      this.vendingMachinePos;
      this.bookShelfPos;
    }

    grid(){
      for(let i = 0; i <= p.width; i += 30){
        for(let j = 0; j <= p.height; j+= 30){
          p.stroke(255);
          p.strokeWeight(0.05);
          p.line(i, 0, i, p.height);
          p.line(0, j, p.width, j);
        }
      }
    }

    vendingMachine(x, y, w, h){
      this.vendingMachinePos = p.createVector(x, y);
      p.fill(208, 52, 85);
      p.noStroke();
      p.rectMode(p.CENTER);
      p.rect(
        this.vendingMachinePos.x,
        this.vendingMachinePos.y,
        w,h,5
      );
    }

    bookShelf(x, y, w, h){
      this.bookShelfPos = p.createVector(x, y);
      p.fill(30, 53, 58);//cafe au lait
      p.noStroke();
      p.rectMode(p.CENTER);
      p.rect(
        this.bookShelfPos.x,
        this.bookShelfPos.y,
        w,
        h
      );
    }

  }

}

let myp52 = new p5(canvas1, 'gridCanvas');
