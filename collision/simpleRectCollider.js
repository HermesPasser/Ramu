class SimpleRectCollider extends Collider{	
	draw(){
		if (Ramu.debugMode){
			
			if (this.canCollide)
				if (this.isInCollision)
					Ramu.ctx.strokeStyle = "red";
				else Ramu.ctx.strokeStyle = "blue";	
			else Ramu.ctx.strokeStyle = "green";

			Ramu.ctx.strokeRect(this.x, this.y, this.width, this.height);
			Ramu.ctx.strokeStyle = "#000000"; // reset to default value
		}
	}
}
