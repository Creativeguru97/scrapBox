class Sphere{
  constructor(explode){
    this.particles = [];
  }


  show(vol){
    // beginShape();//In case we use vertex
    for(let j = 0; j < 18; j++){
      for(let i = 0; i < 360; i += 10){

        offset = offset + 0.02;
        let r = map(vol, 0, 1, widthX/5, width/3);
        // let x, y, z;
        let particle = new Particle(false);
        if(vol == 0){
          particle.position.x = r * cos(i);
          particle.position.y = r * sin(i);
          // z = r * cos(i);
        }else{
          particle.position.x = (r + noise(offset)*vol*120) * cos(i);
          particle.position.y = (r + noise(offset)*vol*120) * sin(i);
          // z = (r + noise(offset)*vol*90) * cos(i);
        }

        this.particles.push(particle);

        colorMode(HSB);
        let hue = map(i, 0, 360, 0, 64);
        stroke((hue+330)*noise(offset/3000), 255, 255);
        strokeWeight(1 - vol*1.1);

        //Each point
        line(
          particle.position.x/1.03+vol,
          particle.position.y/1.03+vol,
          particle.position.x,
          particle.position.y
        );

        //point version
        // point(particle.position.x, particle.position.y, 0);



      }
      rotateY(10);
    }
    // endShape();
  }


  rotation(vol, rotateAngle){
    rotateY(rotateAngle);
    rotateX(-30);
  }


  // networkOfPoint(vol){
  //   for(let i = 0; i < this.particles.length; i++){
  //     let xS, yS, zS, xE, yE, zE;
  //     if((i+1)%36 == 0){
  //       xS = this.particles[i].position.x;
  //       yS = this.particles[i].position.y;
  //       zS = this.particles[i].position.z;
  //       xE = this.particles[(i+1)-36].position.x;
  //       yE = this.particles[(i+1)-36].position.y;
  //       zE = this.particles[(i+1)-36].position.z;
  //     }else{
  //       xS = this.particles[i].position.x;
  //       yS = this.particles[i].position.y;
  //       zS = this.particles[i].position.z;
  //       xE = this.particles[i+1].position.x;
  //       yE = this.particles[i+1].position.y;
  //       zE = this.particles[i+1].position.z;
  //     }
  //     strokeWeight(1 - vol*1.1);
  //     line(xS, yS, zS, xE, yE, zE);
  //   }
  // }


}
