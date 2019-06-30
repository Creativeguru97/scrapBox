import peasy.*;
PeasyCam cam;

float angle = 0;

P5Vector[] points = new P5Vector[32];
PVector[] line = new PVector[32];

int edgeCount = 0;

void setup(){
  size(960, 540, P3D);
  cam = new PeasyCam(this, 500);
  points[0] = new P5Vector(-50, -50, -50, 50, 50);
  points[1] = new P5Vector(50, -50, -50, 50, 50);
  points[2] = new P5Vector(50, 50, -50, 50, 50);
  points[3] = new P5Vector(-50, 50, -50, 50, 50);
  points[4] = new P5Vector(-50, -50, 50, 50, 50);
  points[5] = new P5Vector(50, -50, 50, 50, 50);
  points[6] = new P5Vector(50, 50, 50, 50, 50);
  points[7] = new P5Vector(-50, 50, 50, 50, 50);

  points[8] = new P5Vector(-50, -50, -50, -50, 50);
  points[9] = new P5Vector(50, -50, -50, -50, 50);
  points[10] = new P5Vector(50, 50, -50, -50, 50);
  points[11] = new P5Vector(-50, 50, -50, -50, 50);
  points[12] = new P5Vector(-50, -50, 50, -50, 50);
  points[13] = new P5Vector(50, -50, 50, -50, 50);
  points[14] = new P5Vector(50, 50, 50, -50, 50);
  points[15] = new P5Vector(-50, 50, 50, -50, 50);
  
  points[16] = new P5Vector(-50, -50, -50, 50, -50);
  points[17] = new P5Vector(50, -50, -50, 50, -50);
  points[18] = new P5Vector(50, 50, -50, 50, -50);
  points[19] = new P5Vector(-50, 50, -50, 50, -50);
  points[20] = new P5Vector(-50, -50, 50, 50, -50);
  points[21] = new P5Vector(50, -50, 50, 50, -50);
  points[22] = new P5Vector(50, 50, 50, 50, -50);
  points[23] = new P5Vector(-50, 50, 50, 50, -50);
  
  points[24] = new P5Vector(-50, -50, -50, -50, -50);
  points[25] = new P5Vector(50, -50, -50, -50, -50);
  points[26] = new P5Vector(50, 50, -50, -50, -50);
  points[27] = new P5Vector(-50, 50, -50, -50, -50);
  points[28] = new P5Vector(-50, -50, 50, -50, -50);
  points[29] = new P5Vector(50, -50, 50, -50, -50);
  points[30] = new P5Vector(50, 50, 50, -50, -50);
  points[31] = new P5Vector(-50, 50, 50, -50, -50);
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
    P5Vector v = points[i];
    
    //P5Vector rotated = matmul5(rotation(2), v, true);
    P5Vector rotated = matmul5D_R(rotation(3), v, true);
    rotated = matmul5D_R(rotation(8), v, true);
    
    //5D to 4D
    float distance1 = 300;
    //println(v.u);
    float u = 100 / (distance1 - rotated.u);
    
    float [][] projection1 = {
      {u, 0, 0, 0, 0}, 
      {0, u, 0, 0, 0},
      {0, 0, u, 0, 0},
      {0, 0, 0, u, 0}
    };
    
    P4Vector projected4D = matmul5D_P(projection1, rotated, true);
    //rotated = matmul(rotation("ZW"), rotated, true);

    //4D to 3D
    float distance2 = 200;
    float w = 100 / (distance2 - rotated.w);
    
    float [][] projection2 = {
      {w, 0, 0, 0}, 
      {0, w, 0, 0},
      {0, 0, w, 0}
    };
    
    PVector projected3D = matmul4D_P(projection2, projected4D);
    projected3D.mult(10);//For zoom or shrink it
    
    stroke(255);
    point(projected3D.x, projected3D.y, projected3D.z);
    line[i] = projected3D;
    //fill(0,255,0);
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
      {cos(angle), -sin(angle), 0, 0, 0},
      {sin(angle), cos(angle), 0, 0, 0},
      {0, 0, 1, 0, 0},
      {0, 0, 0, 1, 0},
      {0, 0, 0, 0, 1}
    };
    return rotation0;
    
  }else if(cube == 1){
    
    float[][] rotation1 = {
      {1, 0, 0, 0, 0},
      {0, cos(angle), -sin(angle), 0, 0},
      {0, sin(angle), cos(angle), 0, 0},
      {0, 0, 0, 1, 0},
      {0, 0, 0, 0, 1}
    };
    return rotation1;
    
  }else if(cube == 2){
    
    float[][] rotation2 = {
      {cos(angle), 0, -sin(angle), 0, 0},
      {0, 1, 0, 0, 0},
      {sin(angle), 0, cos(angle), 0, 0},
      {0, 0, 0, 1, 0},
      {0, 0, 0, 0, 1}
    };
    return rotation2;
    
  }else if(cube == 3){
    
    float[][] rotation3 = {
      {cos(angle), 0, 0, -sin(angle), 0},
      {0, 1, 0, 0, 0},
      {0, 0, 1, 0, 0},
      {sin(angle), 0, 0, cos(angle), 0},
      {0, 0, 0, 0, 1},
    };
    return rotation3;
    
  }else if(cube == 4){
    
    float[][] rotation4 = {
      {cos(angle), 0, 0, -sin(angle), 0},
      {0, 1, 0, 0, 0},
      {0, 0, 1, 0, 0},
      {0, 0, 0, 1, 0},
      {sin(angle), 0, 0, cos(angle), 0}
    };
    return rotation4;
    
  }else if(cube == 5){
    
    float[][] rotation5 = {
      {1, 0, 0, 0, 0},
      {0, 1, 0, 0, 0},
      {0, 0, sin(angle), 0, cos(angle)},
      {0, 0, 0, 1, 0},
      {0, 0, -sin(angle), 0, cos(angle)}
    };
    return rotation5;
    
  }else if(cube == 6){
    
    float[][] rotation6 = {
      {1, 0, 0, 0, 0},
      {0, 1, 0, 0, 0},
      {0, 0, cos(angle), sin(angle), 0},
      {0, 0, -sin(angle), cos(angle), 0},
      {0, 0, 0, 0, 1}
    };
    
    return rotation6;
    
  }else if(cube == 7){
    
    float[][] rotation7 = {
      {1, 0, 0, 0, 0},
      {0, 1, 0, 0, 0},
      {0, 0, 1, 0, 0},
      {0, 0, 0, cos(angle), sin(angle)},
      {0, 0, 0, -sin(angle), cos(angle)}
    };
    return rotation7;
    
  }else if(cube == 8){
    
    float[][] rotation8 = {
      {1, 0, 0, 0, 0},
      {0, cos(angle), 0, 0, sin(angle)},
      {0, 0, 1, 0, 0},
      {0, 0, 0, 1, 0},
      {0, -sin(angle), 0, 0, cos(angle)}
    };
    return rotation8;
    
  }else if(cube == 9){
    
    float[][] rotation9 = {
      {0, cos(angle), 0, 0, sin(angle)},
      {0, 1, 0, 0, 0},
      {0, 0, 1, 0, 0},
      {0, 0, 0, 1, 0},
      {0, -sin(angle), 0, 0, cos(angle)}
    };
    return rotation9;

  }else{
    return null;
  }
}


void draw3DLine(){//There must be much more sophisticated way

  for(int i = 0; i < 4; i++){
    stroke(150, 127, 255);
    connect(0, i, (i+1)%4, line);
    connect(0, i+4, ((i+1)%4)+4, line);
    connect(0, i, i+4, line);
  }
  for(int i = 0; i < 4; i++){
    stroke(150, 127, 255);
    connect(8, i, (i+1)%4, line);
    connect(8, i+4, ((i+1)%4)+4, line);
    connect(8, i, i+4, line);
  }
  for(int i = 0; i < 8; i++){
    stroke(150, 127, 255);
    connect(0, i, i + 8, line);
  }
  
  for(int i = 0; i < 16; i++){
    stroke(255);
    connect(0, i, i + 16, line);
  }
  
  for(int i = 0; i < 4; i++){
    stroke(210, 127, 255);
    connect(16, i, (i+1)%4, line);
    connect(16, i+4, ((i+1)%4)+4, line);
    connect(16, i, i+4, line);
  }
  for(int i = 0; i < 4; i++){
    stroke(210, 127, 255);
    connect(24, i, (i+1)%4, line);
    connect(24, i+4, ((i+1)%4)+4, line);
    connect(24, i, i+4, line);
  }
  for(int i = 0; i < 8; i++){
    stroke(210, 127, 255);
    connect(16, i, i + 8, line);
  }
    
  //for(int i = 0; i < points.length; i++){
    
  //  if(i < 16){
  //    stroke(150, 127, 255);
  //    if(i == 3){
  //      connect(3, 0, line);
  //    }else if(i == 7){
  //      connect(7, 4, line);
  //    }else if(i == 11){
  //      connect(11, 8, line);
  //    }else if(i == 15){
  //      connect(15, 12, line);
  //    }else{
  //      connect(i, i+1, line);
  //    }
  
  //    if(i < 4){
  //       connect(i, i + 4, line);
  //    }else if(i >= 8 && i < 12){
  //       connect(i, i + 4, line);
  //    }
      
  //    if(i < 8){
  //      connect(i, i + 8, line);
  //    }
  //  }
    
  //  if(i < 16){
  //    stroke(255);
  //    connect(i, i + 16, line);
  //  }
    
  //  if(i >= 16 && i < points.length){
  //    stroke(210, 127, 255);
  //    if(i == 3 + 16){
  //      connect(3 + 16, 0 + 16, line);
  //    }else if(i == 7 + 16){
  //      connect(7 + 16, 4 + 16, line);
  //    }else if(i == 11 + 16){
  //      connect(11 + 16, 8 + 16, line);
  //    }else if(i == 15 + 16){
  //      connect(15 + 16, 12 + 16, line);
  //    }else{
  //      connect(i, i+1, line);
  //    }
  
  //    if(i >= 16 && i < 4 + 16){
  //       connect(i, i + 4, line);
  //    }else if(i >= 8 + 16 && i < 12 + 16){
  //       connect(i, i + 4, line);
  //    }
      
  //    if(i >= 16 && i < 8 + 16){
  //      connect(i, i + 8, line);
  //    }
  //  } 
  //}
}
