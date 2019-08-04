class Wave{
  constructor(scl){
    this.waveParticles = [];
    this.cols = 55;
    this.rows = 25;
    this.scl = scl;
    this.xAdd = 0.01;
    // print(this.waveParticles);
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
        this.particle.z = 270+z*this.scl -this.rows*this.scl/2;
        this.waveParticles[x][z] = this.particle;
        this.zOffset += 0.1;
      }
      this.xOffset += 0.1;
    }

    for(let i = 0; i < this.cols; i++){
      for(let j = 0; j < this.rows; j++){
        let hue = map(i+j+noise(this.zOffset, this.xOffset)*50, 0, this.cols+this.rows+50, 140, 350);
        // print(hue);
        let brightness = map(j, 0, this.rows, 0, 255);
        stroke(hue, 255, brightness);
        strokeWeight(1);
        point(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
      }
    }

    // this.showLine();
  }

  // showLine(){
  //   for(let x = 0; x < this.cols-1; x += 1){
  //     for(let z = 0; z < this.rows; z += 1){
  //       strokeWeight(0.5);
  //       line(
  //         this.waveParticles[x][z].x,
  //         this.waveParticles[x][z].y,
  //         this.waveParticles[x][z].z,
  //         this.waveParticles[x+1][z].x,
  //         this.waveParticles[x+1][z].y,
  //         this.waveParticles[x+1][z].z,
  //       );
  //     }
  //   }
  //
  //   for(let x = 0; x < this.cols; x += 1){
  //     for(let z = 0; z < this.rows-1; z += 1){
  //       strokeWeight(0.5);
  //       line(
  //         this.waveParticles[x][z].x,
  //         this.waveParticles[x][z].y,
  //         this.waveParticles[x][z].z,
  //         this.waveParticles[x][z+1].x,
  //         this.waveParticles[x][z+1].y,
  //         this.waveParticles[x][z+1].z,
  //       );
  //     }
  //   }
  // }


}
