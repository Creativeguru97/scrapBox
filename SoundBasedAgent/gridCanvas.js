//------- Condortable lovely p5 world -------//
//-------------------------------------------//

let canvas1;
let gridCanvas;


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
let buyDrink = [];
let laughingSound = [];
let breathSound;
let sitOnChairSound;
let putACupSound;
let putABookSound;


//For event programing
let timeLoop;
let timeWait;
let loopTime = 0;//60 seconds loop
let waitingTime = 0;
let okIgottaGo = 30;//The timing agent get into loop between bookshelf and vendingMachine

let walkFrame = 0;
let breathFrame = 0;
let sittingFrame = 0;
let buyDrinkFrame = 0;


//p5.serialport relevant
let serial;
let outData = 0; // for data output
let portName = '/dev/tty.usbmodem14401';  // fill in your serial port name here


//----- Grid canvas -----
canvas1 = p => {
  p.preload = () => {
    for(let i=0; i < 20; i++){
      // walkSound[i] = p.loadSound("/soundEffects/walkSoundSmall/walk"+i+".mp3");
      walkSound[i] = p.loadSound("/soundEffects/walkSound/walk"+i+".mp3");
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
    for(let i=0; i < 4; i++){
      laughingSound[i] = p.loadSound("/soundEffects/laughingSound/laugh"+i+".mp3");
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
    rayaRadius = 15;
    raya = new Agent(p.random(80, p.width-80), p.random(70, p.height-40), rayaRadius);
    user = new User();
    grid = new MatrixObject();
    bookShelf0 = new MatrixObject();
    bookShelf1 = new MatrixObject();
    bookShelf2= new MatrixObject();
    vendingMachine = new MatrixObject();

    leftWall = new MatrixObject();
    rightUpperWall = new MatrixObject();
    rightLowerWall = new MatrixObject();
    topWall = new MatrixObject();
    bottomWall = new MatrixObject();

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

    //p5.serialport relevant
    serial = new p5.SerialPort();

    serial.on('list', p.printList);  // set a callback function for the serialport list event
    serial.on('connected', p.serverConnected); // callback for connecting to the server
    serial.on('open', p.portOpen);        // callback for the port opening
    serial.on('data', p.serialEvent);     // callback for when new data arrives
    serial.on('error', p.serialError);    // callback for errors
    serial.on('close', p.portClose);      // callback for the port closing

    serial.list();                      // list the serial ports
    serial.open(portName);              // open a serial port
  }

  // p.mousePressed = () => {
  //   let psychoKinesis = p.createVector(0, -50);
  //   raya.applyForce(psychoKinesis);
  // }


//----- This is the place all interactions happen -----//
//-----------------------------------------------------//
  p.draw = () => {
    p.background(31, 52, 97);//apricot
    // p.clear();

    //First we need to set environment.
    grid.grid();
    topWall.wall(0, 0, p.width-40, 20);
    bottomWall.wall(0, p.height-20, p.width-40, 20);
    leftWall.wall(0, p.height/4, 40, p.height*3/4-20);
    rightUpperWall.wall(p.width-60, 20, 20, p.height/2-120);
    rightLowerWall.wall(p.width-60, p.height/2+80, 20, p.height/2-100);
    vendingMachine.vendingMachine(p.width*3/4, 40, 100, 40);
    bookShelf0.bookShelf(50, p.height*4/8, 20, 100);
    bookShelf1.bookShelf(50, p.height*6/8, 20, 100);
    bookShelf2.bookShelf(120, p.height-30, 100, 20);

    //Next we set user existance.
    user.appear();
    user.move();
    user.stop();
    user.turn(60+rayaRadius, 60+rayaRadius, 20+rayaRadius, 20+rayaRadius);
    if (p.keyIsDown(p.LEFT_ARROW)) {
      let move = p.createVector(-0.5, 0);
      user.applyForce(move);
    }
    if (p.keyIsDown(p.RIGHT_ARROW)) {
      let move = p.createVector(0.5, 0);
      user.applyForce(move);
    }
    if (p.keyIsDown(p.UP_ARROW)) {
      let move = p.createVector(0, -0.5);
      user.applyForce(move);
    }
    if (p.keyIsDown(p.DOWN_ARROW)) {
      let move = p.createVector(0, 0.5);
      user.applyForce(move);
    }


    //then we design the agent behavior along with all above.
    raya.appear();
    raya.move();
    raya.turn(60+rayaRadius, 60+rayaRadius, 20+rayaRadius, 20+rayaRadius);
    raya.stop();
    raya.cough(20000, 19997, 'sustain');

    toUser = p.createVector(user.position.x, user.position.y);
    toVendingMachine = p.createVector(vendingMachine.vendingMachinePos.x, vendingMachine.vendingMachinePos.y+25);
    toBookShelf = p.createVector(bookShelf0.bookShelfPos.x+10, bookShelf0.bookShelfPos.y);

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

    }else{
      isAttractedByUser = false;
    }

    if(angerLevel > 10 || microphone.getLevel()*600 > 200){
      if(distUser.mag() < 120){
        raya.leave(toUser);
      }
      isAttractedByUser = false;
      waitingTime = okIgottaGo - 2 ;//Means agent get into the loop 2 seconds later
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
    if(isAttractedByUser == false && waitingTime > okIgottaGo){
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
          raya.buySomeDrink(buyDrinkFrame, 60, 120, 140, 350, 'sustain');
        }
      }
    }
    // p.print(p.frameRate());


    //Lastly, we give Raya's x value to Servo
    let val = p.map(raya.position.x, 75, p.width-75, 20, 160);
    // console.log(val);
    outData = val;  // setup the serial output
    serial.write(outData); // write to serial for Arduino to pickup

  }
  //-----------------------------------------------------//
  //----- This is the place all interactions happen -----//


  p.printList = (portList) => {
   // portList is an array of serial port names
   for (var i = 0; i < portList.length; i++) {
   // Display the list the console:
    console.log(i + " " + portList[i]);
   }
  }

  p.serverConnected = () => {
    console.log('connected to server.');
  }

  p.portOpen = () => {
    console.log('the serial port opened.')
  }

  p.serialEvent = () => {
    inData = Number(serial.read());
  }

  p.serialError = (err) => {
    console.log('Something went wrong with the serial port. ' + err);
  }

  p.portClose = () => {
    console.log('The serial port closed.');
  }


  class Agent{
    constructor(x, y, radius){
      this.position = p.createVector(x, y);
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector(0, 0);
      this.maxspeed = 1;
      this.maxforce = 0.025;
      this.radius = radius;
    }

    appear(){
      p.fill(0,255,255);//Red in HSB mode
      p.ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
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

    turn(leftBorder, rightBorder, topBorder, bottomBorder){
      //Outer walls
      if(this.position.x > p.width-rightBorder){
        this.position.x = p.width-rightBorder;
        this.velocity.x = this.velocity.x*-1;
        // this.acceleration.x = this.acceleration.x*-1;
      }
      if(this.position.x < leftBorder){
        this.position.x = leftBorder;
        this.velocity.x = this.velocity.x*-1;
        // this.acceleration.x = this.acceleration.x*-1;
      }

      if(this.position.y > p.height-bottomBorder){
        this.position.y = p.height-bottomBorder;
        this.velocity.y = this.velocity.y*-1;
        // this.acceleration.y = this.acceleration.y*-1;
      }
      if(this.position.y < topBorder){
        this.position.y = topBorder;
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

    leave(target){
      let desired = p5.Vector.sub(target, this.position);
      desired.mult(-1);
      desired.setMag(this.maxspeed);

      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce*1.5);  // Limit to maximum steering force
      this.applyForce(steer);
      this.walk(30, 'sustain');
    }

    //Sound expressions
    soundDirection(soundFile, index, audibleDist, ampMax){
      //This takes a lot of resouces I guess, may be I use int here.
      let panning = p.map(this.position.x, 0, p.width,-1.0, 1.0);
      let distUser = p5.Vector.sub(this.position, user.position);
      // let volume = p.map(distUser.mag(), audibleDist, 40, 0, ampMax);
      let volume = p.map(distUser.mag(), audibleDist, 40, 0.3, ampMax);
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
        // this.soundDirection(walkSound, index, p.width/2, 0.05);
        this.soundDirection(walkSound, index, p.width/2, 2.0);
        walkSound[index].play();
        walkFrame = 0;
      }
    }

    cough(possibilityRange, border, mode){
      let num = p.random(0, possibilityRange);
      if(num > border){
        let index = p.int(p.random(0, coughSound.length));
        coughSound[index].playMode(mode);
        // this.soundDirection(coughSound, index, p.width/2, 0.04);
        this.soundDirection(coughSound, index, p.width/2, 0.8);
        coughSound[index].play();
      }
    }


    breathe(interval, mode){
      breathFrame++;
      if(breathFrame == interval){
        breathSound.playMode(mode);
        breathSound.setVolume(0.5);
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
          // flipPageSound[index].setVolume(0.05);
          flipPageSound[index].setVolume(0.5);
        }else{
          // this.soundDirection(flipPageSound, index, p.width/2, 0.05);
          this.soundDirection(flipPageSound, index, p.width/2, 1.5);
        }
        flipPageSound[index].play();
      }
    }

    sitDown(mode){
      sitOnChairSound.playMode(mode);
      // sitOnChairSound.setVolume(0.01);
      sitOnChairSound.setVolume(0.5);
      sitOnChairSound.play();
    }

    putCupAndBookOnTable(countFrame, num1, num2, mode){
      if(countFrame == num1){
        putACupSound.playMode(mode);
        // putACupSound.setVolume(0.05);
        putACupSound.setVolume(1.0);
        putACupSound.play();
      }else if(countFrame == num2){
        putABookSound.playMode(mode);
        // putABookSound.setVolume(0.05);
        putABookSound.setVolume(1.0);
        putABookSound.play();
      }
    }

    buySomeDrink(countFrame, num1, num2, num3, num4, mode){
        if(countFrame == num1){
          buyDrink[1].playMode(mode);
          // this.soundDirection(buyDrink, 1, p.width/2, 0.05);
          this.soundDirection(buyDrink, 1, p.width/2, 2.0);
          buyDrink[1].play();
        }else if(countFrame == num2+180){
          buyDrink[2].playMode(mode);
          // this.soundDirection(buyDrink, 2, p.width/2, 0.08);
          this.soundDirection(buyDrink, 2, p.width/2, 2.0);
          buyDrink[2].play();
        }else if(countFrame == num3+180){
          buyDrink[3].playMode(mode);
          // this.soundDirection(buyDrink, 3, p.width/2, 0.05);
          this.soundDirection(buyDrink, 3, p.width/2, 2.0);
          buyDrink[3].play();
        }else if(countFrame == num4+180){
          buyDrink[4].playMode(mode);
          // this.soundDirection(buyDrink, 4, p.width/2, 0.08);
          this.soundDirection(buyDrink, 4, p.width/2, 2.0);
          buyDrink[4].play();
        }
    }

    laugh(possibilityRange, border, mode){
      let num = p.random(0, possibilityRange);
      if(num > border){
        let index = p.int(p.random(0, laughingSound.length));
        laughingSound[index].playMode(mode);
        // this.soundDirection(laughingSound, index, p.width/2, 0.04);
        this.soundDirection(laughingSound, index, p.width/2, 0.5);
        laughingSound[index].play();
      }
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
      this.position = p.createVector(p.width/2, p.height*3/4);
      this.velocity = p.createVector();
      this.acceleration = p.createVector(0, 0);
      this.maxspeed = 0.5;
      this.maxforce = 0.025;

    }

    appear(){
      p.fill(255, 0, 255);
      p.ellipse(this.position.x, this.position.y, 40, 40);
    }

    move(){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.velocity.limit(this.maxspeed);
    }

    applyForce(force){
      this.acceleration.add(force);
    }

    turn(leftBorder, rightBorder, topBorder, bottomBorder){
      //Outer walls
      if(this.position.x > p.width-rightBorder){
        this.position.x = p.width-rightBorder;
        this.velocity.x = this.velocity.x*-1;
        // this.acceleration.x = this.acceleration.x*-1;
      }
      if(this.position.x < leftBorder){
        this.position.x = leftBorder;
        this.velocity.x = this.velocity.x*-1;
        // this.acceleration.x = this.acceleration.x*-1;
      }

      if(this.position.y > p.height-bottomBorder){
        this.position.y = p.height-bottomBorder;
        this.velocity.y = this.velocity.y*-1;
        // this.acceleration.y = this.acceleration.y*-1;
      }
      if(this.position.y < topBorder){
        this.position.y = topBorder;
        this.velocity.y = this.velocity.y*-1;
        // this.acceleration.y = this.acceleration.y*-1;
      }
    }

    stop(){
      //friction simuration.
      let friction = this.velocity.copy();
      friction.mult(-0.05);
      this.applyForce(friction);
    }



  }
  //----- Raya class end -----

  class MatrixObject{
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
      p.rect(this.vendingMachinePos.x, this.vendingMachinePos.y, w, h, 5);
    }

    bookShelf(x, y, w, h){
      this.bookShelfPos = p.createVector(x, y);
      p.fill(30, 53, 58);//cafe au lait
      p.noStroke();
      p.rectMode(p.CENTER);
      p.rect(this.bookShelfPos.x, this.bookShelfPos.y, w, h);
    }

    wall(x, y, w, h){
      p.fill(32, 37, 98);//cafe au lait
      p.stroke(32, 46, 77);
      p.strokeWeight(1);
      p.rectMode(p.CORNER);
      p.rect(x, y, w, h, 4);
    }

  }

}

let myp52 = new p5(canvas1, 'gridCanvas');
