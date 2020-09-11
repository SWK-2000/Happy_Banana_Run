var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0,ground;
var time=0;

var PLAY=1;
var END=2;
var gameState=PLAY

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  monkey=createSprite(200,300,50,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.15;
  ground = createSprite(200,370,1000,10);
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
}

function draw() {
  background("lightBlue");
  gameStates();
  text("BANANAS :"+score,328,11);
  text("SURVIVAL :"+time,0,11);  
  console.log(time);
  drawSprites();
}

function gameStates(){

  if (gameState==PLAY){
    groundAI();
    bananas()
    control();
    obstacles();
    timeKeep()
    
  }
  else if (gameState===END){
           
  reset();
           
  } 

}

function groundAI(){
  ground.x = ground.width /2;
  ground.velocityX=-3;
}

function control(){
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);  
    if(keyDown("space")&& monkey.y >= 318)      {
        monkey.velocityY = -15;
    }  
}

function bananas() {
   if (frameCount % 80 === 0){
    banana = createSprite(400,200,40,10);
    banana.velocityX =-6;
    banana.y = Math.round(random(200,300)); 
  console.log("bananawaesdrtfyhujiolp");
    banana.addImage(bananaImage);
    banana.scale=0.1; 
    banana.lifetime = 400;
    
    bananaGroup.add(banana);
    }
  if (bananaGroup.isTouching(monkey)){
  bananaGroup.destroyEach();
    score=score+1;
  }
}

function obstacles() {
   if (frameCount % 300 === 0){
    obstacle = createSprite(400,330,40,10);
    obstacleGroup.add(obstacle); 
    obstacle.velocityX =-6;
    obstacle.debug=true; 
 obstacle.addImage("obstacle",obstaceImage);
    obstacle.scale=0.2; 
    obstacle.lifetime = 400;
    obstacle.setCollider("circle",10,0,200); 
    
    }
  if (obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
}

function timeKeep(){
  if(frameCount % 60 === 0){
    time=time+1;
  }
}

function reset(){
  monkey.velocityY=0;
  ground.visible=false;  
  monkey.visible=false;  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();  
  ground.velocityX=0;
  text("GAMEOVER",168,200);    
}