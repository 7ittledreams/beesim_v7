class DayNight {
  constructor() {
    this.dayTime = 10800;
    this.nightTime = 3600;
    this.clock = this.dayTime;
    this.status = "day"
    this.stars = [];
    this.leafCount = 30;
    this.leafPos = [];
    this.leafRot = [];
    this.leafSize = [];
    this.leafFill = [];
    this.leafR = 0;
    this.leafG = 0;
    this.leafB = 0;
    this.leafScale = 300;

    for(let i = 0; i < 100; i++)
      this.stars.push(createVector(random(0, width), random(0, height)));

    //this.setLeaves(200);
  }
  show(){
    if (this.status == "night"){
      angleMode(RADIANS);
      rectMode(CORNER);
      noStroke();
      fill(0, 0, 50, sin(map(this.clock, this.nightTime, 0, 0, PI)) * 255);
      rect(0, 0, width, height);
      fill(255,(random(0,255)));
        for(let s of this.stars){
          fill(255, random(100, 200));
          ellipse(s.x, s.y, random(2, 5));
        }
    if (this.clock == (this.nightTime/2)){
      changeSeason();
      //clearLeaves();
    }

    }

    if (this.status == "day"){
      }


    if(this.clock <= 0){
      if(this.status == "night"){
        this.status = "day"
        this.clock = this.dayTime;
      }
       else if(this.status== "day"){
        this.status = "night";
        this.clock = this.nightTime;
      }
    }

    this.clock -= 1;

  }

  background(){
    for(let i = 0; i < this.leafCount; i++){
    angleMode(RADIANS);
    noStroke();
    fill(this.leafR, this.leafG + this.leafFill[i], this.leafB);
    let size = this.leafSize[i]
    push();
    beginShape();
    translate(this.leafPos[i].x, this.leafPos[i].y);
    rotate(this.leafRot[i])
    vertex(0, 0);
    bezierVertex(size * 0.25, size *0.20, size * 0.75, size * 0.20, size, 0);
    bezierVertex(size * 0.75, -size * 0.20, size * 0.25, -size * 0.20, 0, 0);
    endShape(CLOSE);
    pop();
  }
  }


  // setLeaves(size){
  //     for(let i = 0; i < this.leafCount; i++){
  //
  //   }
    //console.log("leaves");

  //}

}
