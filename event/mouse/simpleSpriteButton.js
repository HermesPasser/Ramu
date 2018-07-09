class SimpleSpriteButton extends Sprite{
	constructor(img, x, y, w, h){
		super(img, x, y, w, h, true);
		if (arguments.length != 5) throw new Error('ArgumentError: Wrong number of arguments');
		this.clickable = new Clickable(x, y, w, h);
	}
	
	setRect(rect){
		if (!(rect instanceof Rect)) throw Ramu.Utils.CustomTypeError(rect, Rect);
		
		this.x = rect.x;
		this.clickable.x = rect.x;
		this.y = rect.y;
		this.clickable.y = rect.x;
	}
	
	setEnabled(bool){
		if (!(typeof(bool) == 'boolean')) throw Ramu.Utils.CustomTypeError(bool, Boolean);
		this.clickable.enabled = bool;
	}
	
	setOnClick(func){
		this.clickable.onClick = func;
	}
	
	setActive(bool){
		super.setActive(bool);
		this.clickable.setActive(bool);
	}
	
	destroy(){
		super.destroy();
		this.clickable.destroy();
	}
}
