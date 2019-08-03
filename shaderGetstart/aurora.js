class Aurora{
  // (0, 0, -100, 100, 10, 10)
  constructor(positionX, positionY, positionZ, startX, endX, startY, endY, stepX, stepY){
    this.positionX = positionX;
    this.positionY = positionY;
    this.positionZ = positionZ;
    this.startX = startX;
    this.endX = endX;
    this.startY = startY;
    this.endY = endY;

    this.stepX = stepX;
    this.stepY = stepY;

    this.rowLength = (this.endY+this.positionY) - (this.startY+this.positionY);
    print(this.rowLength);

    this.auroraParticles = [];
    for(let x = this.startX+this.positionX; x < this.endX+this.positionX; x += this.stepX){
      for(let y = this.startY+this.positionY; y < this.endY+this.positionY; y += this.stepY){
        this.particle = createVector();
        this.particle.x = x;
        this.particle.y = y;
        this.particle.z = this.positionZ;

        this.auroraParticles.push(this.particle);
      }
    }
    print(this.auroraParticles);
    this.offset = 0.0001;
  }

  show(){
    for(let i = this.auroraParticles.length-1; i > 0; i--){
      beginShape();
      stroke(155, 255, 50);
      strokeWeight(50);

      let noiseVal = noise(this.auroraParticles[i].x * this.offset);
      this.auroraParticles[i].z = noiseVal*20000;
      if(i%20 == 0){
        this.offset += 0.000000001;
      }
      // point(this.auroraParticles[i].x,
      //     this.auroraParticles[i].y,
      //     this.auroraParticles[i].z);
      if((i-1)%(this.rowLength/this.stepY) != 0){
        line(
          this.auroraParticles[i].x,
          this.auroraParticles[i].y,
          this.auroraParticles[i].z,
          this.auroraParticles[i-1].x,
          this.auroraParticles[i-1].y,
          this.auroraParticles[i-1].z,
        );
      }
    }

  }


}
