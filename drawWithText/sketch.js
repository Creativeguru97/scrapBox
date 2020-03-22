let x = 0;
let y = 0;

let stepSize = 5.0;

let font;
let letters = "Coding is very fun, why you still haven't started?  ";
let fontSizeMin = 3;
let angleDistortion = 0.0;

let counter = 0;

function setup(){
  createCanvas(displayWidth, displayHeight);
  background(255);
  smooth();
  cursor(CROSS);

  textFont("Helvetica", fontSizeMin);
  textAlign(LEFT);
  fill(0);
}

function draw(){
  if(mouseIsPressed){
    let d = dist(x, y, mouseX, mouseY);//Calsulete distance mouse moved since last frame.
    textFont('Helvetica', fontSizeMin+d/2);//Decide size from the distance.
    let newLetter = letters.charAt(counter);//A "counter"-th character in the "letters" sentence.
    stepSize = textWidth(newLetter);

    if(d > stepSize){
      let angle = atan2(mouseY-y, mouseX-x);//I love this function, Very intersting!!!

      push();
      translate(x, y);//Move coordinate origin
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);//Draw a character on the new origin.
      pop();

      counter++;
      if(counter > letters.length-1) counter = 0;//If reached to end of the sentence, go back to the head.

      x = x + cos(angle)*stepSize;
      y = y + sin(angle)*stepSize;
    }
  }
}

function mousePressed(){
  x = mouseX;
  y = mouseY;
}



function keyReleased(){
  //No longer available?
  //if(key == 'c') GenerativeDesign.saveASE(this, colors, timestamp()+".ase");
  // if(key == 's') saveFrame(timestamp()+"_##.png");
  // if(key == 'p') savePDF = true;

  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);//Erase all

}

function keyPressed(){
  if(keyCode == UP_ARROW) angleDistortion += 0.1;
  if(keyCode == DOWN_ARROW) angleDistortion -= 0.1;
}
