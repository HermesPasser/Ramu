function isEmpty(array){
	return array.length === 0;
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

function initBeforeDestroyTests(){
	console.log(" == RAMU DESTROY TESTS ==");
	console.log('');

	console.log("Objects before destroy:");
	printObjs();
	beforeDestroyTests();
}

function beforeDestroyTests(){
	if (isEmpty(Ramu.gameObjs))
		console.error("Ramu.gameObjs cannot be empty before destroy.");
	if (isEmpty(Ramu.objsToDraw))
		console.error("Ramu.objsToDraw cannot be empty before destroy.");
	if (isEmpty(Ramu.objsToCollide))
		console.error("Ramu.objsToCollide cannot be empty before destroy.");
}

function initAfterDestroyTests(){
	// This must destroy all gameObjects except the GarbageCollectionTester
	rootGameObj.destroy();

	console.log("Objects after destroy:");
	printObjs();
}

function afterDestroyTests(){
	if (Ramu.gameObjs.length !== 1)
		console.error("Ramu.gameObjs must be equals to one after destroy.");
	else 
		if (Ramu.gameObjs[0].toString() !== '<GameObj#GarbageCollectionTester>')
			console.error("Ramu.gameObjs[0] is not the GarbageCollectionTester after destroy.");
		
	if (!isEmpty(Ramu.objsToDraw))
		console.error("Ramu.objsToDraw must be empty after destroy.");
	if (!isEmpty(Ramu.objsToCollide))
		console.error("Ramu.objsToCollide must be empty after destroy.");
}

Ramu.init();

class GenericDrawableChildClass extends Drawable{
	start(){
		this.canDraw = true;

		this.number1 = 50;
		this.number2 = 150;
		this.string1 = 'string';
		
		this.gameObj1 = new GameObj();
		this.gameObj1.tag = 'n1';
		this.gameObj2 = new GameObj();
		this.gameObj2.tag = 'n2';
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

new GameObj().start = function(){
	this.tag = "GarbageCollectionTester";
	
	this.timeToDestroy = 2;
	this.currentTime = 0;
	this.frameAfterDestroyIsCalled = false;
	this.endTests = false;
	initBeforeDestroyTests();
	
	this.update = function(){
		if (this.frameAfterDestroyIsCalled && !this.endTests){
			afterDestroyTests();
			this.endTests = true;
		}
		
		this.currentTime++;
		if (this.currentTime > this.timeToDestroy && !this.frameAfterDestroyIsCalled){			
			initAfterDestroyTests();
			this.frameAfterDestroyIsCalled = true;
		}
		
	};
};

alert('See the result in the console');
