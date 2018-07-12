class Clickable extends GameObj{
	constructor(x, y, w, h){
		super(x, y, w, h);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.enabled = true;
		this.isInHover = false;
	}
	
	static clickEventExists(){
		return 'click' in document.documentElement;
	}

	update(){
		if (!Clickable.clickEventExists() || !this.enabled)
			return;
		
		this.checkHover();
		this.checkClick();
	}
	
	checkClick(){
		// to add a onClickEnter and a onClickExit will be need add an onmouseup and onmousedown event
		if (!Ramu.clickedPosition.X && !Ramu.clickedPosition.Y)
			return;
		
		let rect = new Rect(Ramu.clickedPosition.X, Ramu.clickedPosition.Y, 1, 1);
		
		if (Ramu.Math.overlap(this.toRect(), rect)){
			if (!this.isClicking)
				this.isClicking = true;
			this.onClick();
		} else {
			this.isClicking = false;
		}
	}
	
	checkHover(){
		let rect = new Rect(Ramu.mousePosition.X, Ramu.mousePosition.Y, 1, 1);
		
		if (Ramu.Math.overlap(this.toRect(), rect)){
			if (!this.isInHover){
				this.isInHover = true;
				this.onHoverEnter();
				return;
			}
		} else {
			if (this.isInHover){
				this.isInHover = false;
				this.onHoverExit();
				return;
			}
		}
		
		if (this.isInHover)
			this.onHoverStay();
	}
	
	/// Virtual to be inherited
	onHoverEnter(){ }
	
	/// Virtual to be inherited
	onHoverStay(){ }
	
	/// Virtual to be inherited
	onHoverExit(){ }
	
	/// Virtual to be inherited
	onClick(){ }
}
