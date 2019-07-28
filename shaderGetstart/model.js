class Model{
  constructor(){

  }

  show(modelName, scaleValue, material){
    if(material == "specular"){
      specularMaterial(0, 0, 0, 255);
    }else if(material == "ambient"){
      ambientMaterial(0, 0, 0, 255);
    }
    scale(scaleValue);
    model(modelName);
  }
}
