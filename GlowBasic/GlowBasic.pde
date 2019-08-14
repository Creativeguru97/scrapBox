PImage glow;
PImage stick;

void setup(){
  glow = loadImage("glow.png");
  stick = loadImage("stick.png");
  size(640, 360);
}

void draw(){
  //blendMode(ADD);
  background(0);
  //imageMode(CENTER);
  //tint(200, 0, 150);
  ////7.50
  //image(glow, mouseX, mouseY, 30, 225);
  //tint(255);
  ////19.9
  //image(stick, mouseX, mouseY, 8, 199);
  stroke(255);
  line(mouseX, mouseY, width/2, height);
}
