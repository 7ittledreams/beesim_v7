class Queen {
  constructor(x, y) {
    this.loc = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 150;
    this.g = 100;
    this.b = 0;
    this.rad = 25;
    this.x = x;
    this.y = y;
    this.velocityLimit = 1;
    this.accelerationMag = 0.1;
    this.nectar = 0;
  }

  move(){
  this.x = this.loc.x;
 	this.y = this.loc.y;

 	this.vel.add(this.acc);
  this.loc.add(this.vel);



  //random movement
  		this.acc = p5.Vector.random2D();
  		this.acc.setMag(this.accelerationMag);
  		this.vel.limit(this.velocityLimit);
  //bouncing off the walls
  		if (this.loc.x > hive.rightBoundary.x - 10|| this.loc.x < hive.leftBoundary.x + 10 || this.loc.y > hive.rightBoundary.y - 10 || this.loc.y < hive.leftBoundary.y + 10) {
  			let fPos = createVector(hive.x, hive.y);
  			fPos.sub(this.loc);
  			fPos.setMag(this.accelerationMag);
  			this.acc = fPos;
  			this.vel.limit(this.velocityLimit);
  			}
  }

  show(){

 	 push();
 	 translate(this.loc.x, this.loc.y);
 	 rotate(this.vel.heading())
 	 strokeWeight(1.7);
 	 stroke(0);
 	 fill(this.r,this.g,this.b);
 	 ellipse(0, 0, this.rad * 1.5, this.rad/1.5);
 	 fill(50, 50, 50);
 	 ellipse(16,0,this.rad/2);

 	 line(0, -((this.rad/1.5)/2), 0, (this.rad/1.5)/2);
 	 line(3, -((this.rad/1.5)/2), 3, (this.rad/1.5)/2);
 	 line(-3, -((this.rad/1.5)/2), -3, (this.rad/1.5)/2);
 	 line(-6, -((this.rad/1.5)/2), -6, (this.rad/1.5)/2);
   line(6, -((this.rad/1.5)/2.2), 6, (this.rad/1.5)/2.2);
   line(-9, -((this.rad/1.5)/2.2), -9, (this.rad/1.5)/2.2);
 	 fill(255, 100);
 	 noStroke();
 	 triangle(10,  1, -17, -4, -12, 6);
 	 triangle(10,  -1, -17, 4, -12, -6);
 	 pop();
  }
}
