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
