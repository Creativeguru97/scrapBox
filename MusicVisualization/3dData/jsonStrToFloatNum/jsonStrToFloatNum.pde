JSONArray strings;
JSONArray coordinates;

void setup(){
  //strings = loadJSONArray("data/skull.json");
  //strings = loadJSONArray("data/headphone.json");
  strings = loadJSONArray("data/noid.json");
  coordinates = new JSONArray();
  
  for (int i = 0; i < strings.size(); i++) {
    JSONObject eachStrings = strings.getJSONObject(i); 
    float x = eachStrings.getFloat("x");
    float y = eachStrings.getFloat("y");
    float z = eachStrings.getFloat("z");
     
    JSONObject coordinate = new JSONObject();
    
    coordinate.setFloat("x", x);
    coordinate.setFloat("y", y);
    coordinate.setFloat("z", z);
    coordinates.setJSONObject(i, coordinate);
  }
  
  saveJSONArray(coordinates, "noid.json");
  
}
