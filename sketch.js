// Based on Daniel Shiffman´s Tutorial on Kadenze

// Separation
// Via Reynolds: http://www.red3d.com/cwr/steer/

// A list of attractors
var attractors = [];
var particles = [];

var length = 6;
var counter;
var val;
var bool;

var noise;
var filter, filterFreq, filterWidth;

function setup() {
  createCanvas(windowWidth,windowHeight);

  for (var i = 0; i < length; i++) {
    attractors.push(new Attractor(random(550, width - 550),random(350, height - 350)));
  }

  for (var i = 0; i < length; i++) {
    particles[i] = new Array();
    rand();
    for(var j = 0; j < counter; j++) {
      particles[i].push(new Particles());
    }
  }

  //Sound
  filter = new p5.BandPass();
  noise = new p5.Noise();
  noise.disconnect();
  filter.process(noise);
  noise.start();
  noise.amp(5);
}

function draw() {
  background(0);

  for (var i = 0; i < attractors.length; i++) {
    attractors[i].applyBehaviors(attractors);
    attractors[i].update();
    attractors[i].borders();
    //attractors[i].display();
  }

  for( var i = 0; i < particles.length; i++) {
    for(var j = 0; j < particles[i].length; j++) {
      //particles[i][j].display();
      for(var m = 0; m < attractors.length; m++) {
        if(i === m) {
          particles[i][j].arrive(attractors[m]);
        }
        particles[i][j].update();
        //particles[i][j].display();

        if(particles[i][j].isDead(attractors[m])) {
          particles[i][j].pos.x = random(-200, width + 200), random(-200, height + 200);
          particles[i][j].pos.y = random(-200, width + 200), random(-200, height + 200);
        }
      }
      if(j > 0 && j < particles[i].length) {
        stroke(200, 200, 200);
        strokeWeight(0.015);
        line(particles[i][j].pos.x, particles[i][j].pos.y, particles[i][j-1].pos.x, particles[i][j-1].pos.y);
      }
    }
  }
  //Sound
  filterFreq = 350;
  filterWidth = 67.5;
  filter.set(filterFreq, filterWidth);
}

function freq() {
  if (bool) {
     filterFreq = filterFreq + 0.1;
     if (desiredseparation >= 350)
       bool = false;
   } else {
     filterFreq = filterFreq - 0.1;
     if (desiredseparation <= 500)
       bool = true;
   }
}


function rand() {
  var min = 1;
  var max = 4;
  val = Math.round(Math.random() * (max - min)) + min;

  if(val === 1)
    counter = 250;
  else if(val === 2)
    counter = 500;
  else if(val === 3)
    counter = 750;
  else if(val = 4)
    counter = 1000;

  return counter;
}
