class SimpleSpriteButton extends Sprite{
	constructor(x, y, w, h, bottonImg, buttonHover = null, buttonClick = null){
		super(bottonImg, x, y, w, h, true);
		if (arguments.length < 5 || arguments.length > 7) throw new Error('ArgumentError: Wrong number of arguments');
		this.clickable = new Clickable(x, y, w, h);
		this.clickable.sprite = this; // created here to reference this object in clickable
		
		this.imgNormal = bottonImg;
		this.imgHover = buttonHover;
		this.imgClick = buttonClick;
		this.imgBeforeClick = bottonImg;
		
		this.onClickFunc = null;
		this.onClickFuncIsAdded = false;
		
		this.onHoverEnterFunc = null;
		this.onHoverEnterFuncIsAdded = false;

		this.onHoverExitFunc = null;
		this.onHoverExitFuncIsAdded = false;
		
		// Because there is a delay to go back to previous image, it was no need if it have a onClickEnter/Exit
		this.clicked = false;
		this.timeToCancelClickImg = 0.2;
		this.currentTimeToCancelClickImg = 0;
	}
	
	start(){
		this.updateEvents();
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
		this.onClickFunc = func;
		this.onClickFuncIsAdded = true;
	}
	
	setOnHoverEnter(func){
		this.onHoverEnterFunc = func;
		this.onHoverEnterFuncIsAdded = true;
	}
	
	setOnHoverStay(func){
		this.clickable.onHoverStay = func;
	}
	
	setOnHoverExit(func){
		this.onHoverExitFunc = func;
		this.onHoverExitFuncIsAdded = true;
	}
	
	setActive(bool){
		super.setActive(bool);
		this.clickable.setActive(bool);
	}
	
	/// Private Setter
	setToHoverImage(){
		this.clicked = false;
		if (this.imgHover)
			this.img = this.imgHover
	}
	
	/// Private Setter
	setToClickImage(){
		if (this.imgClick){
			this.clicked = true;
			this.img = this.imgClick
			this.imgBeforeClick = this.img;
			this.currentTimeToCancelClickImg = 0;
		}
	}
	
	updateEvents(){
		this.clickable.onHoverEnter = function(){
			if (this.sprite.onHoverEnterFunc){
				this.sprite.onHoverEnterFunc.call(this);
			}
			
			this.sprite.setToHoverImage();
		};
		
		this.clickable.onHoverExit = function(){
			if (this.sprite.onHoverExitFunc){
				this.sprite.onHoverExitFunc.call(this);
			}
			
			this.sprite.clicked = false;
			this.sprite.img = this.sprite.imgNormal
		};
		
		this.clickable.onClick = function(){
			if (this.sprite.onClickFunc){
				this.sprite.onClickFunc.call(this);
			}
			
			this.sprite.setToClickImage();
		};	
	}
	
	update(){
		if (this.clicked){			
			this.currentTimeToCancelClickImg += Ramu.time.delta;
			if (this.currentTimeToCancelClickImg >= this.timeToCancelClickImg){
				this.img = this.imgBeforeClick;
				this.clicked = false;
			}
		}
		
		// Because if setOnClick was written before Ramu.init then this.onClickFunc will be null and will never be called
		if (this.onClickFuncIsAdded){
			this.updateEvents();
			this.onClickFuncIsAdded = false;			
		}
		
		// Because if setOnHoverEnter was written before Ramu.init then this.onClickFunc will be null and will never be called
		if (this.onHoverEnterFuncIsAdded){
			this.updateEvents();
			this.onHoverEnterFuncIsAdded = false;			
		}
		
		// Because if setOnHoverExit was written before Ramu.init then this.onClickFunc will be null and will never be called
		if (this.onHoverEnterFuncIsAdded){
			this.updateEvents();
			this.onHoverEnterFuncIsAdded = false;			
		}
	}
	
	destroy(){
		super.destroy();
		this.clickable.destroy();
	}
}
