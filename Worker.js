class Worker{
	constructor(x, y){
		this.loc = createVector(x, y);
    this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.r = 255;
		this.g = random (180, 255);
		this.b = 0;
		this.rad = 20
		this.x = x;
		this.y = y;
		this.timeOut = 0;
		this.feeding = false;
		this.nectar = 0;
		this.capacity = 5;
		this.status = "roaming";
		this.lastFlower = createVector(0,0);
		this.velocityLimit = random(1.5, 4.5);
		//this.accelerationMag = 0.1;
		this.life = random(10800, 21600);
		this.dead = false;

  }

// Statuses:
// roaming- looking for food
// toHome - going to the Hive
// toFlower - going back to last flower


 move(){

	 this.x = this.loc.x;
	 this.y = this.loc.y;

	this.vel.add(this.acc);
  this.loc.add(this.vel);

	this.accelerationMag = random(0.01, 0.3);
	this.life -= 1;






if(this.status == "roaming"){

//random movement
		this.acc = p5.Vector.random2D();
		this.acc.setMag(this.accelerationMag);
		this.vel.limit(this.velocityLimit);
//bouncing off the walls
		if (this.loc.x > width - this.rad|| this.loc.x < this.rad || this.loc.y > height - this.rad || this.loc.y < this.rad) {
			let fPos = createVector(width/2, height/2);
			fPos.sub(this.loc);
			fPos.setMag(this.accelerationMag);
			this.acc = fPos;
			this.vel.limit(this.velocityLimit);
			}
		// if (this.loc.y > height || this.loc.y < 0) {
		// 		//this.acc.y = this.acc.y * -1;
		// 		this.vel.y = this.vel.y * -1;
		// 	}

//finding flowers
		for(var i = 0; i < flowers.length; i++){
			if(dist(this.loc.x, this.loc.y, flowers[i].x, flowers[i].y) < 75){
				let fPos = createVector(flowers[i].x, flowers[i].y);
				fPos.sub(this.loc);
			  fPos.setMag(this.accelerationMag);
				this.acc = fPos;
				this.vel.limit(this.velocityLimit);
			}
		}
	//eating nectar with contact
		for (var i = 0; i < flowers.length; i++){
			if(this.intersects(flowers[i]) && this.feeding == false){
				flowers[i].nectar = flowers[i].nectar - 1;
				this.feeding = true;
				this.timeOut = 30;
				this.lastFlower = flowers[i];
				this.nectar += 1;
			}
		}
		//timeout for feeding
		if(this.timeOut > 0 && this.feeding == true){
			this.timeOut -= 1;
		} else{
			this.feeding = false;
		}

		if(this.nectar >= this.capacity){
			this.status = "toHome"
	 }
}

if(this.status == "toHome"){
	let theHive = createVector(hive.x, hive.y)
	theHive.sub(this.loc);
	theHive.setMag(this.accelerationMag);
	this.acc = theHive;
	this.vel.limit(this.velocityLimit);
		if(this.intersects(hive)){
			hive.honey += 1;
			this.nectar = 0;
			this.status = "toFlower";
		}
 }

if(this.status == "toFlower"){
	let target = createVector(this.lastFlower.x, this.lastFlower.y);
	target.sub(this.loc);
	target.setMag(this.accelerationMag);
	this.acc = target;
	this.vel.limit(this.velocityLimit);
		if(this.intersects(this.lastFlower)){
			this.status = "roaming"
		}
}

if(dayNight.status == "night"){
let theHive = createVector(hive.x, hive.y + (hive.rightBoundary.y/2));
theHive.sub(this.loc);
theHive.setMag(this.accelerationMag);
this.acc = theHive;
this.vel.limit(this.velocityLimit);
}

if(this.loc.x > hive.leftBoundary.x && this.loc.x < hive.rightBoundary.x && this.loc.y < hive.rightBoundary.y){
	this.acc.add(random(-0.1,0.1), random(-0.1,0.1))
	this.acc.setMag(0.10);
	this.vel.limit(0.75);
	//console.log('in hive');
}

for(let i = 0; i < workers.length; i++){
	if(this.beeintersects(workers[i]) && this.loc !== workers[i].loc) {
				//this.acc.add(workers[i].loc.x, workers[i].loc.y);

				let fPos = createVector(workers[i].x, workers[i].y);
				fPos.sub(this.loc);
				fPos.setMag(this.accelerationMag);
				this.acc.sub(fPos);
				this.acc.setMag(random(0.01,0.15));
				this.vel.limit(this.velocityLimit);

	}

}

if(this.life < 0){
	this.status = "dead";
	this.acc.x = random(-1, 1);
	this.acc.y = random(0, 1);
	this.acc.setMag(0.07);
	this.vel.limit(50);

	if(this.y > height){
		this.dead = true;
	}
}

}




 show(){

   // line(this.loc.x, this.loc.y,this.loc.x - (this.vel.x * 10), this.loc.y - (this.vel.y *10))
	 // stroke(255, 0, 0);
	 // line(this.loc.x, this.loc.y,this.loc.x + (this.acc.x * 100), this.loc.y + (this.acc.y *100));

	 this.magnitude = this.acc.mag(this.vel);


	 push();
	 translate(this.loc.x, this.loc.y);
	 rotate(this.vel.heading())
	 strokeWeight(1.8);
	 strokeCap(SQUARE);
	 stroke(0);
	 fill(this.r,this.g,this.b);
	 ellipse(0, 0, this.rad, (this.nectar/1.5) + this.rad/1.5);
	 fill(50,50,50);
	 ellipse(10,0,this.rad/2);
	 line(-10, 0, -15, 0);
	 line(0, -((this.rad/1.5)/2), 0, (this.rad/1.5)/2);
	 line(3, -((this.rad/1.5)/2), 3, (this.rad/1.5)/2);
	 line(-3, -((this.rad/1.5)/2), -3, (this.rad/1.5)/2);
	 line(-6, -((this.rad/1.5)/2), -6, (this.rad/1.5)/2);
	 fill(255, 200);
	 noStroke();
	 triangle(5,  1, -17, -3 + (this.magnitude * 25), -12, 3 +(this.magnitude * 50));
	 triangle(5,  -1, -17, 3 - (this.magnitude * 25), -12, - 3 -(this.magnitude * 50));
	 pop();
	 //debug text
	 // textSize(24);
   // fill(0);
   // textAlign(CENTER, CENTER);
   // text(this.nectar, this.x + 20, this.y - 20);

 }

//intersects function
intersects(other){
let d = dist(this.loc.x, this.loc.y, other.x, other.y);
return (d < this.rad);
}

beeintersects(other){
let d = dist(this.loc.x, this.loc.y, other.x, other.y);
return (d < (this.rad* 1.5));
}
}
