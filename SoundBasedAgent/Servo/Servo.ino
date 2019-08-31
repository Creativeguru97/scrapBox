#include <Servo.h>

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position
int incomingByte;   // variable for holding the data from p5.jsf

void setup() {
  Serial.begin(9600);
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}

void loop() {

  // read the input from p5.js and use that data to controle the second LED light
  if (Serial.available() > 0) {   // see if there's incoming serial data
   incomingByte = Serial.read();  // read it and store it in the variable
   pos = map(incomingByte, 20, 160, 160, 20);
  } else { }
   
  myservo.write(pos);              // tell servo to go to position in variable 'pos'
  delay(10);                       // waits 15ms for the servo to reach the position
}
