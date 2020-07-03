float a_length = 11.6;
float b_length = 16.8;
float c_length = 9.4;
float d_length = 9.4;
float e_length = 10.0;
float f_length = 10.1;
float g_length = 8.3;
float h_length = 12.9;
float i_length = 15.7;
float j_length = 18.5;
float k_length = 3.1;



float multiplier = 0.5;

void setup(){
  multiply();
}

void multiply(){
  println("A: " + a_length * multiplier);
  println("B: " + b_length * multiplier);
  println("C: " + c_length * multiplier);
  println("D: " + d_length * multiplier);
  println("E: " + e_length * multiplier);
  println("F: " + f_length * multiplier);
  println("G: " + g_length * multiplier);
  println("H: " + h_length * multiplier);
  println("I: " + i_length * multiplier);
  println("J: " + j_length * multiplier);
  println("K: " + k_length * multiplier);
}
