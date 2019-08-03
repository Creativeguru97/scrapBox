class Star{
  constructor(diameter, hue, saturation){
    this.diameter = diameter;
    this.hue = hue;
    this.saturation = saturation;
    this.position = createVector();
  }
  show(){
    strokeWeight(this.diameter);
    stroke(this.hue, this.saturation, 255);
    point(
      this.position.x,
      this.position.y,
      this.position.z
    );
  }
}


class Stars{

  constructor(){
    this.starParticles = [];

    for(let i = 0; i < 600; i++){
      let star = new Star(random(1, 5), random(0, 300), random(0, 20));
      //Spherical coordinate to Catesian coordinate
      let radius1 = random(0, PI);
      let radius2 = random(0, PI);
      // let r = 25000;
      star.position.x = 25000 * sin(radius1)*cos(radius2);
      star.position.y = 25000 * sin(radius1)*sin(radius2);
      star.position.z = 25000 * cos(radius1);

      this.starParticles.push(star);
    }

    // print(this.starParticles.length);
  }

  show(){
    for(let i = 0; i < this.starParticles.length; i++){
      this.starParticles[i].show();
    }
  }


}
