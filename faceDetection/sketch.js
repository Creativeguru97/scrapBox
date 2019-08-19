const video = document.getElementById("video");
let detections;
let expressions;

let hudCanvas;
let hudCanvas2;

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models/"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models/"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models/"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models/")
])

navigator.mediaDevices.getUserMedia({video:{width: 400, height: 300}})
.then(function(mediaStream) {
  var video = document.querySelector('video');
  video.srcObject = mediaStream;
  // video.onloadedmetadata = function(e) {
  //   video.play();
  // };
})
.catch(function(err) { console.log(err.name + ": " + err.message); });

video.addEventListener("play", () => {
  //create face api canvas !
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas);
  const displaySize = {width: video.width, height: video.height}

  faceapi.matchDimensions(canvas, displaySize)

  setInterval(async () => {
    detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()

      // console.log(detections[0].expressions);
      expressions = detections[0].expressions;

      //Redraw the canvas
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      //Clear the previous canvas before redraw new frame.
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
      // faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})


function setup(){
  createDiv();
  hudCanvas = createCanvas(720, 405);
  hudCanvas.id("hudCanvas");

  // hudCanvas2 = createCanvas(200, 200);
  // hudCanvas2.id("hudCanvas");

}

function draw(){
  frameRate(10);
  background(0);
  fill(100, 220, 255);
  grid();
  noStroke();
  ellipse(width/2, height/2, 40, 40);
  console.log(expressions);

}

function grid(){
  for(let i = 0; i <= width; i += 30){
    for(let j = 0; j <= height; j+= 30){
      stroke(0, 255, 0);
      strokeWeight(1);
      line(i, 0, i, height);
      line(0, j, width, j);
    }
  }
}
