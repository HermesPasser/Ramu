// Mapping Test by Hermes Passer in 09-13-27 using Ramu 0.2

class MyGame extends Drawable{
	start(){
		this.SCENE = "|_____________ _____________   __________ ___________|";
		this.initial_x = 0;
		this.blocksToBeExcluded = 45; // Otherwise the scrolling just end when the initial_x is out of the canvas.
	}
	
	update(){
		if (Ramu.lastKeyPressed == 97){ 		// A
			if (this.initial_x >= 1){
				this.initial_x--;
			}  
			
		} else if (Ramu.lastKeyPressed == 100){ // D
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
		for (var i = this.initial_x, x = 0; i < this.SCENE.length; i++, x += 10){		
			if (this.SCENE[i] == "_")
				ctx.strokeRect(x, canvas.height -10, 10, 10);
			else if (this.SCENE[i] == "|")
				ctx.strokeRect(x, canvas.height -20, 10, 10);
			else x += 10
		}
	}
}
	
new MyGame(0,0,0,0);

Ramu.init();