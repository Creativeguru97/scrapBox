class Particle{
  constructor(){
  }


  show(vol, rotateAngle){
    rotateY(rotateAngle);
    rotateX(-30);

    // beginShape();//In case we use vertex
    for(let j = 0; j < 18; j++){
      for(let i = 0; i < 360; i += 10){
        offset = offset + 0.02;
        let r = map(vol, 0, 1, widthX/5, width/3);
        let x, y, z;
        if(vol == 0){
          x = r * cos(i);
          y = r * sin(i);
          // z = r * cos(i);
        }else{
          x = (r + noise(offset)*vol*120) * cos(i);
          y = (r + noise(offset)*vol*120) * sin(i);
          // z = (r + noise(offset)*vol*90) * cos(i);
        }

        colorMode(HSB);
        let hue = map(i, 0, 360, 0, 64);
        stroke((hue+310)*noise(offset/3000), 255, 255);
        strokeWeight(0.5+vol*5);
        line(x/1.05, y/1.05, x, y);

        // point(x, y, 0);
      }
      rotateY(10);
    }

    // endShape();
  }

  rotation(){

  }
}
