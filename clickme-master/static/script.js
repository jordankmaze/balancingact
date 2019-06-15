(function() {
    let container1 = document.getElementById("container1"), container2 = document.getElementById("container2"),
    button1 = document.getElementById("button1"), button2 = document.getElementById("button2"),
    scoreboard = document.getElementById("scoreboard"), levelboard = document.getElementById("levelboard"),
    banner = document.getElementById("banner"), elementsArray = document.querySelectorAll("button"),
    previousResults = document.getElementById("previousResults"),
    btnSwitcher = 0, lastRandomBtn = 0, repeatBtnLight = 0;

    let gameStatus = {
        speed : 2000,
        isGameGoing : true,
        score : 9,
        level : 1,
        addSpeed : function(newSpeed){
            return this.speed = newSpeed * .9;
        }
    };

    switchingLitButton = () => {
        let current = document.getElementsByClassName("btn");
        while (btnSwitcher === lastRandomBtn) {
            btnSwitcher = Math.round(Math.random());
        }
        lastRandomBtn = btnSwitcher;

        isButtonLit(btnSwitcher, current);
    }

    isButtonLit = (btnSwitcher, current) => {
        isLit = current[btnSwitcher].classList.toggle("active");
    }

    start = (speed) => {
        console.log(gameStatus);

        stop();
        repeatBtnLight = setInterval(switchingLitButton, speed)
    };

    stop = () => {
        clearTimeout(repeatBtnLight);
        repeatBtnLight = 0;
    };

    startGame = (gameStatus) => {
        button1.innerHTML = `Click`;
        button2.innerHTML = `Click`;
        if (button1.classList.contains("game-over") || button2.classList.contains("game-over")) {
            button1.classList.remove("game-over");
            button2.classList.remove("game-over");
        }
        start(gameStatus.speed);
    }

    recordPreviousResult = () => {
        previousResults.innerHTML = `Score: ${gameStatus.score} Level: ${gameStatus.level}`
    }

    gameOver = (gameStatus) => {

        recordPreviousResult();

        gameStatus.speed = 2000;
        gameStatus.level = 1;
        gameStatus.score = 0;

        stop();

        gameStatus.level = 1;
        levelboard.innerHTML = `Level: ${gameStatus.level}`;
        gameStatus.score = 0;
        scoreboard.innerHTML = `Score: ${gameStatus.score}`;

        button1.innerHTML = `GAME`;
        button2.innerHTML = `OVER`;

        button1.classList.remove("active");
        button1.classList.toggle("game-over");
        button2.classList.remove("active");
        button2.classList.toggle("game-over");        
    }

    addToScore = (gameStatus) => {
        gameStatus.score++;
        scoreboard.innerHTML = `Score: ${gameStatus.score}`;
        changeLevel(gameStatus);
    }

    changeLevel = (gameStatus) => {
        holderForPreviousScore = gameStatus.score;

        if (gameStatus.score % 10 === 0) {
            let levelNumber = gameStatus.level++;
            levelboard.innerHTML = `Level: ${levelNumber}`;

            if (gameStatus.score % 10 === 0) {
                let fasterSpeed = gameStatus.addSpeed(gameStatus.speed);
                start(fasterSpeed);
                changeLevelColor(levelNumber);
            }
            animateBanner(banner);
            //levelboard.style.backgroundClip = "content-box";
        }
    }

    changeLevelColor = (levelNumber) => {
        if (levelNumber % 2 === 0) {
            levelboard.style.background = "#FFC90E";
        }
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

    animateBanner = (banner) => {
        centerBanner(banner);
        if (gameStatus.level === 1) centerContainer(container1);
        if (gameStatus.level === 1) centerContainer(container2);
        fadeOut(banner);
    }

    centerContainer = (container) => {
        let sizeW = (window.innerWidth / 2) - (container.offsetWidth / 2);
        container.style.left = sizeW + "px";
        //console.log(container.style.left);
        let sizeH = (window.innerHeight / 2)- (container.offsetHeight / 2);
        container.style.top = sizeH + "px";
        //console.log(container.style.top);
    }

    elementsArray.forEach(function(elem) {
        elem.addEventListener("click", () => {
            let active = elem.classList.contains('active');
            let restart = elem.classList.contains('game-over');
            if (active === true) {
                addToScore(gameStatus);
                elem.classList.remove("active");
            } else if (restart === true) {
                startGame(gameStatus);
            } else {
                gameOver(gameStatus);
            }
        });
    });

    // Disable right-click on document
    document.addEventListener('contextmenu', event => event.preventDefault());
    //begin game
    animateBanner(banner);
    startGame(gameStatus);
})();