float angle = 0;

P4Vector[] points = new P4Vector[16];


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
  background(0);
  translate(width/2, height/2);
  rotateZ(PI/2);
  //rotateY(-PI/2);
  //axis();

  PVector[] line2D = new PVector[16];
  //for(P4Vector v: points){
  for(int i = 0; i < points.length; i++){
    P4Vector v = points[i];
    
    stroke(255);
    strokeWeight(8);
    noFill();
  
    
    //P4Vector rotated = matmul(rotation("XY"), v, true);
    //rotated = matmul(rotation("ZW"), rotated, true);
    
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
    
    //3D to 2D
    float distance2 = 150;// It's about from camera. Lower value, stronger affected
    float z = 100 / (distance2 - rotated.z);
    //println(z);
    float [][] projection2 = {
      {z, 0, 0}, 
      {0, z, 0}
    };
    
    PVector projected2D = matmul(projection2, projected3D);
    projected2D.mult(3);//For zoom or shrink it
    line2D[i] = projected2D;
    stroke(255);
    point(projected2D.x, projected2D.y);
  }
  

  //----- Draw 2D line -----
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
  //----- Draw 2D line END -----

  angle += 0.01;
}


//----- Functions -----

void connect2D(int i, int j, PVector[] points){
  PVector a = points[i];
  PVector b = points[j];
  strokeWeight(1);
  line(a.x, a.y, b.x, b.y);
}

void axis(){
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
