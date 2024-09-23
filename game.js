import {update as updateSnake, draw as drawSnake, SNAKE_SPEED,getSnakeHead, snakeIntersection} from './snake.js';
import {update as updateFood, draw as drawFood } from './food.js';
import { outSideGrid } from './grid.js';


let lastRenderTime=0
let gameOver = false;
const gameBoard=document.getElementById('game-board');


// const FRAME_RATE = 1000/SNAKE_SPEED; // Converts it's speed to milliseconds


function main(currentTime){
    if(gameOver){
        if(confirm('You Lost!, Press OK to Restart.')){ //okay-true
            window.location='/';
        }
        return
    }

    // setInterval(() => {
    // const currentTime = performance.now();
    window.requestAnimationFrame(main)
    const secondsSinceLastRender=(currentTime-lastRenderTime)/1000

    // console.log(secondsSinceLastRender);
    // console.log(currentTime);

    if(secondsSinceLastRender<1/SNAKE_SPEED) return
    // console.log('Render')
    lastRenderTime=currentTime

    update()
    draw()
    // },FRAME_RATE);
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw(){
    gameBoard.innerHTML='';
    drawSnake(gameBoard);
    drawFood(gameBoard);

}

function checkDeath(){
    gameOver=outSideGrid(getSnakeHead()) || snakeIntersection()
}