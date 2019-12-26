class SimpleRectCollider extends Collider{	
	draw(){
		if (Ramu.debugMode) {
			if (this.canCollide)
				Ramu.ctx.strokeStyle = this.isInCollision ? 'red' : 'blue';
			else 
				Ramu.ctx.strokeStyle = 'green';
			Ramu.ctx.strokeRect(this.x, this.y, this.width, this.height);
		}
	}
}
