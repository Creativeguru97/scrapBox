class Sphere{
  constructor(){
    // this.position = createVector();
  }


  show(vol, rotateAngle){
    rotateY(rotateAngle);
    rotateX(-30);

    // beginShape();//In case we use vertex
    for(let j = 0; j < 18; j++){
      for(let i = 0; i < 360; i += 10){

        offset = offset + 0.02;
        let r = map(vol, 0, 1, widthX/5, width/3);
        // let x, y, z;
        let particle = new Particle();
        if(vol == 0){
          particle.position.x = r * cos(i);
          particle.position.y = r * sin(i);
          // z = r * cos(i);
        }else{
          particle.position.x = (r + noise(offset)*vol*120) * cos(i);
          particle.position.y = (r + noise(offset)*vol*120) * sin(i);
          // z = (r + noise(offset)*vol*90) * cos(i);
        }

        colorMode(HSB);
        let hue = map(i, 0, 360, 0, 64);
        stroke((hue+310)*noise(offset/3000), 255, 255);
        strokeWeight(1);
        line(
          particle.position.x/1.05+vol,
          particle.position.y/1.05+vol,
          particle.position.x,
          particle.position.y
        );

        //point version
        // point(this.position.x, this.position.y, 0);

      }
      rotateY(10);
    }
    // endShape();
  }
}