class Element{
  constructor(modelName, dX, dY, dZ, modelSizeX, modelSizeY, modelSizeZ){

    this.particles = [];
    //Copy all 3d coordinate from JSON
    for(let i = 0; i < modelName.coordinate.length; i++){
      let particle = new Particle();
      particle.position.x = (modelName.coordinate[i].x + dX) * modelSizeX;
      particle.position.y = (modelName.coordinate[i].y + dY) * modelSizeY;
      particle.position.z = (modelName.coordinate[i].z + dZ) * modelSizeZ;

      this.particles.push(particle);
    }

    this.density;
    this.percentages;
    this.pLength = this.particles.length;
    this.cLength;
  }

  showModel(vol){
      this.density = int(map(densitySlider.value(), 0, 32, 4, 1));
      this.percentages = map(percentageSlider.value(), 0, 100, 0, this.particles.length);

      if(displayMode.value() == "Line mode"){
        for(let i = 0; i < this.percentages; i += this.density){
          offset = offset + offsetSlider.value();
          let hue = map(i, 0, this.percentages, 0, 128);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(0.6 + vol*lineWeightSlider.value());

          if(vol == 0){
            line(
              this.particles[i].position.x,
              this.particles[i].position.y,
              this.particles[i].position.z,
              this.particles[i].position.x * 1.03,
              this.particles[i].position.y * 1.03,
              this.particles[i].position.z * 1.03
            );
          }else{
            line(
              this.particles[i].position.x * (1+noise(offset)*vol),
              this.particles[i].position.y * (1+noise(offset)*vol),
              this.particles[i].position.z * (1+noise(offset)*vol),
              this.particles[i].position.x * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value()),
              this.particles[i].position.y * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value()),
              this.particles[i].position.z * (1+noise(offset)*vol) * (1.03+vol*lengthSlider.value())
            );
          }
        }
      }

      if(displayMode.value() == "Point mode"){
        for(let i = 0; i < this.percentages; i += this.density){
          offset = offset + offsetSlider.value();
          let hue = map(i, 0, this.percentages, 0, 128);
          stroke((hue+330)*noise(offset/colorChangeSlider.value()), 255, 255);
          strokeWeight(3.5 + pointWeightSlider.value());
          if(vol == 0){
            point(
              this.particles[i].position.x,
              this.particles[i].position.y,
              this.particles[i].position.z
            );
          }else{
            point(
              this.particles[i].position.x * (1+noise(offset)*vol),
              this.particles[i].position.y * (1+noise(offset)*vol),
              this.particles[i].position.z * (1+noise(offset)*vol)
            );
          }
        }
      }

      if(displayMode.value() == "Point mode"){
        if(doesFlashes == true){
          this.flashes();
        }

        if(doesShowLasers == true){
          if(elementMode.value() == "Skull"){
            this.skullLaser(vol);
          }else if(elementMode.value() == "Headphone"){
            this.headphoneLaser(vol);
          }else if(elementMode.value() == "Noid"){
            this.noidLaser(vol);
          }else if(elementMode.value() == "Record"){
            this.recordLaser(vol);
          }
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

  flashes(){
    if(this.percentages > 10){
      let xS2, yS2, zS2, xE2, yE2, zE2;
      for(let i = 0; i < 3; i++){
      let luckyNumber2 = floor(random(this.percentages));
        xS2 = this.particles[luckyNumber2].position.x;
        yS2 = this.particles[luckyNumber2].position.y;
        zS2 = this.particles[luckyNumber2].position.z;
        strokeWeight(14+pointWeightSlider.value()*2);
        point(xS2, yS2, zS2);
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
        xSL = this.particles[luckyNumberLE].position.x;
        ySL = this.particles[luckyNumberLE].position.y;
        zSL = this.particles[luckyNumberLE].position.z;
        xEL = this.particles[luckyNumberLE2].position.x;
        yEL = this.particles[luckyNumberLE2].position.y;
        zEL = this.particles[luckyNumberLE2].position.z;
        line(xSL, ySL, zSL, xEL, yEL, zEL);

        let luckyNumberRE = floor(random(323, 335));//Right eyes vertices indecies
        let luckyNumberRE2 = floor(random(323, 335));

        let xSR, ySR, zSR, xER, yER, zER;
          xSR = this.particles[luckyNumberRE].position.x;
          ySR = this.particles[luckyNumberRE].position.y;
          zSR = this.particles[luckyNumberRE].position.z;
          xER = this.particles[luckyNumberRE2].position.x;
          yER = this.particles[luckyNumberRE2].position.y;
          zER = this.particles[luckyNumberRE2].position.z;
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
      xSL = this.particles[luckyNumberL].position.x;
      ySL = this.particles[luckyNumberL].position.y;
      zSL = this.particles[luckyNumberL].position.z;
      xEL = this.particles[luckyNumberL2].position.x;
      yEL = this.particles[luckyNumberL2].position.y;
      zEL = this.particles[luckyNumberL2].position.z;

      let xSR, ySR, zSR, xER, yER, zER;
      xSR = this.particles[luckyNumberR].position.x;
      ySR = this.particles[luckyNumberR].position.y;
      zSR = this.particles[luckyNumberR].position.z;
      xER = this.particles[luckyNumberR2].position.x;
      yER = this.particles[luckyNumberR2].position.y;
      zER = this.particles[luckyNumberR2].position.z;

      line(xSR, ySR, zSR, xEL, yEL, zEL);
    }
  }

  noidLaser(){
    strokeWeight(1);
    this.cLength = this.percentages;

    if((this.cLength - this.pLength) != 0 && this.cLength > 16){
        for(let i = 0; i < 8; i++){
          let xSL, ySL, zSL;
          xSL = this.particles[floor(this.percentages) - (1+i)].position.x;
          ySL = this.particles[floor(this.percentages) - (1+i)].position.y;
          zSL = this.particles[floor(this.percentages) - (1+i)].position.z;
          line(xSL, ySL, zSL, 0, 1200, 0);
        }
        this.pLength = this.percentages;
    }

    if(this.percentages > 239){
      let luckyNumberLA = floor(random(232, 239));//Left arm
      let xSL, ySL, zSL;
      xSL = this.particles[luckyNumberLA].position.x;
      ySL = this.particles[luckyNumberLA].position.y;
      zSL = this.particles[luckyNumberLA].position.z;
      line(xSL, ySL, zSL, 0, 1200, 0);

      if(this.percentages > 494){
        let luckyNumberLL = floor(random(485, 494));//Left leg
        let xSLL, ySLL, zSLL;
        xSLL = this.particles[luckyNumberLL].position.x;
        ySLL = this.particles[luckyNumberLL].position.y;
        zSLL = this.particles[luckyNumberLL].position.z;
        line(xSLL, ySLL, zSLL, 0, 1200, 0);

        if(this.percentages > 863){
          let luckyNumberRA = floor(random(855, 863));//Right arm
          let xSR, ySR, zSR;
          xSR = this.particles[luckyNumberRA].position.x;
          ySR = this.particles[luckyNumberRA].position.y;
          zSR = this.particles[luckyNumberRA].position.z;
          line(xSR, ySR, zSR, 0, 1200, 0);

          if(this.percentages > 1143){
            let luckyNumberRL = floor(random(1135, 1143));//Right leg
            let xSRL, ySRL, zSRL;
            xSRL = this.particles[luckyNumberRL].position.x;
            ySRL = this.particles[luckyNumberRL].position.y;
            zSRL = this.particles[luckyNumberRL].position.z;
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
        xSL = this.particles[luckyNumber1].position.x;
        ySL = this.particles[luckyNumber1].position.y;
        zSL = this.particles[luckyNumber1].position.z;
        xEL = this.particles[luckyNumber2].position.x;
        yEL = this.particles[luckyNumber2].position.y;
        zEL = this.particles[luckyNumber2].position.z;

        line(xSL, ySL, zSL, xEL, yEL, zEL);
      }
    }
  }


}
