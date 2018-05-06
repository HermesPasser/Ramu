'use strict';

// ---------------------------------- //
// Ramu 0.6 - Hermes Passer in 09/21  //
//      hermespasser.github.io        //
// blog: gladiocitrico.blogspot.com   //
// ---------------------------------- //

// para caso alguma func seja chamada no mesmo frame que o start
// criar um callnextframe para ela ser chamada apos o start 
// para não quebrar tudo

var gameObjs	   = [],
    objsToDraw 	   = [],
    objsToCollide  = [],
	updateLastPriority 	  = 0,
    drawLastPriority	  = 0,
	collisionLastPriority = 0;
