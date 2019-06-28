float angle = 0;

P4Vector[] points = new P4Vector[16];


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

  
  PVector[] line = new PVector[16];
 
  //for(P4Vector v: points){
  for(int i = 0; i < points.length; i++){
    P4Vector v = points[i];
    
    stroke(255);
    strokeWeight(8);
    noFill();
    
    //http://kennycason.com/posts/2009-01-08-graph4d-rotation4d-project-to-2d.html
    float[][] rotationXY = {
      {cos(angle), -sin(angle), 0, 0},
      {sin(angle), cos(angle), 0, 0},
      {0, 0, 1, 0},
      {0, 0, 0, 1}
    };
    
    float[][] rotationYZ = {
      {1, 0, 0, 0},
      {0, cos(angle), -sin(angle), 0},
      {0, sin(angle), cos(angle), 0},
      {0, 0, 0, 1}
    };
    
    float[][] rotationXZ = {
      {cos(angle), 0, -sin(angle), 0},
      {0, 1, 0, 0},
      {sin(angle), 0, cos(angle), 0},
      {0, 0, 0, 1}
    };
    
    float[][] rotationXW = {
      {cos(angle), 0, 0, -sin(angle)},
      {0, 1, 0, 0},
      {0, 0, 1, 0},
      {sin(angle), 0, 0, cos(angle)}
    };
    
    float[][] rotationYW = {
      {1, 0, 0, 0},
      {0, cos(angle), 0, -sin(angle)},
      {0, 0, 1, 0},
      {sin(angle), 0, cos(angle), 0},
    };
    
    float[][] rotationZW = {
      {1, 0, 0, 0},
      {0, 1, 0, 0},
      {0, 0, cos(angle), -sin(angle)},
      {0, 0, sin(angle), cos(angle)},
    };
    
    P4Vector rotated = matmul(rotationXY, v, true);
    rotated = matmul(rotationZW, rotated, true);

    float distance = 150;
    float w = 100 / (distance - rotated.w);
    
    float [][] projection = {
      {w, 0, 0, 0}, 
      {0, w, 0, 0},
      {0, 0, w, 0}
    };
    
    PVector projected3D = matmul(projection, rotated);
    //projected3D.mult(50);//For zoom or shrink it
    line[i] = projected3D;
    
    point(projected3D.x, projected3D.y, projected3D.z);
    fill(255,0,0);
    
    //text(i, projected3D.x, projected3D.y, projected3D.z);
    //fill(255);  
  }
  
  //Draw line
  for(int i = 0; i < points.length; i++){
    if(i == 3){
      connect(3, 0, line);
    }else if(i == 7){
      connect(7, 4, line);
    }else if(i == 11){
      connect(11, 8, line);
    }else if(i == 15){
      connect(15, 12, line);
    }else{
      connect(i, i+1, line);
    }

    if(i < 4){
       connect(i, i + 4, line);
    }else if(i >= 8 && i < 12){
       connect(i, i + 4, line);
    }
    
    if(i < 8){
      connect(i, i + 8, line);
    }
  }
  
  angle += 0.01;
}

void connect(int i, int j, PVector[] points){
  PVector a = points[i];
  PVector b = points[j];
  strokeWeight(2);
  line(a.x, a.y, a.z, b.x, b.y, b.z);
}
