/******************************************************
*
* Author : Tom Courant
*
* For : Idé Agence (http://www.ide.fr/)
*
* Date : 000
*
* Version : 1.0
* File : function.js
* 
*******************************************************/
			
$(document).ready(function() {






	// CRÉDITS
	$('#creditsLink, #creditsClose').on('click',toogleCredits);

	function toogleCredits () {
		$('#credits').toggle();
	}

	// TOUCH HANDLER
	function touchHandler(event) {
		//console.log(event.changedTouches[0])
	  var touches 	= event.changedTouches,
	  		first 		= touches[0],
	  		type 		= [];
    switch(event.type) {
	  	case "touchstart": type = ["mousedown","mouseover", "mousenter", "mousemove"];
	  	break;
	  	case "touchmove":  type = ["mousemove"];
	  	break;        
	  	case "touchend":   type = ["mouseup", "click", "mouseout", "mouseleave"];
	  	break;
	  	default: return;
		}  
	  type.forEach( function (val){
		  var simulatedEvent = document.createEvent("MouseEvent");
		  simulatedEvent.initMouseEvent(val, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
			//console.log(simulatedEvent)
			event.target.dispatchEvent(simulatedEvent);
		  event.preventDefault();
	  });
	}

	(function init(){
	  document.addEventListener("touchstart", touchHandler, true);
	  document.addEventListener("touchmove", touchHandler, true);
	  document.addEventListener("touchend", touchHandler, true);
	  document.addEventListener("touchcancel", touchHandler, true);    
	})();
	
});