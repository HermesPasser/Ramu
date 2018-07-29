function isEmpty(array){
	return array.length === 0;
}

function beforeDestroyTests(){
	if (isEmpty(Ramu.gameObjs))
		console.error("Ramu.gameObjs cannot be empty before destroy.");
	if (isEmpty(Ramu.objsToDraw))
		console.error("Ramu.objsToDraw cannot be empty before destroy.");
	if (isEmpty(Ramu.objsToCollide))
		console.error("Ramu.objsToCollide cannot be empty before destroy.");
}

function afterDestroyTests(){
	if (!isEmpty(Ramu.gameObjs))
		console.error("Ramu.gameObjs must be empty after destroy.");
	if (!isEmpty(Ramu.objsToDraw))
		console.error("Ramu.objsToDraw must be empty after destroy.");
	if (!isEmpty(Ramu.objsToCollide))
		console.error("Ramu.objsToCollide must be empty after destroy.");	
}

function printObjs(){
	console.log("--- gameobjects");
	console.log(Ramu.gameObjs);
	console.log("--- drawables");
	console.log(Ramu.objsToDraw);
	console.log("--- collisor");
	console.log(Ramu.objsToCollide);
	console.log("");
}

class GenericDrawableChildClass extends Drawable{
	start(){
		this.canDraw = true;

		this.number1 = 50;
		this.number2 = 150;
		this.string1 = 'string';
		
		this.gameObj1 = new GameObj();
		this.gameObj2 = new GameObj();
		this.coll = new Collisor(1,1,1,1);
	}
	
	destroy(){
		super.destroy();
		this.coll.destroy();
		this.gameObj1.destroy();
		this.gameObj2.destroy();
	}
}

// Create all gameObjects
var rootGameObj = new GenericDrawableChildClass(0,0,0,0);

Ramu.init(500, 500);

console.log(" == RAMU DESTROY TESTS ==");
console.log('');

console.log("Objects before destroy:");
printObjs();
beforeDestroyTests();

// This must destroy all gameObjects
rootGameObj.destroy();

console.log("Objects after destroy:");
printObjs();
afterDestroyTests();

alert('See the result in the console');
