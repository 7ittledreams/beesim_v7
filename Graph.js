class Graph {
  constructor() {
    this.x = width/10;
    this.y = height - height/10;
    this.honey = [];
    this.workers = [];
    this.flowers = [];
    this.weight = 3
    this.interval = 30;
    this.text = height/45;
    //this.record();
  }

  show(){

    //strokeCap(SQUARE);
    fill(255, 200);
    rectMode(CORNERS)
    strokeWeight(10)
    stroke(0);
    rect(this.x, height-this.y, width-this.x, this.y);

    line(this.x, this.y - 140, width-this.x, this.y - 140)

    //Honey
    noFill();
    strokeWeight(this.weight);
    stroke(255, 200, 0);
    beginShape();
    for(let i = 0; i < this.honey.length; i++){
      vertex((map(i, 0, this.honey.length, this.x, width - this.x)), map(this.honey[i], 0, max(this.honey), this.y - 140, height-this.y+20));
    }
    endShape();

    //Workers
    noFill();
    strokeWeight(this.weight);
    stroke(255, 0, 0);
    beginShape();
    for(let i = 0; i < this.workers.length; i++){
      vertex((map(i, 0, this.workers.length, this.x, width - this.x)), map(this.workers[i], 0, max(this.workers), this.y - 140, height-this.y +20));
    }
    endShape();

    //Flowers
    noFill();
    strokeWeight(this.weight);
    stroke(100, 0, 255);
    beginShape();
    for(let i = 0; i < this.flowers.length; i++){
      vertex((map(i, 0, this.flowers.length, this.x, width - this.x)), map(this.flowers[i], 0, max(this.flowers), this.y - 140, height-this.y+20));
    }
    endShape();

    //let text = height / 100
    textSize(this.text);
  	fill(0);
    noStroke();
  	textAlign(LEFT, CENTER);
    fill(0);
    text("Time Elapsed: " + floor((millis()/1000)/60) + " mins", this.x + 20, this.y - 120)
    fill(240, 150, 0);
  	text("Honey: " + floor(hive.honey) + " - Max: " + floor(max(this.honey)), this.x + 20, this.y - 100);
    fill(200, 0, 0);
    text("Workers: " + workers.length + " - Max: " + floor(max(this.workers)), this.x + 20, this.y - 80);
    fill(100, 0, 255);
    text("Flowers: " + flowers.length + " - Max: " + max(this.flowers), this.x + 20, this.y - 60);
  	fill(0);
  	text("Hive Size: " + hive.cellCount + " - Brood: " + floor(hive.brood), this.x + 20, this.y - 40);
  	text("Spawn per/min: " + ceil(hive.brood/3), this.x + 20, this.y - 20);

    textAlign(RIGHT, CENTER);
    textSize(this.text);
    text("Welcome to the   ",width - this.x - 20, this.y - 120)
    text("Bee Simulator!!!  " ,width - this.x - 20, this.y - 100);
    text("Click the screen  " ,width - this.x - 20, this.y - 80);
    text("to grow a flower. " ,width - this.x - 20, this.y - 60);
    text("Click the hive      " ,width - this.x - 20, this.y - 40);
    text("to exit this menu." ,width - this.x - 20, this.y - 20);

    textAlign(CENTER, CENTER);
    textSize(this.text * 1.5);
    fill(dayNight.leafR,dayNight.leafG,dayNight.leafB);
    text(season, width/2, this.y - 160);

    noFill();
    rectMode(CORNERS)
    strokeWeight(10)
    stroke(0);
    rect(this.x, height-this.y, width-this.x, this.y);
    line(this.x, this.y - 140, width-this.x, this.y - 140)

  }


}
