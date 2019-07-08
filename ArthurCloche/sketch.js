let p= 0;

function setup () {
  createCanvas(400,800);
  noFill();
  stroke(255);
  strokeWeight (2);
  // noLoop();

}

function draw(){
  // p = map(mouseX,0,width,0,TWO_PI);
  clear();
  background(0);
  const x = width/2;
  const y = height /2;

  translate(-50,-500);
  let inc = 0.02

  for (let j =0 ; j < 6 ; j ++ ){

  beginShape();
  for (let i = 0; i < TWO_PI; i += inc*6){
      let ninc = map(i,0,TWO_PI,0,100);
      let rad = 50+j*10;
      // let rad = 50;
      let xoff = map(cos(i+p),-1,1,-0.4,0.4);
      let yoff = map(sin(i+p),-1,1,-0.4,0.4);
      let n = noise(xoff,yoff)*100;

      let xx = x+ rad * sin(i)+n;
      let yy = y- rad * cos(i)+n*10;

      if( i == 0 ){

        vertex(xx,yy);
        stroke(255);
        curveVertex(xx,yy);
      }
      else{
        stroke(255);
        curveVertex(xx,yy);
        point(xx, yy);
      }
      if( i == 0 ){

        curveVertex(xx,yy);
      }
      noFill();
  }
  endShape(CLOSE);

  p += inc/2


  }
}
