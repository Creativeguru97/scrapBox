

Fluid fluid;

void settings(){//It runs before setup()
  size(N*scale, N*scale);
}

void setup(){
  fluid = new Fluid(0.1, 0, 0);
}

void draw(){
  background(0);
  fluid.step();
  fluid.renderD();
  fluid.fadeAway();
}

void mouseDragged(){
  fluid.addDye(mouseX/scale, mouseY/scale ,500);
  float amountX = (mouseX - pmouseX)/6;
  float amountY = (mouseY - pmouseY)/6;
  fluid.addVelocity(mouseX/scale, mouseY/scale, amountX, amountY);
}
