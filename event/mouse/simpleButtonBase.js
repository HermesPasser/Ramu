/// Abstract superclass of SimpleparentBtnButton and SimpleparentBtnsheetButton
class SimpleButtonBase extends Clickable{
	constructor(x, y, w, h){
		super(x, y, w, h);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		
		this.onClickFunc = null;
		this.onClickFuncIsAdded = false;
		
		this.onHoverEnterFunc = null;
		this.onHoverEnterFuncIsAdded = false;

		this.onHoverExitFunc = null;
		this.onHoverExitFuncIsAdded = false;
		
		// Because there is a delay to go back to previous image, it was no need if it have a onClickEnter/Exit
		this.clicked = false;
		this.timeToCancelClickDrawable = 0.2;
		this.currentTimeToCancel = 0;
	}
	
	get drawableObj(){ } // Virtual
	
	set drawableImage(value) { } // Virtual
	
	get drawableImage() { } // Virtual
	
	get drawableNormal(){ } // Virtual
	
	get drawableHover(){ } // Virtual
	
	get drawableClick(){ } // Virtual
	
	set drawableBeforeClick(value){ } // Virtual
	
	get drawableBeforeClick(){ } // Virtual
	
	start(){
		this.updateEvents();
	}
	
	setRect(rect){
		if (!(rect instanceof Rect)) throw new Error('TypeError: rect must be a Rect instance');
		
		this.x = rect.x;
		this.drawableObj.x = rect.x;
		this.y = rect.y;
		this.drawableObj.y = rect.x;
	}
	
	setEnabled(bool){
		if (!(typeof(bool) === 'boolean')) throw new Error('TypeError: bool must be a Boolean instance');

		this.enabled = bool;
		this.drawableObj.enabled = bool;
	}
	
	setOnClick(func){
		if (!(typeof(func) === 'function')) throw new Error('TypeError: func must be a function');
		this.onClickFunc = func;
		this.onClickFuncIsAdded = true;
	}
	
	setOnHoverEnter(func){
		if (!(typeof(func) === 'function')) throw new Error('TypeError: func must be a function');
		this.onHoverEnterFunc = func;
		this.onHoverEnterFuncIsAdded = true;
	}
	
	setOnHoverStay(func){
		if (!(typeof(func) === 'function')) throw new Error('TypeError: func must be a function');
		this.onHoverStay = func;
	}
	
	setOnHoverExit(func){
		if (!(typeof(func) === 'function')) throw new Error('TypeError: func must be a function');
		this.onHoverExitFunc = func;
		this.onHoverExitFuncIsAdded = true;
	}
	
	_setToHoverImage(){
		this.clicked = false;
		if (this.drawableHover)
			this.drawableImage = this.drawableHover;
	}
	
	_setToClickImage(){
		if (this.drawableClick){
			this.clicked = true;
			this.drawableBeforeClick = this.drawableImage;
			this.drawableImage = this.drawableClick;
			this.currentTimeToCancel = 0;
		}
	}
	
	updateEvents(){
		this.onHoverEnter = function(){
			if (this.onHoverEnterFunc){
				this.onHoverEnterFunc.call(this);
			}
			
			this._setToHoverImage();
		};
		
		this.onHoverExit = function(){
			if (this.onHoverExitFunc){
				this.onHoverExitFunc.call(this);
			}
			
			this.clicked = false;
			this.drawableImage = this.drawableNormal;
		};
		
		this.onClick = function(){
			if (this.onClickFunc){
				this.onClickFunc.call(this);
			}
			
			this._setToClickImage();
		};	
	}
	
	setActive(bool){
		super.setActive(bool);
		this.drawableObj.setActive(bool);
	}
	
	update(){
		super.update();
		
		if (this.clicked){			
			this.currentTimeToCancel += Ramu.time.delta;
			if (this.currentTimeToCancel >= this.timeToCancelClickDrawable){
				this.drawableImage = this.drawableBeforeClick;
				this.clicked = false;
			}
		}
		
		// Because if setOnClick/OnHoverEnter/Etc was written before Ramu.init then this.onClickFunc will be null and will never be called
		
		if (this.onClickFuncIsAdded){
			this.updateEvents();
			this.onClickFuncIsAdded = false;			
		}
		
		if (this.onHoverEnterFuncIsAdded){
			this.updateEvents();
			this.onHoverEnterFuncIsAdded = false;			
		}
		
		if (this.onHoverEnterFuncIsAdded){
			this.updateEvents();
			this.onHoverEnterFuncIsAdded = false;			
		}
	}
	
	destroy(){
		super.destroy();
		this.drawableObj.destroy();
	}
}
