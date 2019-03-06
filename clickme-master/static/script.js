(function() {
    let container1 = document.getElementById("container1");
    let container2 = document.getElementById("container2");
    let wholeThing = document.getElementById("whole-thing");
    let button1 = document.getElementById("button1");
    let button2 = document.getElementById("button2");
    let scoreboard = document.getElementById("scoreboard");
    let levelboard = document.getElementById("levelboard");
    let banner = document.getElementById("banner");
    let score = 0,
        level = 1,
        speed = 'slow';
    //Speeds
    let slow = 2000;
    let medium = 1500;
    let fast = 1000;
    let insane = 500;
    let btnSwitcher = 0;
    let lastRandomBtn = 0;

    // Disable right-click on document
    document.addEventListener('contextmenu', event => event.preventDefault());

    function centerContainer(container) {
        container.style.left = window.innerWidth / 2 - container.offsetWidth / 2;
        console.log(container.style.left);
        container.style.top = window.innerHeight / 2 - container.offsetHeight / 2;
        console.log(container.style.top);
    }

    switchingLitButton = () => {
        let current = document.getElementsByClassName("btn");

        while (btnSwitcher === lastRandomBtn) {
            btnSwitcher = Math.round(Math.random());
        }
        lastRandomBtn = btnSwitcher;

        isButtonLit(btnSwitcher, current)
    };

    

    startGame = (speed) => {        

        button1.innerHTML = `Click`;
        button2.innerHTML = `Click`;
        if (button1.classList.contains("game-over") || button2.classList.contains("game-over")) {
            button1.classList.toggle("game-over");
            button2.classList.toggle("game-over");
        }
        repeatBtnLight = setInterval(switchingLitButton, speed);
    };

    

    isButtonLit = (btnSwitcher, current) => {
        isLit = current[btnSwitcher].classList.toggle("active");
    }

    button1.addEventListener("click", () => {
        let active = button1.classList.contains('active');
        let restartGame = button1.classList.contains('game-over');
        if (active === true) {
            addToScore();
            button1.classList.toggle("active");
        } else if (restartGame === true) {
            startGame(slow);
        } else {
            gameOver();
        }
    });

    button2.addEventListener("click", () => {        
        let active = button2.classList.contains('active');
        let restartGame = button2.classList.contains('game-over');
        if (active === true) {
            addToScore();
            button2.classList.toggle("active");
        } else if (restartGame === true) {
            startGame(slow);
            clearInterval(repeatBtnLight);

        } else {
            gameOver();
        }
    });

    gameOver = () => {
        level = 1;
        levelboard.innerHTML = `Level: ${level}`;
        score = 0;
        scoreboard.innerHTML = `Score: ${score}`;

        button1.innerHTML = `GAME`;
        button2.innerHTML = `OVER`;
        if (button1.classList) {
            console.log(button1.classList)
        }
        button1.classList.remove("active");
        button1.classList.toggle("game-over");
        button2.classList.remove("active");
        button2.classList.toggle("game-over");

        clearInterval(repeatBtnLight);
    }

    addToScore = () => {
        score++;
        scoreboard.innerHTML = `Score: ${score}`;

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

    enableBtn = (isButtonLit) => {
        //let isButtonLit = current[btnSwitcher].classList.toggle("active");
        //console.log(isButtonLit);
        return isButtonLit;
    }

    disableBtn = () => {
        //button1.disabled = true;
        //button2.disabled = true;
    }

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
        }, 100);
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

    animateBanner(banner);

    function animateBanner(banner) {
        centerBanner(banner);
        if (score === 0) centerContainer(container1);
        if (score === 0) centerContainer(container2);
        if (score === 0) centerContainer(wholeThing);
        fadeOut(banner);
        startGame(slow);
    }

})();