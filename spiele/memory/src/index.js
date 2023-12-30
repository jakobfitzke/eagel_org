function memory() {
    class InputHandler {
        constructor() {
            document.addEventListener('keydown', (event) => {
                switch (event.keyCode) {
                    default:
                        break;
                }
            });
            document.addEventListener('keyup', (event) => {
                switch (event.keyCode) {
                    default:
                        break;
                }
            });
        }
    }

    const GAMESTATE = {
        MENU: 0,
        RUNNING: 1,
        END: 2
    };

    class Card {
        constructor(game, position, number, height) {
            this.image = document.getElementById('back');
            this.position = position;
            this.height = height;
            this.width = height * 0.75;
            this.markedForDeletion = false;
            this.visible = false;
            this.number = number;
            this.game = game;
        }

        update() {
            if (this.visible) {
                this.image = document.getElementById('card' + this.number);
            }
            else {
                this.image = document.getElementById('back');
            }
        }

        draw(ctx) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    }

    function buildLevel(game) {
        var topbottomMargin = 30;
        var leftrightMargin = 30;
        const YRatio = 6;
        var spaceY = (game.gameHeight - topbottomMargin * 2) / (game.rows * YRatio - 1);
        var cardHeight = spaceY * (YRatio - 1);
        var cardWidth = cardHeight * 0.75;
        var spaceX = (game.gameWidth - leftrightMargin * 2 - game.lines * cardWidth) / (game.lines - 1)
        var cardNumbers = [];
        var cards = [];
        for (var i = 1; i <= game.lines * game.rows / 2; i++) {
            cardNumbers[cardNumbers.length] = i;
            cardNumbers[cardNumbers.length] = i;
        }

        for (var i = 0; i < game.lines; i++) {
            for (var i2 = 0; i2 < game.rows; i2++) {
                var random = Math.floor(Math.random() * cardNumbers.length);
                var cardNumber = cardNumbers.splice(random, 1)[0];
                let position = { x: leftrightMargin + i * (cardWidth + spaceX), y: topbottomMargin + i2 * (cardHeight + spaceY) };
                cards.push(new Card(game, position, cardNumber, cardHeight));
            }
        }
        return cards;
    }

    class Game {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.gameObjects = [];
            this.gamestate = GAMESTATE.MENU;
            new InputHandler();
            this.time = 0;
            this.globalTime = 0;

            this.lines = 8;
            this.rows = 4;
        }

        start() {
            this.gameObjects = [];
            this.gamestate = GAMESTATE.RUNNING;
            this.cards = buildLevel(this);
            //setInterval(increase, 100);
            this.visibleCards = [];
            this.waitingForInput = true;
            this.next = '';
            this.startTime = game.globalTime;
        }

        update(deltaTime) {
            if (
                this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.END
            ) {
                return;
            }
            this.cards = this.cards.filter((card) => !card.markedForDeletion);
            [...this.gameObjects, ...this.cards].forEach((object) =>
                object.update(deltaTime)
            );
        }

        draw(ctx) {
            //var bg = document.getElementById('bg');
            //ctx.drawImage(bg, 0, 0);
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fill();

            if (this.gamestate === GAMESTATE.RUNNING) {
                [...this.gameObjects, ...this.cards].forEach((object) => object.draw(ctx));
            }

            ctx.font = 'bold 60px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            if (this.gamestate === GAMESTATE.RUNNING) {
                this.time = Math.round((this.globalTime - this.startTime) / 10) / 100;
            }
            ctx.fillText(this.time, 10, 55);

            if (this.gamestate === GAMESTATE.MENU) {
                ctx.rect(0, 0, this.gameWidth, this.gameHeight);
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fill();

                ctx.font = 'bold 40px Arial';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.textAlign = 'center';
                ctx.fillText(
                    'Klicke, um zu starten',
                    this.gameWidth / 2,
                    this.gameHeight / 2 + 20
                );
            }

            else if (this.gamestate === GAMESTATE.END) {
                ctx.rect(0, 0, this.gameWidth, this.gameHeight);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.fill();
                ctx.font = 'bold 50px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(
                    'Yay',
                    this.gameWidth / 2,
                    this.gameHeight / 2
                );
                ctx.font = 'bold 30px Arial';
                ctx.fillText(
                    'Das waren ' + this.time + ' Sekunden',
                    this.gameWidth / 2,
                    this.gameHeight / 2 + 50
                )
            }
        }
    }

    let canvas = document.getElementById('gameScreenMemory');
    let ctx = canvas.getContext('2d');

    let game_width = document.getElementById('gameScreenMemory').width;
    let game_height = document.getElementById('gameScreenMemory').height;

    /*
    var game_width = 0;
    var game_height = 0;
    
    if (window.innerWidth < window.innerHeight * 1.5) {
        game_width = window.innerWidth - 50;
        game_height = window.innerWidth / 1.5 - 50;
    }
    else {
        game_width = window.innerHeight * 1.5 - 50;
        game_height = window.innerHeight - 50;
    }
    
    document.getElementById('gameScreenMemory').width = game_width;
    document.getElementById('gameScreenMemory').height = game_height;
    */


    let game = new Game(game_width, game_height);

    var fullScreenCanvas = document.querySelector('canvas');

    var mouseX = 0;
    var mouseY = 0;

    function detectCollision(xPoint, yPoint, x, y, width, height) {
        return xPoint > x && xPoint < x + width && yPoint > y && yPoint < y + height;
    }

    function fullScreen() {
        var el = document.getElementById('gameScreenMemory')
        if (el.webkitRequestFullScreen) {
            el.webkitRequestFullScreen();
        }
        else {
            el.mozRequestFullScreen();
        }
    }

    function checkClick(object) {
        if (detectCollision(mouseX, mouseY, object.position.x, object.position.y, object.width, object.height)) {
            if (!object.visible) {
                object.visible = true;
                game.visibleCards.push(object);
            }
        }
    }

    function hide() {
        game.visibleCards[0].visible = false;
        game.visibleCards[1].visible = false;
        game.visibleCards = [];
        game.waitingForInput = true;
    }

    function removeCards() {
        game.visibleCards[0].markedForDeletion = true;
        game.visibleCards[1].markedForDeletion = true;
        game.visibleCards = [];
        game.waitingForInput = true;
        if (game.cards.length === 2) {
            game.gamestate = GAMESTATE.END;
        }
    }

    function click() {
        if (!(game.gamestate === GAMESTATE.RUNNING)) {
            game.start();
        }
        else {
            if (game.waitingForInput) {
                game.cards.forEach((object) =>
                    checkClick(object)
                );
                if (game.visibleCards.length === 2) {
                    if (game.visibleCards[0].number === game.visibleCards[1].number) {
                        setTimeout(removeCards, 500);
                        game.waitingForInput = false;
                    }
                    else {
                        setTimeout(hide, 500);
                        game.waitingForInput = false;
                    }
                }
            }
        }
    }

    function released() {

    }

    function moved(evt, canvas) {
        var rect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / rect.width;
        var scaleY = canvas.height / rect.height;
        mouseX = (evt.clientX - rect.left) * scaleX;
        mouseY = (evt.clientY - rect.top) * scaleY;
    }

    fullScreenCanvas.addEventListener('mousedown', click);
    fullScreenCanvas.addEventListener('mouseup', released);
    fullScreenCanvas.addEventListener('mousemove', function (evt) { moved(evt, fullScreenCanvas) });

    function blobajax() {
        var myBlob = new Blob(["CONTENT"], { type: "text/plain" });

        var data = new FormData();
        data.append("upfile", myBlob);

        fetch("3b-upload.php", {
            method: "POST",
            body: data
        })
            .then((res) => { return res.text(); })
            .then((txt) => { console.log(txt); });
    }

    var lastTime = 0;
    function gameLoop(timestamp) {
        let deltaTime = timestamp - lastTime;
        if (deltaTime < 25) {
            requestAnimationFrame(gameLoop);
            return;
        }

        lastTime = timestamp;

        game.globalTime = timestamp;
        ctx.clearRect(0, 0, game_width, game_height);
        game.update(deltaTime);
        game.draw(ctx);

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}
memory()