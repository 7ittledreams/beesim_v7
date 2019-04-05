let cnv;
let workers = [];
let flowers = [];
let cells = [];
let beeCount = 1;
let flowerCount = 0;
let flowerTime = 300;
let flowerTimeLow = 900;
let flowerTimeHigh = 2700;
let hudOn = true;
let bgR = 165;
let bgG = 208;
let bgB = 255;
let season = "WINTER";

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
	cnv = createCanvas(windowWidth, windowHeight);
	centerCanvas();
	//noCursor();
	hive = new Hive();
	queen = new Queen(hive.x, hive.y);
	dayNight = new DayNight();

for(let i = 0; i < beeCount; i++){
	workers [i] = new Worker(hive.x, hive.y);
}

for (let i = 0; i < flowerCount; i++){
	flowers [i] = new Flower();
}

	graph = new Graph();

	record();
	clearLeaves();
	changeSeason();
	setInterval(record, 20000);
	//setInterval(clearLeaves, 1000);


}

function draw() {
	background(bgR, bgG, bgB);
	dayNight.background();
	hive.show();

	for(let i = 0; i < workers.length; i++){
		if(workers[i].dead == true){
		workers.splice(i, 1);

	}
	}

	for (let i = 0; i < flowers.length; i++){
	flowers[i].show();
	}

	for (let i = 0; i < workers.length; i++){
	workers[i].move();
	workers[i].show();
	}

	queen.move();
	queen.show();

	dayNight.show();

	if(hudOn == true){
	graph.show();
}

}

function keyPressed(){
	if(key == ' '){
		flowers.push(new Flower());
	}
	if(keyCode == UP_ARROW){
		hive.honey += hive.storage;
	}
	if(keyCode == DOWN_ARROW){
		hive.honey -= hive.storage;
	}

}

// function mouseClicked(){
//
//   let x = mouseX;
//   let y = mouseY;
//   let r = 100;
//   if(x > width/2 - r && x < width/2 + r && y < r ){
//    hudOn = !hudOn;
//  } else {
//   flowers.push(new Flower());
//  }
// }

function touchEnded(){
  let x = mouseX;
  let y = mouseY;
  let r = 100;
  if(x > width/2 - r && x < width/2 + r && y < r ){
    hudOn = !hudOn;
 } else {
  flowers.push(new Flower());
 }
}

function record(){
	graph.honey.push(hive.honey);
	graph.workers.push(workers.length);
	graph.flowers.push(flowers.length);
}

function windowResized() {
  centerCanvas();
}

function clearLeaves(){
	for(let i = 0; i < dayNight.leafCount; i++){
		dayNight.leafPos.splice(i, 1, createVector(random(width), random(height * 0.5, height)));
		dayNight.leafRot.splice(i, 1, random(TWO_PI));
		dayNight.leafSize.splice(i, 1,random(50, dayNight.leafScale));
		dayNight.leafFill.splice(i, 1,random(100));
	}
}

function changeSeason(){
	//SUMMER HERE
	if(season == "SPRING"){
		bgR = 120;
		bgG = 205;
		bgB = 255;
		dayNight.leafR = 90;
		dayNight.leafG = 70;
		dayNight.leafB = 0
		dayNight.leafCount = 40;
		flowerCount = 12;
		for (let i = 0; i < flowerCount; i++){
			flowers.push(new Flower());
		}
		season = "SUMMER"

		//AUTUMN HERE
	}	else if (season == "SUMMER"){
		bgR = 220;
		bgG = 240;
		bgB = 255;
		dayNight.leafR = 220
		dayNight.leafG = 100;
		dayNight.leafB = 0;
		dayNight.leafCount = 30;
		flowerCount = 8;
		for (let i = 0; i < flowerCount; i++){
			flowers.push(new Flower());
		}

		season = "AUTUMN"
	}
	//WINTER HERE
	else if (season == "AUTUMN"){
		bgR = 200;
		bgG = 205;
		bgB = 210;

		dayNight.leafR = 100;
		dayNight.leafG = 50;
		dayNight.leafB = 0;
		dayNight.leafCount = 20;
		flowerCount = 5;
		for (let i = 0; i < flowerCount; i++){
			flowers.push(new Flower());
		}

		season = "WINTER"
	}
	//SPRING HERE
	else if (season == "WINTER"){
		bgR = 170;
		bgG = 210;
		bgB = 255;

		dayNight.leafR = 0;
		dayNight.leafG = 100;
		dayNight.leafB = 50;
		dayNight.leafCount = 50;
		flowerCount = 15;
		for (let i = 0; i < flowerCount; i++){
			flowers.push(new Flower());
		}

		season = "SPRING"
	}
	clearLeaves();
}
