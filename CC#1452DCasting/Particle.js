class Particle{
  constructor(){
    this.pos = createVector(width/2, height/2);//Gonna be light source origin
    this.rays = [];
    for(let i = 0; i < 360; i += 1){
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  show(){
    fill(255);
    // ellipse(this.pos.x, this.pos.y, 16, 16);
    for(let ray of this.rays){
      ray.show();
    }
  }

  update(){
    this.pos.set(mouseX, mouseY);
  }

  look(walls){
    for(let ray of this.rays){
      let closest = null;
      let record = Infinity;//Set infinity value
      for(let wall of walls){
        const point = ray.cast(wall);//Look every vector of intersect point

        if(point){
          const d = p5.Vector.dist(this.pos, point);

          if(d < record){//Compare the dist to previous checked
            record = d;
            closest = point;
          }
        }else{
          // line(this.pos.x, this.pos.y, closest.x, closest.y);
        }
      }
      if(closest){
        stroke(255, 127)
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }

    }
  }
}
