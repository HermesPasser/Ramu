class SimpleSpriteButton extends SimpleButtonBase{
	constructor(x, y, w, h, bottonImg, buttonHover = null, buttonClick = null){
		super(x, y, w, h);
		if (arguments.length < 5 || arguments.length > 7) throw new Error('ArgumentError: Wrong number of arguments');
		this.sprite = new Sprite(bottonImg, x, y, w, h);		
		this.imgNormal = bottonImg;
		this.imgHover = buttonHover;
		this.imgClick = buttonClick;
		this.imgBeforeClick = bottonImg;
	}

	get drawableObj(){
		return this.sprite;
	}
	
	set drawableImage(img){
		if (!(img instanceof Image)) throw new Error('TypeError: img must be a Image instance');
		this.sprite.img = img;
	}
	
	get drawableImage(){
		return this.sprite.img;
	}
		
	get drawableNormal(){
		return this.imgNormal;
	}
	
	get drawableHover(){
		return this.imgHover;
	}
	
	get drawableClick(){
		return this.imgClick;
	}
	
	set drawableBeforeClick(img){
		if (!(img instanceof Image)) throw new Error('TypeError: img must be a Image instance');
		this.rectBeforeClick = img;
	}
	
	get drawableBeforeClick(){
		return this.imgBeforeClick;
	}
}
