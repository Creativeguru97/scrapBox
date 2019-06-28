float angle = 0;

PVector[] points = new PVector[8];


void setup(){
  size(600, 400);
  points[0] = new PVector(-50, -50, -50);
  points[1] = new PVector(50, -50, -50);
  points[2] = new PVector(50, 50, -50);
  points[3] = new PVector(-50, 50, -50);
  points[4] = new PVector(-50, -50, 50);
  points[5] = new PVector(50, -50, 50);
  points[6] = new PVector(50, 50, 50);
  points[7] = new PVector(-50, 50, 50);
}

void draw(){
  background(0);
  translate(width/2, height/2);
  stroke(255);
  strokeWeight(8);
  noFill();
  
  //https://en.wikipedia.org/wiki/Rotation_matrix
  //Because rotateX, rotateY, rotateY only work for P3D.
  float[][] rotationX = {
    {1, 0, 0},
    {0, cos(angle), -sin(angle)},
    {0, sin(angle), cos(angle)}
  };
  
  float[][] rotationY = {
    {cos(angle), 0, sin(angle)},
    {0, 1, 0},
    {-sin(angle), 0,  cos(angle)}
  };
  
  float[][] rotationZ = {
    {cos(angle), -sin(angle),0},
    {sin(angle), cos(angle),0},
    {0, 0, 1}
  };
  
  PVector[] line = new PVector[8];
  
  int index = 0;
  for(PVector v: points){
    PVector rotated = MatrixOperation(rotationY, v);
    rotated = MatrixOperation(rotationX, rotated);
    rotated = MatrixOperation(rotationZ, rotated);
    
    float distance = 200;// It's about from camera. Lower value, stronger affected
    println(distance - rotated.z);
    float z = 100 / (distance - rotated.z);
    //println(z);
    float [][] projection = {
      {z, 0, 0}, 
      {0, z, 0}
    };

    PVector projected2D = MatrixOperation(projection, rotated);
    projected2D.mult(3);//For zoom or shrink it
    point(projected2D.x, projected2D.y);
    line[index] = projected2D;
    index++;
  }
  
  //Draw line
  for(int i = 0; i < 4; i++){
    connect(i, (i+1)%4, line);
    connect(i+4, ((i+1)%4)+4, line);
    connect(i, i+4, line);
  }
  //alternative
    //for(int i = 0; i < points.length; i++){
  //  if(i == 3){
  //    connect(3, 0, line);
  //  }else if(i == 7){
  //    connect(7, 4, line);
  //  }else{
  //    connect(i, i+1, line);
  //  }
    
  //  if(i < 4){
  //     connect(i, i + 4, line);
  //  }
  //}

  angle += 0.01;
}

void connect(int i, int j, PVector[] points){
  PVector a = points[i];
  PVector b = points[j];
  strokeWeight(2);
  line(a.x, a.y, b.x, b.y);
}
