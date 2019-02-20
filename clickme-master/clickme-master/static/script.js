(function() {
    var container1 = document.getElementById("container1");
    var container2 = document.getElementById("container2");
    var button = document.getElementById("button");
    var scoreboard = document.getElementById("scoreboard");
    var levelboard = document.getElementById("levelboard");
    var banner = document.getElementById("banner");
    var score = 0,
        level = 1,
        speed = 'slow';

    // Disable right-click on document
    document.addEventListener('contextmenu', event => event.preventDefault());

    function centerContainer(container) {
        container.style.left = window.innerWidth / 2 - container.offsetWidth / 2;
        container.style.top = window.innerHeight / 2 - container.offsetHeight / 2;
    }

    // New speeds
    let slow = 2000;
    let medium = 1000;
    let fast = 500;
    let insane = 250;

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
    startGame = (speed) => {
        setInterval(() => {
            var current = document.getElementsByClassName("btn");
            let btnSwitcher = Math.round(Math.random())
            current[btnSwitcher].classList.toggle("active");
            this.className += " active";
        }, speed);
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
            animateBanner(banner, container1);


            if (score === 10) {
                speed = medium;
                startGame(speed);
                levelboard.style.background = "#FFC90E";
            } else if (score === 20) {
                speed = fast;
                startGame(speed);
                levelboard.style.background = "orange";
            } else if (score === 30) {
                speed = insane;
                startGame(speed);
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
        centerBanner(banner);
        if (score === 0) centerContainer(container1);
        if (score === 0) centerContainer(container2);
        fadeOut(banner);
        //fadeIn(banner);
        startGame(slow);
        
    }

})();