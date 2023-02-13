<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.cdnfonts.com/css/games" rel="stylesheet">

    <title>snake game</title>
    <style>
        html{
            /*background-color: blueviolet;*/
        }
        .my-game{
            width: 70%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
        }
        .my-game-section{
            width: 59%;
            margin-left: 1%;
            float: left;
            min-height: 640px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
        }
        .my-game-section:first-child{
            width: 39%;
            min-width: 150px;
            margin-left: 1%;
            float: left;
            min-height: 640px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
        }
        .my-game-section canvas{
            width: 640px;
            height: 640px;
        }
        .game-buttons{
            width: 100%;
            min-height: 100px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

        }
        .game-buttons button{
            width: 80%;
            height: 60px;
            display: inline-block;
            background-color: blue;
            color: white;
            font-size: 1.2em;
            border: unset;
            margin-bottom: 5px;
        }
        .game-buttons button:last-child{
            background-color: saddlebrown;
        }
        .game-scores{
            width: 100%;
            height: 500px;
            overflow: auto;
            /*display: none;*/
        }
        .game-scores-header{
            width: 100%;
            height: 50px;
            font-weight: bolder;
            font-size: 2em;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
        }
        .game-scores-body{
            width: 100%;
            display: inline-block;
            height: 420px;
        }
        body{
            margin: 0px;
            padding: 0px;
            display: flex;
            flex-direction: column; /* arrage items on top of the other */
            justify-content: center;
            align-items: center;
            font-family: 'Games', sans-serif !important;

        }
        canvas{
            font-family: 'Games', sans-serif !important;
        }
        button{
            font-family: 'Games', sans-serif !important;
        }
        canvas{
            box-shadow: black 10px 10px 50px; /*elevate our canvas*/
            font-family: 'Games', sans-serif !important;
        }
    </style>
</head>
<body>

<div class="my-game">
    <div class="my-game-section">
        <div class="game-scores">
            <div class="game-scores-header">
                Top 100 Scores
            </div>
            <div class="game-scores-body">
                
            </div>
        </div>
        <div class="game-buttons">
            <button id="newGame">Start New Game</button>
            <button>View Top 100 Scores</button>
        </div>
    </div>
    <div class="my-game-section">
        <canvas id="game" width="640" height="640"></canvas>
    </div>
</div>

<!--<script src="game.js"></script>-->

<script>
    const canvas=document.getElementById('game');
    const ctx=canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    class SnakePart{
        constructor(x, y){
            this.x=x;
            this.y=y;
        }
    }

    let gameIsRunning = false;
    let speed=3;
    let tileCount=32;
    let tileSize=(canvas.clientWidth/tileCount)-2;
    let headX=16;
    let headY=16;
    let newGame = true;

    const snakeParts=[];
    let tailLength=0;

    let xvelocity=0;
    let yvelocity=0;

    let remonX=Math.round(Math.random() * tileCount);
    let remonY=Math.round(Math.random() * tileCount);

    let score=0;


    function drawGame(){

        changeSnakePosition();
        let result = isGameOver();
        if(result) return;

        clearScreen();
        drawSnake();
        drawRemon();
        checkCollision()
        drawScore();
        setTimeout(drawGame, 1000/speed);
    }


    function isGameOver(){
        let gameOver=false;

        //check whether game has started
        if(yvelocity===0 && xvelocity===0){
            return false;
        }
        //if snake hits left wall
        if(headX<0){
            gameOver=true;
        }
        //if snake hits right wall
        else if(headX===tileCount){
            gameOver=true;
        }
        //if snake hits wall at the top
        else if(headY<0){
            gameOver=true;
        }
        //if snake hits wall at the bottom
        else if(headY===tileCount){
            gameOver=true;
        }

        //stop game when snake crush to its own body

        for(let i=0; i<snakeParts.length;i++){
            let part=snakeParts[i];
            if(part.x===headX && part.y===headY){//check whether any part of snake is occupying the same space
                gameOver=true;
                break; // to break out of for loop
            }
        }
        //display text Game Over
        if(gameOver){
            gameIsRunning = false;
            saveScore();
            ctx.fillStyle="white";
            ctx.font="50px 'Games', sans-serif";
            ctx.fillText("Game Over! ", canvas.clientWidth/6.5, canvas.clientHeight/2);//position our text in center
        }

        return gameOver;
    }

    function drawScore(){
        ctx.fillStyle="white";
        ctx.fontWeight ="bolder";
        ctx.font="20px 'Games', sans-serif";
        ctx.fillText("Score: " +score, canvas.clientWidth-100,20);
    }

    // clear our screen
    function clearScreen(){

        ctx.fillStyle= 'black'// make screen black
        ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
    }

    function drawSnake(){

        ctx.fillStyle = "green";
        for(let i = 0; i < snakeParts.length; i++){
            let part = snakeParts[i];
            let adjusted = tileSize+2
            ctx.fillRect(part.x * adjusted, part.y * adjusted, tileSize, tileSize);
        }

        snakeParts.push(new SnakePart(headX, headY));
        if(snakeParts.length > tailLength){
            snakeParts.shift();
        }

        ctx.fillStyle = "blue";
        let adjusted = tileSize+2;
        ctx.fillRect(headX * adjusted, headY * adjusted, tileSize, tileSize);
    }



    function changeSnakePosition(){
        headX=headX + xvelocity;
        headY=headY+ yvelocity;

    }
    function drawRemon(){
        ctx.fillStyle="red";
        let adjusted = tileSize+2
        ctx.fillRect(remonX*adjusted, remonY*adjusted, tileSize, tileSize)
    }


    function checkCollision(){
        if(remonX==headX && remonY==headY){
            remonX=Math.floor(Math.random()*tileCount);
            remonY=Math.floor(Math.random()*tileCount);
            tailLength++;
            score++; //increase our score value

        }
    }

    document.body.addEventListener('keydown', keyDown);

    function keyDown() {

        if (!gameIsRunning) return;
        if(event.keyCode==38){
            //prevent snake from moving in opposite direcction
            if(yvelocity==1) return;
            yvelocity=-1;
            xvelocity=0;
        }
        //down
        if(event.keyCode==40){
            if(yvelocity==-1)
                return;
            yvelocity=1;
            xvelocity=0;
        }

        //left
        if(event.keyCode==37){
            if(xvelocity==1)
                return;
            yvelocity=0;
            xvelocity=-1;
        }
        //right
        if(event.keyCode==39){
            if(xvelocity==-1)
                return;
            yvelocity=0;
            xvelocity=1;
        }
    }

    async function saveScore(){
        if (score >= 100){
            // const { contents } = await TMI.list([...baseFolder, 'scores'])
            items = contents?.length > 2 ? JSON.parse(contents) : [];

            setTimeout(async function () {
                let name = prompt("Please provide your name");
                if (name){
                    //
                    // items.push({name,score,id:Date.now()});
                    // await TMI.saveFile([...baseFolder, 'scores'], JSON.stringify(items));
                    // await diplayHighScores();
                }
            },2000);
        }
    }


    async function diplayHighScores(){
        // const { contents } = await TMI.list([...baseFolder, 'scores'])
        // items = contents?.length > 2 ? JSON.parse(contents) : [];
    }

    async function main() {
        // await TMI.createFolder(baseFolder)
        await renderApp()
    }
    // main();

    drawGame();
    let data = document.querySelector('.my-game');
    // const baseFolder = ['.private', TMI.clientKey, 'snake'];

    document.querySelector('#newGame').addEventListener('click',function () {
        yvelocity=-1;
        xvelocity=0;
        if (gameIsRunning){
            window.location.href = "";
        }else{
            gameIsRunning = true;
        }

        if (!newGame){
            newGame = false;
            ctx.fillStyle = "white";
            restartGame();
            yvelocity=-1;
            xvelocity=0;
            gameIsRunning = true;
        }else{
            newGame = false;
        }

    });

    function restartGame() {
        headX = 16;
        headY = 16;

        xvelocity = 0;
        yvelocity = 0;

        remonX = Math.round(Math.random() * tileCount);
        remonY = Math.round(Math.random() * tileCount);

        tailLength = 0;
        score = 0;
        snakeParts.length = 0;
    }
</script>
</body>
</html>