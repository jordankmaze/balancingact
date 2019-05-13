(function() {
    let container1 = document.getElementById("container1"), container2 = document.getElementById("container2"),
    button1 = document.getElementById("button1"), button2 = document.getElementById("button2"),
    scoreboard = document.getElementById("scoreboard"), levelboard = document.getElementById("levelboard"),
    banner = document.getElementById("banner"), elementsArray = document.querySelectorAll("button"),
    score = 5, level = 1, speed = 2000, btnSwitcher = 0, lastRandomBtn = 0, repeatBtnLight = 0;

    function switchingLitButton() {
        let current = document.getElementsByClassName("btn");
        while (btnSwitcher === lastRandomBtn) {
            btnSwitcher = Math.round(Math.random());
        }
        lastRandomBtn = btnSwitcher;

        isButtonLit(btnSwitcher, current);
    }

    function start(speed) {  // use a one-off timer
        if (repeatBtnLight !== 0) return;
        repeatBtnLight = setInterval(switchingLitButton, speed);
    };

    function stop() {
        clearTimeout(repeatBtnLight);
        repeatBtnLight = 0;
    };

    startGame = (speed) => {
        button1.innerHTML = `Click`;
        button2.innerHTML = `Click`;
        if (button1.classList.contains("game-over") || button2.classList.contains("game-over")) {
            button1.classList.remove("game-over");
            button2.classList.remove("game-over");
        }
        start(speed);
    }

    isButtonLit = (btnSwitcher, current) => {
        isLit = current[btnSwitcher].classList.toggle("active");
    }

    gameOver = () => {
        stop();

        level = 1;
        levelboard.innerHTML = `Level: ${level}`;
        score = 0;
        scoreboard.innerHTML = `Score: ${score}`;
        speed = 2000;

        button1.innerHTML = `GAME`;
        button2.innerHTML = `OVER`;

        button1.classList.remove("active");
        button1.classList.toggle("game-over");
        button2.classList.remove("active");
        button2.classList.toggle("game-over");        
    }

    addToScore = () => {
        score++;
        scoreboard.innerHTML = `Score: ${score}`;
        console.log(speed);
        changeLevel(score, speed);
    }

    changeLevel = (score, speed) => {
        console.log(speed);

        if ((score === 10) || (score === 20) || (score === 30)) {
            level++;
            levelboard.innerHTML = `Level: ${level}`;
            // animateBanner with every level
            animateBanner(banner, container1);

            if (score === 10) {
                console.log(speed);

                let newSpeed = increaseSpeed(speed);
                startGame(newSpeed);
                levelboard.style.background = "#FFC90E";
            } else if (score === 20) {
                console.log(speed);

                let newSpeed = increaseSpeed(speed);
                startGame(newSpeed);
                levelboard.style.background = "orange";
            } else if (score === 30) {
                console.log(speed);

                let newSpeed = increaseSpeed(speed);
                startGame(newSpeed);
                levelboard.style.background = "#ED1C24";
            }

            levelboard.style.backgroundClip = "content-box";
        }
    }

    increaseSpeed = (speed) => {
        speed = speed * 1.2;
        return speed;
    }

    centerBanner = (banner) => {
        let div = banner.children;
        let height = banner.offsetHeight / 2;
        div[0].style.marginTop = height;
    }

    fadeOut = (element) => {
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

    animateBanner = (banner, speed) => {
        centerBanner(banner);
        if (level === 1) centerContainer(container1);
        if (level === 1) centerContainer(container2);
        fadeOut(banner);
        console.log(speed);

        startGame(speed);
    }

    centerContainer = (container) => {
        let sizeW = (window.innerWidth / 2) - (container.offsetWidth / 2);
        container.style.left = sizeW + "px";
        //console.log(container.style.left);
        let sizeH = (window.innerHeight / 2)- (container.offsetHeight / 2);
        container.style.top = sizeH + "px";
        //console.log(container.style.top);
    }

    animateBanner(banner, speed);

    elementsArray.forEach(function(elem) {
        elem.addEventListener("click", () => {
            let active = elem.classList.contains('active');
            let restartGame = elem.classList.contains('game-over');
            if (active === true) {
                addToScore();
                elem.classList.remove("active");
            } else if (restartGame === true) {
                console.log(speed);
                startGame(speed);
            } else {
                gameOver();
            }
        });
    });

    // Disable right-click on document
    document.addEventListener('contextmenu', event => event.preventDefault());
})();