class Segment{
  PVector a;
  PVector b;
  float len;
  float parentAngle;
  float selfAngle;
  
  //float xOff = 0;//random(1000);
  //float yOff = random(1000);
  float t;
  
  Segment parent = null;
  Segment child = null;
  
  Segment(Segment parent_, float len_, float angle_, float t_){
    parent = parent_;
    //a = new PVector(parent.b.x, parent.b.y);
    a = parent.b.copy();
    len = len_;
    parentAngle = angle_;
    selfAngle = parentAngle;
    calculateB(); // Oh, we can put functions here just like in setup()!!!!!
    t= t_;
  }
  
  Segment(float x, float y, float len_, float angle_, float t_){
    a = new PVector(x, y);
    len = len_;
    parentAngle = angle_;
    calculateB(); // Oh, we can put functions here just like in setup()!!!!!
    parent = null;
    t = t_;
  }
  
  void angleRotate(){
    float maxAngle = 0.1;
    float minAngle = -0.1;
    selfAngle = map(sin(t), -1, 1, maxAngle, minAngle);
    t += 0.02;
    //selfAngle += 0.01;
  }
  
  void update(){
    parentAngle = selfAngle;
    if(parent != null){
       a = parent.b.copy();
       parentAngle += parent.parentAngle;
    }else{
      parentAngle += -PI/2;
    }
    calculateB();
  }
  
  void calculateB(){
    float dx = len * cos(parentAngle);
    float dy = len * sin(parentAngle);
    b = new PVector(a.x+dx, a.y+dy);
  }
  
  void show(){
    stroke(255);
    strokeWeight(4);
    line(a.x, a.y, b.x, b.y);
  }
  
  
}
