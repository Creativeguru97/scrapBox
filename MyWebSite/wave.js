class Wave{
  constructor(scl, cols, rows, damping){
    this.waveParticles = [];
    this.cols = cols;
    this.rows = rows;
    this.scl = scl;
    this.xAdd = 0.01;
    this.xOffset = 0;
    this.danping = damping;

    this.previousWaveAdd = [];
    for(let x = 0; x < this.cols; x++){
      this.previousWaveAdd[x] = [];
      for(let z = 0; z < this.rows; z++){
        this.previousWaveAdd[x][z] = 0;
      }
    }

    this.currentWaveAdd = [];
    for(let x = 0; x < this.cols; x++){
      this.currentWaveAdd[x] = [];
      for(let z = 0; z < this.rows; z++){
        this.currentWaveAdd[x][z] = 0;
      }
    }
  }

  showWave(){
    this.xAdd += 0.01;
    this.xOffset = this.xAdd;

    for(let x = 0; x < this.cols; x += 1){

      this.waveParticles[x] = [];
      this.zOffset = 0;

      //--- This is the ripple effects!!! ---
      for(let z = 0; z < this.rows; z += 1){

        if(x>1 && x<this.cols-1 && z>1 && z<this.rows-1){
          this.currentWaveAdd[x][z] = (
          (
            this.previousWaveAdd[x-1][z]
            +this.previousWaveAdd[x+1][z]
            +this.previousWaveAdd[x][z-1]
            +this.previousWaveAdd[x][z+1]
          )/2 - this.currentWaveAdd[x][z]
          );
        }else{
          this.currentWaveAdd[x][z] = 0;
        }

        this.currentWaveAdd[x][z] = this.currentWaveAdd[x][z] * this.danping;
        //------------------------------------

        this.particle = createVector();
        this.particle.x = x*this.scl - this.cols*this.scl/2;

        //--- Wave ---
        let noiseVal = noise(this.zOffset, this.xOffset);
        //------------
        this.particle.y = 150+map(noiseVal, 0, 1, -15, 15)+this.currentWaveAdd[x][z];
        this.particle.z = 350+z*this.scl -this.rows*this.scl/2;
        this.waveParticles[x][z] = this.particle;
        this.zOffset += 0.1;
      }
      this.xOffset += 0.1;
    }

    if(displayMode.value() == "Line mode"){
      this.lineMode();
    }else if(displayMode.value() == "Point mode"){
      this.pointMode();
    }

    let temp = [];
    temp = this.previousWaveAdd;
    this.previousWaveAdd = this.currentWaveAdd;
    this.currentWaveAdd = temp;
  }

  //Make separate ripple function for just in case;
  // ripple(){
  //
  //   for(let x = 1; x < this.cols-1; x++){
  //     for(let z = 1; z < this.rows-1; z++){
  //
  //       this.currentWaveAdd[x][z] = (
  //         (
  //         this.previousWaveAdd[x-1][z]
  //         +this.previousWaveAdd[x+1][z]
  //         +this.previousWaveAdd[x][z-1]
  //         +this.previousWaveAdd[x][z+1]
  //         )/2 - this.currentWaveAdd[x][z]
  //       );
  //
  //       this.currentWaveAdd[x][z] = this.currentWaveAdd[x][z] * this.danping;
  //       return(this.currentWaveAdd[x][z]);
  //     }
  //   }
  //
  //   let temp = [];
  //   temp = this.previousWaveAdd;
  //   this.previousWaveAdd = this.currentWaveAdd;
  //   this.currentWaveAdd = temp;
  //
  // }


  pointMode(){
    for(let i = 1; i < this.cols-1; i++){
      for(let j = 1; j < this.rows-1; j++){
        let hue = map(i+j+noise(this.zOffset, this.xOffset)*50, 0, this.cols+this.rows+50, 140, 350);
        let brightness = map(j, 0, this.rows, 0, 255);
        let weight = map(this.waveParticles[i][j].y, 140, 160, 15, 1);

        stroke(hue, 255, brightness);
        strokeWeight(weight);
        point(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
      }
    }
  }

  lineMode(){
    for(let i = 1; i < this.cols-1; i+=1){
      for(let j = 1; j < this.rows-1; j+=1){
        let hue = map(i+j+noise(this.zOffset, this.xOffset)*50, 0, this.cols+this.rows+50, 140, 350);
        let brightness = map(j, 0, this.rows, 0, 255);
        // let weight = map(this.waveParticles[i][j].y, 80, 220, 15, 0);

        stroke(hue, 255, brightness);
        strokeWeight(1);
        beginShape(LINES);
          vertex(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
          vertex(this.waveParticles[i+1][j].x, this.waveParticles[i+1][j].y, this.waveParticles[i+1][j].z);
          vertex(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
          vertex(this.waveParticles[i][j+1].x, this.waveParticles[i][j+1].y, this.waveParticles[i][j+1].z);
        endShape();
      }
    }
  }


}
