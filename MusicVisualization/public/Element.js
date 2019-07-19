class Element{
  constructor(){
    this.particles = [];

    this.skullParticles = [];
    //Copy all 3d coordinate from JSON
    for(let i = 0; i < skull.coordinate.length; i++){
      let particle = new Particle();
      particle.position.x = skull.coordinate[i].x * 100;
      particle.position.y = skull.coordinate[i].y * -100;
      particle.position.z = skull.coordinate[i].z * 100;

      this.skullParticles.push(particle);
    }

    this.headphoneParticles = [];
    for(let i = 0; i < headphone.coordinate.length; i++){
      let particle = new Particle();
      particle.position.x = headphone.coordinate[i].x * 80;
      particle.position.y = headphone.coordinate[i].y * -80;
      particle.position.z = headphone.coordinate[i].z * 80;

      this.headphoneParticles.push(particle);
    }

    this.noidParticles = [];
    for(let i = 0; i < noid.coordinate.length; i++){
      let particle = new Particle();
      particle.position.x = (noid.coordinate[i].x - 3) * 150;
      particle.position.y = (noid.coordinate[i].y - 3) * -150;
      particle.position.z = (noid.coordinate[i].z + 3) * 150;

      this.noidParticles.push(particle);
    }

    this.recordParticles = [];
    for(let i = 0; i < record.coordinate.length; i++){
      let particle = new Particle();
      particle.position.x = (record.coordinate[i].x - 3) * 100;
      particle.position.y = (record.coordinate[i].y - 4) * -100;
      particle.position.z = (record.coordinate[i].z - 2) * 100;

      this.recordParticles.push(particle);
    }

    this.animateValue = 0;
    this.density;
    this.density2;
    this.percentages;
    this.pLength = this.noidParticles.length;
    this.cLength;
  }


  showSphere(vol){
    rotateX(60);
      this.percentages = map(percentageSlider.value(), 0, 100, 0, 180);

      if(elementMode.value() == "Spiral Sphere"){
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
            particle.position.x = (r + noise(offset)*vol*100) * sin(i* (transformSlider.value()+this.animateValue) )*cos(i*densitySlider.value());
            particle.position.y = (r + noise(offset)*vol*100) * sin(i* (transformSlider.value()+this.animateValue) )*sin(i*densitySlider.value());
            particle.position.z = (r + noise(offset)*vol*100) * cos(i* (transformSlider2.value()+this.animateValue) );
          }

          this.particles.push(particle);

        }
      }

      if(elementMode.value() == "Normal Sphere"){
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
              particle.position.x = (r + noise(offset)*vol*100) * sin(j* (transformSlider.value()+this.animateValue) )*cos(i);
              particle.position.y = (r + noise(offset)*vol*100) * sin(j* (transformSlider.value()+this.animateValue) )*sin(i);
              particle.position.z = (r + noise(offset)*vol*100) * cos(j* (transformSlider2.value()+this.animateValue) );
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
      this.density = int(map(densitySlider.value(), 0, 32, 4, 1));
      this.percentages = map(percentageSlider.value(), 0, 100, 0, this.skullParticles.length);

      if(displayMode.value() == "Line mode"){
        for(let i = 0; i < this.percentages; i += this.density){
          offset = offset + offsetSlider.value();
          let hue = map(i, 0, this.percentages, 0, 128);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(0.6 + vol*lineWeightSlider.value());

          if(vol == 0){
            line(
              this.skullParticles[i].position.x,
              this.skullParticles[i].position.y,
              this.skullParticles[i].position.z,
              this.skullParticles[i].position.x * 1.03,
              this.skullParticles[i].position.y * 1.03,
              this.skullParticles[i].position.z * 1.03
            );
          }else{
            line(
              this.skullParticles[i].position.x * (1+noise(offset)*vol),
              this.skullParticles[i].position.y * (1+noise(offset)*vol),
              this.skullParticles[i].position.z * (1+noise(offset)*vol),
              this.skullParticles[i].position.x * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value()),
              this.skullParticles[i].position.y * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value()),
              this.skullParticles[i].position.z * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value())
            );
          }
        }
      }

      if(displayMode.value() == "Point mode"){
        for(let i = 0; i < this.percentages; i += this.density){
          offset = offset + offsetSlider.value();
          let hue = map(i, 0, this.percentages, 0, 64);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(3.5 + pointWeightSlider.value());
          if(vol == 0){
            point(
              this.skullParticles[i].position.x,
              this.skullParticles[i].position.y,
              this.skullParticles[i].position.z
            );
          }else{
            point(
              this.skullParticles[i].position.x * (1+noise(offset)*vol),
              this.skullParticles[i].position.y * (1+noise(offset)*vol),
              this.skullParticles[i].position.z * (1+noise(offset)*vol)
            );
          }
        }
      }

      if(displayMode.value() == "Point mode"){
        if(doesFlashes == true){
          this.flashes();
        }

        if(doesShowLasers == true){
          this.skullLaser();
        }
      }
    }


  showHeadphone(vol){
      // rotateX(90);
      this.density = int(map(densitySlider.value(), 0, 32, 4, 1));
      this.percentages = map(percentageSlider.value(), 0, 100, 0, this.headphoneParticles.length);

      if(displayMode.value() == "Line mode"){
        for(let i = 0; i < this.percentages; i += this.density){
          offset = offset + offsetSlider.value();
          let hue = map(i, 0, this.percentages, 0, 128);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(0.6 + vol*lineWeightSlider.value());

          if(vol == 0){
            line(
              this.headphoneParticles[i].position.x,
              this.headphoneParticles[i].position.y,
              this.headphoneParticles[i].position.z,
              this.headphoneParticles[i].position.x * 1.03,
              this.headphoneParticles[i].position.y * 1.03,
              this.headphoneParticles[i].position.z * 1.03,
            );
          }else{
            line(
              this.headphoneParticles[i].position.x * (1+noise(offset)*vol),
              this.headphoneParticles[i].position.y * (1+noise(offset)*vol),
              this.headphoneParticles[i].position.z * (1+noise(offset)*vol),
              this.headphoneParticles[i].position.x * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value()),
              this.headphoneParticles[i].position.y * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value()),
              this.headphoneParticles[i].position.z * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value())
            );
          }
        }
      }

      if(displayMode.value() == "Point mode"){
        for(let i = 0; i < this.percentages; i += this.density){
          offset = offset + offsetSlider.value();
          let hue = map(i, 0, this.percentages, 0, 64);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(3.5 + pointWeightSlider.value());
          if(vol == 0){
            point(
              this.headphoneParticles[i].position.x,
              this.headphoneParticles[i].position.y,
              this.headphoneParticles[i].position.z
            );
          }else{
            point(
              this.headphoneParticles[i].position.x * (1+noise(offset)*vol),
              this.headphoneParticles[i].position.y * (1+noise(offset)*vol),
              this.headphoneParticles[i].position.z * (1+noise(offset)*vol)
            );
          }
        }
      }

      if(displayMode.value() == "Point mode"){
        if(doesFlashes == true){
          this.flashes();
        }

        if(doesShowLasers == true){
          this.headphoneLaser();
        }
      }
  }

  showNoid(vol){
      rotateX(-25);
      this.density = int(map(densitySlider.value(), 0, 32, 6, 1));
      this.percentages = map(percentageSlider.value(), 0, 100, 0, this.noidParticles.length);

      if(displayMode.value() == "Line mode"){
        for(let i = 0; i < this.percentages; i += this.density){
          offset = offset + offsetSlider.value();
          let hue = map(i, 0, this.noidParticles.length, 0, 128);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(0.6 + vol*lineWeightSlider.value());

          if(vol == 0){
            line(
              this.noidParticles[i].position.x,
              this.noidParticles[i].position.y,
              this.noidParticles[i].position.z,
              this.noidParticles[i].position.x * 1.03,
              this.noidParticles[i].position.y * 1.03,
              this.noidParticles[i].position.z * 1.03
            );
          }else{
            line(
              this.noidParticles[i].position.x * (1+noise(offset)*vol),
              this.noidParticles[i].position.y * (1+noise(offset)*vol),
              this.noidParticles[i].position.z * (1+noise(offset)*vol),
              this.noidParticles[i].position.x * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value()),
              this.noidParticles[i].position.y * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value()),
              this.noidParticles[i].position.z * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value())
            );
          }
        }
      }

      if(displayMode.value() == "Point mode"){
        for(let i = 0; i < this.percentages; i += this.density){
          offset = offset + offsetSlider.value();
          let hue = map(i, 0, this.percentages, 0, 64);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(3.5 + pointWeightSlider.value());

          if(vol == 0){
            point(
              this.noidParticles[i].position.x,
              this.noidParticles[i].position.y,
              this.noidParticles[i].position.z
            );
          }else{
            point(
              this.noidParticles[i].position.x * (1+noise(offset)*vol),
              this.noidParticles[i].position.y * (1+noise(offset)*vol),
              this.noidParticles[i].position.z * (1+noise(offset)*vol)
            );
          }
        }
      }

      if(displayMode.value() == "Point mode"){
        if(doesFlashes == true){
          this.flashes();
        }

        if(doesShowLasers == true){
          this.noidLaser();
        }
      }
    }

  showRecord(vol){
      this.density = int(map(densitySlider.value(), 0, 32, 6, 1));
      this.percentages = map(percentageSlider.value(), 0, 100, 0, this.recordParticles.length);

      if(displayMode.value() == "Line mode"){
        for(let i = 0; i < this.percentages; i += this.density){
          offset = offset + offsetSlider.value();
          let hue = map(i, 0, this.percentages, 0, 128);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(0.6 + vol*lineWeightSlider.value());
          if(vol == 0){
            line(
              this.recordParticles[i].position.x,
              this.recordParticles[i].position.y,
              this.recordParticles[i].position.z,
              this.recordParticles[i].position.x * 1.03,
              this.recordParticles[i].position.y * 1.03,
              this.recordParticles[i].position.z * 1.03
            );
          }else{
            line(
              this.recordParticles[i].position.x * (1+noise(offset)*vol),
              this.recordParticles[i].position.y * (1+noise(offset)*vol),
              this.recordParticles[i].position.z * (1+noise(offset)*vol),
              this.recordParticles[i].position.x * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value()),
              this.recordParticles[i].position.y * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value()),
              this.recordParticles[i].position.z * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value())
            );
          }
        }
      }

      if(displayMode.value() == "Point mode"){
        for(let i = 0; i < this.percentages; i += this.density){
          offset = offset + offsetSlider.value();
          let hue = map(i, 0, this.percentages, 0, 64);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(3.5 + pointWeightSlider.value());
          if(vol == 0){
            point(
              this.recordParticles[i].position.x,
              this.recordParticles[i].position.y,
              this.recordParticles[i].position.z
            );
          }else{
            point(
              this.recordParticles[i].position.x * (1+noise(offset)*vol),
              this.recordParticles[i].position.y * (1+noise(offset)*vol),
              this.recordParticles[i].position.z * (1+noise(offset)*vol)
            );
          }
        }
      }

      if(displayMode.value() == "Point mode"){
        if(doesFlashes == true){
          this.flashes();
        }

        if(doesShowLasers == true){
          this.recordLaser();
        }
      }
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
    if(this.percentages > 10){
      if(elementMode.value() == "Normal Sphere" || elementMode.value() == "Spiral Sphere"){
        let xS2, yS2, zS2, xE2, yE2, zE2;
          for(let i = 0; i < 3; i++){
          let luckyNumber2 = floor(random(this.percentages));
            xS2 = this.particles[luckyNumber2].position.x;
            yS2 = this.particles[luckyNumber2].position.y;
            zS2 = this.particles[luckyNumber2].position.z;
            strokeWeight(14+pointWeightSlider.value()*2);
            point(xS2, yS2, zS2);
          }
      }else if(elementMode.value() == "Skull"){
        let xS2, yS2, zS2, xE2, yE2, zE2;
          for(let i = 0; i < 3; i++){
          let luckyNumber2 = floor(random(this.percentages));
            xS2 = this.skullParticles[luckyNumber2].position.x;
            yS2 = this.skullParticles[luckyNumber2].position.y;
            zS2 = this.skullParticles[luckyNumber2].position.z;
            strokeWeight(14+pointWeightSlider.value()*2);
            point(xS2, yS2, zS2);
          }
      }else if(elementMode.value() == "Headphone"){
        let xS2, yS2, zS2, xE2, yE2, zE2;
          for(let i = 0; i < 3; i++){
          let luckyNumber2 = floor(random(this.percentages));
            xS2 = this.headphoneParticles[luckyNumber2].position.x;
            yS2 = this.headphoneParticles[luckyNumber2].position.y;
            zS2 = this.headphoneParticles[luckyNumber2].position.z;
            strokeWeight(14+pointWeightSlider.value()*2);
            point(xS2, yS2, zS2);
          }
      }else if(elementMode.value() == "Noid"){
        let xS2, yS2, zS2, xE2, yE2, zE2;
          for(let i = 0; i < 3; i++){
          let luckyNumber2 = floor(random(this.percentages));
            xS2 = this.noidParticles[luckyNumber2].position.x;
            yS2 = this.noidParticles[luckyNumber2].position.y;
            zS2 = this.noidParticles[luckyNumber2].position.z;
            strokeWeight(14+pointWeightSlider.value()*2);
            point(xS2, yS2, zS2);
          }
      }else if(elementMode.value() == "Record"){
        let xS2, yS2, zS2, xE2, yE2, zE2;
          for(let i = 0; i < 3; i++){
          let luckyNumber2 = floor(random(this.percentages));
            xS2 = this.recordParticles[luckyNumber2].position.x;
            yS2 = this.recordParticles[luckyNumber2].position.y;
            zS2 = this.recordParticles[luckyNumber2].position.z;
            strokeWeight(14+pointWeightSlider.value()*2);
            point(xS2, yS2, zS2);
          }
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

  skullLaser(){
    strokeWeight(1);
    if(this.percentages > 730){
      for(let i = 0; i < 2; i++){
      let luckyNumberLE = floor(random(718, 730));//Left eyes vertices indecies
      let luckyNumberLE2 = floor(random(718, 730));

      let xSL, ySL, zSL, xEL, yEL, zEL;
        xSL = this.skullParticles[luckyNumberLE].position.x;
        ySL = this.skullParticles[luckyNumberLE].position.y;
        zSL = this.skullParticles[luckyNumberLE].position.z;
        xEL = this.skullParticles[luckyNumberLE2].position.x;
        yEL = this.skullParticles[luckyNumberLE2].position.y;
        zEL = this.skullParticles[luckyNumberLE2].position.z;
        line(xSL, ySL, zSL, xEL, yEL, zEL);

        let luckyNumberRE = floor(random(323, 335));//Right eyes vertices indecies
        let luckyNumberRE2 = floor(random(323, 335));

        let xSR, ySR, zSR, xER, yER, zER;
          xSR = this.skullParticles[luckyNumberRE].position.x;
          ySR = this.skullParticles[luckyNumberRE].position.y;
          zSR = this.skullParticles[luckyNumberRE].position.z;
          xER = this.skullParticles[luckyNumberRE2].position.x;
          yER = this.skullParticles[luckyNumberRE2].position.y;
          zER = this.skullParticles[luckyNumberRE2].position.z;
          line(xSR, ySR, zSR, xER, yER, zER);
      }
    }
  }

  headphoneLaser(){
    strokeWeight(1);
    if(this.percentages > 352){
      let luckyNumberL = floor(random(329, 352));//Left Ear vertices indecies
      let luckyNumberL2 = floor(random(329, 352));
      let luckyNumberR = floor(random(96, 119));//Right Ear vertices indecies
      let luckyNumberR2 = floor(random(96, 119));

      let xSL, ySL, zSL, xEL, yEL, zEL;
      xSL = this.headphoneParticles[luckyNumberL].position.x;
      ySL = this.headphoneParticles[luckyNumberL].position.y;
      zSL = this.headphoneParticles[luckyNumberL].position.z;
      xEL = this.headphoneParticles[luckyNumberL2].position.x;
      yEL = this.headphoneParticles[luckyNumberL2].position.y;
      zEL = this.headphoneParticles[luckyNumberL2].position.z;

      let xSR, ySR, zSR, xER, yER, zER;
      xSR = this.headphoneParticles[luckyNumberR].position.x;
      ySR = this.headphoneParticles[luckyNumberR].position.y;
      zSR = this.headphoneParticles[luckyNumberR].position.z;
      xER = this.headphoneParticles[luckyNumberR2].position.x;
      yER = this.headphoneParticles[luckyNumberR2].position.y;
      zER = this.headphoneParticles[luckyNumberR2].position.z;

      line(xSR, ySR, zSR, xEL, yEL, zEL);
    }
  }

  noidLaser(){
    strokeWeight(1);
    this.cLength = this.percentages;

    if((this.cLength - this.pLength) != 0 && this.cLength > 16){
        for(let i = 0; i < 8; i++){
          let xSL, ySL, zSL;
          xSL = this.noidParticles[floor(this.percentages) - (1+i)].position.x;
          ySL = this.noidParticles[floor(this.percentages) - (1+i)].position.y;
          zSL = this.noidParticles[floor(this.percentages) - (1+i)].position.z;
          line(xSL, ySL, zSL, 0, 1200, 0);
        }
        this.pLength = this.percentages;
    }

      if(this.percentages > 239){
        let luckyNumberLA = floor(random(232, 239));//Left arm
        let xSL, ySL, zSL;
        xSL = this.noidParticles[luckyNumberLA].position.x;
        ySL = this.noidParticles[luckyNumberLA].position.y;
        zSL = this.noidParticles[luckyNumberLA].position.z;
        line(xSL, ySL, zSL, 0, 1200, 0);

        if(this.percentages > 494){
          let luckyNumberLL = floor(random(485, 494));//Left leg
          let xSLL, ySLL, zSLL;
          xSLL = this.noidParticles[luckyNumberLL].position.x;
          ySLL = this.noidParticles[luckyNumberLL].position.y;
          zSLL = this.noidParticles[luckyNumberLL].position.z;
          line(xSLL, ySLL, zSLL, 0, 1200, 0);

          if(this.percentages > 863){
            let luckyNumberRA = floor(random(855, 863));//Right arm
            let xSR, ySR, zSR;
            xSR = this.noidParticles[luckyNumberRA].position.x;
            ySR = this.noidParticles[luckyNumberRA].position.y;
            zSR = this.noidParticles[luckyNumberRA].position.z;
            line(xSR, ySR, zSR, 0, 1200, 0);

            if(this.percentages > 1143){
              let luckyNumberRL = floor(random(1135, 1143));//Right leg
              let xSRL, ySRL, zSRL;
              xSRL = this.noidParticles[luckyNumberRL].position.x;
              ySRL = this.noidParticles[luckyNumberRL].position.y;
              zSRL = this.noidParticles[luckyNumberRL].position.z;
              line(xSRL, ySRL, zSRL, 0, 1200, 0);


            }
          }
        }
      }
  }

  recordLaser(){
    strokeWeight(1);
    for(let i = 0; i < 2; i++){
      if(this.percentages > 72){
        let luckyNumber1 = floor(random(22, 72));//Left Ear vertices indecies
        let luckyNumber2 = luckyNumber1 - 1;

        let xSL, ySL, zSL, xEL, yEL, zEL;
        xSL = this.recordParticles[luckyNumber1].position.x;
        ySL = this.recordParticles[luckyNumber1].position.y;
        zSL = this.recordParticles[luckyNumber1].position.z;
        xEL = this.recordParticles[luckyNumber2].position.x;
        yEL = this.recordParticles[luckyNumber2].position.y;
        zEL = this.recordParticles[luckyNumber2].position.z;

        line(xSL, ySL, zSL, xEL, yEL, zEL);
      }
    }
  }


}
