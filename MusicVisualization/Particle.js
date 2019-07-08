class Particle{

  constructor(explode){
    this.position = createVector();
    this.velocity = p5.Vector.random3D();
    this.explode = explode;
  }
}
