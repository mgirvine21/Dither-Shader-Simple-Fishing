//Press [E] to catch the fish while it swims through the green zone!

let shaderProgram;
let ditherTex;
let catchZone;
let caught = false;
let fishPos;
let message = "";
let messageTimer = 0;
let myFont;
let caughtFishPositions = [];

function preload() {
  shaderProgram = loadShader("shader.vert", "shader.frag");
  ditherTex = loadImage("dither3.png");
  ditherTex2 = loadImage("dither1.png");
  fishModel = loadModel("wahoo.obj", true);
  dockModel = loadModel("dock.obj", true);
  myFont = loadFont("PressStart2P-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(myFont);
  catchZone = {
    pos: createVector(90, 85, 10),
    size: 60,
  };
  noStroke();
  angleMode(DEGREES);
}

function draw() {
  orbitControl();
  shader(shaderProgram);

  const t = millis() * 0.05;
  shaderProgram.setUniform("uTexture", ditherTex);
  shaderProgram.setUniform("uResolution", [width, height]);
  shaderProgram.setUniform("uLightDir", [sin(t), 0, cos(t)]);
  shaderProgram.setUniform("lightColor", [0.18, 0.67, 0.55]);

  background(10, 34, 28);

  drawCatchZone();

  drawMoon(t);

  drawPond(t);

  drawFish(t);

  if (millis() - messageTimer < 2000 && message !== "") {
    push();
    rotateY(-45);
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(25);
    text(message, 200, -50, -300);
    pop();
  }
}

function drawMoon(t) {
  push();
  shaderProgram.setUniform("darkColor", [.05, .16, .14]);
  translate(0, -200);
  sphere(50);
  pop();

  //moon reflection
  shaderProgram.setUniform("uTexture", ditherTex2);
  shaderProgram.setUniform("uLightDir", [sin(t), -0.5, cos(t)]);
  shaderProgram.setUniform("lightColor", [0.15, 0.65, 0.52]);
  shaderProgram.setUniform("darkColor", [0.08, 0.47, 0.39]);
  push();
  translate(0, 100);
  scale(1, 0.1);
  sphere(100);
  pop();
}

function drawPond(t) {
  push();
  shaderProgram.setUniform("uTexture", ditherTex2);
  shaderProgram.setUniform("uLightDir", [sin(t), -0.5, 1]);
  shaderProgram.setUniform("lightColor", [0.08, 0.47, 0.39]);
  shaderProgram.setUniform("darkColor", [0.02, 0.37, 0.29]);
  rotate(180);
  scale(3);
  translate(-35, -20);
  model(dockModel);
  pop();
}

function drawFish(t) {
  push();
  rotateX(180);
  translate(0, -95);

  let angle = (0 * 360) / 10;
  let r = 90;

  //changing posision
  let x = r * cos(angle + t);
  let z = r * sin(angle + t);
  let y = 15 * sin(angle + t * 5);

  fishPos = createVector(x, y + 95, z); // offset for earlier translate

  //tangent to path
  let dx = cos(angle + t * 1.0);
  let dy = -sin(angle + t * 1.0);

  let rotationAngle = atan2(dy, dx);
  translate(x, y, z);
  rotateY(rotationAngle + 270);
  scale(0.3);
  shaderProgram.setUniform("uTexture", ditherTex2);
  shaderProgram.setUniform("lightColor", [0.25, 0.7, 0.6]);
  shaderProgram.setUniform("darkColor", [0.63, 0.45, 0.3]);
  model(fishModel);
  pop();

  for (let pos of caughtFishPositions) {
    push();
    translate(pos.x, pos.y, pos.z);
    rotateX(180);
    rotateZ(random(85, 95));
    scale(0.3);
    shaderProgram.setUniform("uTexture", ditherTex2);
    shaderProgram.setUniform("lightColor", [0.25, 0.7, 0.6]);
    shaderProgram.setUniform("darkColor", [0.63, 0.45, 0.3]);
    model(fishModel);
    pop();
  }
}

function drawCatchZone() {
  push();
  translate(catchZone.pos.x, catchZone.pos.y, catchZone.pos.z);
  noFill();
  stroke(0, 255, 0);
  box(catchZone.size);
  pop();
}

function keyPressed() {
  if (key === "e") {
    // Check if fish is in the catch zone
    let d = dist(
      fishPos.x,
      fishPos.y,
      fishPos.z,
      catchZone.pos.x,
      catchZone.pos.y,
      catchZone.pos.z
    );
    
    
    if (d < catchZone.size / 2) {
      caught = true;
      message = "You caught the fish!";
      let x = 250 + random(-15, 15);
       let yOffset = 30; // distance between each fish
      //let y = 50 + random(-15, 15);
      let y = 50 - caughtFishPositions.length * yOffset;
      let z = -20 + random(-15, 15);
      caughtFishPositions.push(createVector(x, y, z));
    } else {
      message = "Missed!";
    }
    
  //Ttrying to make the fish spawn at different locations on the dock and bucket
    
//         if (d < catchZone.size / 2) {
//       caught = true;
//       message = "You caught the fish!";
      
//       if (caughtFishPositions.length < 3) {
//         let x = 250 + random(-10, 10);
//         let y = 50 + random(-5, 5);
//         let z = -20 + random(-10, 10);
//         caughtFishPositions.push(createVector(x, y, z));
//       } else {
//         let x = 180;
//         let yOffset = 25;
//         let y = 40 + (caughtFishPositions.length - 3) * yOffset;
//         caughtFishPositions.push(createVector(x, y, z));
//       }

//     } else {
//       message = "Missed!";
//     }
    
    messageTimer = millis();
  }
}
