// --------------------------------- //
// Ramu 0.1 - Hermes Passer in 08/09 //
// --------------------------------- //

var FRAME 	   = 1000/60;
var DEBUG_MODE = false;

var objsToDraw 	  = [];
var objsToCollide = [];

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var lastKeyPressed;
var inLoop = true;

class GameObj{
	constructor(){
		this.tag = "";
	}
	
	onStart() { } // Virtual
	
	onUpdate() { } // Virtual
}

class Drawble extends GameObj{
	constructor(x, y, width, height){
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.canDraw = true;
		
		objsToDraw.push(this);
	}
	
	drawInCanvas(){
		if (this.canDraw) this.draw()
	}
	
	draw(){ } // Virtual
}

class Collisor extends Drawble{
	constructor(x, y, width, height){
		super(x,y, width, height);
		this.canCollide = true;
		this.isInCollision = false;
		objsToCollide.push(this);
	}
	
	onUpdate(){
		this.canDraw = DEBUG_MODE;
	}
	
	onCollision(){ } // Virtual

	checkCollision(){
		if(!this.canCollide) return;
		
		for (var i = 0; i < objsToCollide.length; i++){
			if (objsToCollide[i] === this || !objsToCollide[i].canCollide) // Para não testar consigo mesmo
				continue;
			
			if (this.x < objsToCollide[i].x + objsToCollide[i].width &&
				   this.x + this.width > objsToCollide[i].x &&
				   this.y < objsToCollide[i].y + objsToCollide[i].height &&
				   this.height + this.y > objsToCollide[i].y){
			
				this.isInCollision = true;
				this.onCollision();
			} else this.isInCollision = false;
		}
	}
}

class RectCollisor extends Collisor{
	constructor(x, y, width, height){
		super(x, y, width, height);
	}
	
	draw(){
		if (!this.isInCollision)
			ctx.strokeStyle = "blue";
		else ctx.strokeStyle = "red";

		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = "#000000"; // reset default value
	}
}

class Ramu{
	 
	static input(){
		document.body.onkeypress = function(e) {
			lastKeyPressed = (e.keyCode || e.which);
		}
	}
	
	static loop(){
		
		if (inLoop){
			Ramu.onUpdate();
			Ramu.checkCollision();
			Ramu.draw();
		}

		window.requestAnimationFrame(Ramu.loop, FRAME);
	}
	
	static stopLoop(){
		inLoop = false;
	}
	
	static resumeLoop(){
		inLoop = true;
	}
	
	static init(){
		Ramu.input();
		Ramu.onStart();
		Ramu.loop();
	}
	
	static onStart(){
		for (var i = 0; i < objsToDraw.length; i++)
			objsToDraw[i].onStart();	
	}
	
	static onUpdate(){
		for (var i = 0; i < objsToDraw.length; i++)
			objsToDraw[i].onUpdate();	
		lastKeyPressed = null;
	}
	
	static checkCollision(){
		for (var i = 0; i < objsToCollide.length; i++)
			objsToCollide[i].checkCollision();
	}
	
	static draw(){	
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		for (var i = 0; i < objsToDraw.length; i++){
			var positionWidth = objsToDraw[i].x + objsToDraw[i].width;		
			var positionHeigh = objsToDraw[i].y + objsToDraw[i].height;
			
			if (positionWidth >= 0 && objsToDraw[i].x <= canvas.width && // Renderiza somente o que esta no canvas
					positionHeigh>= 0 && objsToDraw[i].y <= canvas.height)
				objsToDraw[i].drawInCanvas();
		}
	}
}