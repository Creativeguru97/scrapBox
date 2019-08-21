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

let canvas0;
let canvas1;
let hudCanvas;
let gridCanvas;

let button;
let microphone;
let isListening = false;

let raya;

// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri("/models/"),
//   faceapi.nets.faceLandmark68Net.loadFromUri("/models/"),
//   faceapi.nets.faceRecognitionNet.loadFromUri("/models/"),
//   faceapi.nets.faceExpressionNet.loadFromUri("/models/")
// ])
//
// navigator.mediaDevices.getUserMedia({video:{width: 720, height: 405}})
// .then(mediaStream => {
//   var video = document.querySelector('video');
//   video.srcObject = mediaStream;
//   // video.onloadedmetadata = function(e) {
//   //   video.play();
//   // };
// })
// .catch((err) => { console.log(err.name + ": " + err.message); });
//
// video.addEventListener("play", () => {
//   //create face api canvas !
//   faceAPICanvas = faceapi.createCanvasFromMedia(video)
//   document.body.append(faceAPICanvas);
//   const displaySize = {width: video.width, height: video.height}
//
//   faceapi.matchDimensions(faceAPICanvas, displaySize)
//
//   setInterval(async () => {
//     detections = await faceapi.detectAllFaces(
//       video,
//       new faceapi.TinyFaceDetectorOptions())
//       .withFaceLandmarks()
//       .withFaceExpressions()
//
//       expressions = detections[0].expressions;
//       neutral = detections[0].expressions.neutral;
//       happy = detections[0].expressions.happy;
//       angry = detections[0].expressions.angry;
//       sad = detections[0].expressions.sad;
//       disgusted = detections[0].expressions.disgusted;
//       surprised = detections[0].expressions.surprised;
//       fearful = detections[0].expressions.fearful;
//
//       // console.log(detections[0].expressions);
//
//       //Redraw the canvas
//       const resizedDetections = faceapi.resizeResults(detections, displaySize)
//       //Clear the previous canvas before redraw new frame.
//       faceAPICanvas.getContext("2d").clearRect(0, 0, faceAPICanvas.width, faceAPICanvas.height)
//       // faceapi.draw.drawDetections(canvas, resizedDetections)
//       faceapi.draw.drawFaceLandmarks(faceAPICanvas, resizedDetections)
//       // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//   }, 200)
// })


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
    // p.blendMode();
    // frameRate(10);
    p.clear();
    // p.emotionalStatesHUD(25, 240);
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

//----- Grid canvas -----

canvas1 = p => {
  p.preload = () => {
    // let img = p.loadImage("1.png");
  }

  p.setup = () => {
    p.createDiv();
    gridCanvas = p.createCanvas(720, 405);
    gridCanvas.id("gridCanvas");
    raya = new Raya();
  }

  p.draw = () => {
    // frameRate(10);
    p.background(0);
    p.grid();
    // p.fill(255,0,0);
    // p.ellipse(p.mouseX, p.mouseY, 30, 30);
    p.fill(255);
    p.ellipse(p.width/2, p.height/2, 40, 40);


    // p.print(p.frameRate());

    raya.appear();
    raya.move();
    raya.turn();

    let addX;
    let addY;

    if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
      addX = p.map(p.mouseX, 0, p.width, -0.1, 0.1);
      addY = p.map(p.mouseY, 0, p.height, -0.1, 0.1);
    }else{
      addX = 0;
      addY = 0;
    }


    let mouseAttraction = p.createVector(addX, addY);
    raya.applyForce(mouseAttraction);

  }

  p.grid = () => {
    for(let i = 0; i <= p.width; i += 30){
      for(let j = 0; j <= p.height; j+= 30){
        p.stroke(255);
        p.strokeWeight(0.05);
        p.line(i, 0, i, p.height);
        p.line(0, j, p.width, j);
      }
    }
  }


  class Raya{
    constructor(){
      this.position = p.createVector(p.random(20, p.width-20), p.random(20, p.height-20));
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector(0, 0);
    }

    appear(){
      p.fill(255,0,0);
      p.ellipse(this.position.x, this.position.y, 30, 30);
    }

    move(){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.velocity.limit(1);
    }

    //This is key to decide every move looking,
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

    attracted(){

    }
    scared(){

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
    turnPage(){
    }
    spillTeaOnBook(){

    }
    annoy(){

    }


  }

}

let myp52 = new p5(canvas1, 'gridCanvas');
