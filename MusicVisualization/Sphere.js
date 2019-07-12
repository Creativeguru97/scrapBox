class Sphere{
  constructor(){
    this.particles = [];
    this.animateValue = 0;
  }


  show(vol){

      colorMode(HSB);
      if(sphereMode.value() == "Spiral Sphere"){
        for(let i = 0; i < 180; i += 0.4){
          offset = offset + offsetSlider.value();
          let r = map(vol, 0, 1, widthX/5, width/3);
          // let x, y, z;
          let particle = new Particle(false);
          if(vol == 0){
            //Spherical coordinate to Catesian coordinate
            particle.position.x = r * sin(i* (transformSlider.value()+this.animateValue) )*cos(i*32);
            particle.position.y = r * sin(i* (transformSlider.value()+this.animateValue) )*sin(i*32);
            particle.position.z = r * cos(i* (transformSlider2.value()+this.animateValue) );
          }else{
            particle.position.x = (r + noise(offset)*vol*120) * sin(i* (transformSlider.value()+this.animateValue) )*cos(i*28);
            particle.position.y = (r + noise(offset)*vol*120) * sin(i* (transformSlider.value()+this.animateValue) )*sin(i*28);
            particle.position.z = (r + noise(offset)*vol*120) * cos(i* (transformSlider2.value()+this.animateValue) );
          }

          this.particles.push(particle);
        }
      }

      if(sphereMode.value() == "Normal Sphere"){
        for(let i = 0; i < 360; i += 10){//For phi
          for(let j = 10; j < 180; j += 10){//For theta

            offset = offset + offsetSlider.value();
            let r = map(vol, 0, 1, widthX/5, width/3);

            let particle = new Particle(false);
            if(vol == 0){
              //Spherical coordinate to Catesian coordinate
              particle.position.x = r * sin(j* (transformSlider.value()+this.animateValue) )*cos(i);
              particle.position.y = r * sin(j* (transformSlider.value()+this.animateValue) )*sin(i);
              particle.position.z = r * cos(j* (transformSlider2.value()+this.animateValue) );
            }else{
              particle.position.x = (r + noise(offset)*vol*120) * sin(j* (transformSlider.value()+this.animateValue) )*cos(i);
              particle.position.y = (r + noise(offset)*vol*120) * sin(j* (transformSlider.value()+this.animateValue) )*sin(i);
              particle.position.z = (r + noise(offset)*vol*120) * cos(j* (transformSlider2.value()+this.animateValue) );
            }

            this.particles.push(particle);
          }
        }
      }



      strokeWeight(0.6 + vol*lineWeightSlider.value());

        //LineMode
      if(displayMode.value() == "Line mode"){
        for(let i = 0; i < this.particles.length; i++){
          let hue = map(i, 0, this.particles.length, 0, 64);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);

          line(
            this.particles[i].position.x,
            this.particles[i].position.y,
            this.particles[i].position.z,
            this.particles[i].position.x*(1.03+vol*lengthSlider.value()),
            this.particles[i].position.y*(1.03+vol*lengthSlider.value()),
            this.particles[i].position.z*(1.03+vol*lengthSlider.value())
          );
        }
      }

      //PointMode
      if(displayMode.value() == "Point mode"){
        for(let i = 0; i < this.particles.length; i++){
          let hue = map(i, 0, this.particles.length, 0, 64);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(3.5 + pointWeightSlider.value());
          point(
            this.particles[i].position.x,
            this.particles[i].position.y,
            this.particles[i].position.z
          );
        }
      }


      if(displayMode.value() == "Point mode"){
        if(doesFlashes == true){
          this.flashes();
        }

        if(doesShowLasers == true){
          this.laser();
        }
      }

    this.particles.splice(0, this.particles.length);//Erase all particle at each frame
  }

  animation(){
    if(isAnimated == true){
      this.animateValue += 0.03;
    }else if(isAnimated == false){
      this.animateValue = 0.0;
    }
  }


  rotation(vol, rotateAngle){
    rotateY(rotateAngle);
    rotateX(60);
  }

  flashes(){
      let xS2, yS2, zS2, xE2, yE2, zE2;
      if(this.particles.length > 36){
        let luckyNumber2 = floor(random(this.particles.length - 36));
          xS2 = this.particles[luckyNumber2].position.x;
          yS2 = this.particles[luckyNumber2].position.y;
          zS2 = this.particles[luckyNumber2].position.z;
          strokeWeight(14+pointWeightSlider.value()*2);
          point(xS2, yS2, zS2);
      }
  }

  laser(){
    strokeWeight(1);
    let luckyNumber = floor(random(0, this.particles.length - 1));

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
