
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0 ;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600) ;
  
    var survivalTime = 0;
  
  monkey = createSprite(80,315,30,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1 ;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -3;
  ground.x = ground.width/2;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  background("green")
 
  if(ground.x<0)
  {
    ground.x = ground.width/2;
  }
  
  if(keyDown("space"))
  {
    monkey.velocityY = -12; 
  }
    monkey.velocityY = monkey.velocityY + 0.5;
    
  monkey.collide (ground);
  
  spawnFood();
  spawnObstacles();
  
  drawSprites ();
  
  if(obstaclesGroup.isTouching(monkey))
  {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach (0);
    foodGroup.setVelocityXEach (0);
    obstaclesGroup.setLifetimeEach (-1);
    foodGroup.setLifetimeEach (-1);
    }

  survivalTime = Math.ceil(frameCount/frameRate());
  
  fill("white");
  textSize(20);
  text("survivalTime: "+survivalTime,100,50);
  
}

  function spawnFood()
  {
    if(frameCount%80 === 0)
      {
        banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.velocityX = -5;
    
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 150;
    monkey.depth = banana.depth+1;    
        
    foodGroup.add(banana);
      }
         
  }

  function spawnObstacles()
{
  if(frameCount%300 === 0)
    {
      obstacles = createSprite(600,340,40,10);
      //obstacles.x = random(130,210);
      obstacles.velocityX = -5;
      
      obstacles.addImage(obstacleImage);
      obstacles.scale = 0.1;
      obstacles.lifetime = 300;
      
      obstaclesGroup.add(obstacles);
      
    }  
}


