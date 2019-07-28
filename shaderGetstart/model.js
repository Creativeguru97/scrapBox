class Model{
  constructor(){
    this.offset = 0;
  }

  show(modelName, x, y, z, scaleValue, modelNoiseValue, material){
    this.offset += modelNoiseValue;
      if(material == "specular"){
        specularMaterial(0, 0, 0, 255);
      }else if(material == "ambient"){
        ambientMaterial(0, 0, 0, 255);
      }
      push();
        translate(0, -30+noise(this.offset)*50, 0);
        scale(scaleValue);
        noStroke();
        model(modelName);
      pop();
  }
}
