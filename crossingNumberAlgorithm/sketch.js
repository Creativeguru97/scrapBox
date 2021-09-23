let points = [];
let dMouse = [];
let closest;
let drawVertices = [];

function setup(){
  createCanvas(600, 400);
  for(let i=0; i<6; i++){
    points[i] = {
      x:random(0, width),
      y:random(0, height)
    }
  }
  console.log(points);

  colorMode(HSB);
}

function draw(){
  background(50);
  stroke(255);
  strokeWeight(6);

  drawPoints();
  shapes();
}

function drawPoints(){
  for(let i=0; i<points.length; i++){
    point(
      points[i].x,
      points[i].y
    )

    let d = dist(
      points[i].x,
      points[i].y,
      mouseX,
      mouseY
    );
    dMouse.push(d);
  }

  let minimum = min(dMouse);
  closest = dMouse.indexOf(minimum);

  stroke(0, 100, 100);
  strokeWeight(10);
  point(
    points[closest].x,
    points[closest].y
  );

  dMouse.splice(0, dMouse.length);
}

function mouseClicked(){
    drawVertices.push(closest);
    console.log(drawVertices);
}

function shapes(){
    fill(0, 0, 0);
    stroke(0, 0, 100);
    strokeWeight(3);
    let crossingNumber = 0;

    if(drawVertices.length > 0){
      for(i=0; i<drawVertices.length-1; i++){
        if( ((points[drawVertices[i]].y <= mouseY) && (points[drawVertices[i+1]].y > mouseY))
         || ((points[drawVertices[i]].y > mouseY) && (points[drawVertices[i+1]].y <= mouseY)) ){
          let vt = (mouseY - points[drawVertices[i]].y) / (points[drawVertices[i+1]].y - points[drawVertices[i]].y);
          if(mouseX < (points[drawVertices[i]].x + (vt * (points[drawVertices[i+1]].x - points[drawVertices[i]].x)))){
            crossingNumber++;
          }
        }
      }
    }

    if(crossingNumber%2 == 0){
      console.log("Mouse is out of the shape");
    }else if (crossingNumber%2 == 1) {
      console.log("Mouse is in the shape");
    }

    beginShape();
    for(let p = 0; p < drawVertices.length; p++){
      vertex(
        points[drawVertices[p]].x,
        points[drawVertices[p]].y
      );
    }
    endShape(CLOSE);
}

function shapes2(){
  fill(0, 0, 0);
  stroke(0, 0, 100);
  strokeWeight(3);

  for(i=0; i<points.length-1; i++){

  }
}

function isPointInPolygon(){

}
