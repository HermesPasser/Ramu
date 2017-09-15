// Mapping Test by Hermes Passer in 09-13-27 using Ramu 0.2

class MyGame extends Drawable{
	start(){
		this.SCENE = "| __________ | _____________   __________ __________ |";
		this.initial_x = 0;
		this.blocksToBeExcluded = 10; // Otherwise the scrolling just end when the initial_x is out of the canvas.
		this.ground = new Image();
		this.flying_ground = new Image();
		this.ground.src = "img/ground.png";
		this.flying_ground.src = "img/flying_ground.png";
	}
	
	update(){
		if (Ramu.lastKeyPressed == 97 || Ramu.lastKeyPressed == keyCode.a){ // A
			if (this.initial_x >= 1){
				this.initial_x--;
			}  
			
		} else if (Ramu.lastKeyPressed == 100 || Ramu.lastKeyPressed == keyCode.d){ // D
			if (this.initial_x <= this.SCENE.length - 1 - this.blocksToBeExcluded){
				this.initial_x++;
			}
		}
	}
	
	draw(){
		ctx.font="13px Arial";
		ctx.strokeStyle = "red";
		ctx.strokeText("Simple mapping test using a array as map, press 'A' or 'D' to move.", 1, 15);
		ctx.strokeText("by Hermes Passer.", 1, 40);
		
		ctx.strokeStyle = "black";
		for (var i = this.initial_x, x = 0; i < this.SCENE.length; i++, x += 50){		
			if (this.SCENE[i] == "_")
				ctx.drawImage(this.ground, x, canvas.height -50, 50, 50);
			else if (this.SCENE[i] == "|")
				ctx.drawImage(this.flying_ground, x, canvas.height -50, 50, 50);
		}
	}
}

new MyGame(0,0,0,0);

Ramu.init();