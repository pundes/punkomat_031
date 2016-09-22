// Based on Daniel Shiffman´s Tutorial on Kadenze

// Separation
// Via Reynolds: http://www.red3d.com/cwr/steer/

// A list of attractors
var attractors = [];
var particles = [];

var length = 8;
var counter = 350;

function setup() {
  createCanvas(windowWidth,windowHeight);

  for (var i = 0; i < 8; i++) {
    attractors.push(new Attractor(random(550, width - 550),random(350, height - 350)));
  }

  for (var i = 0; i < length; i++) {
    particles[i] = new Array();
    for(var j = 0; j < counter; j++) {
      particles[i].push(new Particles());
    }
  }
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
        strokeWeight(0.03);
        line(particles[i][j].pos.x, particles[i][j].pos.y, particles[i][j-1].pos.x, particles[i][j-1].pos.y);
      }
    }
  }

}


function mouseDragged() {
  // attractors.push(new Attractor(mouseX,mouseY));
}
