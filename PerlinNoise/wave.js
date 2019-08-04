class Wave{
  constructor(scl){
    this.waveParticles = [];
    this.cols = 45;
    this.rows = 20;
    this.scl = scl;
    this.xAdd = 0.01;
    this.xOffset = 0;
  }

  showWave(){
    this.xAdd += 0.01;
    this.xOffset = this.xAdd;
    for(let x = 0; x < this.cols; x += 1){
      this.waveParticles[x] = [];
      this.zOffset = 0;
      for(let z = 0; z < this.rows; z += 1){
        this.particle = createVector();

        this.particle.x = x*this.scl - this.cols*this.scl/2;
        let noiseVal = noise(this.zOffset, this.xOffset);
        this.particle.y = 150+map(noiseVal, 0, 1, -80, 80);
        this.particle.z = 350+z*this.scl -this.rows*this.scl/2;
        this.waveParticles[x][z] = this.particle;
        this.zOffset += 0.1;
      }
      this.xOffset += 0.1;
    }
    // this.pointMode();
    this.lineMode();
  }


  pointMode(){
    for(let i = 1; i < this.cols-1; i++){
      for(let j = 1; j < this.rows-1; j++){
        let hue = map(i+j+noise(this.zOffset, this.xOffset)*50, 0, this.cols+this.rows+50, 140, 350);
        let brightness = map(j, 0, this.rows, 0, 255);
        let weight = map(this.waveParticles[i][j].y, 80, 210, 15, 0);

        stroke(hue, 255, brightness);
        strokeWeight(weight);
        point(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
      }
    }
  }

  lineMode(){
    for(let i = 1; i < this.cols-1; i++){
      for(let j = 1; j < this.rows-1; j++){
        let hue = map(i+j+noise(this.zOffset, this.xOffset)*50, 0, this.cols+this.rows+50, 140, 350);
        let brightness = map(j, 0, this.rows, 0, 255);
        // let weight = map(this.waveParticles[i][j].y, 80, 220, 15, 0);

        stroke(hue, 255, brightness);
        strokeWeight(1);
        // point(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
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
