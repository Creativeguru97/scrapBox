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
        translate(x, y+noise(this.offset)*50, z);
        scale(scaleValue);
        noStroke();
        model(modelName);
      pop();
  }
}
