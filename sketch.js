var starterPos = 20;

var cubeA;
var cubeB;

var massA;
var massB;

var countCol = 0;

var timeStep;

var digits = 5;

function setup() {
	createCanvas(700, 500);
	frameRate(100);

	textSize(17);

	digits;

	timeStep = 1/pow(10, digits);

	massA = 1;
	massB = massA * pow(10, 2*digits);

	cubeA = new cube(100, massA, 30, 50);
	cubeB = new cube(250, massB, 60, 200);

	cubeB.vel = -1;
}

function draw() {
	background(0);
	translate(starterPos, height-starterPos);

	createWorld();

	cubeA.show();
	cubeB.show();

	for(var i = 0; i < 1/timeStep; i++) {
		cubeA.update();
		cubeA.collideWithCube(cubeB);
		
		cubeB.update();

		//cubeA.outOfScreen();
	}

	drawText("π = " + PI + "...", 15, -height+2*starterPos);
	drawText("Colisions: " + countCol, 15, -height+3*starterPos);
	drawText("m1 = " + massA + ", m2 = m1*10^" + 2*digits, 15, -height+4*starterPos);
}

function drawText(txt, x, y) {
  fill(255);
  text(txt, x, y);
}

function createWorld() {
	stroke(255);
	line(0, 1, -1, -height+1);
	line(0, 1, width, 1);
}

function cube(pos, mass, sz, clr) {
	this.x = pos;
	this.y = 0;

	this.mass = mass;
	this.sz = sz;
	this.clr = clr;

	this.vel = 0;

	this.show = function() {
	    stroke(255);
		fill(this.clr);
		rect(this.x, 0, this.sz, -this.sz);
  	}

  	this.update = function() {
  		if(this.x <= 0) {
  			this.vel = -this.vel;
  			countCol++;
  		}

  		this.x += this.vel*timeStep;
  	}

  	this.outOfScreen = function() {
  		if(this.x > width - starterPos) {
  			console.log(countCol);
  			//end
  		}
  	}

  	this.collideWithCube = function(cube) {
  		if(this.x + this.sz >= cube.x && this.x <= cube.x + cube.sz) {
  			this.newVel = (((this.mass-cube.mass)*this.vel)/(this.mass+cube.mass))+((2*cube.mass*cube.vel)/(this.mass+cube.mass));
  			cube.vel = (((cube.mass-this.mass)*cube.vel)/(this.mass+cube.mass))+((2*this.mass*this.vel)/(this.mass+cube.mass));

  			countCol++;
  			
  			this.vel = this.newVel;
  		}
  	}
}