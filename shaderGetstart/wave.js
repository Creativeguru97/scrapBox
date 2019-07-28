class Wave{
  constructor(){
    this.waveParticles = [];
    for(let x = -200; x < 200; x += 30){
      for(let z = -150; z < 150; z += 30){
        this.particle = createVector();

        this.particle.x = x;
        this.particle.y = 0;
        this.particle.z = z;

        this.waveParticles.push(this.particle);
      }
    }
    this.offset = 0;
  }

  showWave(step){
    this.offset += step;
    for(let i = 0; i < this.waveParticles.length; i++){
      let noiseVal = noise(this.waveParticles[i].x * this.offset, this.waveParticles[i].z * this.offset);
      this.waveParticles[i].y = -115+noiseVal*45;
        // fill(255);
        // stroke(255);
        // strokeWeight(5);
        // point(this.waveParticles[i].x, this.waveParticles[i].y, this.waveParticles[i].z);

        if(i < 130 && (i+1)%10 !== 0){
          beginShape();
          stroke(255);
          noStroke();
          strokeWeight(1);
          vertex(this.waveParticles[i].x, this.waveParticles[i].y, this.waveParticles[i].z);
          vertex(this.waveParticles[i+10].x, this.waveParticles[i+10].y, this.waveParticles[i+10].z);
          vertex(this.waveParticles[i+11].x, this.waveParticles[i+11].y, this.waveParticles[i+11].z);
          vertex(this.waveParticles[i+1].x, this.waveParticles[i+1].y, this.waveParticles[i+1].z);
          endShape();
      }
    }
  }


}
