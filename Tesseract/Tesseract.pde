float angle = 0;

P4Vector[] points = new P4Vector[16];
PVector[] line = new PVector[16];

void setup(){
  size(600, 400, P3D);
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
  rotateX(-PI/2);
  //displayAxis();
  strokeWeight(8);
  
  for(int i = 0; i < points.length; i++){
    P4Vector v = points[i];
    
    P4Vector rotated = matmul(rotation("XY"), v, true);
    rotated = matmul(rotation("ZW"), rotated, true);

    //4D to 3D
    float distance = 150;
    float w = 100 / (distance - rotated.w);
    
    float [][] projection = {
      {w, 0, 0, 0}, 
      {0, w, 0, 0},
      {0, 0, w, 0}
    };
    
    PVector projected3D = matmul(projection, rotated);
    projected3D.mult(2);//For zoom or shrink it
    stroke(255);
    point(projected3D.x, projected3D.y, projected3D.z);
    line[i] = projected3D;
    //fill(0,255,0);
    //text(i, projected3D.x, projected3D.y, projected3D.z);
  }
  
  draw3DLine();
  
  angle += 0.01;
}


//----- Functions -----

void connect(int i, int j, PVector[] points){
  PVector a = points[i];
  PVector b = points[j];
  stroke(255);
  noFill(); 
  strokeWeight(1);
  line(a.x, a.y, a.z, b.x, b.y, b.z);
}
void connect(int offset, int i, int j, PVector[] points){
  PVector a = points[i+offset];
  PVector b = points[j+offset];
  stroke(255);
  noFill(); 
  strokeWeight(1);
  line(a.x, a.y, a.z, b.x, b.y, b.z);
}

void displayAxis(){
  stroke(255, 0, 0);
  line(0, 0, 0, width/4, 0, 0);
  stroke(0, 255, 0);
  line(0, 0, 0, 0, width/4, 0);
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, width/4);
  stroke(255);
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

void draw3DLine(){
  
  for(int i = 0; i < 4; i++){
    connect(0, i, (i+1)%4, line);
    connect(0, i+4, ((i+1)%4)+4, line);
    connect(0, i, i+4, line);
  }
  for(int i = 0; i < 4; i++){
    connect(8, i, (i+1)%4, line);
    connect(8, i+4, ((i+1)%4)+4, line);
    connect(8, i, i+4, line);
  }
  for(int i = 0; i < 8; i++){
    connect(0, i, i + 8, line);
  }
  
  //alternative
  //for(int i = 0; i < points.length; i++){
  //  if(i == 3){
  //    connect(3, 0, line);
  //  }else if(i == 7){
  //    connect(7, 4, line);
  //  }else if(i == 11){
  //    connect(11, 8, line);
  //  }else if(i == 15){
  //    connect(15, 12, line);
  //  }else{
  //    connect(i, i+1, line);
  //  }

  //  if(i < 4){
  //     connect(i, i + 4, line);
  //  }else if(i >= 8 && i < 12){
  //     connect(i, i + 4, line);
  //  }
    
  //  if(i < 8){
  //    connect(i, i + 8, line);
  //  }
  //}
}
