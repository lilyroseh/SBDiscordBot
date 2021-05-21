// Daniel Shiffman
// Mathematical Roses
// Video: https://youtu.be/f5QBExMNB1I
// Based on: https://en.wikipedia.org/wiki/Rose_(mathematics)
// https://thecodingtrain.com/CodingChallenges/055-roses.html

var sliderD;
var sliderN;

var flowers = [];
const { ipcRenderer } = require("electron");

function initListeners() {
  ipcRenderer.on("messageDiscord", this.onMessage.bind(this));
  ipcRenderer.on("messageEmbedDiscord", this.onMessageEmbed.bind(this));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sliderD = createSlider(1, 20, 5, 1);
  sliderN = createSlider(1, 20, 10, 1);
  sliderD.input(draw);
  sliderN.input(draw);

  onMessage();

  ipcRenderer.on("messageDiscord", (event, message) => {
    console.log(message);
    const margin = 0.2;
    if (message.startsWith("bloom")) {
      console.log("boom");

      // if (message.content.includes("✾")) {
      // this.showNotification("Like from discord");
      const petals = message.split("").filter((c) => c === "✾");
      n = petals.length || sliderN.value();

      const largeur = message.split("").filter((c) => c === "❁");
      d = largeur.length || sliderD.value();
      // }
      // let red = message.split("").filter((c) => c === "❤️");
      // r = red.length * 10 || fill(255, 0, 0);

      // let green = message.split("").filter((c) => c === "💚");
      // g = green.length * 2 || fill(1, 0, 0);
      // // }
      // let blue = message.split("").filter((c) => c === "💙");
      // b = blue.length * 2 || fill(1, 0, 0);

      //const angle = random(TWO_PI);
      //const { x, y } = p5.Vector.fromAngle(angle, height / 2);

      
      
      createNewFlower({
        x: random(width * margin, width * (1 - margin)),
        y: random(height * margin, height * (1 - margin)),
        r: 0,
        g: 0,
        b: random(0, 100),
        d,
        n,
        radius: random(10, 300),
        speedx: random(-1, 1),
        speedy: random(-1, 2),
      });

    }

    if (message.startsWith("🌸")) {
      //const angle = random(TWO_PI);
      //const { x, y } = p5.Vector.fromAngle(angle, height / 4);
      createNewFlower({
        x: random(width * margin, width * (1 - margin)),
        y: random(height * margin, height * (1 - margin)),
        r: 0,
        g: 0,
        b: random(0, 100),
        d: 19,
        n: 3,
        radius: random(10, 200),
        speedx: random(-1, 3),
        speedy: random(-1, 1),
      });
    }

    if (message.startsWith("🌹")) {
      //const angle = random(TWO_PI);
      //const { x, y } = p5.Vector.fromAngle(angle, height / 2);
      createNewFlower({
        x: random(width * margin, width * (1 - margin)),
        y: random(height * margin, height * (1 - margin)),
        r: 0,
        g: 0,
        b: random(0, 100),
        d: 40,
        n: 50,
        radius: random(100, 200),
        speedx: random(-1, 2),
        speedy: random(-1, 1),
      });
    }

    if (message.startsWith("🌻")) {
      //const angle = random(TWO_PI);
      //const { x, y } = p5.Vector.fromAngle(angle, height / 2);
      createNewFlower({
        x: random(width * margin, width * (1 - margin)),
        y: random(height * margin, height * (1 - margin)),
        r: 0,
        g: 0,
        b: random(0,100),
        d: 10,
        n: 100,
        radius: random(10, 300),
        speedx: random(-1, 1),
        speedy: random(-1, 2),
      });
    }

    // createNewFlower({
    //   x: random(width * margin, width * (1 - margin)),
    //   y: random(height * margin, height * (1 - margin)),
    //   r: random(0, 250),
    //   g: random(0, 250),
    //   b: random(0, 250),
    //   //y: random(height * margin, height * (1 - margin)),
    //   d: sliderD.value(),
    //   n: sliderN.value(),
    //   radius: random(100, 200),
    // });
  });
  background(0, 10, 30);
  //flower = new Flower(sliderD.value(), sliderN.value(), 200);
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 10, 30, 2);
  var d = sliderD.value();
  var n = sliderN.value();

  push();
  stroke(255);
  noFill();

  //drawingContext.setLineDash([1, 2]);
  strokeWeight(0.5);

  for (let flower of flowers) {
    flower.animate(0.03);
    
  }

  if (flowers.length >= 7) {
    let index = 7;
    flowers.shift();
  }
  // console.log(background);
}
function onMessage(event, message) {
  // console.log(message);
}

function mousePressed() {
  
  createNewFlower({
    x: mouseX,
    y: mouseY,
    r: 0,
    g: 0,
    
    b: random(0, 150),
    d: sliderD.value(),
    n: sliderN.value(),
    radius: random(100, 200),
    speedx: random(-1, 1),
    speedy: random(-1, 1),
  });

  // this.flower.varySize();
}

function createNewFlower(params) {
  flowers.push(new Flower(params));
}
