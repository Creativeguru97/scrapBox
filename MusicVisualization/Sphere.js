class Sphere{
  constructor(){
    this.particles = [];
    this.animateValue = 0;
    this.density;
    this.density2;
    this.skullDensity;
    this.percentages;
    this.skull = [];
  }


  showSphere(vol){
    rotateX(60);
      this.percentages = map(percentageSlider.value(), 0, 100, 0, 180);

      if(sphereMode.value() == "Spiral Sphere"){
        for(let i = 0; i < this.percentages; i += 0.5){
          offset = offset + offsetSlider.value();
          let r = map(vol, 0, 1, widthX/5, width/3);
          // let x, y, z;
          let particle = new Particle();
          if(vol == 0){

            //For people who're not familiar with Spherical coordinates
            //Spherical coordinates to Catesian coordinates
            // 0 <= theta <= two PI, 0 <= phi <= PI
            //x = r * sin(phi) * cos(theta)
            //y = r * sin(phi) * sin(theta)
            //z = r * cos(phi)

            //More about Spherical coordinates : http://tutorial.math.lamar.edu/Classes/CalcIII/SphericalCoords.aspx

            particle.position.x = r * sin(i* (transformSlider.value()+this.animateValue) )*cos(i*densitySlider.value());
            particle.position.y = r * sin(i* (transformSlider.value()+this.animateValue) )*sin(i*densitySlider.value());
            particle.position.z = r * cos(i* (transformSlider2.value()+this.animateValue) );
          }else{
            particle.position.x = (r + noise(offset)*vol*90) * sin(i* (transformSlider.value()+this.animateValue) )*cos(i*densitySlider.value());
            particle.position.y = (r + noise(offset)*vol*90) * sin(i* (transformSlider.value()+this.animateValue) )*sin(i*densitySlider.value());
            particle.position.z = (r + noise(offset)*vol*90) * cos(i* (transformSlider2.value()+this.animateValue) );
          }

          this.particles.push(particle);

        }
      }

      if(sphereMode.value() == "Normal Sphere"){
        this.density = map(densitySlider.value(), 0, 32, 45, 12);
        this.density2 = map(densitySlider.value(), 0, 32, 2, 12);
        for(let i = 0; i < 360; i += this.density2){//For theta
          for(let j = 10; j < this.percentages; j += this.density){//For phi

            offset = offset + offsetSlider.value();
            let r = map(vol, 0, 1, widthX/5, width/3);

            let particle = new Particle();
            if(vol == 0){
              //Spherical coordinate to Catesian coordinate
              particle.position.x = r * sin(j* (transformSlider.value()+this.animateValue) )*cos(i);
              particle.position.y = r * sin(j* (transformSlider.value()+this.animateValue) )*sin(i);
              particle.position.z = r * cos(j* (transformSlider2.value()+this.animateValue) );
            }else{
              particle.position.x = (r + noise(offset)*vol*90) * sin(j* (transformSlider.value()+this.animateValue) )*cos(i);
              particle.position.y = (r + noise(offset)*vol*90) * sin(j* (transformSlider.value()+this.animateValue) )*sin(i);
              particle.position.z = (r + noise(offset)*vol*90) * cos(j* (transformSlider2.value()+this.animateValue) );
            }

            this.particles.push(particle);
          }
        }
      }


        //LineMode
      if(displayMode.value() == "Line mode"){
        for(let i = 0; i < this.particles.length; i++){
          let hue = map(i, 0, this.particles.length, 0, 64);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(0.6 + vol*lineWeightSlider.value());
          line(
            this.particles[i].position.x,
            this.particles[i].position.y,
            this.particles[i].position.z,
            this.particles[i].position.x * (1.03+vol*lengthSlider.value()),
            this.particles[i].position.y * (1.03+vol*lengthSlider.value()),
            this.particles[i].position.z * (1.03+vol*lengthSlider.value())
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
        // print(percentageSlider.value());
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



  showSkull(vol){
    if(sphereMode.value() == "Skull"){
      rotateX(125);
      this.skullDensity = int(map(densitySlider.value(), 0, 32, 4, 1));


      //For people who're not familiar with json file.
      /*
      Check my skull.json file once.
      JSON file "skull"{ => this is called json object.
        "coordinate":{ => this is some sort of array contained in the object
          [0] x: blah
              y: blah
              z: blah

          [1] x: blah
              y: blah
              z: blah
          ...
          ...
          ...

          [N] x: blah
              y: blah
              z: blah
        }
      }
      */

      //And this below is syntax to access to the each index of array.
        for(let i = 0; i < skull.coordinate.length; i+=this.skullDensity){
          offset = offset + offsetSlider.value();
          let particle = new Particle();
          if(vol == 0){
            particle.position.x = skull.coordinate[i].x * 100;
            particle.position.y = skull.coordinate[i].y * 100;
            particle.position.z = skull.coordinate[i].z * 100;
          }else{
            particle.position.x = skull.coordinate[i].x * 100 * (1+noise(offset)*vol);
            particle.position.y = skull.coordinate[i].y * 100 * (1+noise(offset)*vol);
            particle.position.z = skull.coordinate[i].z * 100 * (1+noise(offset)*vol);
          }
          // print(skull.coordinate[i].x);
          this.particles.push(particle);
        }
          print(this.particles.length);


      if(displayMode.value() == "Line mode"){
        for(let i = 0; i < this.particles.length; i++){
          let hue = map(i, 0, this.particles.length, 0, 128);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(0.6 + vol*lineWeightSlider.value());
          line(
            this.particles[i].position.x,
            this.particles[i].position.y,
            this.particles[i].position.z,
            this.particles[i].position.x * (1.03+vol*lengthSlider.value()),
            this.particles[i].position.y * (1.03+vol*lengthSlider.value()),
            this.particles[i].position.z * (1.03+vol*lengthSlider.value()),
          );
        }
      }

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
    }

    // print(this.particles);
    this.particles.splice(0, this.particles.length);//Erase all particle at each frame
  }



  animation(){
    if(isAnimated == true){
      this.animateValue += 0.01;
    }else if(isAnimated == false){
      this.animateValue = 0.0;
    }
  }


  rotation(vol, rotateAngle){
    rotateY(rotateAngle);
  }

  flashes(){
      let xS2, yS2, zS2, xE2, yE2, zE2;
      if(this.particles.length > 36){
        for(let i = 0; i < 4; i++){
          let luckyNumber2 = floor(random(this.particles.length - 36));
            xS2 = this.particles[luckyNumber2].position.x;
            yS2 = this.particles[luckyNumber2].position.y;
            zS2 = this.particles[luckyNumber2].position.z;
            strokeWeight(14+pointWeightSlider.value()*2);
            point(xS2, yS2, zS2);
        }
      }
  }

  laser(){
    strokeWeight(1);
    if(this.particles.length > 0){
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
