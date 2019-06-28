float angle = 0;

P4Vector[] points = new P4Vector[16];
PVector[] line2D = new PVector[16];
PVector[] fillPoint = new PVector[16];

void setup(){
  size(600, 400);
  points[0] = new P4Vector(-50, -50, -50, 50);
  points[1] = new P4Vector(50, -50, -50, 50);
  points[2] = new P4Vector(50, 50, -50, 50);
  points[3] = new P4Vector(-50, 50, -50, 50);
  points[4] = new P4Vector(-50, -50, 50, 50);
  points[5] = new P4Vector(50, -50, 50, 50);
  points[6] = new P4Vector(50, 50, 50, 50);
  points[7] = new P4Vector(-50, 50, 50, 50);
  
  points[8] = new P4Vector(-50, -50, -50, -50);
  points[9] = new P4Vector(50, -50, -50, -50);
  points[10] = new P4Vector(50, 50, -50, -50);
  points[11] = new P4Vector(-50, 50, -50, -50);
  points[12] = new P4Vector(-50, -50, 50, -50);
  points[13] = new P4Vector(50, -50, 50, -50);
  points[14] = new P4Vector(50, 50, 50, -50);
  points[15] = new P4Vector(-50, 50, 50, -50);
}

void draw(){
  println(frameRate);
  background(0);
  translate(width/2, height/2);
  rotateZ(PI/2);
  //rotateY(-PI/2);
  //displayAxis();

  for(int i = 0; i < points.length; i++){
    P4Vector v = points[i];
    
    stroke(255);
    strokeWeight(8);
    noFill();
    
    P4Vector rotated = matmul(rotation("YZ"), v, true);
    rotated = matmul(rotation("XW"), rotated, true);

    //4D to 3D
    float distance = 200;
    float w = 100 / (distance - rotated.w);
    
    float [][] projection = {
      {w, 0, 0, 0}, 
      {0, w, 0, 0},
      {0, 0, w, 0}
    };
    
    PVector projected3D = matmul(projection, rotated);
    //projected3D.mult(3);//For zoom or shrink it
    //point(projected3D.x, projected3D.y, projected3D.z);
    
    //3D to 2D
    float distance2 = 120;// It's about from camera. Lower value, stronger affected
    float z = 100 / (distance2 - rotated.z);
    //println(z);
    float [][] projection2 = {
      {z, 0, 0}, 
      {0, z, 0}
    };
    
    PVector projected2D = matmul(projection2, projected3D);
    projected2D.mult(3);//For zoom or shrink it
    line2D[i] = projected2D;
    fillPoint[i] = projected2D;
    stroke(255);
    point(projected2D.x, projected2D.y);
  }
  
  draw2DLine();
  FillPlanes();

  angle += 0.01;
}


//----- Functions -----

void connect2D(int i, int j, PVector[] points){
  PVector a = points[i];
  PVector b = points[j];
  strokeWeight(1);
  line(a.x, a.y, b.x, b.y);
}

void displayAxis(){
  strokeWeight(2);
  stroke(255, 0, 0);
  line(0, 0, 0, width/4, 0, 0);
  stroke(0, 255, 0);
  line(0, 0, 0, 0, width/4, 0);
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, width/4);
}

float[][] rotation(String axis){
  //http://kennycason.com/posts/2009-01-08-graph4d-rotation4d-project-to-2d.html
  if(axis == "XY"){
    
    float[][] rotationXY = {
      {cos(angle), -sin(angle), 0, 0},
      {sin(angle), cos(angle), 0, 0},
      {0, 0, 1, 0},
      {0, 0, 0, 1}
    };
    return rotationXY;
    
  }else if(axis == "YZ"){
    
    float[][] rotationYZ = {
      {1, 0, 0, 0},
      {0, cos(angle), -sin(angle), 0},
      {0, sin(angle), cos(angle), 0},
      {0, 0, 0, 1}
    };
    return rotationYZ;
    
  }else if(axis == "XZ"){
    
    float[][] rotationXZ = {
      {cos(angle), 0, -sin(angle), 0},
      {0, 1, 0, 0},
      {sin(angle), 0, cos(angle), 0},
      {0, 0, 0, 1}
    };
    return rotationXZ;
    
  }else if(axis == "XW"){
    
    float[][] rotationXW = {
      {cos(angle), 0, 0, -sin(angle)},
      {0, 1, 0, 0},
      {0, 0, 1, 0},
      {sin(angle), 0, 0, cos(angle)}
    };
    return rotationXW;
    
  }else if(axis == "YW"){
    
    float[][] rotationYW = {
      {1, 0, 0, 0},
      {0, cos(angle), 0, -sin(angle)},
      {0, 0, 1, 0},
      {sin(angle), 0, cos(angle), 0},
    };
    return rotationYW;
    
  }else if(axis == "ZW"){
    
    float[][] rotationZW = {
      {1, 0, 0, 0},
      {0, 1, 0, 0},
      {0, 0, cos(angle), -sin(angle)},
      {0, 0, sin(angle), cos(angle)},
    };
    return rotationZW;
    
  }else{
    return null;
  }
}

void draw2DLine(){
  stroke(255);
  for(int i = 0; i < points.length; i++){
    if(i == 3){
      connect2D(3, 0, line2D);
    }else if(i == 7){
      connect2D(7, 4, line2D);
    }else if(i == 11){
      connect2D(11, 8, line2D);
    }else if(i == 15){
      connect2D(15, 12, line2D);
    }else{
      connect2D(i, i+1, line2D);
    }

    if(i < 4){
       connect2D(i, i + 4, line2D);
    }else if(i >= 8 && i < 12){
       connect2D(i, i + 4, line2D);
    }
    
    if(i < 8){
      connect2D(i, i + 8, line2D);
    }
  }
}

void fillPlane(int i, int j, int k, int l, PVector[] points){
  PVector a = points[i];
  PVector b = points[j];
  PVector c = points[k];
  PVector d = points[l];
  strokeWeight(1);
  quad(
      a.x, a.y, 
      b.x, b.y, 
      c.x, c.y, 
      d.x, d.y
    );
}

void FillPlanes(){
  for(int i = 0; i < points.length; i++){
    fill(134, 227, 255, 5);
    noStroke();
    
    //Outer Cube
    fillPlane(0, 1, 2, 3, fillPoint);
    fillPlane(2, 3, 7, 6, fillPoint);
    fillPlane(4, 5, 6, 7, fillPoint);
    fillPlane(0, 1, 5, 4, fillPoint);
    fillPlane(0, 3, 7, 4, fillPoint);
    fillPlane(1, 2, 6, 5, fillPoint);
    
    //Inner Cube
    fillPlane(8, 9, 10, 11, fillPoint);
    fillPlane(10, 11, 15, 14, fillPoint);
    fillPlane(12, 13, 14, 15, fillPoint);
    fillPlane(8, 9, 13, 12, fillPoint);
    fillPlane(8, 11, 15, 12, fillPoint);
    fillPlane(9, 10, 14, 13, fillPoint);
    
    //Other
    //fillPlane(1, 9, 10, 2, fillPoint);
    //fillPlane(2, 10, 14, 6, fillPoint);
    //fillPlane(5, 13, 14, 6, fillPoint);
    //fillPlane(1, 9, 13, 5, fillPoint);
    
    //fillPlane(0, 8, 11, 3, fillPoint);
    //fillPlane(3, 11, 15, 7, fillPoint);
    //fillPlane(4, 12, 15, 7, fillPoint);
    //fillPlane(0, 8, 12, 4, fillPoint);
    
    //fillPlane(0, 8, 9, 1, fillPoint);
    //fillPlane(2, 10, 11, 3, fillPoint);
    //fillPlane(6, 14, 15, 7, fillPoint);
    //fillPlane(4, 12, 13, 5, fillPoint);
    
    fill(134, 255, 160, 5);
    

    fill(255);
  }
}
