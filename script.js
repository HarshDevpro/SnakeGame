let inputDir ={x:0 ,y:0};
let lastimeprint =0
let speed = 10
let score = 0
let snakeArr =[{
    x :15, y:16
}]
let snakelife = 3

food={
    x:2,
    y:5
}


//3 life chance



//Game Fuction
function main(ctime){
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if((ctime-lastimeprint)/1000< 1/speed){
        return;
    }
    lastimeprint=ctime;
    gameengine()
}

function isCollide(snake){
    if(snakelife>0){
    for (let i = 1; i < snakeArr.length; i++) {
        //snake bumb to itself
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
            snakelife -= 1;
            console.log(snakelife)
            return true;
        }
    }
    
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0 ){
        snakelife -=1;
        console.log(snakelife)
        return true;
    }
}}


function gameengine(){
    
    //increment array & snake length 
    if(isCollide(snakeArr)){

        if(snakelife === 0){
        inputDir={x:0 ,y:0};
        alert("Game Over. Press any key to play agian.")
        score = 0
        snakeArr = [{x :15, y:16}]     
    }
        else{
            inputDir={x:0 ,y:0};
            alert(`Life Over. Left Life : ${snakelife}`)
            snakeArr = [{x :10, y:10}] 
        }
}

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
       snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        score += 10;
        if(score>highscrval){
            highscrval = score;
            localStorage.setItem('highscr', JSON.stringify(highscrval))
            HighScore.innerHTML = "Hi-score : " + highscrval

        }
        scoreboard.innerHTML = "Score : " + score;
        let a=2;
        let b=16;
        food = {x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
    }

    //move the snake
    for (let i =snakeArr.length -2; i >=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Display snake and food 
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index=== 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    })

    foodElement = document.createElement("div")
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
            

}






//main logic start
let highscr= localStorage.getItem('highscr')
if(highscr === null){
    highscrval = 0
    localStorage.setItem('highscr', JSON.stringify(highscrval))
}
else{
    highscrval = JSON.parse(highscr)
    HighScore.innerHTML = "Hi-Score : " + highscr
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', (e)=>{
    inputDir = {x:0,y:1}
    switch (e.key) {
            case "ArrowDown":
            console.log("ArrowDown")
            inputDir={x:0, y:1};
            break;
            case "ArrowUp":
            console.log("ArrowUp")
                inputDir={x:0, y:-1};
                break;
            case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir={x:-1, y:0};
            break;
            case "ArrowRight":
            console.log("ArrowRight")
            inputDir={x:1, y:0};
            break;          
        default:
            break;
    }

})