(function ($) {
	var $container1 = $('#container1');
	var $container2 = $('#container2');
	var button1 = document.getElementById("button1");
	var button2 = document.getElementById("button2");
	var scoreboard = document.getElementById("scoreboard");
	var $levelboard = $('#levelboard');
	var $banner = $('div#banner');
	var score = 0, level = 1, speed = 'slow';

	// Disable right-click on document
	$(document).bind("contextmenu", () => {
		return false;
	});

	// New speeds in $.fx.speeds
	$.fx.speeds.slow = 200;
	$.fx.speeds.medium = 100;
	$.fx.speeds.fast = 50;
	$.fx.speeds.insane = 10;

	// center container/banner text on beginning of game 
	$(window).on('resize', function() {
		centerBanner($banner);
		if (score === 0) centerContainer($container1);
		if (score === 0) centerContainer($container2);
	});
	// trigger initial resize when page is opened
	$(window).trigger('resize');

	// initial banner animation
	animateBanner($banner);

	addToScore = () => {
		score++;
		scoreboard.innerHTML = `Score: ${score}`;

		//animateScoreboard(scoreboard);

		// level change
		if ( (score === 10) || (score === 20) || (score === 30) ) {
			// update level everywhere
			level ++;
			$levelboard.text('Level: ' + level);
			$banner.find('div').text('Level ' + level);

			// animateBanner with every level
			animateBanner($banner, $container1);


			if ( score === 10 ) {
				speed = 'medium';
				$levelboard.css({'background': '#FFC90E'});
			} else if ( score === 20 ) {
				speed = 'fast';
				$levelboard.css({'background': 'orange'});
			} else if ( score === 30 ) {
				speed = 'insane';
				$levelboard.css({'background': '#ED1C24'});
			}

			$levelboard.css({
				'-webkit-background-clip': 'content-box',
				'-moz-background-clip': 'content-box',
				'background-clip': 'content-box'
			});
		}
	};

	// on button click
	button1.addEventListener("mousedown", () => {
		addToScore();	
		//var header = document.getElementById("whole-thing");
		//var btns = header.getElementsByClassName("btn");
		//or (var i = 0; i < btns.length; i++) {
			//btns[i].addEventListener("click", function() {
				var current = document.getElementsByClassName("active");
				current[0].className = current[0].className.replace(" active", "");
				this.className += " active";
			//});
		//}
	});

	button2.addEventListener("mousedown", () => {
		addToScore();
	});
	
	function centerBanner (banner) {
		var div = banner.children('div');
		var h = ( banner.outerHeight() - div.height() ) / 2;
		div.css('margin-top', h + 'px');
	}

	function centerContainer(container1) {
		container1.css({
			'left': (window.innerWidth / 2 - container1.outerWidth() / 2) + 'px',
			'top': (window.innerHeight / 2 - container1.outerHeight() / 2) + 'px'
		});
	}

	// function animateScoreboard (scoreboard) {
	// 	scoreboard.animate({
	// 		'box-shadow': '-2px 2px 100px rgba(0,0,0,.3)'
	// 	}, 100).animate({
	// 		'box-shadow': '-2px 2px 10px rgba(0,0,0,.3)'
	// 	}, 500);
	// }

	function animateBanner ($banner) {
		$banner.fadeIn(400).delay(1000).fadeOut(400);
	}

})(jQuery);