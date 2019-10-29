// Vertical Mapping Example by Hermes Passer

class MyGame extends Drawable{
	start(){
		this.canDraw = true;
		this.SCENE = "| __________ | _____________   __________ __________ |";
		this.initial_x = 0;
		this.blocksToBeExcluded = 10; // Otherwise the scrolling just end when the initial_x is out of the canvas.
		this.ground = new Image();
		this.flying_ground = new Image();
		this.ground.src = "img/ground.png";
		this.flying_ground.src = "img/flying_ground.png";
	}
	
	update(){
		if (Ramu.isPressed('a')){
			if (this.initial_x >= 1){
				this.initial_x--;
			}  		
		} else if (Ramu.isPressed('d')){
			if (this.initial_x <= this.SCENE.length - 1 - this.blocksToBeExcluded){
				this.initial_x++;
			}
		}
	}
	
	draw(){
		Ramu.ctx.font = "13px Arial";
		Ramu.ctx.strokeStyle = "red";
		Ramu.ctx.strokeText("Simple mapping test using a array as map, press 'A' or 'D' to move.", 1, 15);
		Ramu.ctx.strokeText("by Hermes Passer.", 1, 40);
		
		Ramu.ctx.strokeStyle = "black";
		for (var i = this.initial_x, x = 0; i < this.SCENE.length; i++, x += 50){		
			if (this.SCENE[i] == "_")
				Ramu.ctx.drawImage(this.ground, x, Ramu.canvas.height -50, 50, 50);
			else if (this.SCENE[i] == "|")
				Ramu.ctx.drawImage(this.flying_ground, x, Ramu.canvas.height -50, 50, 50);
		}
	}
}

new MyGame(0,0,0,0);
Ramu.init(500, 500);
