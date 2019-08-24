//------- Condortable lovely p5 world -------//
//-------------------------------------------//

let canvas0;
let hudCanvas;


let button;
let microphone;
let isListening = false;


//----- HUD canvas -----
canvas0 = p => { //let canvas0 = function(p){...
  p.setup = () => {
    p.createDiv();
    gridCanvas = p.createCanvas(720, 405);
    gridCanvas.id("hudCanvas");

    microphone = new p5.AudioIn(p.print("Unknown error occured"));
    // microphone.start();
    button = p.createButton("microphone ON");
    button.id("button");
    button.mousePressed(p.togglePlaying);
  }

  p.togglePlaying = () => {
  if(isListening == false){
    microphone.start();
    button.html("microphone OFF");
    isListening = true;
  }else if(isListening == true){
    microphone.stop();
    button.html("microphone ON");
    isListening = false;
  }
}

  p.draw = () => {
    // p.blendMode(p.ADD);

    p.clear();
    p.emotionalStatesHUD(25, 240);
    p.micHUD(630, 380);
  }

  p.emotionalStatesHUD = (x, y) => {
    // p.fill(255, 127);
    // p.rect(x-10, y-30, 155, 185, 8);

    p.noStroke();
    p.fill(120, 210, 255);
    // p.fill(255);
    p.textFont('Helvetica Neue');
    p.textSize(18);
    p.text("Emotional States", x, y-8);
    p.textSize(14);
    if(expressions != undefined){
      p.text("neutral:      "+p.nf(neutral*100, 2, 2)+"%", x, y+20);
      p.text("happy:       "+p.nf(happy*100, 2, 2)+"%", x, y+40);
      p.text("angry:        "+p.nf(angry*100, 2, 2)+"%", x, y+60);
      p.text("sad:           "+p.nf(sad*100, 2, 2)+"%", x, y+80);
      p.text("disgusted: "+p.nf(disgusted*100, 2, 2)+"%", x, y+100);
      p.text("surprised:  "+p.nf(surprised*100, 2, 2)+"%", x, y+120);
      p.text("fearful:       "+p.nf(fearful*100, 2, 2)+"%", x, y+140);
    }else{
      p.text("neutral:   ", x, y+20);
      p.text("happy:     ", x, y+40);
      p.text("angry:     ", x, y+60);
      p.text("sad:       ", x, y+80);
      p.text("disgusted: ", x, y+100);
      p.text("surprised: ", x, y+120);
      p.text("fearful:   ", x, y+140);
    }

  }

  p.micHUD = (x, y) => {
    let audioLevel = p.constrain(microphone.getLevel()*600, 0, 300);
    // p.print(audioLevel);

    p.fill(120, 210, 255, 110);
    p.strokeWeight(2);
    p.stroke(120, 210, 255, 200);
    if(isListening == false){
      p.rect(x, y, 30, -(5+audioLevel));
      p.rect(x+35, y, 30, -(5+audioLevel));
    }else if (isListening == true) {
      p.rect(x, y, 30, -(5+audioLevel+p.random(0, 10)));
      p.rect(x+35, y, 30, -(5+audioLevel+p.random(0, 10)));
    }
  }
}

let myp5 = new p5(canvas0, 'hudCanvas');
