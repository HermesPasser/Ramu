class Clickable extends GameObj{
	constructor(x, y, w, h){
		super(x, y, w, h);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
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
		if (!Ramu.clickedPosition.X && !Ramu.clickedPosition.Y)
			return;
			
		let rect1 = new Rect(this.x, this.y, this.width, this.height);
		let rect2 = new Rect(Ramu.clickedPosition.X, Ramu.clickedPosition.Y, 1, 1);
		
		if (Ramu.Math.overlap(rect1, rect2))
			this.onClick();
	}
	
	/// Virtual to be inherited
	onClick(){ }
}
