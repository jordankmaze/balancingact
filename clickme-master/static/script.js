(function() {
    let container1 = document.getElementById("container1"),
    container2 = document.getElementById("container2"),
    button1 = document.getElementById("button1"),
    button2 = document.getElementById("button2"),
    scoreboard = document.getElementById("scoreboard"),
    levelboard = document.getElementById("levelboard"),
    banner = document.getElementById("banner"),
    elementsArray = document.querySelectorAll("button"),
    score = 0, 
    level = 1, 
    speed = 2000, 
    btnSwitcher = 0,
    lastRandomBtn = 0;

    // Disable right-click on document
    document.addEventListener('contextmenu', event => event.preventDefault());

    centerContainer = (container) => {
        let sizeW = (window.innerWidth / 2) - (container.offsetWidth / 2);
        container.style.left = sizeW + "px";
        console.log(container.style.left);
        let sizeH = (window.innerHeight / 2)- (container.offsetHeight / 2);
        container.style.top = sizeH + "px";
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
    }

    isButtonLit = (btnSwitcher, current) => {
        isLit = current[btnSwitcher].classList.toggle("active");
    }

    elementsArray.forEach(function(elem) {
        elem.addEventListener("click", () => {
            let active = elem.classList.contains('active');
            let restartGame = elem.classList.contains('game-over');
            if (active === true) {
                addToScore();
                elem.classList.toggle("active");
            } else if (restartGame === true) {
                startGame(speed);
                clearInterval(repeatBtnLight);
            } else {
                gameOver();
            }
        });
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
                speed = speed * .2;
                startGame(speed);
                levelboard.style.background = "#FFC90E";
            } else if (score === 20) {
                speed = speed * .2;
                startGame(speed);
                levelboard.style.background = "orange";
            } else if (score === 30) {
                speed = ispeed * .2;
                startGame(speed);
                levelboard.style.background = "#ED1C24";
            }

            levelboard.style.backgroundClip = "content-box";
        }
    }

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
        fadeOut(banner);
        startGame(speed);
    }
})();