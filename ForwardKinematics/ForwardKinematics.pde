//Segment[] segment = new Segment[2];
Segment tenticle;

void setup(){
  size(600, 400);
  //segment[0] = new Segment(width/2, height/2, 100, radians(45));
  //segment[1] = new Segment(segment[0], 100, radians(0));
  
  float t = 0;
  tenticle = new Segment(width/2, height, 10, 0, t);
  Segment current = tenticle;
  
  for(int i = 0; i < 30; i++){
    t += 0.1;
    Segment next = new Segment(current, 10, 0, t);
    current.child = next;
    current = next;
  }
}

void draw(){
  background(0);
  
  Segment next = tenticle;
  while(next != null){
    next.show();
    next.update();
    next.angleRotate();
    next = next.child;
  }
}
