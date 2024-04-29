const canvas = document.getElementById("snakecanva");
const context = canvas.getContext("2d");

function StartGame(){
    const gridSize = 30;
    const snake = [ {x: 120, y: 120}]
    let direction = "down"
    let food = foodPosition();
    let secondfood = secFoodPosition();    

    pic = new Image();
    pic.src     = 'banan---1-sht--1.1636984147.jpg';

    secpic = new Image();
    secpic.src  = 'https://media.istockphoto.com/id/184276818/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BA%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B5-%D1%8F%D0%B1%D0%BB%D0%BE%D0%BA%D0%BE.jpg?s=612x612&w=0&k=20&c=HDH3wLEAvc7soT85pAcS4JOQu5KJ8xM9JOilVe1zFLI=';
    
    function foodPosition(){
        max_x = (canvas.width / gridSize) - 1
        max_y = (canvas.height / gridSize) - 1

        grid_x = Math.floor(Math.random() * max_x) - 0
        grid_y = Math.floor(Math.random() * max_y) - 0

        const x = grid_x*gridSize;
        const y = grid_y*gridSize;

        return{ x, y };
    }

    function secFoodPosition(){
        max_x = (canvas.width / gridSize) - 1
        max_y = (canvas.height / gridSize) - 1

        grid_x = Math.floor(Math.random() * max_x) - 0
        grid_y = Math.floor(Math.random() * max_y) - 0

        const x = grid_x*gridSize;
        const y = grid_y*gridSize;

        return{ x, y };
    }

    function draw(){
        context.clearRect(0, 0, canvas.width, canvas.height)

        context.fillStyle = "green";

        snake.forEach( function(segment){context.fillRect(segment.x, segment.y, gridSize, gridSize);});

        context.fillStyle = "yellow";
        context.fillRect(food.x, food.y, gridSize, gridSize);

        context.drawImage(pic, food.x, food.y, gridSize, gridSize)
        
        context.fillStyle = "red";
        context.fillRect(secondfood.x, secondfood.y, gridSize, gridSize);

        context.drawImage(secpic, secondfood.x, secondfood.y, gridSize, gridSize)
    }


    function move(){
        const head ={...snake[0]}
        switch(direction){
            case "up":
                head.y -= gridSize;
                break;
            case "down":
                head.y += gridSize;
                break;
            case "left":
                head.x -= gridSize;
                break;
            case "right":
                head.x += gridSize;
                break;        
        }

        if(head.x === food.x && head.y === food.y ){
            snake.unshift(food);

            food = foodPosition();
        }
        else if(head.x === secondfood.x && head.y === secondfood.y){
            snake.unshift(secondfood);

            secondfood = secFoodPosition();
        }
        else{
            snake.pop()
        }
        
        if(head.x < 0){
            head.x = canvas.width;
        }

        if(head.x > canvas.width){
            head.x = 0
        }

        if(head.y < 0){
            head.y = canvas.height
        }

        if(head.y > canvas.height){
            head.y = 0
        }

        if (collisionItself(head)){
            alert("GAME OVER");
            location.reload();
        }

        snake.unshift(head)
    }

    function collisionItself(head){
        return snake.slice(1).some( segment=> segment.x === head.x && segment.y === head.y);
    }

    function onKeyPress(event){
        const key = event.key.toLowerCase();

        if (["w", "a", "s", "d"]. includes(key)){
            if( key === "w" && direction !== "down"){direction = "up"; }
            if( key === "s" && direction !== "up"){direction = "down"; }
            if( key === "a" && direction !== "right"){direction = "left"; }
            if( key === "d" && direction !== "left"){direction = "right"; }
        }
    }

    window.addEventListener('keydown', onKeyPress);

    function LoopGame(){
        move();
        draw();
    }

    setInterval(LoopGame, 150);
}