(function($) {
    var $container1 = $('#container1');
    var $container2 = $('#container2');
    var button = document.getElementById("button");
    var scoreboard = document.getElementById("scoreboard");
    var levelboard = document.getElementById("levelboard");
    var banner = document.getElementById("banner");
    var score = 0,
        level = 1,
        speed = 'slow';

    //JQUERY THAT NEEDS TO BE REMOVED
    // Disable right-click on document
    $(document).bind("contextmenu", () => {
        return false;
    });
    // center container/banner text on beginning of game 
    $(window).on('resize', function() {
        centerBanner(banner);
        if (score === 0) centerContainer($container1);
        if (score === 0) centerContainer($container2);
    });
    $(window).trigger('resize');

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
    //END JQUERY


    // New speeds in $.fx.speeds
    let slow = 2000;
    let medium = 100;
    let fast = 50;
    let insane = 10;
    // const gameSpeeds = {
    //     slow = 200,
    //     medium = 100,
    //     fast = 50,
    //     insane = 10
    // }


    //game play
    //level
    /*
    	Start after about level one banner goes away. 
    	active class is turned on for button one
    	random amount of time goes by
    	active class is turned on for button two
    	continues until you get 10 points 
    	failure restarts score
    	continue to next level with faster times
    */
    startGame = () => {
        setInterval(() => {
            var current = document.getElementsByClassName("btn");
            let btnSwitcher = Math.round(Math.random())
            current[btnSwitcher].classList.toggle("active");
            this.className += " active";
        }, slow);
    }


    button.addEventListener("click", () => {
        addToScore();
        button.classList.toggle("active");
    });

    // button2.addEventListener("click", () => {
    //     addToScore();
    //     button2.classList.toggle("active");
    // });

    // initial banner animation
    animateBanner(banner);

    addToScore = () => {
        score++;
        scoreboard.innerHTML = `Score: ${score}`;

        //animateScoreboard(scoreboard);

        // level change
        if ((score === 10) || (score === 20) || (score === 30)) {
            // update level everywhere
            level++;
            levelboard.innerHTML = `Level: ${level}`;

            // animateBanner with every level
            animateBanner(banner, $container1);


            if (score === 10) {
                speed = 'medium';
                levelboard.style.background = "#FFC90E";
            } else if (score === 20) {
                speed = 'fast';
                levelboard.style.background = "orange";
            } else if (score === 30) {
                speed = 'insane';
                levelboard.style.background = "#ED1C24";
            }

            levelboard.style.backgroundClip = "content-box";
        }
    };

    function centerBanner(banner) {
        var div = banner.children;
        var h = banner.offsetHeight / 2;
        div[0].style.marginTop = h;
    }

    function fadeOut(element) {
        var op = 1; // initial opacity
        var timer = setInterval(function() {
            if (op <= 0.1) {
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 10);
    }

    function fadeIn(element) {
        var op = 0.1; // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function() {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }

    function animateBanner(banner) {
        fadeOut(banner);
        //fadeIn(banner);
        startGame();
    }

})(jQuery);