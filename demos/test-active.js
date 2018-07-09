
function setActiveObjs(isActive){
	sprite.setActive(isActive);
}

function resetValuesToSeeIfItChangeEvenDeactivated(){
	update_count = 0;
	draw_count = 0;
	onCollision = 0;
}

function TestIfIsDeactivated(){
	TestsIfIsDeactivatedMessageCalled = true;
	
	if (update_count !== 0){
		console.error("The update was called even after be deativated.");
		return;
	}
	if (draw_count !== 0){
		console.error("The draw was called even after be deativated.");
		return;
	}
	if (onCollision !== 0){
		console.error("The onCollision was called even after be deativated.");
		return;
	}
	
	console.log("No one was called. Everything is okay.")
}

var timeToDeactivate = 1;
var currentTimeToDeactivate = 0;
var deativateMessageCalled = false;

var timeToTestsIfIsDeactivated = 1;
var currentTimeToTestsIfIsDeactivated = 0;
var TestsIfIsDeactivatedMessageCalled = false;

let loop = Ramu.loop;
Ramu.loop = function(){
	
	loop.call(this);
	currentTimeToDeactivate += Ramu.time.delta;
	if (currentTimeToDeactivate >= timeToDeactivate && !deativateMessageCalled){
		console.log("Calling setActive")
		deativateMessageCalled = true;
		setActiveObjs(false);
		resetValuesToSeeIfItChangeEvenDeactivated();
	}
	
	if (deativateMessageCalled){
		currentTimeToTestsIfIsDeactivated += Ramu.time.delta;
		if (currentTimeToTestsIfIsDeactivated >= timeToTestsIfIsDeactivated && !TestsIfIsDeactivatedMessageCalled)
			TestIfIsDeactivated();	
	}
}

var update_count = 0;
let update = GameObj.prototype.update;
GameObj.prototype.update = function(){
	update.call(this);
	update_count++;
}

var draw_count = 0;
let draw = Drawable.prototype.draw;
Drawable.prototype.draw = function(){
	draw.call(this);
	draw_count++;
}

var onCollision_count = 0;
Collisor.prototype.onCollision = function(){
	onCollision_count++;
}

console.log(" == RAMU SETACTIVE(false) TESTS ==");

var sprite = new Sprite(Ramu.Utils.getImage("img/flying_ground.png"), 1, 1, 50, 50);

var col1 = new Collisor(10, 1, 50, 50);
var col2 = new Collisor(10, 1, 50, 50);

// add complex objs?

Ramu.init();

alert('See the result in the console');
