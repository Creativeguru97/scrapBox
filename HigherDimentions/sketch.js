let higherDimentionCanvas;
let angle = 0;

let points4D = [];
let points5D = [];
let points6D = [];

let linePoints = [];

let elementMode;
let scaleSlider;
let scaleSliderDisplay;

let scale;

function setup(){
  //For the fuck sake, I wanna be smarter to write down those vectors.
  //God plz tell me how...

  //----- Tesseract -----
  points4D[0] = new P4Vector(-50, -50, -50, 50);
  points4D[1] = new P4Vector(50, -50, -50, 50);
  points4D[2] = new P4Vector(50, 50, -50, 50);
  points4D[3] = new P4Vector(-50, 50, -50, 50);
  points4D[4] = new P4Vector(-50, -50, 50, 50);
  points4D[5] = new P4Vector(50, -50, 50, 50);
  points4D[6] = new P4Vector(50, 50, 50, 50);
  points4D[7] = new P4Vector(-50, 50, 50, 50);

  points4D[8] = new P4Vector(-50, -50, -50, -50);
  points4D[9] = new P4Vector(50, -50, -50, -50);
  points4D[10] = new P4Vector(50, 50, -50, -50);
  points4D[11] = new P4Vector(-50, 50, -50, -50);
  points4D[12] = new P4Vector(-50, -50, 50, -50);
  points4D[13] = new P4Vector(50, -50, 50, -50);
  points4D[14] = new P4Vector(50, 50, 50, -50);
  points4D[15] = new P4Vector(-50, 50, 50, -50);

  //----- Penteract -----
  points5D[0] = new P5Vector(-50, -50, -50, 50, 50);
  points5D[1] = new P5Vector(50, -50, -50, 50, 50);
  points5D[2] = new P5Vector(50, 50, -50, 50, 50);
  points5D[3] = new P5Vector(-50, 50, -50, 50, 50);
  points5D[4] = new P5Vector(-50, -50, 50, 50, 50);
  points5D[5] = new P5Vector(50, -50, 50, 50, 50);
  points5D[6] = new P5Vector(50, 50, 50, 50, 50);
  points5D[7] = new P5Vector(-50, 50, 50, 50, 50);

  points5D[8] = new P5Vector(-50, -50, -50, -50, 50);
  points5D[9] = new P5Vector(50, -50, -50, -50, 50);
  points5D[10] = new P5Vector(50, 50, -50, -50, 50);
  points5D[11] = new P5Vector(-50, 50, -50, -50, 50);
  points5D[12] = new P5Vector(-50, -50, 50, -50, 50);
  points5D[13] = new P5Vector(50, -50, 50, -50, 50);
  points5D[14] = new P5Vector(50, 50, 50, -50, 50);
  points5D[15] = new P5Vector(-50, 50, 50, -50, 50);

  points5D[16] = new P5Vector(-50, -50, -50, 50, -50);
  points5D[17] = new P5Vector(50, -50, -50, 50, -50);
  points5D[18] = new P5Vector(50, 50, -50, 50, -50);
  points5D[19] = new P5Vector(-50, 50, -50, 50, -50);
  points5D[20] = new P5Vector(-50, -50, 50, 50, -50);
  points5D[21] = new P5Vector(50, -50, 50, 50, -50);
  points5D[22] = new P5Vector(50, 50, 50, 50, -50);
  points5D[23] = new P5Vector(-50, 50, 50, 50, -50);

  points5D[24] = new P5Vector(-50, -50, -50, -50, -50);
  points5D[25] = new P5Vector(50, -50, -50, -50, -50);
  points5D[26] = new P5Vector(50, 50, -50, -50, -50);
  points5D[27] = new P5Vector(-50, 50, -50, -50, -50);
  points5D[28] = new P5Vector(-50, -50, 50, -50, -50);
  points5D[29] = new P5Vector(50, -50, 50, -50, -50);
  points5D[30] = new P5Vector(50, 50, 50, -50, -50);
  points5D[31] = new P5Vector(-50, 50, 50, -50, -50);

  //----- Hexeract -----
  points6D[0] = new P6Vector(-50, -50, -50, 50, 50, 50);
  points6D[1] = new P6Vector(50, -50, -50, 50, 50, 50);
  points6D[2] = new P6Vector(50, 50, -50, 50, 50, 50);
  points6D[3] = new P6Vector(-50, 50, -50, 50, 50, 50);
  points6D[4] = new P6Vector(-50, -50, 50, 50, 50, 50);
  points6D[5] = new P6Vector(50, -50, 50, 50, 50, 50);
  points6D[6] = new P6Vector(50, 50, 50, 50, 50, 50);
  points6D[7] = new P6Vector(-50, 50, 50, 50, 50, 50);

  points6D[8] = new P6Vector(-50, -50, -50, -50, 50, 50);
  points6D[9] = new P6Vector(50, -50, -50, -50, 50, 50);
  points6D[10] = new P6Vector(50, 50, -50, -50, 50, 50);
  points6D[11] = new P6Vector(-50, 50, -50, -50, 50, 50);
  points6D[12] = new P6Vector(-50, -50, 50, -50, 50, 50);
  points6D[13] = new P6Vector(50, -50, 50, -50, 50, 50);
  points6D[14] = new P6Vector(50, 50, 50, -50, 50, 50);
  points6D[15] = new P6Vector(-50, 50, 50, -50, 50, 50);

  points6D[16] = new P6Vector(-50, -50, -50, 50, -50, 50);
  points6D[17] = new P6Vector(50, -50, -50, 50, -50, 50);
  points6D[18] = new P6Vector(50, 50, -50, 50, -50, 50);
  points6D[19] = new P6Vector(-50, 50, -50, 50, -50, 50);
  points6D[20] = new P6Vector(-50, -50, 50, 50, -50, 50);
  points6D[21] = new P6Vector(50, -50, 50, 50, -50, 50);
  points6D[22] = new P6Vector(50, 50, 50, 50, -50, 50);
  points6D[23] = new P6Vector(-50, 50, 50, 50, -50, 50);

  points6D[24] = new P6Vector(-50, -50, -50, -50, -50, 50);
  points6D[25] = new P6Vector(50, -50, -50, -50, -50, 50);
  points6D[26] = new P6Vector(50, 50, -50, -50, -50, 50);
  points6D[27] = new P6Vector(-50, 50, -50, -50, -50, 50);
  points6D[28] = new P6Vector(-50, -50, 50, -50, -50, 50);
  points6D[29] = new P6Vector(50, -50, 50, -50, -50, 50);
  points6D[30] = new P6Vector(50, 50, 50, -50, -50, 50);
  points6D[31] = new P6Vector(-50, 50, 50, -50, -50, 50);


  points6D[32] = new P6Vector(-50, -50, -50, 50, 50, -50);
  points6D[33] = new P6Vector(50, -50, -50, 50, 50, -50);
  points6D[34] = new P6Vector(50, 50, -50, 50, 50, -50);
  points6D[35] = new P6Vector(-50, 50, -50, 50, 50, -50);
  points6D[36] = new P6Vector(-50, -50, 50, 50, 50, -50);
  points6D[37] = new P6Vector(50, -50, 50, 50, 50, -50);
  points6D[38] = new P6Vector(50, 50, 50, 50, 50, -50);
  points6D[39] = new P6Vector(-50, 50, 50, 50, 50, -50);

  points6D[40] = new P6Vector(-50, -50, -50, -50, 50, -50);
  points6D[41] = new P6Vector(50, -50, -50, -50, 50, -50);
  points6D[42] = new P6Vector(50, 50, -50, -50, 50, -50);
  points6D[43] = new P6Vector(-50, 50, -50, -50, 50, -50);
  points6D[44] = new P6Vector(-50, -50, 50, -50, 50, -50);
  points6D[45] = new P6Vector(50, -50, 50, -50, 50, -50);
  points6D[46] = new P6Vector(50, 50, 50, -50, 50, -50);
  points6D[47] = new P6Vector(-50, 50, 50, -50, 50, -50);

  points6D[48] = new P6Vector(-50, -50, -50, 50, -50, -50);
  points6D[49] = new P6Vector(50, -50, -50, 50, -50, -50);
  points6D[50] = new P6Vector(50, 50, -50, 50, -50, -50);
  points6D[51] = new P6Vector(-50, 50, -50, 50, -50, -50);
  points6D[52] = new P6Vector(-50, -50, 50, 50, -50, -50);
  points6D[53] = new P6Vector(50, -50, 50, 50, -50, -50);
  points6D[54] = new P6Vector(50, 50, 50, 50, -50, -50);
  points6D[55] = new P6Vector(-50, 50, 50, 50, -50, -50);

  points6D[56] = new P6Vector(-50, -50, -50, -50, -50, -50);
  points6D[57] = new P6Vector(50, -50, -50, -50, -50, -50);
  points6D[58] = new P6Vector(50, 50, -50, -50, -50, -50);
  points6D[59] = new P6Vector(-50, 50, -50, -50, -50, -50);
  points6D[60] = new P6Vector(-50, -50, 50, -50, -50, -50);
  points6D[61] = new P6Vector(50, -50, 50, -50, -50, -50);
  points6D[62] = new P6Vector(50, 50, 50, -50, -50, -50);
  points6D[63] = new P6Vector(-50, 50, 50, -50, -50, -50);

  createDiv();
  elementMode = createSelect();
  elementMode.option("Tesseract");
  elementMode.option("Penteract");
  elementMode.option("Hexeract");
  elementMode.class("Selector");

  scaleSliderDisplay = createDiv();
  scaleSliderDisplay.class("Display");
  scaleSliderDisplay.id("scaleSliderMargin");
  scaleSlider = createSlider(0, 100, 50, 1);
  scaleSlider.class("Slider");

  higherDimentionCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
  higherDimentionCanvas.id("higherDimentionCanvas");
  colorMode(HSB);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  orbitControl(4, 4);
  clear();

  scaleSliderDisplay.html("Scale: " + scaleSlider.value());

  if(elementMode.value() == "Tesseract"){
    tesseract();
  }else if(elementMode.value() == "Penteract"){
    penteract();
  }else if(elementMode.value() == "Hexeract"){
    hexeract();
  }

  // displayAxis();

  let rotAngle = map(mouseY, 0, height, 0.02, -0.02);
  angle += rotAngle;
}


//----- Functions -----

function connect(offset, i, j, points){
  const a = points[i+offset];
  const b = points[j+offset];
  noFill();
  strokeWeight(1);
  line(a.x, a.y, a.z, b.x, b.y, b.z);
}

function displayAxis(){
  colorMode(RGB);
  stroke(255, 0, 0);
  line(0, 0, 0, width/4, 0, 0);
  stroke(0, 255, 0);
  line(0, 0, 0, 0, width/4, 0);
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, width/4);
  stroke(255);
}


//----- Tesseract -----
function tesseract(){
  rotateX(-PI/2);
  scale = map(scaleSlider.value(), 0, 100, 2, 4);

  for(let i = 0; i < points4D.length; i++){
    const v = points4D[i];

    let rotated = matmul4D_R(rotation4D("XY"), v);
    rotated = matmul4D_R(rotation4D("ZW"), rotated);

    //4D to 3D
    let distance = 150;
    let w = 100 / (distance - rotated.w);

    const projection = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0]
    ];

    let projected3D = matmul4D_P(projection, rotated);
    projected3D.mult(scale);//For zoom or shrink it
    stroke(255);
    strokeWeight(16);
    point(projected3D.x, projected3D.y, projected3D.z);
    linePoints[i] = projected3D;

    //Display indices for debugging
    //fill(0,255,0);
    //text(i, projected3D.x, projected3D.y, projected3D.z);
  }
  draw4DLine();
}

function rotation4D(axis){
  //http://kennycason.com/posts/2009-01-08-graph4d-rotation4d-project-to-2d.html
  if(axis == "XY"){

    const rotationXY = [
      [cos(angle), -sin(angle), 0, 0],
      [sin(angle), cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    return rotationXY;

  }else if(axis == "YZ"){

    const rotationYZ = [
      [1, 0, 0, 0],
      [0, cos(angle), -sin(angle), 0],
      [0, sin(angle), cos(angle), 0],
      [0, 0, 0, 1]
    ];
    return rotationYZ;

  }else if(axis == "XZ"){

    const rotationXZ = [
      [cos(angle), 0, -sin(angle), 0],
      [0, 1, 0, 0],
      [sin(angle), 0, cos(angle), 0],
      [0, 0, 0, 1]
    ];
    return rotationXZ;

  }else if(axis == "XW"){

    const rotationXW = [
      [cos(angle), 0, 0, -sin(angle)],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [sin(angle), 0, 0, cos(angle)]
    ];
    return rotationXW;

  }else if(axis == "YW"){

    const rotationYW = [
      [1, 0, 0, 0],
      [0, cos(angle), 0, -sin(angle)],
      [0, 0, 1, 0],
      [sin(angle), 0, cos(angle), 0],
    ];
    return rotationYW;

  }else if(axis == "ZW"){

    const rotationZW = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, cos(angle), -sin(angle)],
      [0, 0, sin(angle), cos(angle)],
    ];
    return rotationZW;

  }else{
    return null;
  }
}

function draw4DLine(){

  for(let i = 0; i < 4; i++){
    connect(0, i, (i+1)%4, linePoints);
    connect(0, i+4, ((i+1)%4)+4, linePoints);
    connect(0, i, i+4, linePoints);
  }
  for(let i = 0; i < 4; i++){
    connect(8, i, (i+1)%4, linePoints);
    connect(8, i+4, ((i+1)%4)+4, linePoints);
    connect(8, i, i+4, linePoints);
  }
  for(let i = 0; i < 8; i++){
    connect(0, i, i + 8, linePoints);
  }
}


//----- Penteract -----
function penteract(){
  rotateX(-PI/6);
  scale = map(scaleSlider.value(), 0, 100, 5, 20);

  for(let i = 0; i < points5D.length; i++){
    const v = points5D[i];

    //P5Vector rotated = matmul5(rotation(2), v, true);
    let rotated = matmul5D_R(rotation5D(3), v);
    rotated = matmul5D_R(rotation5D(8), v);

    //5D to 4D
    let distance1 = 300;
    let u = 100 / (distance1 - rotated.u);

    const projection1 = [
      [u, 0, 0, 0, 0],
      [0, u, 0, 0, 0],
      [0, 0, u, 0, 0],
      [0, 0, 0, u, 0]
    ];

    const projected4D = matmul5D_P(projection1, rotated);

    //4D to 3D
    let distance2 = 200;
    let w = 100 / (distance2 - rotated.w);

    const projection2 = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0]
    ];

    let projected3D = matmul4D_P(projection2, projected4D);
    projected3D.mult(scale);//For zoom or shrink it

    stroke(255);
    strokeWeight(16);
    point(projected3D.x, projected3D.y, projected3D.z);
    linePoints[i] = projected3D;

    //Display indices for debugging
    //fill(0,255,0);
    //text(i, projected3D.x, projected3D.y, projected3D.z);
  }

  draw5DLine();
}

function rotation5D(cube){
  //http://kennycason.com/posts/2009-01-08-graph4d-rotation4d-project-to-2d.html
  if(cube == 0){

    const rotation0 = [
      [cos(angle), -sin(angle), 0, 0, 0],
      [sin(angle), cos(angle), 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1]
    ];
    return rotation0;

  }else if(cube == 1){

    const rotation1 = [
      [1, 0, 0, 0, 0],
      [0, cos(angle), -sin(angle), 0, 0],
      [0, sin(angle), cos(angle), 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1]
    ];
    return rotation1;

  }else if(cube == 2){

    const rotation2 = [
      [cos(angle), 0, -sin(angle), 0, 0],
      [0, 1, 0, 0, 0],
      [sin(angle), 0, cos(angle), 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1]
    ];
    return rotation2;

  }else if(cube == 3){

    const rotation3 = [
      [cos(angle), 0, 0, -sin(angle), 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [sin(angle), 0, 0, cos(angle), 0],
      [0, 0, 0, 0, 1],
    ];
    return rotation3;

  }else if(cube == 4){

    const rotation4 = [
      [cos(angle), 0, 0, -sin(angle), 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [sin(angle), 0, 0, cos(angle), 0]
    ];
    return rotation4;

  }else if(cube == 5){

    const rotation5 = [
      [1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, sin(angle), 0, cos(angle)],
      [0, 0, 0, 1, 0],
      [0, 0, -sin(angle), 0, cos(angle)]
    ];
    return rotation5;

  }else if(cube == 6){

    const rotation6 = [
      [1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, cos(angle), sin(angle), 0],
      [0, 0, -sin(angle), cos(angle), 0],
      [0, 0, 0, 0, 1]
    ];

    return rotation6;

  }else if(cube == 7){

    const rotation7 = [
      [1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, cos(angle), sin(angle)],
      [0, 0, 0, -sin(angle), cos(angle)]
    ];
    return rotation7;

  }else if(cube == 8){

    const rotation8 = [
      [1, 0, 0, 0, 0],
      [0, cos(angle), 0, 0, sin(angle)],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, -sin(angle), 0, 0, cos(angle)]
    ];
    return rotation8;

  }else if(cube == 9){

    const rotation9 = [
      [0, cos(angle), 0, 0, sin(angle)],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, -sin(angle), 0, 0, cos(angle)]
    ];
    return rotation9;

  }else{
    return null;
  }
}

function draw5DLine(){
  //There must be much more sophisticated way.

  for(let i = 0; i < 4; i++){
    stroke(300, 127, 255);
    connect(0, i, (i+1)%4, linePoints);
    connect(0, i+4, ((i+1)%4)+4, linePoints);
    connect(0, i, i+4, linePoints);
  }
  for(let i = 0; i < 4; i++){
    stroke(300, 127, 255);
    connect(8, i, (i+1)%4, linePoints);
    connect(8, i+4, ((i+1)%4)+4, linePoints);
    connect(8, i, i+4, linePoints);
  }
  for(let i = 0; i < 8; i++){
    stroke(300, 127, 255);
    connect(0, i, i + 8, linePoints);
  }

  for(let i = 0; i < 16; i++){
    stroke(255);
    connect(0, i, i + 16, linePoints);
  }

  for(let i = 0; i < 4; i++){
    stroke(200, 127, 255);
    connect(16, i, (i+1)%4, linePoints);
    connect(16, i+4, ((i+1)%4)+4, linePoints);
    connect(16, i, i+4, linePoints);
  }
  for(let i = 0; i < 4; i++){
    stroke(200, 127, 255);
    connect(24, i, (i+1)%4, linePoints);
    connect(24, i+4, ((i+1)%4)+4, linePoints);
    connect(24, i, i+4, linePoints);
  }
  for(let i = 0; i < 8; i++){
    stroke(200, 127, 255);
    connect(16, i, i + 8, linePoints);
  }
}


//----- Hexeract -----
function hexeract(){
  rotateX(-PI/6);//To make axis more seetable
  scale = map(scaleSlider.value(), 0, 100, 40, 160);

  for(let i = 0; i < points6D.length; i++){
    const v = points6D[i];

    //I used rotation o and 6, in the function at last of code
    let rotated = matmul6D_R(rotation6D(0), v, true);
    rotated = matmul6D_R(rotation6D(1), v, true);

    //6D to 5D
    const distance6D = 600;
    const t = 100 / (distance6D - rotated.t);

    const projection6D = [
      [t, 0, 0, 0, 0, 0],
      [0, t, 0, 0, 0, 0],
      [0, 0, t, 0, 0, 0],
      [0, 0, 0, t, 0, 0],
      [0, 0, 0, 0, t, 0]
    ];

    const projected5D = matmul6D_P(projection6D, rotated);

    //5D to 4D
    const distance1 = 350;
    const u = 100 / (distance1 - v.u);

    const projection5D = [
      [u, 0, 0, 0, 0],
      [0, u, 0, 0, 0],
      [0, 0, u, 0, 0],
      [0, 0, 0, u, 0]
    ];

    const projected4D = matmul5D_P(projection5D, projected5D);

    //4D to 3D
    const distance2 = 250;
    const w = 100 / (distance2 - rotated.w);

    const projection4D = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0]
    ];

    let projected3D = matmul4D_P(projection4D, projected4D);
    projected3D.mult(scale);//For zoom or shrink it

    stroke(255);
    strokeWeight(16);
    point(projected3D.x, projected3D.y, projected3D.z);
    linePoints[i] = projected3D;

    //Display indices for debugging
    //fill(100,255,255);
    //text(i, projected3D.x, projected3D.y, projected3D.z);
  }

  draw6DLine();
}

function rotation6D(cube){
  //http://kennycason.com/posts/2009-01-08-graph4d-rotation4d-project-to-2d.html
  if(cube == 0){

    const rotation0 = [
      [cos(angle), 0, 0, 0, -sin(angle), 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [sin(angle), 0, 0, 0, cos(angle), 0],
      [0, 0, 0, 0, 0, 1]
    ];
    return rotation0;

  }else if(cube == 1){

    const rotation1 = [
      [1, 0, 0, 0, 0, 0],
      [0, cos(angle), 0, 0, 0, sin(angle)],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, -sin(angle), 0, 0, 0, cos(angle)]
    ];
    return rotation1;

  }else if(cube == 2){

    const rotation2 = [
      [cos(angle), 0, 0, -sin(angle), 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [sin(angle), 0, 0, cos(angle), 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1]
    ];
    return rotation2;

  }else if(cube == 3){

    const rotation3 = [
      [1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, cos(angle), 0, 0, -sin(angle)],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, sin(angle), 0, 0, cos(angle)],
    ];
    return rotation3;

  }else if(cube == 4){

    const rotation4 = [
      [cos(angle), 0, 0, -sin(angle), 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [sin(angle), 0, 0, cos(angle), 0],
      [0, 0, 0, 0, 1],
    ];
    return rotation4;

  }else if(cube == 5){

    const rotation5 = [
      [1, 0, 0, 0, 0],
      [0, cos(angle), 0, 0, sin(angle)],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, -sin(angle), 0, 0, cos(angle)]
    ];
    return rotation5;

  }else{
    return null;
  }
}

function draw6DLine(){

  let tesseract0 = color(45, 127, 255);
  let tesseract1 = color(100, 127, 255);
  let tesseract2 = color(200, 127, 255);
  let tesseract3 = color(300, 127, 255);

  //First Penteract
  for(let i = 0; i < 4; i++){
    stroke(tesseract0);
    connect(0, i, (i+1)%4, linePoints);
    connect(0, i+4, ((i+1)%4)+4, linePoints);
    connect(0, i, i+4, linePoints);
  }
  for(let i = 0; i < 4; i++){
    stroke(tesseract0);
    connect(8, i, (i+1)%4, linePoints);
    connect(8, i+4, ((i+1)%4)+4, linePoints);
    connect(8, i, i+4, linePoints);
  }
  for(let i = 0; i < 8; i++){
    stroke(tesseract0);
    connect(0, i, i + 8, linePoints);
  }

  for(let i = 0; i < 16; i++){
    stroke(255);
    connect(0, i, i + 16, linePoints);
  }

  for(let i = 0; i < 4; i++){
    stroke(tesseract1);
    connect(16, i, (i+1)%4, linePoints);
    connect(16, i+4, ((i+1)%4)+4, linePoints);
    connect(16, i, i+4, linePoints);
  }
  for(let i = 0; i < 4; i++){
    stroke(tesseract1);
    connect(24, i, (i+1)%4, linePoints);
    connect(24, i+4, ((i+1)%4)+4, linePoints);
    connect(24, i, i+4, linePoints);
  }
  for(let i = 0; i < 8; i++){
    stroke(tesseract1);
    connect(16, i, i + 8, linePoints);
  }

  //Bind the two penteract
  for(let i = 0; i < 32; i++){
    stroke(255);
    connect(0, i, i + 32, linePoints);
  }


  //Second Penteract
  for(let i = 0; i < 4; i++){
    stroke(tesseract2);
    connect(32, i, (i+1)%4, linePoints);
    connect(32, i+4, ((i+1)%4)+4, linePoints);
    connect(32, i, i+4, linePoints);
  }
  for(let i = 0; i < 4; i++){
    stroke(tesseract2);
    connect(8+32, i, (i+1)%4, linePoints);
    connect(8+32, i+4, ((i+1)%4)+4, linePoints);
    connect(8+32, i, i+4, linePoints);
  }
  for(let i = 0; i < 8; i++){
    stroke(tesseract2);
    connect(32, i, i + 8, linePoints);
  }

  for(let i = 0; i < 16; i++){
    stroke(255);
    connect(32, i, i + 16, linePoints);
  }

  for(let i = 0; i < 4; i++){
    stroke(tesseract3);
    connect(16+32, i, (i+1)%4, linePoints);
    connect(16+32, i+4, ((i+1)%4)+4, linePoints);
    connect(16+32, i, i+4, linePoints);
  }
  for(let i = 0; i < 4; i++){
    stroke(tesseract3);
    connect(24+32, i, (i+1)%4, linePoints);
    connect(24+32, i+4, ((i+1)%4)+4, linePoints);
    connect(24+32, i, i+4, linePoints);
  }
  for(let i = 0; i < 8; i++){
    stroke(tesseract3);
    connect(16+32, i, i + 8, linePoints);
  }
}
