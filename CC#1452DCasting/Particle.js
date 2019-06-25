class Particle{
  constructor(){
    this.pos = createVector(random(sceneW), random(sceneH));//Gonna be light source origin
    this.rays = [];
    this.fov = 30;
    this.heading = 0;
    for(let i = -this.fov; i < this.fov; i++){
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  show(){
    noStroke();
    fill(255, 0, 0);
    ellipse(this.pos.x, this.pos.y, 16, 16);
    // for(let ray of this.rays){
    //   ray.show();
    // }
  }

  rotate(angle){
    this.heading += angle;
    let index = 0;
    for(let i = -this.fov; i < this.fov; i++){
      this.rays[index].setAngle(radians(i) + this.heading);
      index++;
    }
  }

  updateFov(val){
    this.fov = val;
    this.rays = [];
    this.heading = 0;
    for(let i = -this.fov; i < this.fov; i++){
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  move(speed){
    // print("moving");
    // print(speed);
    const vel = p5.Vector.fromAngle(this.heading);
    vel.setMag(speed);
    // console.log(vel);
    this.pos.add(vel);
  }

  update(x, y){
    this.pos.set(x, y);
  }


  look(walls){
    const scene = [];
    for(let i = 0; i < this.rays.length; i++){
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;//Set infinity value
      for(let wall of walls){
        const point = ray.cast(wall);//Look every vector of intersect point

        if(point){
          let d = p5.Vector.dist(this.pos, point);
          const a = ray.dir.heading() - this.heading;
            d *= cos(a);//To make it looks less fisheyey
          if(d < record){//Compare the dist to previous checked
            record = d;
            closest = point;
          }
        }
      }
      if(closest){
        stroke(0, 255, 0, 127);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      scene[i] = record;
    }
    return scene;
  }
}
