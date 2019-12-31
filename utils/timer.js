class Timer extends GameObj{
	_time = 0;
	_callback = null;
	
	constructor(time, callback, repeat = true){
		super(-1, -1, -1, -1);
		if (arguments.length < 2) throw new Error('ArgumentError: Wrong number of arguments');
		this.time = time;
		this.callback = callback;
		this._currentTime = time;
		this._repeat = repeat;
	}
	
	set repeat(repeat) {
		this._repeat = repeat
	}
	
	set time(time) {
		if (time <= 0)
			throw new Error('ValueError: The time cannot be less than or equal to 0');
		this._time = time;
	}
	
	get time() {
		return this._time;
	}
	
	set callback(func) {
		this._callback = func || (() => {});
	}
	
	start() {
		this.restart();
	}
	
	restart() {
		this._currentTime = 0;
		this.canUpdate = true;
	}
	
	get timeOut() {
		return this._currentTime >= this._time;
	}
	
	update(){
		this._currentTime += Ramu.time.delta;
		if(this.timeOut){
			this.canUpdate = false;
			this._callback();	
			if (this._repeat)
				this.restart()				
		}
	}
}