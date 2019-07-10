class Sphere{
  constructor(explode){
    this.particles = [];
  }


  show(vol){
    // beginShape();//In case we use vertex
    for(let j = 0; j < 18; j++){
      for(let i = 0; i < 360; i += 10){

        offset = offset + offsetSlider.value();
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
        stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);

        //Line
        if(displayMode.value() == "Line"){
          strokeWeight(0.6 + vol*lineWeightSlider.value());
          line(
            particle.position.x,
            particle.position.y,
            particle.position.x*(1.03+vol*lengthSlider.value()),
            particle.position.y*(1.03+vol*lengthSlider.value())
          );
        }

        //point version
        if(displayMode.value() == "Point"){
          strokeWeight(4);
          point(particle.position.x, particle.position.y, 0);
        }

      }
      if(displayMode.value() == "Point"){
        if(doesFlashes == true){
          this.flashes();
        }

        if(doesShowLines == true){
          this.verticalLines();
        }
      }
      rotateY(10);
    }
    this.particles.splice(0, this.particles.length);
  }


  rotation(vol, rotateAngle){
    rotateY(rotateAngle);
    rotateX(-30);
  }

  flashes(){
      let xS2, yS2, zS2, xE2, yE2, zE2;
      if(this.particles.length > 36){
        let luckyNumber2 = floor(random(this.particles.length - 36));
          xS2 = this.particles[luckyNumber2].position.x;
          yS2 = this.particles[luckyNumber2].position.y;
          zS2 = this.particles[luckyNumber2].position.z;
          strokeWeight(12);
          point(xS2, yS2, zS2);
      }
  }

  verticalLines(){
    strokeWeight(1);
    let luckyNumber = floor(random(0, this.particles.length));

    let xS, yS, zS, xE, yE, zE;
    if((luckyNumber+1)%36 == 0){
      xS = this.particles[luckyNumber].position.x;
      yS = this.particles[luckyNumber].position.y;
      zS = this.particles[luckyNumber].position.z;
      xE = this.particles[(luckyNumber+1)-36].position.x;
      yE = this.particles[(luckyNumber+1)-36].position.y;
      zE = this.particles[(luckyNumber+1)-36].position.z;
      line(xS, yS, zS, xE, yE, zE);
    }else if(luckyNumber == 0){

    }else{
      xS = this.particles[luckyNumber].position.x;
      yS = this.particles[luckyNumber].position.y;
      zS = this.particles[luckyNumber].position.z;
      xE = this.particles[luckyNumber+1].position.x;
      yE = this.particles[luckyNumber+1].position.y;
      zE = this.particles[luckyNumber+1].position.z;
      line(xS, yS, zS, xE, yE, zE);
    }
  }

  // Horizontal lines. This doesn't working with current way to display every point
  // horizontalLines(vol){
      // let xS2, yS2, zS2, xE2, yE2, zE2;
      //   if(this.particles.length > 36){
      //     let luckyNumber2 = floor(random(this.particles.length - 36));
      //       // print(luckyNumber2);
      //       // print(luckyNumber2 + 36);
      //       xS2 = this.particles[luckyNumber2].position.x;
      //       yS2 = this.particles[luckyNumber2].position.y;
      //       zS2 = this.particles[luckyNumber2].position.z;
      //       xE2 = this.particles[luckyNumber2+35].position.x;
      //       yE2 = this.particles[luckyNumber2+35].position.y;
      //       zE2 = this.particles[luckyNumber2+35].position.z;
      //       strokeWeight(10);
      //
      //       point(xS2, yS2, zS2);
      //       point(xE2, yE2, zE2);
      //       strokeWeight(1);
      //       line(xS2, yS2, zS2, xE2, yE2, zE2);
      //   }

  // }

}
