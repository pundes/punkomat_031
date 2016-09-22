// The "Attractor" constructor

function Attractor(x, y) {
  // All the usual stuff
  this.pos = createVector(x, y);
  this.r = 12;
  this.maxspeed = 0.25;    // Maximum speed
  this.maxforce = 0.1;  // Maximum steering force
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);

  var desiredseparation = 10;


  this.applyBehaviors = function(attractors) {

     var separateForce = this.separate(attractors);
     var seekForce = this.seek(createVector(width/2, height/2));

     separateForce.mult(2);
     seekForce.mult(1);

     this.applyForce(separateForce);
     this.applyForce(seekForce);
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Separation
  // Method checks for nearby Attractors and steers away
  this.separate = function(Attractors) {
   if (bool) {
      desiredseparation = desiredseparation + 0.1;
      if (desiredseparation >= 160)
        bool = false;
    } else {
      desiredseparation = desiredseparation - 0.1;
      if (desiredseparation <= 10)
        bool = true;
    }

    var sum = createVector();
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < Attractors.length; i++) {
      var d = p5.Vector.dist(this.pos, attractors[i].pos);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.pos, Attractors[i].pos);
        diff.normalize();
        diff.div(d);        // Weight by distance
        sum.add(diff);
        count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Our desired vector is the average scaled to maximum speed
      sum.normalize();
      sum.mult(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }
    return sum;
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {
    var desired = p5.Vector.sub(target,this.pos);  // A vector pointing from the location to the target

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    return steer;
  }

  // Method to update location
  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.pos.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  this.display = function() {
    fill(127);
    stroke(200);
    strokeWeight(2);
    push();
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, this.r, this.r);
    pop();
  }

  // Wraparound
  this.borders = function() {
    if (this.pos.x < -this.r) this.pos.x =  width+this.r;
    if (this.pos.y < -this.r) this.pos.y = height+this.r;
    if (this.pos.x >  width+this.r) this.pos.x = -this.r;
    if (this.pos.y > height+this.r) this.pos.y = -this.r;
  }
}
