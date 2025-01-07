// function rand //////////////////////////////////////////////////////////////////////////////
function rand(min, max) {
    const resulta = Math.floor(Math.random() * (max - min + 1)) + min;
    if (resulta === 0) {
        return rand(min, max);
    }
    return resulta;
}


// const //////////////////////////////////////////////////////////////////////////////
const paddleLeft = document.querySelector("#paddle-left");
const paddleRight = document.querySelector("#paddle-right");
const ball = document.querySelector("#ball");
const scoreLeft = document.querySelector("#score-left")
const scoreRight = document.querySelector("#score-right")
const body = document.querySelector("body");
let iaF = false;


// option //////////////////////////////////////////////////////////////////////////////
const ballYX = 15;
let speedBall = 1;
const maxSpeedBall = 10;
const speedPaddle = 10;

const plateauX = 800;
const plateauY = 400;



// mouvement Paddle  //////////////////////////////////////////////////////////////////////////////
const paddleX = 10;
const paddleY = 80;

let positionPaddleLeft = 160;
let positionPaddleRight = 160;

let mouveaddleLeftUp = false;
let mouveaddleLeftDown = false;

let mouveaddleRightUp = false;
let mouveaddleRightDown = false;

document.addEventListener('keydown', function (e) {
    if (e.key === 'z') mouveaddleLeftUp = true;
    if (e.key === 's') mouveaddleLeftDown = true;
    if (e.key === 'ArrowUp') mouveaddleRightUp = true;
    if (e.key === 'ArrowDown') mouveaddleRightDown = true;
})
document.addEventListener('keyup', function (e) {
    if (e.key === 'z') mouveaddleLeftUp = false;
    if (e.key === 's') mouveaddleLeftDown = false;
    if (e.key === 'ArrowUp') mouveaddleRightUp = false;
    if (e.key === 'ArrowDown') mouveaddleRightDown = false;
})
function mouve() {
    if (!play) return;
    if (mouveaddleLeftUp && positionPaddleLeft > 0) {
        positionPaddleLeft -= speedPaddle
        paddleLeft.style.top = positionPaddleLeft + 'px';
    };
    if (mouveaddleLeftDown && positionPaddleLeft < plateauY - paddleY) {
        positionPaddleLeft += speedPaddle
        paddleLeft.style.top = positionPaddleLeft + 'px';
    };
    if (mouveaddleRightUp && positionPaddleRight > 0) {
        positionPaddleRight -= speedPaddle
        paddleRight.style.top = positionPaddleRight + 'px';
    };
    if (mouveaddleRightDown && positionPaddleRight < plateauY - paddleY) {
        positionPaddleRight += speedPaddle
        paddleRight.style.top = positionPaddleRight + 'px';
    };


    requestAnimationFrame(mouve);
}


// mouvement de la balle //////////////////////////////////////////////////////////////////////////////
// pour debut aléa
let directionY = rand(-1, 1);
let directionX = rand(-1, 1);

//counter
let counterScoreLeft = 0;
let counterScoreRight = 0;

//position ball
let positionBallY = 190;
let positionBallX = 390;

function mouvementBall() {
    // pour stop
    if (!play) return;
    speedBall;
    maxSpeedBall;

    // cacule choc  
    let chocPaddleLeftUp = positionPaddleLeft + paddleY;
    let chocPaddleRighUp = positionPaddleRight + paddleY;

    if (positionBallX >= (plateauX - ballYX) || positionBallX <= 0) directionX = directionX * -1;
    if (positionBallY >= (plateauY - ballYX) || positionBallY <= 0) directionY = directionY * -1;

    // choc ball paddle //////////////////////////////////////////////////////////////////////////////
    if (positionBallX === 10 && positionBallY >= positionPaddleLeft && positionBallY <= chocPaddleLeftUp) {
        directionX *= -1
        speedBall++
        if (speedBall > maxSpeedBall) speedBall = maxSpeedBall;

    };
    if (positionBallX === 775 && positionBallY >= positionPaddleRight && positionBallY <= chocPaddleRighUp) {
        directionX *= -1
        speedBall++
        if (speedBall > maxSpeedBall) speedBall = maxSpeedBall;
    };

    // scrore //////////////////////////////////////////////////////////////////////////////
    if (positionBallX < 0) { 
        counterScoreRight++
        scoreRight.textContent = counterScoreRight
        body.classList.add("body"); 
        setTimeout(() => {
            body.classList.remove("body"); 
        }, 500);
    };
    if (positionBallX >= (plateauX - paddleX)) {
        counterScoreLeft++
        scoreLeft.textContent = counterScoreLeft
        body.classList.add("body"); 
        setTimeout(() => {
            body.classList.remove("body"); 
        }, 500);

    };



    // couleur ball //////////////////////////////////////////////////////////////////////////////
ball.className = ""; // Réinitialise les classes
ball.classList.add("ball");

if (speedBall >= 3) ball.classList.add("ballcolor1");
if (speedBall >= 6) ball.classList.add("ballcolor2");
if (speedBall >= 9) ball.classList.add("ballcolor3");

    // mouvement ball //////////////////////////////////////////////////////////////////////////////
    positionBallY += speedBall * directionY;
    positionBallX += speedBall * directionX;
    ball.style.left = positionBallX + 'px';
    ball.style.top = positionBallY + 'px';

    requestAnimationFrame(mouvementBall);
};


// bourron play/pause //////////////////////////////////////////////////////////////////////////////
let play = false;
const btnPlay = document.querySelector('#btnPlay')
const btnStop = document.querySelector('#btnStop')
btnPlay.addEventListener('click', function () {
    play = !play;
    if (play) {
        mouvementBall();
        mouve();
    } if (counterScoreLeft === 5 || counterScoreRight === 5) {
        play = false;
    }
});



// IA //////////////////////////////////////////////////////////////////////////////

function ia() {
    iaF = true;
    if (!play) return;
    positionPaddleLeft = positionBallY - (paddleY / 2);
    positionPaddleRight = positionBallY - (paddleY / 2);
    if (positionPaddleLeft >= 0 && positionPaddleLeft <= plateauY - paddleY) {
        paddleLeft.style.top = positionPaddleLeft + 'px'
    };
    if (positionPaddleRight >= 0 && positionPaddleRight <= plateauY - paddleY) {
        paddleRight.style.top = positionPaddleRight + 'px'
    };


    requestAnimationFrame(ia);
};
const btnIa = document.querySelector('#btnIa')
btnIa.addEventListener('click', function () {
    play = !play;
    if (play) {
        mouvementBall();
        ia();
    }
});



// fin de partie //////////////////////////////////////////////////////////////////////////////

// if (counterScoreLeft === 5 || counterScoreRight === 5 && iaF === false) {
//     mouvementBall = false;
//     mouve = false;
// };