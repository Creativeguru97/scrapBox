class Element{
  constructor(modelName){
    this.modelName = [];
    for(let i = 0; i < modelName.coordinate.length; i++){
      let particle = new Particle();
      particle.position.x = modelName.coordinate[i].x * 100;
      particle.position.y = modelName.coordinate[i].y * -100;
      particle.position.z = modelName.coordinate[i].z * 100;

      this.modelName.push(particle);
    }
  }

  showVertexNum(){
    console.log(this.modelName.length);
  }

  showModel(min, max){
    for(let i = min; i < max; i++){
      strokeWeight(3.5 + pointWeightSlider.value());
      point(
        this.modelName[i].position.x,
        this.modelName[i].position.y,
        this.modelName[i].position.z
      );
    }
  }
}
