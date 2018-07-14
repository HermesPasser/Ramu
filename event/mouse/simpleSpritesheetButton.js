class SimpleSpritesheetButton extends SimpleButtonBase{
	constructor(x, y, w, h, img, rectNormal, rectHover = null, rectClick = null){
		super(x, y, w, h);
		if (arguments.length < 6 || arguments.length > 8) throw new Error('ArgumentError: Wrong number of arguments');
		this.spritesheet = new Spritesheet(img, rectNormal, x, y, w, h);
		this.rectNormal = rectNormal;
		this.rectHover = rectHover;
		this.rectClick = rectClick;
		this.rectBeforeClick = rectNormal;
	}

	get drawableObj(){
		return this.spritesheet;
	}
	
	set drawableImage(rect){
		if (!(rect instanceof Rect)) throw Ramu.Utils.CustomTypeError(rect, Rect);
		this.spritesheet.setSheet(rect);
	}
	
	get drawableImage(){
		return this.spritesheet.sheet;
	}
		
	get drawableNormal(){
		return this.rectNormal;
	}
	
	get drawableHover(){
		return this.rectHover;
	}
	
	get drawableClick(){
		return this.rectClick;
	}
	
	set drawableBeforeClick(rect){
		if (!(rect instanceof Rect)) throw Ramu.Utils.CustomTypeError(rect, Rect);
		this.rectBeforeClick = rect;
	}
	
	get drawableBeforeClick(){
		return this.rectBeforeClick;
	}
}
