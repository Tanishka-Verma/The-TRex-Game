var t_rex_running;
var t_rex;
var ground;
var groundImage;
var invisibleGround;
var cloudImage;
var cloud;              
var cactus;
var cactusImage1;
var cactusImage2;
var cactusGroup;
var cloudsGroup;
var gameState = "play";
var t_rex_dead;
var score=0;
var gameOver;
var gameOverImage;
//var t_rex_jumping;
var flyingDino;
var flyingDinoImage;
var reload;
var reloadImage;
//var end;
var endSound;
var jumpSound;

function preload(){
 groundImage = loadImage("t-rexGround.png");
 t_rex_running =  loadAnimation("Run1.png","Run2.png","Run3.png","Run4.png","Run5.png", "Run6.png","Run7.png","Run8.png");
cloudImage = loadImage("cloud.png");
  cactusImage1 = loadImage("cac1.png");
  cactusImage2 = loadImage("cac2.png");
  t_rex_dead = loadAnimation("Dead8.png");
  gameOverImage = loadImage("gameover.png");
  flyingDinoImage=loadAnimation("fd1.png","fd2.png","fd3.png","fd4.png")
  
  reloadImage = loadImage("reloadImg.png");
  endSound=loadSound("end.wav");
  jumpSound=loadSound("jump.wav");
  //t_rex_jumping.loadAnimation("jump1.png","jump2.png","jump3.png","jump4.png","jump5.png","jump6.png","jump7.png","jump8.png","jump9.png","jump10.png","jump11.png","jump12.png");
}
function setup() {
  createCanvas(500, 250);
  t_rex = createSprite(70,250,20,20);
  ground = createSprite(300,270,1200,5);
  t_rex.addAnimation("running",t_rex_running);
  t_rex.addAnimation("dead",t_rex_dead);
  //t_rex.addAnimation("jumping",t_rex_jumping);
  t_rex.scale=0.15;
  ground.addImage("land",groundImage);
  
  invisibleGround = createSprite(250,270,1200,150);
  invisibleGround.visible=false;
  flyingDino = createSprite(450,30,20,20);
 flyingDino.addAnimation("fd",flyingDinoImage);
 flyingDino.scale=0.3;
  cactusGroup = createGroup();
  cloudsGroup = createGroup(); 
  //t_rex.debug=true;
  t_rex.setCollider("circle",-50,0,200);
   gameOver=createSprite(250,100,20,20);
    gameOver.addImage("gOver",gameOverImage);
    gameOver.scale=0.5;
  reload = createSprite(250,150,20,20);
    reload.addImage("rld",reloadImage);
    reload.scale=0.07;
  
  
  
  //var randNo = random(1,5);
  //console.log(randNo);
  //var roundOff = Math.round(randNo);
  //console.log(roundOff);
}

function draw() {
  background(220);
  if (gameState=="play"){
    ground.velocityX=-10-Math.round(score/10);
    gameOver.visible=false;
    reload.visible=false;
   
    if((touches.length>0 || keyDown("space")) && t_rex.collide(invisibleGround)){
    t_rex.velocityY=-15; 
    //t_rex.changeAnimation("jumping",t_rex_jumping);
      jumpSound.play();
      touches = [];
      }
  
  // gravityCode
  t_rex.velocityY=t_rex.velocityY+1;  
   
    if (ground.x<0){
    ground.x=300;
  }
    creatingClouds();
    creatingCactus();
    flyingDino.velocityX=-11;
  
   if(t_rex.isTouching(cactusGroup)){
    gameState="end";
     endSound.play();
  }
   
  }
  
  else if(gameState=="end"){
    ground.velocityX=0;
    t_rex.velocityY=0;
    cloudsGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    flyingDino.velocityX=0;
    t_rex.changeAnimation("dead",t_rex_dead);
    gameOver.visible=true;
    reload.visible=true;
    cactusGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    //flyingDinoImage=loadImage("fd1.png");
    //flyingDino.addImage("fdino",fd1);
    
    if (mousePressedOver(reload)){
      gameState="play";
      cloudsGroup.destroyEach();
      cactusGroup.destroyEach();
     // reload.visible=false;
     // gameOver.visible=false;
      score=0;
      t_rex.changeAnimation("running",t_rex_running);
    }
  }
 t_rex.collide(invisibleGround);
  
 
  text(score,450,20)
 if (gameState=="play"&&World.frameCount%20==0){
    score=score+1;
    }
  
 if (flyingDino.x<0){
   flyingDino.x=600;
 }
  
  //console.log(ground.velocityX);
  drawSprites();
  //console.log(frameCount);
  
 
}
function creatingClouds() {
   if (World.frameCount%60==0){         
   cloud=createSprite(380,50,0,20);  
   cloud.addImage("Cl1",cloudImage);
   cloud.scale=0.02;
   cloud.velocityX=-3;
  cloud.lifetime=200;
     cloudsGroup.add(cloud);
     
   }
}
function creatingCactus(){
  if (World.frameCount%45==0){
    cactus=createSprite(390,160,20,20);
    var randNo = Math.round(random(1,2));
    if (randNo==1){
      cactus.addImage("cas1",cactusImage1);
      cactus.scale=0.01;
    }
    else {
      cactus.addImage("cas2",cactusImage2);
      cactus.scale=0.10;
    }
    cactus.velocityX=ground.velocityX;
     //cactus.debug=true;
    cactus.lifetime=150;
    cactus.setCollider("rectangle",20,40,100,60);
    cactusGroup.add(cactus);
  }
}