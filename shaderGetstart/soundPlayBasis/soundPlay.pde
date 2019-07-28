import processing.sound.*;
SoundFile s;

void setup(){
  s = new SoundFile(this, "after-death-world.mp3");
  s.amp(0.01);
  s.play();
}
void draw(){
  
}
