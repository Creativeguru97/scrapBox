let walls = [];
let ray;
let particle;
function setup(){
  createCanvas(400, 400);

  for(let i = 0; i < 3; i++){
    let x1 = random(width);
    let y1 = random(height);
    let x2 = random(width);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(0, 0, 0, height));
  walls.push(new Boundary(0, height, width, height));

  ray = new Ray(100, 200);
  particle = new Particle();
}

function draw(){
  background(0);
  for(let wall of walls){
    wall.show();
  }
  // particle.show();
  particle.look(walls);
  particle.update(mouseX, mouseY);

  // let point = ray.cast(wall);
  // if(point){
  //   fill(255);
  //   ellipse(point.x, point.y, 8, 8);
  // }
}
