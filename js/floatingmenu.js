/* 
*	floatingmenu.js
*	Copyright (c) 2014 by Richard Graham Morrill
*
*/

//start menu positioning

var oldPosition = 0;
var newPosition;
var stopPosition;
var scrollingDown = 1;
var scrollingUp = 0;
var catchPosition = 0;

function getPosition() {
	newPosition = $(window).scrollTop();
}

function updatePosition() {
	oldPosition = newPosition;
}

function scrollUp() {
	if (scrollingUp == 0) {
		$('#menubar').css('position', 'absolute');
		catchPosition = newPosition - 67;
		if (catchPosition < 0) {
			catchPosition = 0;
		}
		$('#menubar').css('top', catchPosition);
		scrollingUp = 1;
		scrollingDown = 0;
	} else {
		if (newPosition <= catchPosition) {
			$('#menubar').css('position', 'fixed');
			$('#menubar').css('top', 0);
			scrollingDown = 0;
		}
	}
}

function positionMenu() {
	getPosition();
	if (oldPosition > newPosition) {
		scrollUp();
	} else if (scrollingDown == 0) {
		$('#menubar').css('position', 'absolute');
		$('#menubar').css('top', newPosition);
		scrollingDown = 1;
		scrollingUp = 0;
	}
	updatePosition();
}


$(document).scroll(function() {
	positionMenu();
});

$(function() {
	$("ul.root-menu li#has-child").hoverIntent(function(){
		$('ul',this).css('display', 'block');
		TweenMax.to($('ul',this), 0.2, {
			display:"block",
			autoAlpha:"100",
			transform:"scale(1,1)",
			ease:Power2.easeOut
		});

		}, function(){
		TweenMax.to($('ul',this), 0.5, {
			autoAlpha:"0",
			transform:"scale(0.01,0.01)",
			display:"none",
			ease:Power4.easeIn
		});
		}
	);
	$("ul.sub-menu li").hover(function() {
		TweenMax.to($('div',this), 0.7, {
			rotationX:"360_ccw",
			ease:Power4.easeOut
		});
	}, function() {
		TweenMax.to($('div',this), 0, {
			rotationX:"0"
		});
	});

});
