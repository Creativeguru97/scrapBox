class SphericalWave{
  constructor(scl, cols, rows, damping){
    this.waveParticles = [];
    this.cols = cols;
    this.rows = rows;
    this.scl = scl;
    this.xAdd = 0.01;
    this.xOffset = 0;
    this.danping = damping;

    this.previousWaveAdd = [];
    for(let i = 0; i < this.cols; i++){
      this.previousWaveAdd[i] = [];
      for(let j = 0; j < this.rows; j++){
        this.previousWaveAdd[i][j] = 0;
      }
    }

    this.currentWaveAdd = [];
    for(let i = 0; i < this.cols; i++){
      this.currentWaveAdd[i] = [];
      for(let j = 0; j < this.rows; j++){
        this.currentWaveAdd[i][j] = 0;
      }
    }
  }

  showWave(){
    this.xAdd += 0.02;
    this.xOffset = this.xAdd;

    for(let i = 0; i < this.cols; i += 1){

      this.waveParticles[i] = [];
      this.zOffset = 0;

      //--- This is the ripple effects!!! ---
      for(let j = 0; j < this.rows+1; j += 1){

        if(i>1 && i<this.cols-1 && j>1 && j<this.rows-1){
          this.currentWaveAdd[i][j] = (
          (
            this.previousWaveAdd[i-1][j]
            +this.previousWaveAdd[i+1][j]
            +this.previousWaveAdd[i][j-1]
            +this.previousWaveAdd[i][j+1]
          )/2 - this.currentWaveAdd[i][j]
          );
        }else{
          this.currentWaveAdd[i][j] = 0;
        }

        this.currentWaveAdd[i][j] = this.currentWaveAdd[i][j] * this.danping;
        //------------------------------------

        //--- Wave ---
        let noiseVal = noise(this.zOffset, this.xOffset);
        //------------

        this.particle = createVector();

        let r = 250+map(noiseVal, 0, 1, -15, 15)+this.currentWaveAdd[i][j];
        this.particle.x = r * sin(j*PI/this.rows)*cos(i*TWO_PI/this.cols);
        this.particle.y = r * sin(j*PI/this.rows)*sin(i*TWO_PI/this.cols);
        this.particle.z = r * cos(j*PI/this.rows);

        this.waveParticles[i][j] = this.particle;
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


  pointMode(){
    for(let i = this.cols/5; i < this.cols*4/5; i++){
      for(let j = 1; j < this.rows; j++){
        let hue = map(j+noise(this.zOffset, this.xOffset)*20, 0, this.rows+20, 150, 300);
        let brightness = map(this.waveParticles[i][j].x, -250, 30, 255, 0);
        let weight = map(this.waveParticles[i][j].x, -250, 20, 12, 6);

        stroke(hue, 255, brightness);
        strokeWeight(weight);
        point(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
      }
    }
  }

  lineMode(){
    for(let i = this.cols/5; i < this.cols*4/5; i+=1){
      for(let j = 0; j < this.rows; j+=1){
        let hue = map(j+noise(this.zOffset, this.xOffset)*20, 0, this.rows+20, 150, 300);
        let brightness = map(this.waveParticles[i][j].x, -250, 20, 255, 0);
        let weight = map(this.waveParticles[i][j].y, 80, 220, 15, 0);
        stroke(hue, 255, brightness);
        strokeWeight(1);

        if(i == this.cols-1){
          beginShape(LINES);
            vertex(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
            vertex(this.waveParticles[0][j].x, this.waveParticles[0][j].y, this.waveParticles[0][j].z);
            vertex(this.waveParticles[i][j].x, this.waveParticles[i][j].y, this.waveParticles[i][j].z);
            vertex(this.waveParticles[i][j+1].x, this.waveParticles[i][j+1].y, this.waveParticles[i][j+1].z);
          endShape();
        }else{
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
}
