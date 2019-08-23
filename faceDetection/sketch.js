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


//Objects
let toMouse;
let toUser;
let toVendingMachine;
let toBookShelf;
let distUser;
let distBookShelf;
let distVendingMachine;

let emotionStore;
let happinessStore = [];
let neutralStore = [];
let angerStore = [];
let happinessSum = 0;
let neutralSum = 0;
let angerSum = 0;
let happinessLevel;
let neutralLevel;
let angerLevel;

let isNearByUser = false;
let isAttractedByUser = false;
let changeBehaviorTime = 0;

let walkSound = [];
let coughSound = [];
let flipPageSound = [];
let breathSound;
let sitOnChairSound;
let putACupSound;
let putABookSound;
let buyDrink = [];

//For event programing
let timeLoop;
let timeWait;
let loopTime = 0;//60 seconds loop
let waitingTime = 0;

let walkFrame = 0;
let breathFrame = 0;
let sittingFrame = 0;
let buyDrinkFrame = 0;


//----- Grid canvas -----
canvas1 = p => {
  p.preload = () => {
    for(let i=0; i < 20; i++){
      walkSound[i] = p.loadSound("/soundEffects/walkSoundSmall/walk"+i+".mp3");
    }

    for(let i=0; i < 4; i++){
      coughSound[i] = p.loadSound("/soundEffects/coughSound/cough"+i+".mp3");
    }

    for(let i=0; i < 5; i++){
      flipPageSound[i] = p.loadSound("/soundEffects/flipPage/flip"+i+".mp3");
    }

    for(let i=0; i < 5; i++){
      buyDrink[i] = p.loadSound("/soundEffects/vendingMachine/buyDrink"+i+".mp3");
    }

    breathSound = p.loadSound("/soundEffects/breath.mp3");
    sitOnChairSound = p.loadSound("/soundEffects/sitOnChair.mp3");
    putACupSound = p.loadSound("/soundEffects/putACupOfTea.mp3");
    putABookSound = p.loadSound("/soundEffects/putABook.mp3");
  }

  p.setup = () => {
    p.createDiv();
    gridCanvas = p.createCanvas(720, 405);
    gridCanvas.id("gridCanvas");
    raya = new Agent();
    user = new User();
    world = new Matrix();
    p.colorMode(p.HSB, 360, 100, 100, 100);//(Mode, Hue, Saturation, Brightness, Alpha)

    timeLoop = setInterval(() => {
      loopTime++;
      if(loopTime > 120){
        loopTime = 0;
      }
    }, 1000);

    timeWait = setInterval(() => {
      waitingTime++;
    }, 1000);

    emotionStore = setInterval(() => {
      happinessStore.push(happy);
      neutralStore.push(neutral);
      angerStore.push(angry);
      if(happinessStore.length > 30){
        happinessStore.splice(0, 1);//Erase index 0
      }
      if(neutralStore.length > 30){
        neutralStore.splice(0, 1);//Erase index 0
      }
      if(angerStore.length > 30){
        angerStore.splice(0, 1);//Erase index 0
      }
      for(let i=0; i<happinessStore.length; i++){
        if(happinessStore[i] != undefined){
          happinessSum += happinessStore[i];
        }
        if(neutralStore[i] != undefined){
          neutralSum += neutralStore[i];
        }
        if(angerStore[i] != undefined){
          angerSum += angerStore[i];
        }
      }

      happinessLevel = happinessSum;
      neutralLevel = neutralSum;
      angerLevel = angerSum;

      happinessSum = 0;
      neutralSum = 0;
      angerSum = 0;

      // console.log(happinessLevel);
      // console.log(neutralLevel);
      // console.log(angerLevel);

    }, 200);

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
    raya.cough(20000, 19997, 'sustain');

    toUser = p.createVector(user.position.x, user.position.y);
    toVendingMachine = p.createVector(world.vendingMachinePos.x, world.vendingMachinePos.y+25);
    toBookShelf = p.createVector(world.bookShelfPos.x+10, world.bookShelfPos.y);
    distUser = p5.Vector.sub(raya.position, user.position);
    distBookShelf = p5.Vector.sub(raya.position, toBookShelf);
    distVendingMachine = p5.Vector.sub(raya.position, toVendingMachine);

    //move close or run away from user for their facial expression.
    if(happinessLevel > neutralLevel){
      if(distUser.mag() > 50){
        raya.attracted(toUser, 50);
      }
      isAttractedByUser = true;
      waitingTime = 0;

    }else if(angerLevel > 10 || microphone.getLevel()*600 > 200){
      if(distUser.mag() < 150){
        raya.leave(toUser, 50);
      }
      isAttractedByUser = false;
      waitingTime = 0;
    }else{
      isAttractedByUser = false;
    }

    if(distUser.mag() <= 70){//If raya is closer than 70px
      raya.breathe(180, 'sustain');

      if(raya.velocity.x < 0.01 && raya.velocity.y < 0.01){//And if raya has been settled
        sittingFrame++;

        if(sittingFrame == 80){
          raya.sitDown('sustain');
        }

        raya.putCupAndBookOnTable(sittingFrame, 160, 220, 'sustain');

        if (sittingFrame > 200) {
          raya.readBook(2400, 2397, 'sustain');
        }

      }
    }else{
      sittingFrame = 0;
    }

    //Loop between book shelf and vending machine.
    if(isAttractedByUser == false && waitingTime > 30){
      if (loopTime < 90){
        if(distBookShelf.mag() > 45){
          raya.attracted(toBookShelf, 40);
        }else{
          raya.readBook(2400, 2397, 'sustain');
        }
      }else if(loopTime > 90){
        if(distVendingMachine.mag() > 50){
          raya.attracted(toVendingMachine, 40);
          buyDrinkFrame = 0;
        }else{
          buyDrinkFrame++;
          raya.buySomeDrink(buyDrinkFrame, 60, 120, 140, 460, 'sustain');
        }
      }
    }
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
      this.walk(30, 'sustain');
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
      this.walk(30, 'sustain');
    }

    //Sound expressions
    soundDirection(soundFile, index, audibleDist, ampMax){
      let panning = p.map(this.position.x, 0, p.width,-1.0, 1.0);
      let distUser = p5.Vector.sub(this.position, user.position);
      let volume = p.map(distUser.mag(), audibleDist, 40, 0, ampMax);
      if(index == 'null'){
        soundFile.pan(panning);
        soundFile.setVolume(volume);
      }else{
        soundFile[index].pan(panning);
        soundFile[index].setVolume(volume);
      }
    }

    walk(interval, mode){
      walkFrame++;
      if(walkFrame == interval){
        let index = p.int(p.random(0, walkSound.length));
        walkSound[index].playMode(mode);
        this.soundDirection(walkSound, index, p.width/2, 0.05);
        walkSound[index].play();
        walkFrame = 0;
      }
    }

    cough(possibilityRange, border, mode){
      let num = p.random(0, possibilityRange);
      if(num > border){
        let index = p.int(p.random(0, coughSound.length));
        coughSound[index].playMode(mode);
        this.soundDirection(coughSound, index, p.width/2, 0.04);
        coughSound[index].play();
      }
    }


    breathe(interval, mode){
      breathFrame++;
      if(breathFrame == interval){
        breathSound.playMode(mode);
        breathSound.setVolume(0.08);
        breathSound.play();
        breathFrame = 0;
      }
    }

    readBook(possibilityRange, border, mode){
      let num = p.random(0, possibilityRange);
      if(num > border){
        let index = p.int(p.random(0, flipPageSound.length));
        flipPageSound[index].playMode(mode);
        if(distUser.mag() <= 70){
          flipPageSound[index].setVolume(0.05);
        }else{
          this.soundDirection(flipPageSound, index, p.width/2, 0.05);
        }
        flipPageSound[index].play();
      }
    }

    sitDown(mode){
      sitOnChairSound.playMode(mode);
      sitOnChairSound.setVolume(0.01);
      sitOnChairSound.play();
    }

    putCupAndBookOnTable(countFrame, num1, num2, mode){
      if(countFrame == num1){
        putACupSound.playMode(mode);
        putACupSound.setVolume(0.05);
        putACupSound.play();
      }else if(countFrame == num2){
        putABookSound.playMode(mode);
        putABookSound.setVolume(0.05);
        putABookSound.play();
      }
    }

    buySomeDrink(countFrame, num1, num2, num3, num4, mode){
      let num = p.floor(p.random(0, 6));
      if(num >= 3){
        if(countFrame == num1){
          buyDrink[0].playMode(mode);
          this.soundDirection(buyDrink, 0, p.width/2, 0.05);
          buyDrink[0].play();
        }else if(countFrame == num2){
          buyDrink[2].playMode(mode);
          this.soundDirection(buyDrink, 2, p.width/2, 0.08);
          buyDrink[2].play();
        }else if(countFrame == num3){
          buyDrink[3].playMode(mode);
          this.soundDirection(buyDrink, 3, p.width/2, 0.05);
          buyDrink[3].play();
        }else if(countFrame == num4){
          buyDrink[4].playMode(mode);
          this.soundDirection(buyDrink, 4, p.width/2, 0.08);
          buyDrink[4].play();
        }
      }else if(num <= 2){
        if(countFrame == num1){
          buyDrink[1].playMode(mode);
          this.soundDirection(buyDrink, 1, p.width/2, 0.05);
          buyDrink[1].play();
        }else if(countFrame == num2+210){
          buyDrink[2].playMode(mode);
          this.soundDirection(buyDrink, 2, p.width/2, 0.08);
          buyDrink[2].play();
        }else if(countFrame == num3+210){
          buyDrink[3].playMode(mode);
          this.soundDirection(buyDrink, 3, p.width/2, 0.05);
          buyDrink[3].play();
        }else if(countFrame == num4+210){
          buyDrink[4].playMode(mode);
          this.soundDirection(buyDrink, 4, p.width/2, 0.08);
          buyDrink[4].play();
        }
      }

    }

    largh(mode){
      
    }

    standUp(){

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
