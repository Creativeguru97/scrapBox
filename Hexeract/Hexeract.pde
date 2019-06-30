import peasy.*;
PeasyCam cam;

float angle = 0;

P6Vector[] points = new P6Vector[64];
PVector[] line = new PVector[64];

int edgeCount = 0;

void setup(){
  size(960, 540, P3D);
  cam = new PeasyCam(this, 500);
  points[0] = new P6Vector(-50, -50, -50, 50, 50, 50);
  points[1] = new P6Vector(50, -50, -50, 50, 50, 50);
  points[2] = new P6Vector(50, 50, -50, 50, 50, 50);
  points[3] = new P6Vector(-50, 50, -50, 50, 50, 50);
  points[4] = new P6Vector(-50, -50, 50, 50, 50, 50);
  points[5] = new P6Vector(50, -50, 50, 50, 50, 50);
  points[6] = new P6Vector(50, 50, 50, 50, 50, 50);
  points[7] = new P6Vector(-50, 50, 50, 50, 50, 50);

  points[8] = new P6Vector(-50, -50, -50, -50, 50, 50);
  points[9] = new P6Vector(50, -50, -50, -50, 50, 50);
  points[10] = new P6Vector(50, 50, -50, -50, 50, 50);
  points[11] = new P6Vector(-50, 50, -50, -50, 50, 50);
  points[12] = new P6Vector(-50, -50, 50, -50, 50, 50);
  points[13] = new P6Vector(50, -50, 50, -50, 50, 50);
  points[14] = new P6Vector(50, 50, 50, -50, 50, 50);
  points[15] = new P6Vector(-50, 50, 50, -50, 50, 50);

  points[16] = new P6Vector(-50, -50, -50, 50, -50, 50);
  points[17] = new P6Vector(50, -50, -50, 50, -50, 50);
  points[18] = new P6Vector(50, 50, -50, 50, -50, 50);
  points[19] = new P6Vector(-50, 50, -50, 50, -50, 50);
  points[20] = new P6Vector(-50, -50, 50, 50, -50, 50);
  points[21] = new P6Vector(50, -50, 50, 50, -50, 50);
  points[22] = new P6Vector(50, 50, 50, 50, -50, 50);
  points[23] = new P6Vector(-50, 50, 50, 50, -50, 50);
  
  points[24] = new P6Vector(-50, -50, -50, -50, -50, 50);
  points[25] = new P6Vector(50, -50, -50, -50, -50, 50);
  points[26] = new P6Vector(50, 50, -50, -50, -50, 50);
  points[27] = new P6Vector(-50, 50, -50, -50, -50, 50);
  points[28] = new P6Vector(-50, -50, 50, -50, -50, 50);
  points[29] = new P6Vector(50, -50, 50, -50, -50, 50);
  points[30] = new P6Vector(50, 50, 50, -50, -50, 50);
  points[31] = new P6Vector(-50, 50, 50, -50, -50, 50);
  
  
  
  points[32] = new P6Vector(-50, -50, -50, 50, 50, -50);
  points[33] = new P6Vector(50, -50, -50, 50, 50, -50);
  points[34] = new P6Vector(50, 50, -50, 50, 50, -50);
  points[35] = new P6Vector(-50, 50, -50, 50, 50, -50);
  points[36] = new P6Vector(-50, -50, 50, 50, 50, -50);
  points[37] = new P6Vector(50, -50, 50, 50, 50, -50);
  points[38] = new P6Vector(50, 50, 50, 50, 50, -50);
  points[39] = new P6Vector(-50, 50, 50, 50, 50, -50);

  points[40] = new P6Vector(-50, -50, -50, -50, 50, -50);
  points[41] = new P6Vector(50, -50, -50, -50, 50, -50);
  points[42] = new P6Vector(50, 50, -50, -50, 50, -50);
  points[43] = new P6Vector(-50, 50, -50, -50, 50, -50);
  points[44] = new P6Vector(-50, -50, 50, -50, 50, -50);
  points[45] = new P6Vector(50, -50, 50, -50, 50, -50);
  points[46] = new P6Vector(50, 50, 50, -50, 50, -50);
  points[47] = new P6Vector(-50, 50, 50, -50, 50, -50);
  
  points[48] = new P6Vector(-50, -50, -50, 50, -50, -50);
  points[49] = new P6Vector(50, -50, -50, 50, -50, -50);
  points[50] = new P6Vector(50, 50, -50, 50, -50, -50);
  points[51] = new P6Vector(-50, 50, -50, 50, -50, -50);
  points[52] = new P6Vector(-50, -50, 50, 50, -50, -50);
  points[53] = new P6Vector(50, -50, 50, 50, -50, -50);
  points[54] = new P6Vector(50, 50, 50, 50, -50, -50);
  points[55] = new P6Vector(-50, 50, 50, 50, -50, -50);
  
  points[56] = new P6Vector(-50, -50, -50, -50, -50, -50);
  points[57] = new P6Vector(50, -50, -50, -50, -50, -50);
  points[58] = new P6Vector(50, 50, -50, -50, -50, -50);
  points[59] = new P6Vector(-50, 50, -50, -50, -50, -50);
  points[60] = new P6Vector(-50, -50, 50, -50, -50, -50);
  points[61] = new P6Vector(50, -50, 50, -50, -50, -50);
  points[62] = new P6Vector(50, 50, 50, -50, -50, -50);
  points[63] = new P6Vector(-50, 50, 50, -50, -50, -50);
}

void draw(){
  background(0);
  //translate(width/2, height/2);
  
  rotateX(-PI/6);//To make axis more seetable
  //rotateY(-angle/4);
  //displayAxis();
  
  colorMode(HSB);
  strokeWeight(8);
  
  for(int i = 0; i < points.length; i++){
    P6Vector v = points[i];
    

    P6Vector rotated = matmul6D_R(rotation(0), v, true);
    rotated = matmul6D_R(rotation(1), v, true);
    
    //6D to 5D
    float distance6D = 600;
    //println(v.u);
    float t = 100 / (distance6D - rotated.t);
    
    float [][] projection6D = {
      {t, 0, 0, 0, 0, 0}, 
      {0, t, 0, 0, 0, 0},
      {0, 0, t, 0, 0, 0},
      {0, 0, 0, t, 0, 0},
      {0, 0, 0, 0, t, 0}
    };
    
    P5Vector projected5D = matmul6D_P(projection6D, rotated, true);
    
    //5D to 4D
    float distance1 = 350;
    //println(v.u);
    float u = 100 / (distance1 - v.u);
    
    float [][] projection5D = {
      {u, 0, 0, 0, 0}, 
      {0, u, 0, 0, 0},
      {0, 0, u, 0, 0},
      {0, 0, 0, u, 0}
    };
    
    P4Vector projected4D = matmul5D_P(projection5D, projected5D, true);

    //4D to 3D
    float distance2 = 250;
    float w = 100 / (distance2 - rotated.w);
    
    float [][] projection4D = {
      {w, 0, 0, 0}, 
      {0, w, 0, 0},
      {0, 0, w, 0}
    };
    
    PVector projected3D = matmul3(projection4D, projected4D);
    projected3D.mult(96);//For zoom or shrink it
    
    stroke(255);
    point(projected3D.x, projected3D.y, projected3D.z);
    line[i] = projected3D;
    //fill(100,255,255);
    //text(i, projected3D.x, projected3D.y, projected3D.z);
  }
  
  draw3DLine();
  
  float rotAngle = map(mouseY, 0, height, 0.02, -0.02);
  angle += rotAngle;
  //println(edgeCount);
}


//----- Functions -----

void connect(int i, int j, PVector[] points){
  PVector a = points[i];
  PVector b = points[j];
  //stroke(255);
  noFill(); 
  strokeWeight(1);
  line(a.x, a.y, a.z, b.x, b.y, b.z);
  edgeCount++;
}
void connect(int offset, int i, int j, PVector[] points){
  PVector a = points[i+offset];
  PVector b = points[j+offset];
  //stroke(255);
  noFill(); 
  strokeWeight(1);
  line(a.x, a.y, a.z, b.x, b.y, b.z);
}

void displayAxis(){
  strokeWeight(2);
  stroke(255, 0, 0);
  line(0, 0, 0, width/4, 0, 0);
  stroke(0, 255, 0);
  line(0, 0, 0, 0, width/4, 0);
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, width/4);
  stroke(255);
}

float[][] rotation(int cube){
  //http://kennycason.com/posts/2009-01-08-graph4d-rotation4d-project-to-2d.html
  if(cube == 0){
    
    float[][] rotation0 = {
      {cos(angle), 0, 0, 0, -sin(angle), 0},
      {0, 1, 0, 0, 0, 0},
      {0, 0, 1, 0, 0, 0},
      {0, 0, 0, 1, 0, 0},
      {sin(angle), 0, 0, 0, cos(angle), 0},
      {0, 0, 0, 0, 0, 1}
    };
    return rotation0;
    
  }else if(cube == 1){
    
    float[][] rotation1 = {
      {1, 0, 0, 0, 0, 0},
      {0, cos(angle), 0, 0, 0, sin(angle)},
      {0, 0, 1, 0, 0, 0},
      {0, 0, 0, 1, 0, 0},
      {0, 0, 0, 0, 1, 0},
      {0, -sin(angle), 0, 0, 0, cos(angle)}
    };
    return rotation1;
    
  }else if(cube == 2){
    
    float[][] rotation2 = {
      {cos(angle), 0, 0, -sin(angle), 0, 0},
      {0, 1, 0, 0, 0, 0},
      {0, 0, 1, 0, 0, 0},
      {sin(angle), 0, 0, cos(angle), 0, 0},
      {0, 0, 0, 0, 1, 0},
      {0, 0, 0, 0, 0, 1}
    };
    return rotation2;
    
  }else if(cube == 3){
    
    float[][] rotation3 = {
      {1, 0, 0, 0, 0, 0},
      {0, 1, 0, 0, 0, 0},
      {0, 0, cos(angle), 0, 0, -sin(angle)},
      {0, 0, 0, 1, 0, 0},
      {0, 0, 0, 0, 1, 0},
      {0, 0, sin(angle), 0, 0, cos(angle)},
    };
    return rotation3;
    
  }else if(cube == 4){
    
    float[][] rotation4 = {
      {cos(angle), 0, 0, -sin(angle), 0},
      {0, 1, 0, 0, 0},
      {0, 0, 1, 0, 0},
      {sin(angle), 0, 0, cos(angle), 0},
      {0, 0, 0, 0, 1},
    };
    return rotation4;
    
  }else if(cube == 5){
    
    float[][] rotation5 = {
      {1, 0, 0, 0, 0},
      {0, cos(angle), 0, 0, sin(angle)},
      {0, 0, 1, 0, 0},
      {0, 0, 0, 1, 0},
      {0, -sin(angle), 0, 0, cos(angle)}
    };
    return rotation5;
    
  }else{
    return null;
  }
}


void draw3DLine(){//There must be much more sophisticated way
  color tesseract0 = color(45, 127, 255);
  color tesseract1 = color(100, 127, 255);
  color tesseract2 = color(160, 127, 255);
  color tesseract3 = color(255, 127, 255);
  
  //First Penteract
  for(int i = 0; i < 4; i++){
    stroke(tesseract0);
    connect(0, i, (i+1)%4, line);
    connect(0, i+4, ((i+1)%4)+4, line);
    connect(0, i, i+4, line);
  }
  for(int i = 0; i < 4; i++){
    stroke(tesseract0);
    connect(8, i, (i+1)%4, line);
    connect(8, i+4, ((i+1)%4)+4, line);
    connect(8, i, i+4, line);
  }
  for(int i = 0; i < 8; i++){
    stroke(tesseract0);
    connect(0, i, i + 8, line);
  }
  
  for(int i = 0; i < 16; i++){
    stroke(255);
    connect(0, i, i + 16, line);
  }
  
  for(int i = 0; i < 4; i++){
    stroke(tesseract1);
    connect(16, i, (i+1)%4, line);
    connect(16, i+4, ((i+1)%4)+4, line);
    connect(16, i, i+4, line);
  }
  for(int i = 0; i < 4; i++){
    stroke(tesseract1);
    connect(24, i, (i+1)%4, line);
    connect(24, i+4, ((i+1)%4)+4, line);
    connect(24, i, i+4, line);
  }
  for(int i = 0; i < 8; i++){
    stroke(tesseract1);
    connect(16, i, i + 8, line);
  }
  
  //Bind the two penteract
  for(int i = 0; i < 32; i++){
    stroke(255);
    connect(0, i, i + 32, line);
  }
  
  
  //Second Penteract
  for(int i = 0; i < 4; i++){
    stroke(tesseract2);
    connect(32, i, (i+1)%4, line);
    connect(32, i+4, ((i+1)%4)+4, line);
    connect(32, i, i+4, line);
  }
  for(int i = 0; i < 4; i++){
    stroke(tesseract2);
    connect(8+32, i, (i+1)%4, line);
    connect(8+32, i+4, ((i+1)%4)+4, line);
    connect(8+32, i, i+4, line);
  }
  for(int i = 0; i < 8; i++){
    stroke(tesseract2);
    connect(32, i, i + 8, line);
  }
  
  for(int i = 0; i < 16; i++){
    stroke(255);
    connect(32, i, i + 16, line);
  }
  
  for(int i = 0; i < 4; i++){
    stroke(tesseract3);
    connect(16+32, i, (i+1)%4, line);
    connect(16+32, i+4, ((i+1)%4)+4, line);
    connect(16+32, i, i+4, line);
  }
  for(int i = 0; i < 4; i++){
    stroke(tesseract3);
    connect(24+32, i, (i+1)%4, line);
    connect(24+32, i+4, ((i+1)%4)+4, line);
    connect(24+32, i, i+4, line);
  }
  for(int i = 0; i < 8; i++){
    stroke(tesseract3);
    connect(16+32, i, i + 8, line);
  }
}
