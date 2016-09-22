// The "Particles" constructor

function Particles() {
  this.pos = createVector(random(-200, width + 200), random(-200, height + 200));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 0.1;

  this.applyForce = function(force) {
    this.acc.add(force);
  };

  this.arrive = function(attractors) {
    var desired = p5.Vector.sub(attractors.pos, this.pos);
        var d = desired.mag();

    if(d < 500) {
      var m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    var steering = p5.Vector.sub(desired, this.vel);

    this.applyForce(steering);
  }

  this.isDead = function(attractors) {
    var distance = p5.Vector.sub(attractors.pos, this.pos);
    var d = distance.mag();

    if(d < 5) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.display = function() {
    fill(200);
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }
}
