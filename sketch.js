var monkey , monkey_running;
var banana ,bananaImage, bananaGroup; 
var obstacle, obstacleImage, obstacleGroup;
var score;
var ground;
var rock, rockImage, rockGroup;
var score = 0;
var gameState = "play";

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  rockImage = loadImage("obstacle.png");
}



function setup() {
  
  createCanvas(400, 400);
  
  monkey = createSprite(75, 300, 30, 30);
  monkey.addAnimation("monkeyRunning", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300, 370, 600, 10);
  ground.shapeColor = ("black");
  
  bananaGroup = new Group();
  rockGroup = new Group();
}

function draw() {
  background("white");
  
  ground.velocityX = 1;
  if(ground.x > 300){
   ground.x = 300; 
  }
  
  if(keyDown("space")){
    monkey.velocityY = -11; 
  }
  
  monkey.velocityY = monkey.velocityY + 0.5;
  
  monkey.collide(ground);
  
  Food();
  
  Obstacles();
  
  stroke("black");
  textSize(20);
  fill("black");
  score = Math.round(frameCount/100);
  text("Survival Time : " + score, 100, 50);
  
  if(monkey.isTouching(rockGroup)){
   rockGroup.velocityX = 0; 
  }
  
  drawSprites();
}

function Food(){
 if(frameCount%80 == 0){
    banana = createSprite(450, Math.round(random(150, 300)), 20, 20);
    banana.velocityX = -1;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = -10;
   
    bananaGroup.add(banana);
   
    banana.depth = monkey.depth;
 }
}

function Obstacles(){
  if(frameCount%300 == 0){
    rock = createSprite(450, 350, 20, 20);
    rock.velocityX = -1;
    rock.addImage(rockImage);
    rock.scale = 0.1;
    rock.lifetime = -10;
    
    monkey.depth = rock.depth;
    
    rockGroup.add(rock);
    
    if(rockGroup.isTouching(monkey)){
      gameState = ("end"); 
    }
  }
}

if(gameState == ("end")){
  rock.depth = monkey.depth;
  bananaGroup.destroyEach();
  monkey.destroy();
}