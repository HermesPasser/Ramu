// Test extensions to add to next version of Ramu (0.7)

// Create click
Ramu.click = {};

// Free click
let loop = Ramu.loop;
Ramu.loop = function(){
	loop.call(this);
	Ramu.click = {};
}

// Add to next version of Ramu
class Clickable extends GameObj{
	constructor(x, y, w, h){
		super(x, y, w, h);
		this.enabled = true;
	}
	
	static clickEventExists(){
		return 'click' in document.documentElement;
	}
	
	update(){
		if (Clickable.clickEventExists() || this.enabled)
			this.checkClick();
	}
	
	checkClick(){
		if (!Ramu.click.X && !Ramu.click.Y)
			return;
			
		let rect1 = new Rect(this.x, this.y, this.width, this.height);
		let rect2 = new Rect(Ramu.click.X, Ramu.click.Y, 1, 1);
		
		if (RamuMath.overlap(rect1, rect2))
			this.onClick();
	}
	
	onClick(){ } // Virtual
}

class SimpleSpriteButton extends Sprite{
	constructor(img, x, y, w, h){
		super(img, x, y, w, h, true);
		this.clickable = new Clickable(x, y, w, h);
	}
	
	setRect(rect){
		this.x = rect.x;
		this.clickable.x = rect.x;
		this.y = rect.y;
		this.clickable.y = rect.x;
	}
	
	setEnabled(bool){
		this.clickable.enabled = bool;
	}
	
	setOnClick(func){
		this.clickable.onClick = func;
	}
		
	destroy(){
		super.destroy();
		this.clickable.destroy();
	}
}
