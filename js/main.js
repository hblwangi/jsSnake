//变量
let mapsData = []
let snake = []
let speed = 200
let food = {}
let mapSize = [10,10]
let snakeString = []
let timer = null
$("#map").change(function(){
    mapSize = JSON.parse( $("#map").val() )
    init()
})
$("#speed").change(function(){
    speed = $("#speed").val()
})
//创建地图
function createMap(x, y) {
    let str = ""
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            mapsData.push({"x": i, "y": j})
            str += `<div class="grid"></div>`
        }
    }
    $("#container").css({"width": x*20 + "px", "height": y*20 + "px"})
    $("#gridCon").css({"width": x*20 + "px", "height": y*20 + "px"})
    $("#gridCon").html(str)

}

//生成随机数函数
function getRandom(min, max){
    return parseInt(Math.random()*(max-min+1)+min,10);
}

//初始化
function init() {
    snake = [
        {x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}
    ]
    createMap(mapSize[0], mapSize[1])
    showSnake(snake)
    createFood()

    $(".beginGame").click(function(){
        snakeMoveGo()
    })
}

//显示蛇
function showSnake(arr){
    let str = ""
    for (let i = 0; i < arr.length; i++) {
        str += `<div class="snake" style="top:${arr[i].y * 20}px;left:${arr[i].x * 20}px;"></div>`
    }
    $("#snake").html(str)
}

//判断是否游戏结束
function judge(){
    
    for (let i = 0; i < snake.length; i++) {
        snakeString[i] = JSON.stringify(snake[i])
    }
    snakeString.pop()
    if (snake[snake.length-1].x < 0 || snake[snake.length-1].x >= mapSize[0] || snake[snake.length-1].y < 0 || snake[snake.length-1].y >= mapSize[1]) {
        alert("撞墙死")
        clearInterval(timer)
        init()
    }else if( snakeString.indexOf(JSON.stringify(snake[snake.length-1])) != -1 ){
        alert("自己把自己撞死了")
        clearInterval(timer)
        init()
    }
}

//判断食物是否被吃
function eatFood(){
    if (JSON.stringify(food) == JSON.stringify(snake[snake.length - 1])) {
        if (snake[0].x == snake[1].x && snake[0].y > snake[1].y) {
            snake.unshift({x: snake[0].x, y: snake[0].y-1})
        } else if(snake[0].x == snake[1].x && snake[0].y < snake[1].y) {
            snake.unshift({x: snake[0].x, y: snake[0].y+1})
        } else if(snake[0].y == snake[1].y && snake[0].x < snake[1].x) {
            snake.unshift({x: snake[0].x-1, y: snake[0].y})
        } else if(snake[0].y == snake[1].y && snake[0].x < snake[1].x) {
            snake.unshift({x: snake[0].x+1, y: snake[0].y})
        }
        createFood()
    }
}

//蛇移动
function snakeMoveGo() {
    let direction = "right"
    clearInterval(timer)
    timer = setInterval(function () {
        for (let i = 0; i < snake.length - 1; i++) {
            snake[i].x = snake[i + 1].x
            snake[i].y = snake[i + 1].y
        }
        snake[snake.length - 1].x += 1
        eatFood()
        judge()
        showSnake(snake)
    }, speed)
    $(document).keydown(function(event){
        switch (event.keyCode) {
            case 37:
            if (direction == "right" || direction == "left") {
                return
            }
            direction = "left"
                clearInterval(timer)
                timer = setInterval(function(){
                    for (let i = 0; i < snake.length - 1; i++) {
                        snake[i].x = snake[i+1].x
                        snake[i].y = snake[i+1].y
                    }
                    snake[snake.length - 1].x -= 1
                    eatFood()
                    judge()
                    showSnake(snake)
                }, speed)

                break;
            case 38:
            if (direction == "down" || direction == "up") {
                return
            }
            direction = "up"
                clearInterval(timer)
                timer = setInterval(function(){
                    for (let i = 0; i < snake.length - 1; i++) {
                        snake[i].x = snake[i+1].x
                        snake[i].y = snake[i+1].y
                    }
                    snake[snake.length - 1].y -= 1
                    eatFood()
                    judge()
                    showSnake(snake)
                }, speed)
                break;
            case 39:
            if (direction == "left" || direction == "right") {
                return
            }
            direction = "right"
                clearInterval(timer)
                timer = setInterval(function(){
                    for (let i = 0; i < snake.length - 1; i++) {
                        snake[i].x = snake[i+1].x
                        snake[i].y = snake[i+1].y
                    }
                    snake[snake.length - 1].x += 1
                    eatFood()
                    judge()
                    showSnake(snake)
                }, speed)
                break;
            case 40:
            if (direction == "up" || direction == "down") {
                return
            }
            direction = "down"
                clearInterval(timer)
                timer = setInterval(function(){
                    for (let i = 0; i < snake.length - 1; i++) {
                        snake[i].x = snake[i+1].x
                        snake[i].y = snake[i+1].y
                    }
                    snake[snake.length - 1].y += 1
                    eatFood()
                    judge()
                    showSnake(snake)
                }, speed)
                
                break;
            default:
                break;
        }
    })
}

//生成食物
function createFood() {
    let foodArray = []
    for(let i = 0; i < mapsData.length; i++){
        let obj = mapsData[i];
        let X = obj.x;
        let isExist = false;
        for(let j = 0; j < snake.length; j++){
            let aj = snake[j];
            let S = aj.x;
            if(X == S){
                isExist = true;
                break;
            }
        }
        if(!isExist){
            foodArray.push(obj);
        }
    }
    let n = getRandom(0, foodArray.length-1)
    food = foodArray[n]
    $("#food").html(`<div class="food" style="top:${foodArray[n].y*20}px; left:${foodArray[n].x*20}px;"></div>`)
}

init()